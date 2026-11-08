import Link from "next/link";
import { type Alumno, misionesCompletadas, TOTAL_MISIONES } from "@/lib/alumnos";

// Un componente es una función que recibe "props" y regresa JSX.
export function TarjetaAlumno({ alumno }: { alumno: Alumno }) {
  const hechas = misionesCompletadas(alumno);
  const porcentaje = Math.round((hechas / TOTAL_MISIONES) * 100);

  return (
    <Link
      href={`/alumnos/${alumno.usuario}`}
      className="group relative flex flex-col gap-3 rounded-2xl border border-borde bg-panel p-5 transition hover:-translate-y-1 hover:border-acento/60"
    >
      {/* El color viene de datos (JSON), así que usamos style y no una clase de Tailwind */}
      <span
        className="absolute inset-x-0 top-0 h-1 rounded-t-2xl"
        style={{ backgroundColor: alumno.color }}
      />
      <div className="flex items-center gap-3">
        <span className="text-3xl">{alumno.emoji}</span>
        <div>
          <p className="font-semibold leading-tight">{alumno.nombre}</p>
          <p className="font-mono text-xs text-tenue">@{alumno.usuario}</p>
        </div>
      </div>
      <p className="text-sm text-tenue">“{alumno.frase}”</p>
      <div className="mt-auto">
        <div className="mb-1 flex justify-between font-mono text-xs text-tenue">
          <span>misiones</span>
          <span>
            {hechas}/{TOTAL_MISIONES}
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-borde">
          <div
            className="h-full rounded-full"
            style={{ width: `${porcentaje}%`, backgroundColor: alumno.color }}
          />
        </div>
      </div>
    </Link>
  );
}
