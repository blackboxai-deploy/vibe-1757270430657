"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { poolManager } from '@/lib/poolLogic';
import { Carril, EstadoCarril, ESTADO_CARRIL_COLORS, TIPOS_CLASE_LABELS } from '@/lib/types';

interface PoolViewProps {
  showReservationButton?: boolean;
  onReserveClick?: (carrilId: number) => void;
}

export default function PoolView({ showReservationButton = false, onReserveClick }: PoolViewProps) {
  const [carriles, setCarriles] = useState<Carril[]>([]);
  const [stats, setStats] = useState({
    totalCarriles: 0,
    carrilesEnUso: 0,
    carrilesDisponibles: 0,
    porcentajeOcupacion: 0,
    carrilesMantenimiento: 0
  });

  // Simular datos iniciales y actualizaciones
  useEffect(() => {
    // Cargar datos iniciales
    const carrilsData = poolManager.getCarriles();
    const statsData = poolManager.getOccupancyStats();
    
    setCarriles(carrilsData);
    setStats(statsData);

    // Simular algunas reservas para demo
    // Carril 1: Clase grupal principiante
    poolManager.assignLaneToClass(1, {
      id: '1',
      titulo: 'Natación Principiante',
      descripcion: 'Clase básica de natación',
      nivel: 'principiante' as any,
      tipoClase: 'grupal' as any,
      duracion: 60,
      capacidadMaxima: 6,
      precio: 25,
      instructorId: 'inst-1',
      equipoNecesario: ['tabla', 'pull-buoy'],
      fechaHora: new Date(),
      reservasActuales: 0
    });
    poolManager.addReservationToLane(1, 'res-1');
    poolManager.addReservationToLane(1, 'res-2');
    poolManager.addReservationToLane(1, 'res-3');

    // Carril 3: Clase individual avanzada
    poolManager.assignLaneToClass(3, {
      id: '3',
      titulo: 'Entrenamiento Avanzado',
      descripcion: 'Clase avanzada personalizada',
      nivel: 'avanzado' as any,
      tipoClase: 'individual' as any,
      duracion: 45,
      capacidadMaxima: 2,
      precio: 50,
      instructorId: 'inst-2',
      equipoNecesario: ['cronómetro'],
      fechaHora: new Date(),
      reservasActuales: 0
    });
    poolManager.addReservationToLane(3, 'res-4');

    // Carril 6 en mantenimiento
    poolManager.setLaneForMaintenance(6);

    // Actualizar estado
    const updatedCarriles = poolManager.getCarriles();
    const updatedStats = poolManager.getOccupancyStats();
    
    setCarriles(updatedCarriles);
    setStats(updatedStats);

    // Simular actualizaciones cada 30 segundos
    const interval = setInterval(() => {
      const currentCarriles = poolManager.getCarriles();
      const currentStats = poolManager.getOccupancyStats();
      setCarriles([...currentCarriles]);
      setStats(currentStats);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getEstadoLabel = (estado: EstadoCarril): string => {
    switch (estado) {
      case EstadoCarril.DISPONIBLE:
        return 'Disponible';
      case EstadoCarril.PARCIALMENTE_OCUPADO:
        return 'Ocupado Parcial';
      case EstadoCarril.COMPLETO:
        return 'Completo';
      case EstadoCarril.MANTENIMIENTO:
        return 'Mantenimiento';
      default:
        return 'Desconocido';
    }
  };

  const getOccupancyPercentage = (carril: Carril): number => {
    return (carril.ocupacionActual / carril.capacidadMaxima) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-green-600">
              {stats.carrilesDisponibles}
            </CardTitle>
            <CardDescription>Carriles Disponibles</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-blue-600">
              {stats.carrilesEnUso}
            </CardTitle>
            <CardDescription>Carriles en Uso</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-orange-600">
              {Math.round(stats.porcentajeOcupacion)}%
            </CardTitle>
            <CardDescription>Ocupación Total</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="border-l-4 border-l-gray-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-gray-600">
              {stats.carrilesMantenimiento}
            </CardTitle>
            <CardDescription>En Mantenimiento</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Pool Visual Layout */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
          <CardTitle className="flex items-center justify-between">
            <span>Vista de Piscina en Tiempo Real</span>
            <Badge className="bg-white bg-opacity-20 text-white">
              🔄 Actualización Automática
            </Badge>
          </CardTitle>
          <CardDescription className="text-blue-100">
            Gestión visual de carriles con capacidad y estado en tiempo real
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {carriles.map((carril) => (
              <Card 
                key={carril.id} 
                className={`transition-all duration-300 hover:shadow-lg ${ESTADO_CARRIL_COLORS[carril.estado]} border-2`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Carril {carril.numero}
                    </CardTitle>
                    <Badge className={ESTADO_CARRIL_COLORS[carril.estado]}>
                      {getEstadoLabel(carril.estado)}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Capacity Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Capacidad</span>
                      <span className="font-semibold">
                        {carril.ocupacionActual}/{carril.capacidadMaxima}
                      </span>
                    </div>
                    <Progress 
                      value={getOccupancyPercentage(carril)} 
                      className="h-3"
                    />
                  </div>

                  {/* Class Information */}
                  {carril.tipoClase && (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Tipo de Clase:</span>
                        <Badge variant="secondary">
                          {TIPOS_CLASE_LABELS[carril.tipoClase]}
                        </Badge>
                      </div>
                      
                      {carril.horaInicio && carril.horaFin && (
                        <div className="flex justify-between">
                          <span>Horario:</span>
                          <span className="font-mono">
                            {carril.horaInicio} - {carril.horaFin}
                          </span>
                        </div>
                      )}
                      
                      {carril.instructorAsignado && (
                        <div className="flex justify-between">
                          <span>Instructor:</span>
                          <span>Instructor {carril.instructorAsignado}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  {showReservationButton && carril.estado !== EstadoCarril.MANTENIMIENTO && (
                    <div className="pt-3 border-t">
                      {carril.estado === EstadoCarril.COMPLETO ? (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full" 
                          disabled
                        >
                          Carril Completo
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                          onClick={() => onReserveClick && onReserveClick(carril.numero)}
                        >
                          {carril.ocupacionActual === 0 ? 'Reservar Carril' : 'Unirse a Clase'}
                        </Button>
                      )}
                    </div>
                  )}

                  {/* Maintenance Status */}
                  {carril.estado === EstadoCarril.MANTENIMIENTO && (
                    <div className="pt-3 border-t">
                      <div className="text-center">
                        <div className="text-2xl mb-2">🔧</div>
                        <p className="text-sm text-gray-600">
                          Carril en mantenimiento
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pool Legend */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold mb-3 text-gray-900">Leyenda de Estados:</h4>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-100 border-2 border-green-300"></div>
                <span className="text-sm">Disponible</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-yellow-100 border-2 border-yellow-300"></div>
                <span className="text-sm">Parcialmente Ocupado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-100 border-2 border-red-300"></div>
                <span className="text-sm">Completo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gray-100 border-2 border-gray-300"></div>
                <span className="text-sm">Mantenimiento</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}