import Link from "next/link";
import { notFound } from "next/navigation";
import { getAlumno } from "@/lib/alumnos";
import { ComponenteV0 } from "./ComponenteV0";
import { Reacciones } from "./Reacciones";

const USUARIO = "323066459-beep";

export default function PaginaAlumno() {
  const alumno = getAlumno(USUARIO);
  if (!alumno) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/" className="font-mono text-sm text-tenue hover:text-acento">
        ← volver al muro
      </Link>

      {/* ───────── MISIÓN 2 · Next.js + Tailwind ─────────
          RETO 2.1, 2.2 y 2.3 aplicados en el div de abajo. */}
      <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-borde bg-panel p-6 md:flex-row md:items-center hover:scale-[1.02] transition">
        <span className="text-6xl">{alumno.emoji}</span>
        <div>
          <h1 className="text-3xl font-bold" style={{ color: alumno.color }}>
            {alumno.nombre}
          </h1>
          <p className="font-mono text-sm text-tenue">@{alumno.usuario}</p>
        </div>
      </div>

      <p className="mt-6 text-lg text-tenue">“{alumno.frase}”</p>

      {/* RETO 2.4 */}
      <section className="mt-10">
        <h2 className="text-xl font-bold">Lo que aprendí hoy</h2>
        <ul className="mt-3 space-y-2 list-disc pl-5 text-tenue">
          <li>Cada carpeta dentro de src/app es una ruta.</li>
          <li>Tailwind da estilos con clases como p-6 y rounded-2xl.</li>
          <li>Los colores que vienen de datos se ponen con style.</li>
        </ul>
      </section>

      {/* ───────── MISIÓN 3 · v0 ─────────
          Pega el componente que generaste en v0 dentro de ComponenteV0.tsx (misma carpeta). */}
      <section className="mt-10">
        <ComponenteV0 />
      </section>

      {/* ───────── MISIÓN 4 · OpenCode + NVIDIA ─────────
          Pídele a OpenCode que cree un componente y lo agregue debajo de este comentario.
          Ejemplo de prompt en el README. */}
      <Reacciones />
    </main>
  );
}