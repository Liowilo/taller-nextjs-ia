"use client";

import { useState } from "react";

const emojis = ["👍", "❤️", "🔥"] as const;

export function Reacciones() {
  const [counts, setCounts] = useState<Record<string, number>>({
    "👍": 0,
    "❤️": 0,
    "🔥": 0,
  });

  const handleClick = (emoji: string) => {
    setCounts((prev) => ({ ...prev, [emoji]: (prev[emoji] || 0) + 1 }));
  };

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold mb-4">Reacciones</h2>
      <div className="flex gap-4 flex-wrap">
        {emojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => handleClick(emoji)}
            className="flex items-center gap-2 px-4 py-2 text-2xl bg-panel border border-borde rounded-xl hover:scale-105 transition"
            aria-label={`Reaccionar con ${emoji}`}
          >
            <span>{emoji}</span>
            <span className="font-mono text-lg text-tenue">{counts[emoji]}</span>
          </button>
        ))}
      </div>
    </section>
  );
}