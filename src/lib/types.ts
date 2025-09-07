// Tipos específicos para el sistema de natación

export enum NivelNatacion {
  PRINCIPIANTE = "principiante",
  INTERMEDIO = "intermedio", 
  AVANZADO = "avanzado",
  COMPETITIVO = "competitivo"
}

export enum TipoClase {
  GRUPAL = "grupal",
  INDIVIDUAL = "individual",
  AQUA_AEROBICOS = "aqua_aerobicos",
  ENTRENAMIENTO_LIBRE = "entrenamiento_libre"
}

export enum EstadoCarril {
  DISPONIBLE = "disponible",
  PARCIALMENTE_OCUPADO = "parcialmente_ocupado",
  COMPLETO = "completo",
  MANTENIMIENTO = "mantenimiento"
}

export enum EstadoReserva {
  CONFIRMADA = "confirmada",
  PENDIENTE = "pendiente",
  CANCELADA = "cancelada",
  COMPLETADA = "completada"
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
  tipoUsuario: 'nadador' | 'instructor' | 'admin';
  nivelNatacion?: NivelNatacion;
  fechaRegistro: Date;
  avatar?: string;
}

export interface Instructor extends Usuario {
  especialidades: NivelNatacion[];
  certificaciones: string[];
  experienciaAnios: number;
  calificacionPromedio: number;
  horariosDisponibles: HorarioInstructor[];
}

export interface HorarioInstructor {
  diaSemana: string;
  horaInicio: string;
  horaFin: string;
  disponible: boolean;
}

export interface Carril {
  id: number;
  numero: number;
  capacidadMaxima: number;
  ocupacionActual: number;
  estado: EstadoCarril;
  tipoClase?: TipoClase;
  instructorAsignado?: string;
  horaInicio?: string;
  horaFin?: string;
  reservasActivas: string[]; // IDs de reservas
}

export interface ClaseNatacion {
  id: string;
  titulo: string;
  descripcion: string;
  nivel: NivelNatacion;
  tipoClase: TipoClase;
  duracion: number; // en minutos
  capacidadMaxima: number;
  precio: number;
  instructorId: string;
  instructor?: Instructor;
  equipoNecesario: string[];
  fechaHora: Date;
  carrilAsignado?: number;
  reservasActuales: number;
  imagenUrl?: string;
}

export interface Reserva {
  id: string;
  usuarioId: string;
  usuario?: Usuario;
  claseId: string;
  clase?: ClaseNatacion;
  carrilNumero: number;
  fechaReserva: Date;
  fechaClase: Date;
  estado: EstadoReserva;
  notas?: string;
  checkIn?: Date;
  fechaCancelacion?: Date;
  motivoCancelacion?: string;
}

export interface HorarioPiscina {
  id: string;
  diaSemana: string;
  horaApertura: string;
  horaCierre: string;
  horariosMantenimiento: PeriodoMantenimiento[];
}

export interface PeriodoMantenimiento {
  horaInicio: string;
  horaFin: string;
  descripcion: string;
  carrilesAfectados: number[];
}

export interface EstadisticasPiscina {
  totalReservas: number;
  ocupacionPromedio: number;
  ingresosTotales: number;
  clasesCompletadas: number;
  carrilesEnUso: number;
  usuariosDiarios: number;
  nivelMasPopular: NivelNatacion;
  horariosPopulares: string[];
}

export interface ConfiguracionPiscina {
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  totalCarriles: number;
  capacidadMaximaPorCarril: number;
  horariosOperacion: HorarioPiscina[];
  politicaCancelacion: {
    tiempoMinimoHoras: number;
    penalizacion: boolean;
    reembolsoCompleto: boolean;
  };
  equipoDisponible: {
    tablas: number;
    pullBuoys: number;
    aletas: number;
    gafas: number;
  };
}

// Tipos para formularios
export interface FormularioReserva {
  claseId: string;
  carrilPreferido?: number;
  notas?: string;
}

export interface FormularioClase {
  titulo: string;
  descripcion: string;
  nivel: NivelNatacion;
  tipoClase: TipoClase;
  duracion: number;
  capacidadMaxima: number;
  precio: number;
  instructorId: string;
  equipoNecesario: string[];
  fechaHora: string;
  imagenUrl?: string;
}

export interface FormularioUsuario {
  nombre: string;
  email: string;
  telefono?: string;
  nivelNatacion?: NivelNatacion;
  password: string;
}

// Tipos para API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Constantes útiles
export const NIVELES_NATACION_LABELS: Record<NivelNatacion, string> = {
  [NivelNatacion.PRINCIPIANTE]: "Principiante",
  [NivelNatacion.INTERMEDIO]: "Intermedio",
  [NivelNatacion.AVANZADO]: "Avanzado",
  [NivelNatacion.COMPETITIVO]: "Competitivo"
};

export const TIPOS_CLASE_LABELS: Record<TipoClase, string> = {
  [TipoClase.GRUPAL]: "Clase Grupal",
  [TipoClase.INDIVIDUAL]: "Clase Individual",
  [TipoClase.AQUA_AEROBICOS]: "Aqua Aeróbicos",
  [TipoClase.ENTRENAMIENTO_LIBRE]: "Entrenamiento Libre"
};

export const ESTADO_CARRIL_COLORS: Record<EstadoCarril, string> = {
  [EstadoCarril.DISPONIBLE]: "bg-green-100 border-green-300 text-green-800",
  [EstadoCarril.PARCIALMENTE_OCUPADO]: "bg-yellow-100 border-yellow-300 text-yellow-800",
  [EstadoCarril.COMPLETO]: "bg-red-100 border-red-300 text-red-800",
  [EstadoCarril.MANTENIMIENTO]: "bg-gray-100 border-gray-300 text-gray-800"
};