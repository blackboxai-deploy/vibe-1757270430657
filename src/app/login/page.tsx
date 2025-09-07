"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<'nadador' | 'instructor' | 'admin'>('nadador');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login API call
    setTimeout(() => {
      alert(`Iniciando sesión como ${userType}: ${formData.email}`);
      setIsLoading(false);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const demoCredentials = [
    { type: 'nadador', email: 'nadador@demo.com', password: 'demo123' },
    { type: 'instructor', email: 'instructor@demo.com', password: 'demo123' },
    { type: 'admin', email: 'admin@demo.com', password: 'demo123' }
  ];

  const fillDemoCredentials = (type: string) => {
    const demo = demoCredentials.find(d => d.type === type);
    if (demo) {
      setFormData({
        email: demo.email,
        password: demo.password
      });
      setUserType(type as 'nadador' | 'instructor' | 'admin');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-white rounded-full relative">
              <div className="absolute inset-1 bg-white rounded-full opacity-60"></div>
              <div className="absolute inset-2 bg-white rounded-full opacity-30"></div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Iniciar Sesión
          </h2>
          <p className="text-gray-600">
            Accede a tu cuenta de AquaReservas
          </p>
        </div>

        {/* Login Form */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl text-center">Bienvenido de vuelta</CardTitle>
            <CardDescription className="text-center">
              Ingresa tus credenciales para continuar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Type Selection */}
              <div className="space-y-3">
                <Label>Tipo de Usuario</Label>
                <div className="flex gap-2">
                  {[
                    { value: 'nadador', label: 'Nadador', icon: '🏊‍♀️' },
                    { value: 'instructor', label: 'Instructor', icon: '👨‍🏫' },
                    { value: 'admin', label: 'Admin', icon: '⚙️' }
                  ].map(({ value, label, icon }) => (
                    <Badge
                      key={value}
                      variant={userType === value ? 'default' : 'outline'}
                      className={`cursor-pointer px-3 py-2 transition-all ${
                        userType === value 
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                          : 'hover:bg-blue-50'
                      }`}
                      onClick={() => setUserType(value as any)}
                    >
                      {icon} {label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
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

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="h-12"
                />
              </div>

              {/* Remember me and Forgot password */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="text-gray-700">
                    Recordarme
                  </label>
                </div>
                <Link href="/forgot-password" className="text-blue-600 hover:text-blue-500">
                  ¿Olvidaste tu contraseña?
                </Link>
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
                    Iniciando sesión...
                  </div>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center mb-3">
                Credenciales de prueba:
              </p>
              <div className="flex flex-col gap-2">
                {demoCredentials.map((demo) => (
                  <Button
                    key={demo.type}
                    variant="outline"
                    size="sm"
                    onClick={() => fillDemoCredentials(demo.type)}
                    className="text-xs"
                  >
                    {demo.type === 'nadador' ? '🏊‍♀️' : demo.type === 'instructor' ? '👨‍🏫' : '⚙️'} 
                    {' '}{demo.email} / {demo.password}
                  </Button>
                ))}
              </div>
            </div>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                ¿No tienes una cuenta?{' '}
                <Link href="/register" className="text-blue-600 hover:text-blue-500 font-semibold">
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-6">
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Reservas en tiempo real
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              Gestión de carriles
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              Instructores certificados
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}