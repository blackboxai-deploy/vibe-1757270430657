"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PoolView from '@/components/piscina/PoolView';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function CarrilesPage() {
  const [selectedCarril, setSelectedCarril] = useState<number | null>(null);
  const [showReservationModal, setShowReservationModal] = useState(false);

  const handleReserveClick = (carrilId: number) => {
    setSelectedCarril(carrilId);
    setShowReservationModal(true);
  };

  const handleReservation = () => {
    // TODO: Implement actual reservation logic
    console.log(`Reservando carril ${selectedCarril}`);
    setShowReservationModal(false);
    setSelectedCarril(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Gestión de Carriles
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Vista en tiempo real de la disponibilidad de carriles, capacidad y clases en progreso
          </p>
          
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Badge className="bg-blue-500 text-white px-4 py-2">
              🏊‍♀️ 8 Carriles Profesionales
            </Badge>
            <Badge className="bg-green-500 text-white px-4 py-2">
              ⚡ Actualización en Tiempo Real
            </Badge>
            <Badge className="bg-purple-500 text-white px-4 py-2">
              👥 Capacidad Total: 48 personas
            </Badge>
          </div>
        </div>

        {/* Pool Management Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Sistema Inteligente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Asignación automática de carriles basada en el tipo de clase, nivel de natación y disponibilidad en tiempo real.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">⏰</span>
                Gestión de Horarios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Control preciso de horarios de clases, tiempos de mantenimiento y optimización de uso de instalaciones.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Análisis de Capacidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Monitoreo continuo de la ocupación por carril con alertas de capacidad y sugerencias de redistribución.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Pool View Component */}
        <PoolView 
          showReservationButton={true}
          onReserveClick={handleReserveClick}
        />

        {/* Usage Guidelines */}
        <Card className="mt-8 bg-white shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <CardTitle>Guía de Uso de Carriles</CardTitle>
            <CardDescription className="text-blue-100">
              Información importante para la reserva y uso de carriles
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-blue-500">📋</span>
                  Políticas de Reserva
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    Reservas con mínimo 1 hora de anticipación
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    Cancelación gratuita hasta 2 horas antes
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    Máximo 6 personas por carril en clases grupales
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    Check-in requerido 15 minutos antes de la clase
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-purple-500">🏊‍♀️</span>
                  Tipos de Clase por Carril
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <strong>Carriles 1-2:</strong> Clases principiantes
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <strong>Carriles 3-5:</strong> Nivel intermedio y avanzado
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <strong>Carriles 6-7:</strong> Entrenamiento competitivo
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <strong>Carril 8:</strong> Clases individuales y terapéuticas
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                  Ver Clases Disponibles
                </Button>
                <Button variant="outline">
                  Consultar Horarios de Instructores
                </Button>
                <Button variant="outline">
                  Reportar Problema de Carril
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reservation Modal */}
        <Dialog open={showReservationModal} onOpenChange={setShowReservationModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Reservar Carril {selectedCarril}</DialogTitle>
              <DialogDescription>
                Confirma tu reserva para el carril seleccionado
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {selectedCarril}
                </div>
                <p className="text-gray-600">
                  ¿Deseas reservar el Carril {selectedCarril}?
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowReservationModal(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                  onClick={handleReservation}
                >
                  Confirmar Reserva
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}