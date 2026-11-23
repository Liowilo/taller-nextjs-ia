'use client'

import { useState } from 'react'

export function ComponenteV0() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="flex justify-center text-[#e7ecf7]">
      <section
        aria-label="Reproductor de música"
        className="w-full max-w-sm rounded-[28px] border border-[#232c45] bg-[#121829] p-3 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.8)] transition duration-300 ease-out motion-reduce:transition-none hover:-translate-y-0.5 hover:border-[#35425f] sm:p-3.5"
      >
        <div className="mb-7 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b96b3]">Ahora suena</p>
          <span className="flex items-center gap-2 rounded-full border border-[#232c45] px-3 py-1.5 text-[11px] font-medium text-[#8b96b3]">
            <span className={`h-1.5 w-1.5 rounded-full ${isPlaying ? 'animate-pulse bg-[#76e4c3]' : 'bg-[#8b96b3]'}`} />
            {isPlaying ? 'EN REPRODUCCIÓN' : 'EN PAUSA'}
          </span>
        </div>

        <div className="mb-6 flex h-36 w-full items-center justify-center overflow-hidden rounded-2xl border border-[#232c45] bg-[radial-gradient(circle_at_50%_42%,#263c50_0%,#19253a_38%,#121829_75%)] sm:h-40">
          <div aria-hidden="true" className="flex h-36 w-36 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] shadow-[0_0_70px_-20px_rgba(118,228,195,0.25)] sm:h-40 sm:w-40">
            <span className="text-7xl" role="img" aria-label="Luna">🌙</span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">Midnight City</h2>
          <p className="mt-1.5 text-sm text-[#8b96b3]">M83</p>
        </div>

        <div className="mb-6">
          <div
            aria-label="Progreso de la canción"
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={38}
            className="h-1.5 overflow-hidden rounded-full bg-[#232c45]"
            role="progressbar"
          >
            <div className="h-full w-[38%] rounded-full bg-[#76e4c3] shadow-[0_0_12px_rgba(118,228,195,0.45)]" />
          </div>
          <div className="mt-2.5 flex justify-between text-xs tabular-nums text-[#8b96b3]">
            <span>1:42</span>
            <span>4:03</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-7">
          <button aria-label="Canción anterior" className="rounded-full p-2 text-[#8b96b3] transition hover:text-[#e7ecf7] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#76e4c3]" type="button">
            <span aria-hidden="true" className="text-xl">⏮</span>
          </button>
          <button
            aria-label={isPlaying ? 'Pausar canción' : 'Reproducir canción'}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#76e4c3] text-[#121829] shadow-[0_8px_30px_-8px_rgba(118,228,195,0.55)] transition hover:scale-105 hover:bg-[#91f0d2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e7ecf7] active:scale-95"
            onClick={() => setIsPlaying((playing) => !playing)}
            type="button"
          >
            <span aria-hidden="true" className="text-2xl">{isPlaying ? '⏸' : '▶'}</span>
          </button>
          <button aria-label="Siguiente canción" className="rounded-full p-2 text-[#8b96b3] transition hover:text-[#e7ecf7] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#76e4c3]" type="button">
            <span aria-hidden="true" className="text-xl">⏭</span>
          </button>
        </div>
      </section>
    </div>
  )
}
