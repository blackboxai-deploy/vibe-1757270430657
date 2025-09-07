import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AquaReservas - Sistema de Reservas de Natación",
  description: "Sistema completo de gestión y reservas para clases de natación con control de carriles y capacidad en tiempo real.",
  keywords: "natación, reservas, clases, piscina, carriles, instructores, aqua aeróbicos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}