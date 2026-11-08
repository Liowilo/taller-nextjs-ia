// Este archivo corre SOLO en el servidor (Node.js).
// Por eso podemos usar "fs" para leer archivos del disco: el navegador nunca ve este código.
import fs from "node:fs";
import path from "node:path";

export type Misiones = {
  node: boolean;
  nextTailwind: boolean;
  v0: boolean;
  opencode: boolean;
  supabase: boolean;
};

export type Alumno = {
  usuario: string; // tu usuario de GitHub, en minúsculas
  nombre: string;
  frase: string;
  emoji: string;
  color: string; // color en hexadecimal, ej. "#22d3ee"
  misiones: Misiones;
  promptFavorito: string; // el mejor prompt que usaste en OpenCode o v0
  codigoSesion: string; // la palabra secreta que se dice en la clase
};

const CARPETA = path.join(process.cwd(), "alumnos");

export function getAlumnos(): Alumno[] {
  if (!fs.existsSync(CARPETA)) return [];

  return fs
    .readdirSync(CARPETA)
    .filter((archivo) => archivo.endsWith(".json"))
    .map((archivo) => {
      const texto = fs.readFileSync(path.join(CARPETA, archivo), "utf8");
      return JSON.parse(texto) as Alumno;
    })
    .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
}

export function getAlumno(usuario: string): Alumno | undefined {
  return getAlumnos().find((a) => a.usuario === usuario);
}

export function misionesCompletadas(alumno: Alumno): number {
  return Object.values(alumno.misiones).filter(Boolean).length;
}

export const TOTAL_MISIONES = 5;
