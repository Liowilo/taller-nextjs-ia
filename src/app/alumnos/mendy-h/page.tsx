import Link from "next/link";
import { notFound } from "next/navigation";
import { getAlumno } from "@/lib/alumnos";
import { ComponenteV0 } from "./ComponenteV0";
import { Reacciones } from "./Reacciones";

const USUARIO = "mendy-h";

export default function PaginaAlumno() {
  const alumno = getAlumno(USUARIO);
  if (!alumno) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/" className="font-mono text-sm text-tenue hover:text-acento">
        ← volver al muro
      </Link>

      {/* ───────── MISIÓN 2 · Next.js + Tailwind ─────────
          RETO 2.1  Haz que el encabezado se vea en fila en pantallas medianas:
                    agrega "md:flex-row md:items-center" al div de abajo.
          RETO 2.2  Cambia "rounded-2xl" por "rounded-none" y luego por "rounded-full". ¿Qué pasa?
          RETO 2.3  Agrega un efecto al pasar el mouse a la tarjeta: "hover:scale-[1.02] transition".
      */}
      <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-borde bg-panel p-6 transition hover:scale-[1.02] md:flex-row md:items-center">
        <span className="text-6xl">{alumno.emoji}</span>
        <div>
          <h1 className="text-3xl font-bold" style={{ color: alumno.color }}>
            {alumno.nombre}
          </h1>
          <p className="font-mono text-sm text-tenue">@{alumno.usuario}</p>
        </div>
      </div>

      <p className="mt-6 text-lg text-tenue">“{alumno.frase}”</p>

      {/* RETO 2.4  Crea aquí una sección "Lo que aprendí hoy" con una lista <ul> de 3 cosas.
                    Usa: space-y-2, list-disc, pl-5. */}
      <section className="mt-8 rounded-2xl border border-borde bg-panel p-6">
        <h2 className="mb-3 text-xl font-semibold" style={{ color: alumno.color }}>
          Lo que aprendí hoy
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-tenue">
          <li>Cómo funciona el enrutamiento basado en carpetas en Next.js con App Router.</li>
          <li>Aplicar clases responsivas y efectos hover directamente con Tailwind CSS.</li>
          <li>Conectar datos dinámicos desde un archivo JSON hacia componentes de React.</li>
        </ul>
      </section>

      {/* ───────── MISIÓN 3 · v0 ─────────
          Pega el componente que generaste en v0 dentro de ComponenteV0.tsx (misma carpeta). */}
      <section className="mt-10">
        <ComponenteV0 />
      </section>

      <section className="mt-10" style={{ color: "#c084fc" }}>
        <h2 className="mb-4 text-xl font-semibold">Reacciones</h2>
        <Reacciones />
      </section>

      {/* ───────── MISIÓN 4 · OpenCode + NVIDIA ─────────
          Pídele a OpenCode que cree un componente y lo agregue debajo de este comentario.
          Ejemplo de prompt en el README. */}
    </main>
  );
}