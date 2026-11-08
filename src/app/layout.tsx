import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muro del Taller",
  description: "Next.js + Tailwind + Node + OpenCode + v0 + Supabase",
};

// layout.tsx envuelve TODAS las páginas. Lo que pongas aquí (navbar, footer)
// aparece en cada ruta sin repetir código.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen font-sans antialiased">
        <header className="sticky top-0 z-10 border-b border-borde bg-tinta/80 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="font-mono text-sm font-semibold text-acento">
              ~/muro-del-taller
            </Link>
            <div className="flex gap-4 text-sm text-tenue">
              <Link href="/" className="hover:text-papel">Muro</Link>
              <Link href="/supabase" className="hover:text-papel">Supabase</Link>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
