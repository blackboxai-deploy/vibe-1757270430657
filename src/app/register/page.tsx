"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { NivelNatacion, NIVELES_NATACION_LABELS } from '@/lib/types';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    nivelNatacion: '' as NivelNatacion | '',
    objetivos: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<'nadador' | 'instructor'>('nadador');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    // Simulate registration API call
    setTimeout(() => {
      alert(`¡Registro exitoso! Bienvenido ${formData.nombre}`);
      setIsLoading(false);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNivelChange = (value: string) => {
    setFormData({
      ...formData,
      nivelNatacion: value as NivelNatacion
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-white rounded-full relative">
              <div className="absolute inset-1 bg-white rounded-full opacity-60"></div>
              <div className="absolute inset-2 bg-white rounded-full opacity-30"></div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Crear Cuenta
          </h2>
          <p className="text-gray-600">
            Únete a la comunidad de natación de AquaReservas
          </p>
        </div>

        {/* Registration Form */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl text-center">Información Personal</CardTitle>
            <CardDescription className="text-center">
              Completa tus datos para comenzar tu experiencia acuática
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Type Selection */}
              <div className="space-y-3">
                <Label>Tipo de Cuenta</Label>
                <div className="flex gap-2">
                  {[
                    { value: 'nadador', label: 'Nadador/Cliente', icon: '🏊‍♀️', desc: 'Quiero tomar clases de natación' },
                    { value: 'instructor', label: 'Instructor', icon: '👨‍🏫', desc: 'Quiero enseñar natación' }
                  ].map(({ value, label, icon, desc }) => (
                    <div
                      key={value}
                      className={`flex-1 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        userType === value 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setUserType(value as any)}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{icon}</span>
                        <span className="font-semibold">{label}</span>
                      </div>
                      <p className="text-sm text-gray-600">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre Completo *</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    type="text"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre completo"
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="+54 11 1234-5678"
                    className="h-12"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                  className="h-12"
                />
              </div>

              {/* Swimming Level - Only for nadadores */}
              {userType === 'nadador' && (
                <div className="space-y-2">
                  <Label htmlFor="nivelNatacion">Nivel de Natación *</Label>
                  <Select value={formData.nivelNatacion} onValueChange={handleNivelChange}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Selecciona tu nivel actual" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(NIVELES_NATACION_LABELS).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <span>
                              {key === 'principiante' ? '🟢' : 
                               key === 'intermedio' ? '🟡' : 
                               key === 'avanzado' ? '🟠' : '🔴'}
                            </span>
                            {label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">
                    No te preocupes, puedes cambiar tu nivel más tarde
                  </p>
                </div>
              )}

              {/* Passwords */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña *</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Mínimo 6 caracteres"
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Contraseña *</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repite tu contraseña"
                    required
                    className="h-12"
                  />
                </div>
              </div>

              {/* Objectives - Only for nadadores */}
              {userType === 'nadador' && (
                <div className="space-y-2">
                  <Label htmlFor="objetivos">Objetivos (Opcional)</Label>
                  <textarea
                    id="objetivos"
                    name="objetivos"
                    value={formData.objetivos}
                    onChange={handleChange}
                    placeholder="Ej: Mejorar técnica de crol, prepararse para competencia, ejercicio recreativo..."
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  Acepto los{' '}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                    términos y condiciones
                  </Link>{' '}
                  y la{' '}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                    política de privacidad
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creando cuenta...
                  </div>
                ) : (
                  'Crear Cuenta'
                )}
              </Button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                ¿Ya tienes una cuenta?{' '}
                <Link href="/login" className="text-blue-600 hover:text-blue-500 font-semibold">
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center p-4 border-0 bg-white shadow-lg">
            <div className="text-3xl mb-2">🏊‍♀️</div>
            <h3 className="font-semibold text-gray-900 mb-1">Clases Profesionales</h3>
            <p className="text-sm text-gray-600">Instructores certificados y métodos probados</p>
          </Card>
          
          <Card className="text-center p-4 border-0 bg-white shadow-lg">
            <div className="text-3xl mb-2">📱</div>
            <h3 className="font-semibold text-gray-900 mb-1">Reservas Fáciles</h3>
            <p className="text-sm text-gray-600">Sistema inteligente de gestión de horarios</p>
          </Card>
          
          <Card className="text-center p-4 border-0 bg-white shadow-lg">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold text-gray-900 mb-1">Progreso Personalizado</h3>
            <p className="text-sm text-gray-600">Seguimiento de objetivos y mejora continua</p>
          </Card>
        </div>
      </div>
    </div>
  );
}