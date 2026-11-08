// Utilidades compartidas por los scripts del taller.
import crypto from "node:crypto";

// Reglas de nombres de usuario de GitHub: letras, números y guiones, máx. 39.
export const REGEX_USUARIO = /^[a-z0-9](?:[a-z0-9]|-(?=[a-z0-9])){0,38}$/;

export const MISIONES = ["node", "nextTailwind", "v0", "opencode", "supabase"];

// Usuarios de ejemplo que no se validan contra el código de la sesión
export const USUARIOS_EJEMPLO = ["ejemplo-profe"];

export function hashCodigo(codigo) {
  return crypto
    .createHash("sha256")
    .update(String(codigo).trim().toLowerCase())
    .digest("hex");
}
