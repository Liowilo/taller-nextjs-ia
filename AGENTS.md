# Reglas para el agente (OpenCode lee este archivo automáticamente)

Este repositorio es un taller escolar. Trabajas con estudiantes que están aprendiendo.

## Cómo debes trabajar
- Responde y comenta el código **en español**.
- Antes de editar, explica en 2–4 viñetas qué vas a cambiar y por qué.
- Haz cambios pequeños. Si algo requiere más de 3 archivos, pregunta primero.
- Al terminar, di cómo probar el cambio (por ejemplo: "abre http://localhost:3000/alumnos/<usuario>").

## Qué archivos puedes tocar
- **Solo** la carpeta del estudiante: `src/app/alumnos/<usuario>/` y su archivo `alumnos/<usuario>.json`.
- También `public/alumnos/<usuario>/` si hace falta una imagen.
- **No** modifiques `src/lib/`, `src/components/`, `scripts/`, `.github/`, `package.json` ni la carpeta de otro estudiante.
  Si el estudiante te lo pide, recuérdale que su Pull Request será rechazado por el validador.

## Stack del proyecto
- Next.js 16 con App Router (`src/app`). Los componentes son Server Components por defecto;
  agrega `"use client"` solo cuando uses estado (`useState`), efectos o eventos (`onClick`).
- Tailwind CSS v4 (no hay `tailwind.config.js`; los estilos se escriben como clases).
  No construyas nombres de clase dinámicos como `bg-${color}-500`: Tailwind no los detecta. Usa `style={{ ... }}` para colores que vienen de datos.
- TypeScript estricto. Importa con el alias `@/` (ej. `@/lib/alumnos`).
- No instales dependencias nuevas.

## Supabase (MCP)
- Usa el MCP de Supabase solo sobre el proyecto personal del estudiante.
- Antes de ejecutar SQL que borre o modifique datos (`DROP`, `DELETE`, `UPDATE`, `TRUNCATE`), muestra el SQL y pide confirmación.
- Toda tabla nueva debe tener RLS (Row Level Security) activado con políticas explícitas.
