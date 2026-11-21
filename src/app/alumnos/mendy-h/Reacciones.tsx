"use client";

import { useState } from "react";

const emojis = ["👍", "❤️", "😂"];

export function Reacciones() {
  const [counts, setCounts] = useState<Record<string, number>>({
    "👍": 0,
    "❤️": 0,
    "😂": 0,
  });

  function increment(emoji: string) {
    setCounts((prev) => ({ ...prev, [emoji]: prev[emoji] + 1 }));
  }

  return (
    <div className="flex gap-4">
      {emojis.map((emoji) => (
        <button
          key={emoji}
          onClick={() => increment(emoji)}
          className="text-3xl px-4 py-2 rounded-xl border border-borde bg-panel hover:scale-110 transition"
          aria-label={emoji}
        >
          <span>{emoji}</span>
          <span className="ml-2 text-lg font-mono">{counts[emoji]}</span>
        </button>
      ))}
    </div>
  );
}