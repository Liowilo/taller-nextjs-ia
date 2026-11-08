// Solo para el PROFE: genera el hash de la palabra secreta de la sesión.
//   npm run hash-codigo -- pinguino-azul
// Copia el resultado a config/sesion.json → "codigoHash" y súbelo ANTES de la clase.
// En clase dices la palabra en voz alta; quien no estuvo, no la conoce.
import { hashCodigo } from "./_comun.mjs";

const palabra = process.argv.slice(2).join(" ");
if (!palabra) {
  console.error("Uso: npm run hash-codigo -- <palabra-secreta>");
  process.exit(1);
}
console.log(hashCodigo(palabra));
