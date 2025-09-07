"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import PoolView from '@/components/piscina/PoolView';

import { ClaseNatacion, Reserva, EstadisticasPiscina } from '@/lib/types';

export default function DashboardPage() {
  const [reservasUsuario, setReservasUsuario] = useState<Reserva[]>([]);
  const [clasesRecomendadas, setClasesRecomendadas] = useState<ClaseNatacion[]>([]);
  const [estadisticas, setEstadisticas] = useState<EstadisticasPiscina>({
    totalReservas: 0,
    ocupacionPromedio: 0,
    ingresosTotales: 0,
    clasesCompletadas: 0,
    carrilesEnUso: 0,
    usuariosDiarios: 0,
    nivelMasPopular: 'principiante' as any,
    horariosPopulares: []
  });

  const [usuario] = useState({
    nombre: 'Usuario Demo',
    nivel: 'intermedio',
    reservasEstesMes: 8,
    objetivo: 'Mejorar técnica de crol'
  });

  useEffect(() => {
    // Simular carga de datos del usuario
    const mockReservas: Reserva[] = [
      {
        id: '1',
        usuarioId: 'user-1',
        claseId: 'clase-1',
        carrilNumero: 3,
        fechaReserva: new Date(),
        fechaClase: new Date(2024, 11, 20, 18, 0),
        estado: 'confirmada' as any,
        clase: {
          id: 'clase-1',
          titulo: 'Natación Intermedia',
          descripcion: 'Perfeccionamiento de técnica',
          nivel: 'intermedio' as any,
          tipoClase: 'grupal' as any,
          duracion: 50,
          capacidadMaxima: 5,
          precio: 30,
          instructorId: 'inst-1',
          equipoNecesario: ['tabla'],
          fechaHora: new Date(2024, 11, 20, 18, 0),
          reservasActuales: 3
        }
      },
      {
        id: '2',
        usuarioId: 'user-1',
        claseId: 'clase-2',
        carrilNumero: 5,
        fechaReserva: new Date(),
        fechaClase: new Date(2024, 11, 22, 9, 0),
        estado: 'confirmada' as any,
        clase: {
          id: 'clase-2',
          titulo: 'Aqua Aeróbicos',
          descripcion: 'Ejercicio cardiovascular en agua',
          nivel: 'intermedio' as any,
          tipoClase: 'aqua_aerobicos' as any,
          duracion: 45,
          capacidadMaxima: 8,
          precio: 20,
          instructorId: 'inst-2',
          equipoNecesario: ['aqua weights'],
          fechaHora: new Date(2024, 11, 22, 9, 0),
          reservasActuales: 4
        }
      }
    ];

    const mockClasesRecomendadas: ClaseNatacion[] = [
      {
        id: '3',
        titulo: 'Técnica de Crol Avanzado',
        descripcion: 'Perfecciona tu técnica de crol con ejercicios específicos',
        nivel: 'avanzado' as any,
        tipoClase: 'grupal' as any,
        duracion: 60,
        capacidadMaxima: 4,
        precio: 35,
        instructorId: 'inst-3',
        equipoNecesario: ['palas', 'pull buoy'],
        fechaHora: new Date(2024, 11, 21, 19, 0),
        reservasActuales: 1,
        imagenUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5bb07085-102f-4fc0-8ed8-48255f949c8a.png'
      }
    ];

    setReservasUsuario(mockReservas);
    setClasesRecomendadas(mockClasesRecomendadas);
    
    // Mock statistics
    setEstadisticas({
      totalReservas: 156,
      ocupacionPromedio: 75,
      ingresosTotales: 4850,
      clasesCompletadas: 142,
      carrilesEnUso: 6,
      usuariosDiarios: 32,
      nivelMasPopular: 'intermedio' as any,
      horariosPopulares: ['18:00', '09:00', '19:30']
    });
  }, []);

  const getProximaClase = () => {
    const ahora = new Date();
    const proximasReservas = reservasUsuario
      .filter(reserva => reserva.fechaClase > ahora && reserva.estado === 'confirmada')
      .sort((a, b) => a.fechaClase.getTime() - b.fechaClase.getTime());
    
    return proximasReservas[0] || null;
  };

  const handleReserveRecommended = (claseId: string) => {
    alert(`Reservando clase recomendada: ${claseId}`);
  };

  const proximaClase = getProximaClase();
  const tiempoHastaProximaClase = proximaClase 
    ? Math.max(0, proximaClase.fechaClase.getTime() - Date.now())
    : 0;
  const horasHastaClase = Math.floor(tiempoHastaProximaClase / (1000 * 60 * 60));
  const minutosHastaClase = Math.floor((tiempoHastaProximaClase % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                ¡Hola, {usuario.nombre}! 👋
              </h1>
              <p className="text-xl text-gray-600 mt-2">
                Bienvenido a tu dashboard de natación
              </p>
            </div>
            <div className="text-right">
              <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 text-lg">
                Nivel {usuario.nivel}
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-blue-600">
                {usuario.reservasEstesMes}
              </CardTitle>
              <CardDescription>Clases este mes</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-green-600">
                {reservasUsuario.length}
              </CardTitle>
              <CardDescription>Reservas activas</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-purple-600">
                {estadisticas.ocupacionPromedio}%
              </CardTitle>
              <CardDescription>Ocupación piscina</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-orange-600">
                {estadisticas.carrilesEnUso}/8
              </CardTitle>
              <CardDescription>Carriles en uso</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Next Class */}
            {proximaClase && (
              <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">⏰</span>
                    Tu Próxima Clase
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    Prepárate para tu siguiente sesión de natación
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold">{proximaClase.clase?.titulo}</h3>
                      <p className="text-blue-100">{proximaClase.clase?.descripcion}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-blue-200">📅 Fecha:</span>
                        <p className="font-semibold">
                          {proximaClase.fechaClase.toLocaleDateString('es-ES', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div>
                        <span className="text-blue-200">🕐 Hora:</span>
                        <p className="font-semibold">
                          {proximaClase.fechaClase.toLocaleTimeString('es-ES', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div>
                        <span className="text-blue-200">🏊‍♀️ Carril:</span>
                        <p className="font-semibold">Carril {proximaClase.carrilNumero}</p>
                      </div>
                      <div>
                        <span className="text-blue-200">⏱️ Duración:</span>
                        <p className="font-semibold">{proximaClase.clase?.duracion} min</p>
                      </div>
                    </div>
                    
                    {horasHastaClase < 24 && (
                      <div className="bg-white bg-opacity-20 rounded-lg p-3">
                        <div className="text-center">
                          <p className="text-blue-100">Tiempo restante:</p>
                          <p className="text-2xl font-bold">
                            {horasHastaClase}h {minutosHastaClase}m
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-3">
                      <Button className="bg-white text-blue-600 hover:bg-blue-50">
                        Ver Detalles
                      </Button>
                      <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                        Modificar Reserva
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Pool Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🏊‍♀️</span>
                  Estado Actual de la Piscina
                </CardTitle>
                <CardDescription>
                  Vista en tiempo real de la disponibilidad de carriles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PoolView showReservationButton={false} />
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* User Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  Tu Progreso
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Objetivo del mes</span>
                    <span className="font-semibold">8/10 clases</span>
                  </div>
                  <Progress value={80} className="h-3" />
                  <p className="text-xs text-gray-500 mt-1">¡Vas muy bien! Solo 2 clases más</p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-3">
                  <h4 className="font-semibold text-blue-900 mb-1">Meta Actual:</h4>
                  <p className="text-blue-700 text-sm">{usuario.objetivo}</p>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                  Actualizar Objetivos
                </Button>
              </CardContent>
            </Card>

            {/* My Reservations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="text-2xl">📅</span>
                    Mis Reservas
                  </span>
                  <Button variant="outline" size="sm">
                    Ver todas
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reservasUsuario.slice(0, 3).map((reserva) => (
                    <div key={reserva.id} className="border rounded-lg p-3 bg-white">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sm">{reserva.clase?.titulo}</h4>
                        <Badge 
                          className={
                            reserva.estado === 'confirmada' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }
                        >
                          {reserva.estado}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">
                        Carril {reserva.carrilNumero} • {reserva.fechaClase.toLocaleDateString('es-ES')}
                      </p>
                      <p className="text-xs text-gray-500">
                        {reserva.fechaClase.toLocaleTimeString('es-ES', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommended Classes */}
            {clasesRecomendadas.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">💡</span>
                    Recomendado para Ti
                  </CardTitle>
                  <CardDescription>
                    Clases sugeridas basadas en tu nivel y objetivos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clasesRecomendadas.map((clase) => (
                      <div key={clase.id} className="border rounded-lg p-3 bg-white">
                        <h4 className="font-semibold text-sm mb-1">{clase.titulo}</h4>
                        <p className="text-xs text-gray-600 mb-2">{clase.descripcion}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-bold text-green-600">${clase.precio}</span>
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                            onClick={() => handleReserveRecommended(clase.id)}
                          >
                            Reservar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}