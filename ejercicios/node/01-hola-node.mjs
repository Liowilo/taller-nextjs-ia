// MISIÓN 1 · Ejercicio 1: JavaScript FUERA del navegador.
// Ejecuta:  npm run node:hola
//
// Node.js es el mismo motor de JavaScript de Chrome (V8), pero en tu terminal.
// Aquí no hay "window" ni "document", pero sí hay acceso a archivos, red y sistema.
import readline from "node:readline/promises";
import os from "node:os";

console.log("👋 Hola desde Node.js", process.version);
console.log("💻 Sistema:", os.platform(), "·", os.cpus().length, "núcleos");

// "process.argv" son los argumentos que escribes después del comando
console.log("📦 Argumentos recibidos:", process.argv.slice(2));

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const nombre = await rl.question("¿Cómo te llamas? ");
const usuario = await rl.question("¿Cuál es tu usuario de GitHub? ");
rl.close();

console.log(`\n✨ Mucho gusto, ${nombre}.`);
console.log(`Tu siguiente paso es:  npm run nuevo-alumno -- ${usuario.trim().toLowerCase()}`);

// RETO 1.1: imprime cuántos MB de memoria libre tiene tu computadora.
//           Pista: os.freemem() regresa bytes. 1 MB = 1024 * 1024 bytes.
