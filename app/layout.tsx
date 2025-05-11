import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Explorador de Modelos 3D Educativos",
  description: "Aplicación educativa para explorar modelos 3D con realidad aumentada",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <nav className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <a href="/" className="text-xl font-bold text-indigo-600">
              ModelAR
            </a>
            <div className="flex space-x-4">
              <Link href="/" className="text-gray-600 hover:text-indigo-600">
                Inicio
              </Link>
              <Link href="/admin/models" className="text-gray-600 hover:text-indigo-600">
                Administración
              </Link>
              <Link href="#" className="text-gray-600 hover:text-indigo-600">
                Acerca de
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}



import './globals.css'