// Ejemplo de lo que podría generar v0 con el prompt:
// "Una tarjeta de 'stack tecnológico' con 4 tecnologías en cuadrícula,
//  cada una con un ícono emoji, nombre y una barra de nivel. Modo oscuro, solo Tailwind."

const stack = [
  { icono: "▲", nombre: "Next.js", nivel: 70 },
  { icono: "🌊", nombre: "Tailwind", nivel: 80 },
  { icono: "🟩", nombre: "Node.js", nivel: 60 },
  { icono: "⚡", nombre: "Supabase", nivel: 45 },
];

export function ComponenteV0() {
  return (
    <div className="rounded-2xl border border-borde bg-panel p-6">
      <h2 className="text-xl font-semibold">Mi stack</h2>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {stack.map((tec) => (
          <div key={tec.nombre} className="rounded-xl bg-tinta p-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">{tec.icono}</span>
              <span className="font-medium">{tec.nombre}</span>
            </div>
            <div className="mt-3 h-1.5 rounded-full bg-borde">
              <div className="h-full rounded-full bg-acento" style={{ width: `${tec.nivel}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
