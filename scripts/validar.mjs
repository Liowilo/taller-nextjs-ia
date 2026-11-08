// Revisa que todos los archivos de /alumnos estén bien.
//   npm run validar              → revisa a todos
//   npm run validar -- usuario   → revisa solo a uno
// GitHub Actions corre este mismo script en cada Pull Request.
import fs from "node:fs";
import path from "node:path";
import { REGEX_USUARIO, MISIONES } from "./_comun.mjs";

const raiz = process.cwd();
const carpeta = path.join(raiz, "alumnos");
const soloUsuario = process.argv[2]?.toLowerCase();

export function validarAlumno(archivo) {
  const errores = [];
  const usuarioArchivo = path.basename(archivo, ".json");
  let a;

  try {
    a = JSON.parse(fs.readFileSync(path.join(carpeta, archivo), "utf8"));
  } catch (e) {
    return [`El JSON no es válido: ${e.message}. ¿Te falta una coma o una comilla?`];
  }

  const texto = (campo, min, max) => {
    const v = a[campo];
    if (typeof v !== "string") errores.push(`"${campo}" debe ser texto`);
    else if (v.trim().length < min || v.length > max)
      errores.push(`"${campo}" debe tener entre ${min} y ${max} caracteres (tiene ${v.trim().length})`);
  };

  if (!REGEX_USUARIO.test(usuarioArchivo)) errores.push(`El nombre del archivo "${archivo}" no es un usuario válido`);
  if (a.usuario !== usuarioArchivo) errores.push(`"usuario" (${a.usuario}) debe ser igual al nombre del archivo (${usuarioArchivo})`);
  texto("nombre", 2, 60);
  texto("frase", 5, 140);
  texto("emoji", 1, 16);
  if (a.nombre === "Tu Nombre Aquí") errores.push(`Cambia "nombre" por tu nombre real`);
  if (String(a.frase).startsWith("Cámbiame")) errores.push(`Cambia "frase" por una tuya`);
  if (!/^#[0-9a-fA-F]{6}$/.test(a.color ?? "")) errores.push(`"color" debe ser hexadecimal de 6 dígitos, ej. "#22d3ee"`);

  if (typeof a.misiones !== "object" || a.misiones === null) {
    errores.push(`Falta el objeto "misiones"`);
  } else {
    for (const m of MISIONES)
      if (typeof a.misiones[m] !== "boolean") errores.push(`"misiones.${m}" debe ser true o false`);
    const extra = Object.keys(a.misiones).filter((k) => !MISIONES.includes(k));
    if (extra.length) errores.push(`"misiones" tiene claves desconocidas: ${extra.join(", ")}`);
  }

  if (a.misiones?.opencode) texto("promptFavorito", 15, 500);

  const pagina = path.join(raiz, "src", "app", "alumnos", usuarioArchivo, "page.tsx");
  if (!fs.existsSync(pagina)) errores.push(`No existe tu página: src/app/alumnos/${usuarioArchivo}/page.tsx`);

  return errores;
}

// Si este archivo se ejecuta directamente (no importado), validamos.
if (process.argv[1]?.endsWith("validar.mjs")) {
  const archivos = fs
    .readdirSync(carpeta)
    .filter((f) => f.endsWith(".json"))
    .filter((f) => !soloUsuario || f === `${soloUsuario}.json`);

  if (soloUsuario && archivos.length === 0) {
    console.error(`❌ No encontré alumnos/${soloUsuario}.json`);
    process.exit(1);
  }

  let fallas = 0;
  for (const archivo of archivos) {
    const errores = validarAlumno(archivo);
    if (errores.length === 0) {
      console.log(`✅ ${archivo}`);
    } else {
      fallas++;
      console.log(`❌ ${archivo}`);
      errores.forEach((e) => console.log(`   · ${e}`));
    }
  }
  console.log(fallas ? `\n${fallas} archivo(s) con errores.` : `\nTodo en orden (${archivos.length}).`);
  process.exit(fallas ? 1 : 0);
}
