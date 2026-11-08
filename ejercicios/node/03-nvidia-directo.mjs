// MISIÓN 4 · Antes de usar OpenCode, hablemos con el modelo "a mano".
//
//   npm run node:nvidia -- "Explícame qué es un Server Component en 3 líneas"
//   npm run node:nvidia -- --probar         (prueba cada modelo de opencode.json)
//   npm run node:nvidia -- --modelos        (lista todo el catálogo de NVIDIA hoy)
//
// Lee NVIDIA_API_KEY de tu .env.local. Un agente como OpenCode hace esto mismo,
// pero en un ciclo: manda tu mensaje + herramientas, el modelo pide usar una
// herramienta (leer archivo, editar, MCP...), OpenCode la ejecuta y le regresa el resultado.
import fs from "node:fs";

const BASE = "https://integrate.api.nvidia.com/v1";
const KEY = process.env.NVIDIA_API_KEY;

// Los modelos salen de opencode.json: así OpenCode y este script usan la misma lista.
const config = JSON.parse(fs.readFileSync("opencode.json", "utf8"));
const MODELOS_CONFIG = Object.keys(config.provider?.nvidia?.models ?? {});
const MODELO_DEFAULT = String(config.model ?? "").replace(/^nvidia\//, "");
const MODELO = process.env.NVIDIA_MODEL || MODELO_DEFAULT;

if (!KEY || KEY.includes("xxxx")) {
  console.error("❌ Falta NVIDIA_API_KEY en .env.local (copia .env.example y pega tu llave nvapi-...)");
  process.exit(1);
}

const args = process.argv.slice(2);

function chat(modelo, mensajes, extra = {}) {
  return fetch(`${BASE}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: modelo, messages: mensajes, ...extra }),
    signal: AbortSignal.timeout(60_000),
  });
}

// ── Lista todo el catálogo ────────────────────────────────────────────────
if (args[0] === "--modelos") {
  const res = await fetch(`${BASE}/models`, { headers: { Authorization: `Bearer ${KEY}` } });
  const { data } = await res.json();
  const ids = data.map((m) => m.id).sort();
  console.log(`🤖 ${ids.length} modelos en el catálogo de NVIDIA:\n`);
  ids.forEach((id) => console.log("  ", id));
  console.log("\nOjo: aparecer aquí no garantiza que responda. Usa --probar para confirmarlo.");
  process.exit(0);
}

// ── Prueba cada modelo de opencode.json ───────────────────────────────────
// OpenCode necesita que el modelo sepa usar "herramientas" (tool calling),
// así que mandamos una herramienta de prueba y vemos si la usa.
if (args[0] === "--probar") {
  const herramienta = {
    type: "function",
    function: {
      name: "leer_archivo",
      description: "Lee un archivo del proyecto",
      parameters: { type: "object", properties: { ruta: { type: "string" } }, required: ["ruta"] },
    },
  };
  console.log(`🔎 Probando ${MODELOS_CONFIG.length} modelos de opencode.json (puede tardar ~1 min)\n`);
  let sirven = 0;
  for (const modelo of MODELOS_CONFIG) {
    const inicio = Date.now();
    let estado;
    try {
      const res = await chat(
        modelo,
        [{ role: "user", content: "Lee el archivo package.json usando la herramienta." }],
        { tools: [herramienta], max_tokens: 200, temperature: 0 },
      );
      const s = ((Date.now() - inicio) / 1000).toFixed(1);
      if (res.status === 410) estado = "❌ retirado por NVIDIA (410) → quítalo de opencode.json";
      else if (res.status === 404) estado = "❌ no existe (404) → quítalo de opencode.json";
      else if (res.status === 429) estado = "⏳ límite por minuto (429) → vuelve a probar en 1 min";
      else if (!res.ok) estado = `⚠️  error ${res.status}: ${(await res.text()).slice(0, 120)}`;
      else {
        const json = await res.json();
        const usaHerramienta = Boolean(json.choices?.[0]?.message?.tool_calls?.length);
        estado = usaHerramienta
          ? `✅ responde y usa herramientas (${s} s)`
          : `🟡 responde pero NO usó la herramienta (${s} s) → no sirve bien para OpenCode`;
        if (usaHerramienta) sirven++;
      }
    } catch (e) {
      estado =
        e.name === "TimeoutError"
          ? "⚠️  sin respuesta en 60 s (saturado) → prueba más tarde u otro modelo"
          : `⚠️  no hay conexión con NVIDIA (${e.cause?.code ?? e.message}) → revisa tu internet`;
    }
    console.log(`${modelo}\n   ${estado}\n`);
  }
  console.log(sirven ? `${sirven} modelo(s) listos para OpenCode.` : "Ningún modelo sirve: corre --modelos y actualiza opencode.json.");
  process.exit(sirven ? 0 : 1);
}

// ── Pregunta normal ───────────────────────────────────────────────────────
const pregunta = args.join(" ") || "Saluda a mi clase en una línea y dime un dato curioso de Node.js.";
console.log(`🧠 Modelo: ${MODELO}\n🙋 Pregunta: ${pregunta}\n`);

const inicio = Date.now();
const res = await chat(
  MODELO,
  [
    { role: "system", content: "Eres un profesor de programación. Responde en español, breve y claro." },
    { role: "user", content: pregunta },
  ],
  { temperature: 0.4, max_tokens: 400 },
);

if (!res.ok) {
  console.error(`❌ Error ${res.status}:`, await res.text());
  if (res.status === 429) console.error("\nDemasiadas peticiones: espera un minuto (límite del plan gratuito).");
  if (res.status === 404 || res.status === 410)
    console.error(
      `\nNVIDIA retiró o renombró "${MODELO}". Corre:  npm run node:nvidia -- --probar` +
        "\ny usa uno que salga con ✅ (cámbialo en NVIDIA_MODEL de tu .env.local, o bórralo para usar el de opencode.json).",
    );
  process.exit(1);
}

const json = await res.json();
console.log("💬", json.choices[0].message.content);
console.log(`\n⏱️  ${((Date.now() - inicio) / 1000).toFixed(1)} s · tokens usados: ${json.usage?.total_tokens ?? "?"}`);

// RETO 4.1: cambia el mensaje "system" para que el modelo responda como pirata 🏴‍☠️.
//           ¿Qué tanto cambia la respuesta? Eso es "prompt engineering".