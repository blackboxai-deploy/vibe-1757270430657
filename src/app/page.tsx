"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  const featuresData = [
    {
      title: "Gestión de Carriles",
      description: "Sistema inteligente de asignación de carriles con control de capacidad en tiempo real",
      icon: "🏊‍♀️"
    },
    {
      title: "Niveles de Natación",
      description: "Clases organizadas por nivel: Principiante, Intermedio, Avanzado y Competitivo",
      icon: "🎯"
    },
    {
      title: "Instructores Especializados",
      description: "Equipo de instructores certificados con especialización en diferentes niveles",
      icon: "👨‍🏫"
    },
    {
      title: "Reservas Inteligentes",
      description: "Sistema automatizado de reservas con confirmación instantánea y lista de espera",
      icon: "📱"
    }
  ];

  const statsData = [
    { label: "Carriles Disponibles", value: "8", description: "Carriles equipados con tecnología moderna" },
    { label: "Capacidad por Carril", value: "6", description: "Personas máximo por sesión" },
    { label: "Instructores", value: "12", description: "Instructores certificados disponibles" },
    { label: "Horarios", value: "6AM-10PM", description: "Horarios de operación diarios" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-cyan-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="bg-white bg-opacity-20 text-white border-white border-opacity-30 mb-4">
              🏊‍♀️ Sistema Profesional de Natación
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            AquaReservas
            <span className="block text-2xl md:text-3xl font-light mt-2 text-blue-100">
              Gestión Inteligente de Clases de Natación
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Sistema completo para la gestión de reservas de clases de natación con control en tiempo real 
            de carriles, capacidad y asignación automática de instructores especializados.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/clases">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 text-lg">
                Ver Clases Disponibles
              </Button>
            </Link>
            <Link href="/register">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3 text-lg"
              >
                Registrarse Ahora
              </Button>
            </Link>
          </div>

          {/* Hero Image Placeholder */}
          <div className="mt-12 relative">
            <img 
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ad93fd77-720c-40bc-b1f6-3ddcc3738c13.png" 
              alt="Piscina moderna con 8 carriles profesionales iluminada naturalmente"
              className="rounded-xl shadow-2xl mx-auto max-w-full h-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
              <Card key={index} className="text-center border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="text-3xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </CardTitle>
                  <CardDescription className="text-lg font-semibold text-gray-900">
                    {stat.label}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Características del Sistema
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tecnología avanzada para una experiencia de natación optimizada y gestión eficiente de recursos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuresData.map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg bg-white">
                <CardHeader className="text-center pb-4">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pool Layout Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Instalaciones de Primera Clase
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Piscina profesional de 8 carriles con sistema de gestión inteligente y equipamiento moderno
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-8 gap-2 max-w-4xl mx-auto">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="text-center">
                  <div className="bg-blue-500 bg-opacity-20 rounded-lg p-4 mb-2 border-2 border-blue-300 border-dashed">
                    <div className="text-blue-700 font-bold text-lg mb-2">
                      Carril {i + 1}
                    </div>
                    <div className="space-y-1">
                      <div className="w-full h-2 bg-blue-300 rounded"></div>
                      <div className="w-full h-2 bg-blue-300 rounded"></div>
                      <div className="w-full h-2 bg-blue-300 rounded"></div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Cap. 6
                  </Badge>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Badge className="bg-blue-500">
                🏊‍♀️ Vista en Tiempo Real de Carriles Disponible en el Dashboard
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            ¿Listo para Empezar tu Entrenamiento?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Únete a nuestra comunidad de nadadores y accede al sistema más avanzado de reservas de clases de natación.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 text-lg">
                Crear Cuenta Gratuita
              </Button>
            </Link>
            <Link href="/clases">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3 text-lg"
              >
                Explorar Clases
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}