// MISIÓN 1 · Tu primer script de Node que modifica el proyecto.
//   npm run nuevo-alumno -- tu-usuario-de-github
//
// Crea:
//   alumnos/<usuario>.json               → tus datos (aparecen en el muro)
//   src/app/alumnos/<usuario>/page.tsx   → tu página personal
//   src/app/alumnos/<usuario>/ComponenteV0.tsx
import fs from "node:fs";
import path from "node:path";
import { REGEX_USUARIO } from "./_comun.mjs";

const usuario = (process.argv[2] ?? "").trim().toLowerCase();

if (!REGEX_USUARIO.test(usuario)) {
  console.error("❌ Escribe tu usuario de GitHub. Ejemplo:  npm run nuevo-alumno -- maria-lopez");
  process.exit(1);
}

const raiz = process.cwd();
const json = path.join(raiz, "alumnos", `${usuario}.json`);
const carpetaPlantilla = path.join(raiz, "src", "app", "alumnos", "_plantilla");
const carpetaDestino = path.join(raiz, "src", "app", "alumnos", usuario);

if (fs.existsSync(json) || fs.existsSync(carpetaDestino)) {
  console.error(`⚠️  Ya existe "${usuario}". Si es tuyo, sigue editando esos archivos.`);
  process.exit(1);
}

// Elegimos un color al azar de una paleta
const colores = ["#22d3ee", "#a78bfa", "#f472b6", "#facc15", "#4ade80", "#fb923c", "#60a5fa"];
const emojis = ["🚀", "🦊", "🐙", "🌵", "🎧", "🧠", "🐉", "🍕"];
const azar = (lista) => lista[Math.floor(Math.random() * lista.length)];

const datos = {
  usuario,
  nombre: "Tu Nombre Aquí",
  frase: "Cámbiame por una frase que te represente (máx. 140 caracteres).",
  emoji: azar(emojis),
  color: azar(colores),
  misiones: { node: true, nextTailwind: false, v0: false, opencode: false, supabase: false },
  promptFavorito: "",
  codigoSesion: "",
};

fs.writeFileSync(json, JSON.stringify(datos, null, 2) + "\n");

fs.mkdirSync(carpetaDestino, { recursive: true });
for (const archivo of fs.readdirSync(carpetaPlantilla)) {
  const contenido = fs
    .readFileSync(path.join(carpetaPlantilla, archivo), "utf8")
    .replaceAll("__USUARIO__", usuario)
    .replace(/^\/\/ 📁 Esta carpeta[\s\S]*?\n(?=import)/, ""); // quitamos el aviso de plantilla
  fs.writeFileSync(path.join(carpetaDestino, archivo), contenido);
}

console.log(`✅ Listo, ${usuario}. Se crearon:`);
console.log(`   alumnos/${usuario}.json`);
console.log(`   src/app/alumnos/${usuario}/page.tsx`);
console.log(`   src/app/alumnos/${usuario}/ComponenteV0.tsx`);
console.log(`\n👉 Abre http://localhost:3000/alumnos/${usuario}  (con npm run dev corriendo)`);
console.log("👉 Edita tu nombre y frase en el JSON y guarda: la página se actualiza sola.");
