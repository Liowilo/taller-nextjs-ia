"use client";
import { useState } from "react";

const EMOJIS = ["🚀", "✨", "🎉"] as const;

export function Reacciones() {
  const [conteo, setConteo] = useState<Record<string, number>>({});

  return (
    <div className="rounded-2xl border border-borde bg-panel p-6">
      <h2 className="text-xl font-semibold">¿Qué te pareció mi página?</h2>
      <div className="mt-4 flex gap-3">
        {EMOJIS.map((emoji) => (
          <button
            key={emoji}
            onClick={() => setConteo((c) => ({ ...c, [emoji]: (c[emoji] ?? 0) + 1 }))}
            className="flex items-center gap-2 rounded-full border border-borde bg-tinta px-4 py-2 text-lg transition active:scale-95 hover:border-acento"
          >
            {emoji}
            <span className="font-mono text-sm text-tenue">{conteo[emoji] ?? 0}</span>
          </button>
        ))}
      </div>
    </div>
  );
}