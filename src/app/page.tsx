import { getAlumnos } from "@/lib/alumnos";
import { TarjetaAlumno } from "@/components/TarjetaAlumno";

// Esta página es un Server Component: se ejecuta en el servidor,
// lee la carpeta /alumnos y manda HTML ya listo al navegador.
export default function Home() {
  const alumnos = getAlumnos();

  return (
    <main className="fondo-cuadricula min-h-[calc(100vh-49px)]">
      <section className="mx-auto max-w-6xl px-4 py-12">
        <p className="font-mono text-sm text-acento">$ npm run dev</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Muro del Taller</h1>
        <p className="mt-3 max-w-2xl text-tenue">
          Cada tarjeta es un Pull Request. Si estás aquí, construiste tu página con Next.js y
          Tailwind, usaste v0 y le diste órdenes a un agente de IA que habla con tu base de datos.
        </p>
        <p className="mt-6 font-mono text-sm text-tenue">
          {alumnos.length} {alumnos.length === 1 ? "integrante" : "integrantes"}
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {alumnos.map((alumno) => (
            <TarjetaAlumno key={alumno.usuario} alumno={alumno} />
          ))}
        </div>
      </section>
    </main>
  );
}
