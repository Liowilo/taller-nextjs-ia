// Lo corre GitHub Actions en cada Pull Request (también puedes correrlo tú antes de subir):
//   npm run validar-pr
//
// Revisa que tu PR:
//   1. Solo toque TUS archivos (no la carpeta de otra persona ni el código base)
//   2. Pertenezca a un solo usuario
//   3. Venga de la cuenta de GitHub que dice el JSON
//   4. Tenga un JSON válido
import { execSync } from "node:child_process";
import { validarAlumno } from "./validar.mjs";

const base = process.env.GITHUB_BASE_REF || "main";
const autor = (process.env.PR_AUTOR || "").toLowerCase();

let cambios;
try {
  cambios = execSync(`git diff --name-only origin/${base}...HEAD`, { encoding: "utf8" })
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
} catch {
  console.error(`❌ No pude comparar contra origin/${base}. Corre: git fetch origin ${base}`);
  process.exit(1);
}

if (cambios.length === 0) {
  console.error("❌ Tu rama no tiene cambios respecto a main. ¿Hiciste commit?");
  process.exit(1);
}

const PATRONES = [
  /^alumnos\/([a-z0-9-]+)\.json$/,
  /^src\/app\/alumnos\/([a-z0-9-]+)\/.+$/,
  /^public\/alumnos\/([a-z0-9-]+)\/.+$/,
];

const usuarios = new Set();
const prohibidos = [];

for (const archivo of cambios) {
  const coincidencia = PATRONES.map((p) => archivo.match(p)).find(Boolean);
  if (!coincidencia || coincidencia[1].startsWith("_")) prohibidos.push(archivo);
  else usuarios.add(coincidencia[1]);
}

let ok = true;
console.log("📄 Archivos en tu PR:");
cambios.forEach((c) => console.log("   ", c));

if (prohibidos.length) {
  ok = false;
  console.log("\n❌ Estos archivos NO deberías modificar (deshaz esos cambios):");
  prohibidos.forEach((p) => console.log("    ·", p));
  console.log("   Tip: git checkout origin/main -- <archivo>");
}

if (usuarios.size > 1) {
  ok = false;
  console.log(`\n❌ Tu PR toca carpetas de varios usuarios: ${[...usuarios].join(", ")}. Solo la tuya.`);
}

const [usuario] = usuarios;

if (usuario && autor && usuario !== autor) {
  ok = false;
  console.log(`\n❌ El PR lo abrió @${autor} pero la carpeta es de "${usuario}". Usa tu propio usuario.`);
}

if (usuario) {
  const errores = validarAlumno(`${usuario}.json`);
  if (errores.length) {
    ok = false;
    console.log(`\n❌ Problemas en alumnos/${usuario}.json:`);
    errores.forEach((e) => console.log("    ·", e));
  }
}

console.log(ok ? `\n✅ PR válido. ¡Bien hecho, ${usuario}!` : "\n🔧 Corrige lo de arriba, haz commit y push: el PR se revisa solo otra vez.");
process.exit(ok ? 0 : 1);
