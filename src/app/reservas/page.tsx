"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Reserva, EstadoReserva } from '@/lib/types';
import { ReservationManager } from '@/lib/poolLogic';

export default function ReservasPage() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [selectedReserva, setSelectedReserva] = useState<Reserva | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulated reservations data
    const mockReservas: Reserva[] = [
      {
        id: '1',
        usuarioId: 'user-1',
        claseId: 'clase-1',
        carrilNumero: 3,
        fechaReserva: new Date('2024-12-15'),
        fechaClase: new Date('2024-12-20T18:00:00'),
        estado: EstadoReserva.CONFIRMADA,
        clase: {
          id: 'clase-1',
          titulo: 'Natación Intermedia',
          descripcion: 'Perfeccionamiento de técnica y resistencia',
          nivel: 'intermedio' as any,
          tipoClase: 'grupal' as any,
          duracion: 50,
          capacidadMaxima: 5,
          precio: 30,
          instructorId: 'inst-1',
          equipoNecesario: ['tabla', 'pull buoy'],
          fechaHora: new Date('2024-12-20T18:00:00'),
          reservasActuales: 4,
          instructor: {
            id: 'inst-1',
            nombre: 'Carlos Ruiz',
            email: 'carlos@aquareservas.com',
            tipoUsuario: 'instructor',
            fechaRegistro: new Date(),
            especialidades: ['intermedio' as any],
            certificaciones: ['Instructor de Natación'],
            experienciaAnios: 5,
            calificacionPromedio: 4.7,
            horariosDisponibles: []
          }
        }
      },
      {
        id: '2',
        usuarioId: 'user-1',
        claseId: 'clase-2',
        carrilNumero: 5,
        fechaReserva: new Date('2024-12-16'),
        fechaClase: new Date('2024-12-22T09:00:00'),
        estado: EstadoReserva.CONFIRMADA,
        clase: {
          id: 'clase-2',
          titulo: 'Aqua Aeróbicos Matutino',
          descripcion: 'Ejercicio cardiovascular de bajo impacto',
          nivel: 'intermedio' as any,
          tipoClase: 'aqua_aerobicos' as any,
          duracion: 45,
          capacidadMaxima: 8,
          precio: 20,
          instructorId: 'inst-2',
          equipoNecesario: ['aqua weights'],
          fechaHora: new Date('2024-12-22T09:00:00'),
          reservasActuales: 6,
          instructor: {
            id: 'inst-2',
            nombre: 'María González',
            email: 'maria@aquareservas.com',
            tipoUsuario: 'instructor',
            fechaRegistro: new Date(),
            especialidades: ['principiante' as any, 'intermedio' as any],
            certificaciones: ['Aqua Aeróbicos', 'Salvavidas'],
            experienciaAnios: 3,
            calificacionPromedio: 4.8,
            horariosDisponibles: []
          }
        }
      },
      {
        id: '3',
        usuarioId: 'user-1',
        claseId: 'clase-3',
        carrilNumero: 1,
        fechaReserva: new Date('2024-12-10'),
        fechaClase: new Date('2024-12-15T16:00:00'),
        estado: EstadoReserva.COMPLETADA,
        checkIn: new Date('2024-12-15T15:45:00'),
        clase: {
          id: 'clase-3',
          titulo: 'Clase Individual - Técnica',
          descripcion: 'Sesión personalizada de perfeccionamiento',
          nivel: 'intermedio' as any,
          tipoClase: 'individual' as any,
          duracion: 30,
          capacidadMaxima: 1,
          precio: 60,
          instructorId: 'inst-1',
          equipoNecesario: ['material específico'],
          fechaHora: new Date('2024-12-15T16:00:00'),
          reservasActuales: 1
        }
      },
      {
        id: '4',
        usuarioId: 'user-1',
        claseId: 'clase-4',
        carrilNumero: 2,
        fechaReserva: new Date('2024-12-12'),
        fechaClase: new Date('2024-12-18T19:00:00'),
        estado: EstadoReserva.CANCELADA,
        fechaCancelacion: new Date('2024-12-17T10:00:00'),
        motivoCancelacion: 'Conflicto de horario personal',
        clase: {
          id: 'clase-4',
          titulo: 'Entrenamiento Avanzado',
          descripcion: 'Sesión intensiva para nadadores experimentados',
          nivel: 'avanzado' as any,
          tipoClase: 'grupal' as any,
          duracion: 75,
          capacidadMaxima: 4,
          precio: 35,
          instructorId: 'inst-3',
          equipoNecesario: ['palas', 'cronómetro'],
          fechaHora: new Date('2024-12-18T19:00:00'),
          reservasActuales: 3
        }
      }
    ];

    setReservas(mockReservas);
    setIsLoading(false);
  }, []);

  const getEstadoBadge = (estado: EstadoReserva) => {
    switch (estado) {
      case EstadoReserva.CONFIRMADA:
        return <Badge className="bg-green-100 text-green-800">Confirmada</Badge>;
      case EstadoReserva.PENDIENTE:
        return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>;
      case EstadoReserva.CANCELADA:
        return <Badge className="bg-red-100 text-red-800">Cancelada</Badge>;
      case EstadoReserva.COMPLETADA:
        return <Badge className="bg-blue-100 text-blue-800">Completada</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  const getTipoClaseIcon = (tipo: string) => {
    switch (tipo) {
      case 'grupal': return '👥';
      case 'individual': return '👤';
      case 'aqua_aerobicos': return '💃';
      case 'entrenamiento_libre': return '🏃‍♀️';
      default: return '🏊‍♀️';
    }
  };

  const handleCancelReservation = (reserva: Reserva) => {
    const canCancel = ReservationManager.canCancelReservation(reserva);
    if (!canCancel.canCancel) {
      alert(canCancel.reason);
      return;
    }
    setSelectedReserva(reserva);
    setShowCancelModal(true);
  };

  const confirmCancelation = () => {
    if (selectedReserva) {
      // Update reservation status
      const updatedReservas = reservas.map(r => 
        r.id === selectedReserva.id 
          ? { 
              ...r, 
              estado: EstadoReserva.CANCELADA, 
              fechaCancelacion: new Date(),
              motivoCancelacion: cancelReason || 'Sin motivo especificado'
            }
          : r
      );
      setReservas(updatedReservas);
      setShowCancelModal(false);
      setSelectedReserva(null);
      setCancelReason('');
      alert('Reserva cancelada exitosamente');
    }
  };

  const filterReservasByStatus = (status: EstadoReserva) => {
    return reservas.filter(reserva => reserva.estado === status);
  };

  const getUpcomingReservations = () => {
    const now = new Date();
    return reservas.filter(reserva => 
      reserva.estado === EstadoReserva.CONFIRMADA && 
      reserva.fechaClase > now
    ).sort((a, b) => a.fechaClase.getTime() - b.fechaClase.getTime());
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const ReservationCard = ({ reserva }: { reserva: Reserva }) => (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-xl">{getTipoClaseIcon(reserva.clase?.tipoClase || '')}</span>
              {reserva.clase?.titulo}
            </CardTitle>
            <CardDescription className="mt-1">
              {reserva.clase?.descripcion}
            </CardDescription>
          </div>
          {getEstadoBadge(reserva.estado)}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Class Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">📅 Fecha y hora:</span>
            <p className="font-semibold">{formatDateTime(reserva.fechaClase)}</p>
          </div>
          <div>
            <span className="text-gray-600">🏊‍♀️ Carril:</span>
            <p className="font-semibold">Carril {reserva.carrilNumero}</p>
          </div>
          <div>
            <span className="text-gray-600">⏱️ Duración:</span>
            <p className="font-semibold">{reserva.clase?.duracion} minutos</p>
          </div>
          <div>
            <span className="text-gray-600">💰 Precio:</span>
            <p className="font-semibold text-green-600">${reserva.clase?.precio}</p>
          </div>
        </div>

        {/* Instructor */}
        {reserva.clase?.instructor && (
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {reserva.clase.instructor.nombre.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">{reserva.clase.instructor.nombre}</p>
              <p className="text-xs text-gray-600">
                ⭐ {reserva.clase.instructor.calificacionPromedio} • {reserva.clase.instructor.experienciaAnios} años exp.
              </p>
            </div>
          </div>
        )}

        {/* Equipment */}
        {reserva.clase?.equipoNecesario && reserva.clase.equipoNecesario.length > 0 && (
          <div>
            <p className="text-sm text-gray-600 mb-2">Equipo necesario:</p>
            <div className="flex flex-wrap gap-1">
              {reserva.clase.equipoNecesario.map((equipo, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {equipo}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Check-in Info */}
        {reserva.checkIn && (
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-sm text-green-800">
              ✅ Check-in realizado: {reserva.checkIn.toLocaleString('es-ES')}
            </p>
          </div>
        )}

        {/* Cancellation Info */}
        {reserva.estado === EstadoReserva.CANCELADA && (
          <div className="bg-red-50 p-3 rounded-lg">
            <p className="text-sm text-red-800">
              ❌ Cancelada el {reserva.fechaCancelacion?.toLocaleDateString('es-ES')}
            </p>
            {reserva.motivoCancelacion && (
              <p className="text-xs text-red-600 mt-1">
                Motivo: {reserva.motivoCancelacion}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t">
          {reserva.estado === EstadoReserva.CONFIRMADA && (
            <>
              <Button variant="outline" size="sm" className="flex-1">
                Ver Detalles
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleCancelReservation(reserva)}
              >
                Cancelar
              </Button>
            </>
          )}
          {reserva.estado === EstadoReserva.COMPLETADA && (
            <Button variant="outline" size="sm" className="flex-1">
              Reservar Nuevamente
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando tus reservas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Mis Reservas
          </h1>
          <p className="text-xl text-gray-600">
            Gestiona todas tus reservas de clases de natación
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-green-600">
                {getUpcomingReservations().length}
              </CardTitle>
              <CardDescription>Próximas Clases</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-blue-600">
                {filterReservasByStatus(EstadoReserva.COMPLETADA).length}
              </CardTitle>
              <CardDescription>Clases Completadas</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-red-600">
                {filterReservasByStatus(EstadoReserva.CANCELADA).length}
              </CardTitle>
              <CardDescription>Canceladas</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-purple-600">
                ${reservas.filter(r => r.estado === EstadoReserva.COMPLETADA).reduce((sum, r) => sum + (r.clase?.precio || 0), 0)}
              </CardTitle>
              <CardDescription>Total Invertido</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Reservations Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upcoming">Próximas ({getUpcomingReservations().length})</TabsTrigger>
            <TabsTrigger value="completed">Completadas ({filterReservasByStatus(EstadoReserva.COMPLETADA).length})</TabsTrigger>
            <TabsTrigger value="cancelled">Canceladas ({filterReservasByStatus(EstadoReserva.CANCELADA).length})</TabsTrigger>
            <TabsTrigger value="all">Todas ({reservas.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {getUpcomingReservations().length === 0 ? (
              <Card className="text-center p-12">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No tienes clases próximas
                </h3>
                <p className="text-gray-600 mb-4">
                  ¡Reserva una nueva clase para continuar con tu entrenamiento!
                </p>
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                  Explorar Clases
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {getUpcomingReservations().map((reserva) => (
                  <ReservationCard key={reserva.id} reserva={reserva} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filterReservasByStatus(EstadoReserva.COMPLETADA).map((reserva) => (
                <ReservationCard key={reserva.id} reserva={reserva} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filterReservasByStatus(EstadoReserva.CANCELADA).map((reserva) => (
                <ReservationCard key={reserva.id} reserva={reserva} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {reservas.map((reserva) => (
                <ReservationCard key={reserva.id} reserva={reserva} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Cancel Modal */}
        <Dialog open={showCancelModal} onOpenChange={setShowCancelModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancelar Reserva</DialogTitle>
              <DialogDescription>
                ¿Estás seguro que deseas cancelar esta reserva?
              </DialogDescription>
            </DialogHeader>
            
            {selectedReserva && (
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-900">{selectedReserva.clase?.titulo}</h4>
                  <p className="text-red-700 text-sm">
                    {formatDateTime(selectedReserva.fechaClase)} • Carril {selectedReserva.carrilNumero}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Motivo de cancelación (opcional)
                  </label>
                  <textarea
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    placeholder="Ej: Conflicto de horario, enfermedad, etc."
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowCancelModal(false)}
                  >
                    Mantener Reserva
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="flex-1"
                    onClick={confirmCancelation}
                  >
                    Cancelar Reserva
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}