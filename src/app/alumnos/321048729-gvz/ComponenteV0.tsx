// MISIÓN 3 · Reemplaza TODO este archivo con el código que te dé v0.
// Reglas para que compile:
//   1. Debe exportar una función llamada ComponenteV0:  export function ComponenteV0() { ... }
//   2. Solo Tailwind: si v0 usa componentes de "@/components/ui/...", pídele:
//      "reescríbelo sin shadcn, solo con HTML y clases de Tailwind".
//   3. Si usa useState u onClick, la PRIMERA línea del archivo debe ser: "use client";

const milestones = [
  {
    date: "2020 · Primeros pasos",
    title: "Primer programa",
    description: "Mi primera solución desarrollada desde cero.",
  },
  {
    date: "2024 · El comienzo",
    title: "Inicio de carrera en la FESC",
    description: "Comienzo de mi formación profesional.",
  },
  {
    date: "2025 · Aprender en equipo",
    title: "Primer proyecto en equipo",
    description: "Colaboración, planificación y entrega conjunta.",
  },
  {
    date: "Hoy · En movimiento",
    title: "Actualidad",
    description: "Enfocado en nuevos retos y crecimiento continuo.",
  },
];

export function ComponenteV0() {
  return (
    <div className="mt-8 rounded-2xl bg-[#101d36] px-6 py-10 text-[#f3eee2] sm:py-14">
      <section className="mx-auto max-w-3xl">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d5ae5d]">
          Un recorrido en construcción
        </p>
        <h2 className="text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
          Trayectoria académica
        </h2>
        <p className="mb-7 mt-2 max-w-xl text-sm leading-relaxed text-[#b6bfd0]">
          Hitos clave de mi formación y evolución.
        </p>
        <ol
          aria-label="Hitos de mi vida como estudiante"
          className="relative ml-1 border-l border-[#35435c] pl-6"
        >
          {milestones.map((milestone, index) => (
            <li
              className="relative pb-5 last:pb-0"
              key={milestone.title}
            >
              <span
                aria-hidden="true"
                className={`absolute -left-[31px] top-1 h-2.5 w-2.5 rounded-full border-2 border-[#d5ae5d] ring-4 ring-[#101d36] ${
                  index === milestones.length - 1 ? "bg-[#d5ae5d]" : "bg-[#101d36]"
                }`}
              />
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#d5ae5d]">
                {milestone.date}
              </p>
              <h3 className="mb-1 text-xl font-medium tracking-tight sm:text-2xl">
                {milestone.title}
              </h3>
              <p className="max-w-xl text-[13px] leading-relaxed text-[#bdc5d3]">
                {milestone.description}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}