// Lógica específica para gestión de piscina y carriles

import { 
  Carril, 
  ClaseNatacion, 
  Reserva, 
  EstadoCarril, 
  EstadoReserva
} from './types';

export class PoolManager {
  private carriles: Carril[] = [];
  private readonly TOTAL_CARRILES = 8;
  private readonly CAPACIDAD_MAXIMA_POR_CARRIL = 6;

  constructor() {
    this.initializeCarriles();
  }

  private initializeCarriles(): void {
    this.carriles = Array.from({ length: this.TOTAL_CARRILES }, (_, index) => ({
      id: index + 1,
      numero: index + 1,
      capacidadMaxima: this.CAPACIDAD_MAXIMA_POR_CARRIL,
      ocupacionActual: 0,
      estado: EstadoCarril.DISPONIBLE,
      reservasActivas: []
    }));
  }

  // Obtener estado actual de todos los carriles
  getCarriles(): Carril[] {
    return [...this.carriles];
  }

  // Obtener carril específico por número
  getCarrilByNumero(numero: number): Carril | null {
    return this.carriles.find(carril => carril.numero === numero) || null;
  }

  // Calcular estado del carril basado en ocupación
  private calculateEstadoCarril(carril: Carril): EstadoCarril {
    const porcentajeOcupacion = (carril.ocupacionActual / carril.capacidadMaxima) * 100;
    
    if (porcentajeOcupacion === 0) return EstadoCarril.DISPONIBLE;
    if (porcentajeOcupacion === 100) return EstadoCarril.COMPLETO;
    return EstadoCarril.PARCIALMENTE_OCUPADO;
  }

  // Actualizar estado de carril
  updateCarrilEstado(numeroCarril: number): void {
    const carril = this.getCarrilByNumero(numeroCarril);
    if (carril && carril.estado !== EstadoCarril.MANTENIMIENTO) {
      carril.estado = this.calculateEstadoCarril(carril);
    }
  }

  // Verificar si un carril puede acomodar una reserva
  canAccommodateReservation(numeroCarril: number, capacidadNecesaria: number = 1): boolean {
    const carril = this.getCarrilByNumero(numeroCarril);
    if (!carril) return false;
    
    return carril.estado !== EstadoCarril.MANTENIMIENTO && 
           (carril.ocupacionActual + capacidadNecesaria) <= carril.capacidadMaxima;
  }

  // Encontrar el mejor carril disponible para una clase
  findBestAvailableLane(): number | null {
    const carrilesDisponibles = this.carriles
      .filter(carril => 
        carril.estado !== EstadoCarril.MANTENIMIENTO &&
        carril.ocupacionActual === 0 // Preferir carriles completamente libres para clases
      )
      .sort((a, b) => a.numero - b.numero); // Priorizar carriles con números menores

    return carrilesDisponibles.length > 0 ? carrilesDisponibles[0].numero : null;
  }

  // Asignar carril a una clase
  assignLaneToClass(numeroCarril: number, clase: ClaseNatacion): boolean {
    const carril = this.getCarrilByNumero(numeroCarril);
    if (!carril || !this.canAccommodateReservation(numeroCarril, clase.capacidadMaxima)) {
      return false;
    }

    carril.tipoClase = clase.tipoClase;
    carril.instructorAsignado = clase.instructorId;
    carril.horaInicio = clase.fechaHora.toTimeString().slice(0, 5);
    carril.horaFin = new Date(clase.fechaHora.getTime() + clase.duracion * 60000)
      .toTimeString().slice(0, 5);
    
    this.updateCarrilEstado(numeroCarril);
    return true;
  }

  // Agregar reserva a un carril
  addReservationToLane(numeroCarril: number, reservaId: string): boolean {
    const carril = this.getCarrilByNumero(numeroCarril);
    if (!carril || !this.canAccommodateReservation(numeroCarril)) {
      return false;
    }

    carril.reservasActivas.push(reservaId);
    carril.ocupacionActual += 1;
    this.updateCarrilEstado(numeroCarril);
    return true;
  }

  // Remover reserva de un carril
  removeReservationFromLane(numeroCarril: number, reservaId: string): boolean {
    const carril = this.getCarrilByNumero(numeroCarril);
    if (!carril) return false;

    const index = carril.reservasActivas.indexOf(reservaId);
    if (index > -1) {
      carril.reservasActivas.splice(index, 1);
      carril.ocupacionActual = Math.max(0, carril.ocupacionActual - 1);
      this.updateCarrilEstado(numeroCarril);
      return true;
    }
    return false;
  }

  // Liberar carril completamente (al final de una clase)
  releaseLane(numeroCarril: number): boolean {
    const carril = this.getCarrilByNumero(numeroCarril);
    if (!carril) return false;

    carril.ocupacionActual = 0;
    carril.reservasActivas = [];
    carril.tipoClase = undefined;
    carril.instructorAsignado = undefined;
    carril.horaInicio = undefined;
    carril.horaFin = undefined;
    carril.estado = EstadoCarril.DISPONIBLE;
    return true;
  }

