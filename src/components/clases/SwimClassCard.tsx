"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ClaseNatacion, NIVELES_NATACION_LABELS, TIPOS_CLASE_LABELS } from '@/lib/types';

interface SwimClassCardProps {
  clase: ClaseNatacion;
  onReserve?: (claseId: string) => void;
  showReservationButton?: boolean;
}

export default function SwimClassCard({ clase, onReserve, showReservationButton = true }: SwimClassCardProps) {
  const [isReserving, setIsReserving] = useState(false);

  const handleReserve = async () => {
    if (!onReserve) return;
    
    setIsReserving(true);
    try {
      await onReserve(clase.id);
    } finally {
      setIsReserving(false);
    }
  };

  const getOccupancyPercentage = (): number => {
    return (clase.reservasActuales / clase.capacidadMaxima) * 100;
  };

  const getOccupancyColor = (): string => {
    const percentage = getOccupancyPercentage();
    if (percentage < 50) return 'text-green-600';
    if (percentage < 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getNivelColor = (): string => {
    switch (clase.nivel) {
      case 'principiante':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'intermedio':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'avanzado':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'competitivo':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTipoClaseIcon = (): string => {
    switch (clase.tipoClase) {
      case 'grupal':
        return '👥';
      case 'individual':
        return '👤';
      case 'aqua_aerobicos':
        return '💃';
      case 'entrenamiento_libre':
        return '🏃‍♀️';
      default:
        return '🏊‍♀️';
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isClassFull = (): boolean => {
    return clase.reservasActuales >= clase.capacidadMaxima;
  };

  const spotsRemaining = (): number => {
    return clase.capacidadMaxima - clase.reservasActuales;
  };

  return (
    <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg bg-white overflow-hidden">
      {/* Class Image */}
      {clase.imagenUrl && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={clase.imagenUrl}
            alt={clase.titulo}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <div className="absolute top-4 right-4">
            <Badge className={`${getNivelColor()} border`}>
              {NIVELES_NATACION_LABELS[clase.nivel]}
            </Badge>
          </div>
        </div>
      )}

      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span className="text-2xl">{getTipoClaseIcon()}</span>
              {clase.titulo}
            </CardTitle>
            <CardDescription className="text-gray-600 line-clamp-2">
              {clase.descripcion}
            </CardDescription>
          </div>
        </div>

        {/* Class Details */}
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge variant="secondary" className="text-xs">
            {TIPOS_CLASE_LABELS[clase.tipoClase]}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {clase.duracion} min
          </Badge>
          {clase.carrilAsignado && (
            <Badge variant="outline" className="text-xs">
              Carril {clase.carrilAsignado}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Schedule Information */}
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="text-sm font-semibold text-blue-900 mb-1">
            📅 {formatDate(clase.fechaHora)}
          </div>
          <div className="text-sm text-blue-700">
            🕐 {formatTime(clase.fechaHora)} - {formatTime(new Date(clase.fechaHora.getTime() + clase.duracion * 60000))}
          </div>
        </div>

        {/* Instructor Information */}
        {clase.instructor && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {clase.instructor.nombre.charAt(0)}
              </span>
            </div>
            <div>
              <div className="font-semibold text-gray-900">{clase.instructor.nombre}</div>
              <div className="text-sm text-gray-600">Instructor Certificado</div>
            </div>
          </div>
        )}

        {/* Capacity Information */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Disponibilidad</span>
            <span className={`text-sm font-semibold ${getOccupancyColor()}`}>
              {clase.reservasActuales}/{clase.capacidadMaxima} personas
            </span>
          </div>
          <Progress value={getOccupancyPercentage()} className="h-2" />
          <div className="text-xs text-gray-500 text-center">
            {isClassFull() ? '¡Clase llena!' : `${spotsRemaining()} lugar${spotsRemaining() !== 1 ? 'es' : ''} disponible${spotsRemaining() !== 1 ? 's' : ''}`}
          </div>
        </div>

        {/* Equipment Required */}
        {clase.equipoNecesario.length > 0 && (
          <div>
            <div className="text-sm font-medium text-gray-900 mb-2">Equipo necesario:</div>
            <div className="flex flex-wrap gap-1">
              {clase.equipoNecesario.map((equipo, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-gray-50">
                  {equipo}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Price and Action */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">
                ${clase.precio}
              </div>
              <div className="text-xs text-gray-500">por persona</div>
            </div>
            
            {showReservationButton && (
              <div className="flex-1 ml-4">
                {isClassFull() ? (
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    disabled
                  >
                    Clase Completa
                  </Button>
                ) : (
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                    onClick={handleReserve}
                    disabled={isReserving}
                  >
                    {isReserving ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Reservando...
                      </div>
                    ) : (
                      'Reservar Ahora'
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}