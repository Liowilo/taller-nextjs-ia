// MISIÓN 1 · Ejercicio 2: leer archivos con Node.
// Ejecuta:  npm run node:archivos
//
// Es EXACTAMENTE lo mismo que hace src/lib/alumnos.ts para pintar el muro.
// Next.js usa Node por debajo para todo lo que pasa en el servidor.
import fs from "node:fs";
import path from "node:path";

const carpeta = path.join(process.cwd(), "alumnos");
const archivos = fs.readdirSync(carpeta).filter((a) => a.endsWith(".json"));

const filas = archivos.map((archivo) => {
  const alumno = JSON.parse(fs.readFileSync(path.join(carpeta, archivo), "utf8"));
  const hechas = Object.values(alumno.misiones).filter(Boolean).length;
  return { usuario: alumno.usuario, nombre: alumno.nombre, misiones: `${hechas}/5` };
});

console.log(`📂 Encontré ${archivos.length} alumno(s) en /alumnos\n`);
console.table(filas);

// RETO 1.2: ordena la tabla para que aparezca primero quien tiene MÁS misiones.
//           Pista: filas.sort((a, b) => ...) antes del console.table