  // Marcar carril en mantenimiento
  setLaneForMaintenance(numeroCarril: number): boolean {
    const carril = this.getCarrilByNumero(numeroCarril);
    if (!carril) return false;

    // Solo permitir mantenimiento si el carril está vacío
    if (carril.ocupacionActual > 0) return false;

    carril.estado = EstadoCarril.MANTENIMIENTO;
    return true;
  }

  // Sacar carril de mantenimiento
  releaseLaneFromMaintenance(numeroCarril: number): boolean {
    const carril = this.getCarrilByNumero(numeroCarril);
    if (!carril || carril.estado !== EstadoCarril.MANTENIMIENTO) return false;

    carril.estado = this.calculateEstadoCarril(carril);
    return true;
  }

  // Obtener estadísticas de ocupación
  getOccupancyStats() {
    const totalCapacidad = this.TOTAL_CARRILES * this.CAPACIDAD_MAXIMA_POR_CARRIL;
    const ocupacionActual = this.carriles.reduce((sum, carril) => sum + carril.ocupacionActual, 0);
    const carrilesEnUso = this.carriles.filter(carril => carril.ocupacionActual > 0).length;
    const carrilesMantenimiento = this.carriles.filter(carril => carril.estado === EstadoCarril.MANTENIMIENTO).length;

    return {
      totalCarriles: this.TOTAL_CARRILES,
      totalCapacidad,
      ocupacionActual,
      porcentajeOcupacion: (ocupacionActual / totalCapacidad) * 100,
      carrilesEnUso,
      carrilesDisponibles: this.TOTAL_CARRILES - carrilesEnUso - carrilesMantenimiento,
      carrilesMantenimiento,
      capacidadDisponible: totalCapacidad - ocupacionActual
    };
  }

  // Validar conflictos de horario
  validateTimeSlotConflict(numeroCarril: number, nuevaHoraInicio: Date, duracion: number): boolean {
    const carril = this.getCarrilByNumero(numeroCarril);
    if (!carril || !carril.horaInicio || !carril.horaFin) return false;

    const nuevaHoraFin = new Date(nuevaHoraInicio.getTime() + duracion * 60000);
    const horaInicioExistente = new Date(`1970-01-01T${carril.horaInicio}`);
    const horaFinExistente = new Date(`1970-01-01T${carril.horaFin}`);

    // Verificar si hay solapamiento
    return (nuevaHoraInicio < horaFinExistente && nuevaHoraFin > horaInicioExistente);
  }
}

// Funciones utilitarias para gestión de reservas
export class ReservationManager {
  
  static validateReservation(reserva: Partial<Reserva>, clase: ClaseNatacion, poolManager: PoolManager): {
    valid: boolean;
    error?: string;
  } {
    // Verificar que la clase no esté llena
    if (clase.reservasActuales >= clase.capacidadMaxima) {
      return { valid: false, error: "La clase está llena" };
    }

    // Verificar disponibilidad del carril si se especifica
    if (reserva.carrilNumero) {
      if (!poolManager.canAccommodateReservation(reserva.carrilNumero)) {
        return { valid: false, error: `El carril ${reserva.carrilNumero} no está disponible` };
      }
    }

    // Verificar tiempo mínimo de reserva (ej: no menos de 1 hora antes)
    const tiempoMinimo = 60 * 60 * 1000; // 1 hora en milliseconds
    const tiempoHastaClase = clase.fechaHora.getTime() - Date.now();
    
    if (tiempoHastaClase < tiempoMinimo) {
      return { valid: false, error: "No se puede reservar con menos de 1 hora de anticipación" };
    }

    return { valid: true };
  }

  static canCancelReservation(reserva: Reserva): {
    canCancel: boolean;
    reason?: string;
  } {
    if (reserva.estado === EstadoReserva.CANCELADA) {
      return { canCancel: false, reason: "La reserva ya está cancelada" };
    }

    if (reserva.estado === EstadoReserva.COMPLETADA) {
      return { canCancel: false, reason: "No se puede cancelar una clase ya completada" };
    }

    // Política de cancelación: mínimo 2 horas antes
    const tiempoMinimoCancelacion = 2 * 60 * 60 * 1000; // 2 horas
    const tiempoHastaClase = reserva.fechaClase.getTime() - Date.now();

    if (tiempoHastaClase < tiempoMinimoCancelacion) {
      return { canCancel: false, reason: "No se puede cancelar con menos de 2 horas de anticipación" };
    }

    return { canCancel: true };
  }
}

// Crear instancia global del pool manager
export const poolManager = new PoolManager();