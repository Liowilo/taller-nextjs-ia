"use client";

import { useState } from "react";

const tareas = [
  { id: 1, title: "Avanzar en mi proyecto web", detail: "Un paso a la vez · Proyecto" },
  { id: 2, title: "Revisar código y pruebas", detail: "Calidad · Verificación" },
  { id: 3, title: "Leer el libro", detail: "Lectura · A mi ritmo" },
];

export function ComponenteV0() {
  const [completadas, setCompletadas] = useState<number[]>([1]);
  const progreso = Math.round((completadas.length / tareas.length) * 100);
  const completa = completadas.length === tareas.length;

  function alternarTarea(id: number) {
    setCompletadas((actuales) =>
      actuales.includes(id)
        ? actuales.filter((tareaId) => tareaId !== id)
        : [...actuales, id],
    );
  }

  return (
    <section className="w-full max-w-[440px] rounded-[28px] border border-white/[0.08] bg-[#111014] p-6 text-white shadow-[0_24px_80px_-32px_rgba(0,0,0,0.9)] sm:p-8" aria-labelledby="study-title">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a7a2af]">Tu enfoque de hoy</p>
          <h1 id="study-title" className="text-[25px] font-semibold tracking-[-0.04em]">Metas de estudio</h1>
          <p className="mt-1.5 text-sm text-[#8e8997]">Un paso a la vez. Vas muy bien.</p>
        </div>
        <span className={`mt-1 inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${completa ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300" : "border-[#c084fc]/20 bg-[#c084fc]/10 text-[#d8b4fe]"}`}>
          <span className={`size-1.5 rounded-full ${completa ? "bg-emerald-300" : "bg-[#c084fc]"}`} />
          {completa ? "Completado" : "En progreso"}
        </span>
      </header>

      <div className="mt-8 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-[#e8e5ec]">Progreso de la sesión</p>
            <p className="mt-1 text-xs text-[#817b89]">{completadas.length} de {tareas.length} tareas completadas</p>
          </div>
          <span className="text-2xl font-semibold tracking-tight text-[#d8b4fe]">{progreso}<span className="ml-0.5 text-base">%</span></span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/[0.08]" role="progressbar" aria-label="Progreso de estudio" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progreso}>
          <div className="h-full rounded-full bg-[#c084fc] transition-[width] duration-700 ease-out" style={{ width: `${progreso}%` }} />
        </div>
      </div>

      <div className="mb-3 mt-8 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[#e8e5ec]">Tu checklist</h2>
        <span className="text-xs text-[#817b89]">Haz clic para actualizar</span>
      </div>
      <ul className="flex flex-col gap-2" aria-label="Tareas de estudio">
        {tareas.map((tarea) => {
          const marcada = completadas.includes(tarea.id);
          return (
            <li key={tarea.id}>
              <button type="button" onClick={() => alternarTarea(tarea.id)} aria-pressed={marcada} className="group flex w-full items-center gap-3.5 rounded-2xl border border-transparent px-3.5 py-3.5 text-left transition-colors hover:border-white/[0.08] hover:bg-white/[0.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c084fc]">
                <span aria-hidden="true" className={`flex size-[21px] shrink-0 items-center justify-center rounded-full border transition-all ${marcada ? "border-[#c084fc] bg-[#c084fc] text-[#1a1023]" : "border-[#514b58] bg-transparent text-transparent group-hover:border-[#c084fc]/70"}`}>
                  {marcada && <span className="text-[12px] font-bold">✓</span>}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block text-sm font-medium transition-colors ${marcada ? "text-[#8e8997] line-through decoration-white/20" : "text-[#e8e5ec]"}`}>{tarea.title}</span>
                  <span className="mt-1 block text-xs text-[#77717f]">{tarea.detail}</span>
                </span>
                <span aria-hidden="true" className="text-sm text-[#605a67] transition-transform group-hover:translate-x-0.5">↗</span>
              </button>
            </li>
          );
        })}
      </ul>
      <footer className="mt-6 flex items-center gap-2 border-t border-white/[0.07] pt-5 text-xs text-[#817b89]">
        <span aria-hidden="true">✦</span>
        <p>{completa ? "¡Sesión terminada! Date un momento para celebrar." : "Cada sesión cuenta. Sigue a tu propio ritmo."}</p>
      </footer>
    </section>
  );
}
