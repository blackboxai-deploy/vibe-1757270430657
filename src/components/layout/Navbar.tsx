"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn] = useState(false); // TODO: Replace with actual auth state
  const [userType] = useState<'nadador' | 'instructor' | 'admin'>('nadador'); // TODO: Replace with actual user type

  const navigationItems = [
    { name: 'Inicio', href: '/', public: true },
    { name: 'Clases', href: '/clases', public: false },
    { name: 'Carriles', href: '/carriles', public: false },
    { name: 'Mis Reservas', href: '/reservas', public: false, userTypes: ['nadador'] },
    { name: 'Dashboard', href: '/dashboard', public: false, userTypes: ['nadador'] },
    { name: 'Administración', href: '/admin', public: false, userTypes: ['admin', 'instructor'] },
  ];

  const filteredNavItems = navigationItems.filter(item => 
    item.public || 
    (isLoggedIn && (!item.userTypes || item.userTypes.includes(userType)))
  );

  return (
    <nav className="bg-white shadow-lg border-b border-blue-100 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                <div className="w-6 h-6 border-2 border-white rounded-full relative">
                  <div className="absolute inset-1 bg-white rounded-full opacity-60"></div>
                  <div className="absolute inset-2 bg-white rounded-full opacity-30"></div>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AquaReservas</h1>
                <p className="text-xs text-blue-600">Sistema de Natación</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {filteredNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-3 ml-6">
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">U</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Cerrar Sesión
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link href="/login">
                    <Button variant="outline" size="sm">
                      Iniciar Sesión
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                      Registrarse
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              {/* Hamburger icon */}
              <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close icon */}
              <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-blue-100 shadow-lg`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {filteredNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Mobile Auth Buttons */}
          <div className="pt-4 border-t border-gray-200">
            {isLoggedIn ? (
              <div className="space-y-2">
                <div className="flex items-center px-3 py-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-semibold">U</span>
                  </div>
                  <span className="text-gray-700">Usuario</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mx-3">
                  Cerrar Sesión
                </Button>
              </div>
            ) : (
              <div className="space-y-2 px-3">
                <Link href="/login" className="block">
                  <Button variant="outline" size="sm" className="w-full">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/register" className="block">
                  <Button size="sm" className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                    Registrarse
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}