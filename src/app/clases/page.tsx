"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SwimClassCard from '@/components/clases/SwimClassCard';
import { ClaseNatacion, NivelNatacion, TipoClase, NIVELES_NATACION_LABELS, TIPOS_CLASE_LABELS } from '@/lib/types';

export default function ClasesPage() {
  const [clases, setClases] = useState<ClaseNatacion[]>([]);
  const [filteredClases, setFilteredClases] = useState<ClaseNatacion[]>([]);
  const [nivelFilter, setNivelFilter] = useState<string>('all');
  const [tipoFilter, setTipoFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Simulated class data
  useEffect(() => {
    const mockClases: ClaseNatacion[] = [
      {
        id: '1',
        titulo: 'Natación para Principiantes',
        descripcion: 'Clase ideal para quienes se inician en la natación. Aprenderás técnicas básicas de flotación, respiración y movimientos fundamentales.',
        nivel: NivelNatacion.PRINCIPIANTE,
        tipoClase: TipoClase.GRUPAL,
        duracion: 60,
        capacidadMaxima: 6,
        precio: 25,
        instructorId: 'inst-1',
        equipoNecesario: ['tabla de natación', 'pull buoy'],
        fechaHora: new Date(2024, 11, 20, 9, 0),
        carrilAsignado: 1,
        reservasActuales: 3,
        imagenUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8c3110e1-b3bb-4031-bd39-e612aa49730d.png',
        instructor: {
          id: 'inst-1',
          nombre: 'María González',
          email: 'maria@aquareservas.com',
          tipoUsuario: 'instructor',
          fechaRegistro: new Date(),
          especialidades: [NivelNatacion.PRINCIPIANTE, NivelNatacion.INTERMEDIO],
          certificaciones: ['Salvavidas', 'Instructor de Natación'],
          experienciaAnios: 5,
          calificacionPromedio: 4.8,
          horariosDisponibles: []
        }
      },
      {
        id: '2',
        titulo: 'Aqua Aeróbicos Matutino',
        descripcion: 'Ejercicios cardiovasculares de bajo impacto en el agua. Perfecto para tonificar músculos y mejorar la resistencia.',
        nivel: NivelNatacion.INTERMEDIO,
        tipoClase: TipoClase.AQUA_AEROBICOS,
        duracion: 45,
        capacidadMaxima: 8,
        precio: 20,
        instructorId: 'inst-2',
        equipoNecesario: ['aqua weights', 'pool noodles'],
        fechaHora: new Date(2024, 11, 20, 10, 30),
        carrilAsignado: 3,
        reservasActuales: 5,
        imagenUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4eb3294c-7d43-4cf8-9161-6ed411902dc5.png',
        instructor: {
          id: 'inst-2',
          nombre: 'Carlos Ruiz',
          email: 'carlos@aquareservas.com',
          tipoUsuario: 'instructor',
          fechaRegistro: new Date(),
          especialidades: [NivelNatacion.INTERMEDIO],
          certificaciones: ['Instructor de Aqua Aeróbicos', 'Personal Trainer'],
          experienciaAnios: 3,
          calificacionPromedio: 4.6,
          horariosDisponibles: []
        }
      },
      {
        id: '3',
        titulo: 'Entrenamiento Avanzado',
        descripcion: 'Sesión intensiva para nadadores experimentados. Trabajo de técnica avanzada, resistencia y velocidad.',
        nivel: NivelNatacion.AVANZADO,
        tipoClase: TipoClase.GRUPAL,
        duracion: 75,
        capacidadMaxima: 4,
        precio: 35,
        instructorId: 'inst-3',
        equipoNecesario: ['cronómetro', 'palas de natación', 'aletas'],
        fechaHora: new Date(2024, 11, 20, 18, 0),
        carrilAsignado: 5,
        reservasActuales: 2,
        imagenUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b866acbb-70f7-45d6-8fa5-7d05c877b54c.png',
        instructor: {
          id: 'inst-3',
          nombre: 'Ana Patricia López',
          email: 'ana@aquareservas.com',
          tipoUsuario: 'instructor',
          fechaRegistro: new Date(),
          especialidades: [NivelNatacion.AVANZADO, NivelNatacion.COMPETITIVO],
          certificaciones: ['Ex-nadadora profesional', 'Coach de competición'],
          experienciaAnios: 12,
          calificacionPromedio: 4.9,
          horariosDisponibles: []
        }
      },
      {
        id: '4',
        titulo: 'Clase Individual - Técnica Personal',
        descripcion: 'Sesión personalizada uno a uno para perfeccionar técnicas específicas y corregir errores de estilo.',
        nivel: NivelNatacion.INTERMEDIO,
        tipoClase: TipoClase.INDIVIDUAL,
        duracion: 30,
        capacidadMaxima: 1,
        precio: 60,
        instructorId: 'inst-1',
        equipoNecesario: ['material según necesidades específicas'],
        fechaHora: new Date(2024, 11, 20, 16, 0),
        carrilAsignado: 8,
        reservasActuales: 0,
        imagenUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3999eb85-00fd-48fb-9c06-e6c8030e3783.png',
        instructor: {
          id: 'inst-1',
          nombre: 'María González',
          email: 'maria@aquareservas.com',
          tipoUsuario: 'instructor',
          fechaRegistro: new Date(),
          especialidades: [NivelNatacion.PRINCIPIANTE, NivelNatacion.INTERMEDIO],
          certificaciones: ['Salvavidas', 'Instructor de Natación'],
          experienciaAnios: 5,
          calificacionPromedio: 4.8,
          horariosDisponibles: []
        }
      },
      {
        id: '5',
        titulo: 'Preparación Competitiva',
        descripcion: 'Entrenamiento intensivo para competidores. Técnicas avanzadas, estrategias de carrera y acondicionamiento físico.',
        nivel: NivelNatacion.COMPETITIVO,
        tipoClase: TipoClase.ENTRENAMIENTO_LIBRE,
        duracion: 90,
        capacidadMaxima: 3,
        precio: 45,
        instructorId: 'inst-3',
        equipoNecesario: ['cronómetro profesional', 'palas de competición', 'snorkel frontal'],
        fechaHora: new Date(2024, 11, 20, 19, 30),
        carrilAsignado: 7,
        reservasActuales: 3,
        imagenUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ae1e55f8-d85b-43d0-83cd-6246d2b885fc.png',
        instructor: {
          id: 'inst-3',
          nombre: 'Ana Patricia López',
          email: 'ana@aquareservas.com',
          tipoUsuario: 'instructor',
          fechaRegistro: new Date(),
          especialidades: [NivelNatacion.AVANZADO, NivelNatacion.COMPETITIVO],
          certificaciones: ['Ex-nadadora profesional', 'Coach de competición'],
          experienciaAnios: 12,
          calificacionPromedio: 4.9,
          horariosDisponibles: []
        }
      },
      {
        id: '6',
        titulo: 'Natación Intermedia - Perfeccionamiento',
        descripcion: 'Para nadadores con conocimientos básicos que buscan mejorar técnica y resistencia.',
        nivel: NivelNatacion.INTERMEDIO,
        tipoClase: TipoClase.GRUPAL,
        duracion: 50,
        capacidadMaxima: 5,
        precio: 30,
        instructorId: 'inst-2',
        equipoNecesario: ['tabla de natación', 'pull buoy', 'aletas cortas'],
        fechaHora: new Date(2024, 11, 20, 15, 30),
        carrilAsignado: 4,
        reservasActuales: 4,
        imagenUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/dea3555f-5ad6-43e2-9885-1c164f8df409.png',
        instructor: {
          id: 'inst-2',
          nombre: 'Carlos Ruiz',
          email: 'carlos@aquareservas.com',
          tipoUsuario: 'instructor',
          fechaRegistro: new Date(),
          especialidades: [NivelNatacion.INTERMEDIO],
          certificaciones: ['Instructor de Aqua Aeróbicos', 'Personal Trainer'],
          experienciaAnios: 3,
          calificacionPromedio: 4.6,
          horariosDisponibles: []
        }
      }
    ];

    setClases(mockClases);
    setFilteredClases(mockClases);
    setLoading(false);
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = clases;

    if (nivelFilter !== 'all') {
      filtered = filtered.filter(clase => clase.nivel === nivelFilter);
    }

    if (tipoFilter !== 'all') {
      filtered = filtered.filter(clase => clase.tipoClase === tipoFilter);
    }

    setFilteredClases(filtered);
  }, [clases, nivelFilter, tipoFilter]);

  const handleReserve = async (claseId: string) => {
    // TODO: Implement actual reservation logic
    console.log(`Reserving class ${claseId}`);
    alert(`Reserva confirmada para la clase ${claseId}`);
  };

  const clearFilters = () => {
    setNivelFilter('all');
    setTipoFilter('all');
  };

  const getFilterCount = () => {
    let count = 0;
    if (nivelFilter !== 'all') count++;
    if (tipoFilter !== 'all') count++;
    return count;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando clases disponibles...</p>
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
            Clases de Natación Disponibles
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre nuestras clases organizadas por niveles con instructores certificados y equipamiento profesional
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Filtros de Búsqueda</span>
              {getFilterCount() > 0 && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {getFilterCount()} filtro{getFilterCount() !== 1 ? 's' : ''} activo{getFilterCount() !== 1 ? 's' : ''}
                  </Badge>
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    Limpiar
                  </Button>
                </div>
              )}
            </CardTitle>
            <CardDescription>
              Filtra las clases según tu nivel y preferencias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nivel de Natación
                </label>
                <Select value={nivelFilter} onValueChange={setNivelFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los niveles</SelectItem>
                    {Object.entries(NIVELES_NATACION_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Clase
                </label>
                <Select value={tipoFilter} onValueChange={setTipoFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    {Object.entries(TIPOS_CLASE_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {filteredClases.length} clase{filteredClases.length !== 1 ? 's' : ''} encontrada{filteredClases.length !== 1 ? 's' : ''}
            </h3>
            <p className="text-gray-600">
              Clases disponibles para hoy y los próximos días
            </p>
          </div>
          
          <div className="flex gap-2">
            <Badge className="bg-green-500 text-white">
              🏊‍♀️ Instructores Certificados
            </Badge>
            <Badge className="bg-blue-500 text-white">
              ⚡ Reserva Instantánea
            </Badge>
          </div>
        </div>

        {/* Classes Grid */}
        {filteredClases.length === 0 ? (
          <Card className="text-center p-12">
            <div className="text-6xl mb-4">🏊‍♀️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No se encontraron clases
            </h3>
            <p className="text-gray-600 mb-4">
              No hay clases disponibles con los filtros seleccionados.
            </p>
            <Button onClick={clearFilters}>
              Ver todas las clases
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClases.map((clase) => (
              <SwimClassCard
                key={clase.id}
                clase={clase}
                onReserve={handleReserve}
                showReservationButton={true}
              />
            ))}
          </div>
        )}

        {/* Additional Information */}
        <Card className="mt-12 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
          <CardHeader>
            <CardTitle>¿Nuevo en la Natación?</CardTitle>
            <CardDescription className="text-blue-100">
              Te ayudamos a elegir la clase perfecta para ti
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">🏊‍♀️ Para Principiantes:</h4>
                <ul className="space-y-1 text-blue-100">
                  <li>• Clases grupales de 6 personas máximo</li>
                  <li>• Enfoque en técnicas básicas y seguridad</li>
                  <li>• Instructores especializados en iniciación</li>
                  <li>• Equipamiento incluido</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🎯 Para Avanzados:</h4>
                <ul className="space-y-1 text-blue-100">
                  <li>• Entrenamientos intensivos y técnicos</li>
                  <li>• Preparación para competencias</li>
                  <li>• Análisis de rendimiento personalizado</li>
                  <li>• Grupos reducidos para mayor atención</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}