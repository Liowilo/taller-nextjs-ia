// Ejemplo TERMINADO para que veas cómo puede quedar tu página.
// Visítala en http://localhost:3000/alumnos/ejemplo-profe
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAlumno } from "@/lib/alumnos";
import { ComponenteV0 } from "./ComponenteV0";
import { Reacciones } from "./Reacciones";

const USUARIO = "ejemplo-profe";

const aprendizajes = [
  "Cada carpeta dentro de src/app es una ruta",
  "Tailwind se escribe como clases directamente en el JSX",
  "Un agente de IA puede leer mi base de datos gracias a MCP",
];

export default function PaginaAlumno() {
  const alumno = getAlumno(USUARIO);
  if (!alumno) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/" className="font-mono text-sm text-tenue hover:text-acento">
        ← volver al muro
      </Link>

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

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Lo que aprendí hoy</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-tenue">
          {aprendizajes.map((texto) => (
            <li key={texto}>{texto}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <ComponenteV0 />
      </section>

      <section className="mt-10">
        <Reacciones />
      </section>
    </main>
  );
}
