// MISIÓN 4 · Antes de usar OpenCode, hablemos con el modelo "a mano".
//
//   npm run node:nvidia -- "Explícame qué es un Server Component en 3 líneas"
//   npm run node:nvidia -- --modelos        (lista los modelos disponibles hoy)
//
// Lee NVIDIA_API_KEY de tu .env.local. Un agente como OpenCode hace esto mismo,
// pero en un ciclo: manda tu mensaje + herramientas, el modelo pide usar una
// herramienta (leer archivo, editar, MCP...), OpenCode la ejecuta y le regresa el resultado.

const BASE = "https://integrate.api.nvidia.com/v1";
const KEY = process.env.NVIDIA_API_KEY;
const MODELO = process.env.NVIDIA_MODEL || "meta/llama-3.3-70b-instruct";

if (!KEY || KEY.includes("xxxx")) {
  console.error("❌ Falta NVIDIA_API_KEY en .env.local (copia .env.example y pega tu llave nvapi-...)");
  process.exit(1);
}

const args = process.argv.slice(2);

if (args[0] === "--modelos") {
  const res = await fetch(`${BASE}/models`, { headers: { Authorization: `Bearer ${KEY}` } });
  const { data } = await res.json();
  const interesantes = data
    .map((m) => m.id)
    .filter((id) => /coder|qwen|kimi|deepseek|llama-3\.3|glm|nemotron/i.test(id))
    .sort();
  console.log("🤖 Modelos útiles para programar:\n");
  interesantes.forEach((id) => console.log("  ", id));
  console.log(`\n(${data.length} modelos en total. Copia el id que quieras a opencode.json)`);
  process.exit(0);
}

const pregunta = args.join(" ") || "Saluda a mi clase en una línea y dime un dato curioso de Node.js.";
console.log(`🧠 Modelo: ${MODELO}\n🙋 Pregunta: ${pregunta}\n`);

const inicio = Date.now();
const res = await fetch(`${BASE}/chat/completions`, {
  method: "POST",
  headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    model: MODELO,
    messages: [
      { role: "system", content: "Eres un profesor de programación. Responde en español, breve y claro." },
      { role: "user", content: pregunta },
    ],
    temperature: 0.4,
    max_tokens: 400,
  }),
});

if (!res.ok) {
  console.error(`❌ Error ${res.status}:`, await res.text());
  if (res.status === 429) console.error("Demasiadas peticiones: espera un minuto (límite del plan gratuito).");
  process.exit(1);
}

const json = await res.json();
console.log("💬", json.choices[0].message.content);
console.log(`\n⏱️  ${((Date.now() - inicio) / 1000).toFixed(1)} s · tokens usados: ${json.usage?.total_tokens ?? "?"}`);

// RETO 4.1: cambia el mensaje "system" para que el modelo responda como pirata 🏴‍☠️.
//           ¿Qué tanto cambia la respuesta? Eso es "prompt engineering".
