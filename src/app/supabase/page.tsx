// MISIÓN 5 · Esta página lee y escribe en TU proyecto de Supabase.
// La tabla "mensajes" NO existe todavía: la vas a crear pidiéndoselo a OpenCode
// a través del MCP de Supabase (ver README → Misión 5).
import { revalidatePath } from "next/cache";
import { getSupabase, supabaseConfigurado } from "@/lib/supabase";

// Siempre consulta datos frescos (no la guardes en caché al compilar)
export const dynamic = "force-dynamic";

type Mensaje = { id: number; usuario: string; mensaje: string; creado_en: string };

// Server Action: una función que corre en el servidor cuando se envía el formulario.
async function enviarMensaje(formData: FormData) {
  "use server";
  const supabase = getSupabase();
  if (!supabase) return;

  const usuario = String(formData.get("usuario") ?? "").trim().toLowerCase();
  const mensaje = String(formData.get("mensaje") ?? "").trim();
  if (!usuario || !mensaje) return;

  await supabase.from("mensajes").insert({ usuario, mensaje });
  revalidatePath("/supabase");
}

export default async function PaginaSupabase() {
  if (!supabaseConfigurado()) {
    return (
      <Contenedor>
        <Aviso titulo="Falta conectar Supabase">
          Copia <code>.env.example</code> como <code>.env.local</code>, pega tu URL y tu publishable
          key, y reinicia <code>npm run dev</code>.
        </Aviso>
      </Contenedor>
    );
  }

  const supabase = getSupabase()!;
  const { data, error } = await supabase
    .from("mensajes")
    .select("id, usuario, mensaje, creado_en")
    .order("creado_en", { ascending: false })
    .limit(20);

  return (
    <Contenedor>
      {error ? (
        <Aviso titulo="Conectado, pero algo falta">
          Supabase respondió: <code>{error.message}</code>
          <br />
          Si dice que la tabla no existe, pídele a OpenCode que la cree (Misión 5, paso 3).
          Si dice algo de permisos, revisa las políticas RLS.
        </Aviso>
      ) : (
        <>
          <form action={enviarMensaje} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              name="usuario"
              placeholder="tu-usuario"
              required
              className="rounded-lg border border-borde bg-tinta px-3 py-2 font-mono text-sm outline-none focus:border-acento sm:w-40"
            />
            <input
              name="mensaje"
              placeholder="Escribe un mensaje…"
              required
              maxLength={200}
              className="flex-1 rounded-lg border border-borde bg-tinta px-3 py-2 text-sm outline-none focus:border-acento"
            />
            <button className="rounded-lg bg-acento px-4 py-2 text-sm font-semibold text-tinta hover:opacity-90">
              Enviar
            </button>
          </form>

          <ul className="mt-6 space-y-3">
            {(data as Mensaje[]).length === 0 && (
              <li className="text-tenue">La tabla está vacía. ¡Escribe el primer mensaje!</li>
            )}
            {(data as Mensaje[]).map((m) => (
              <li key={m.id} className="rounded-xl border border-borde bg-panel p-4">
                <p>{m.mensaje}</p>
                <p className="mt-1 font-mono text-xs text-tenue">
                  @{m.usuario} · {new Date(m.creado_en).toLocaleString("es-MX")}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </Contenedor>
  );
}

function Contenedor({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="font-mono text-sm text-acento">MISIÓN 5</p>
      <h1 className="mt-1 text-3xl font-bold">Mensajes desde Supabase</h1>
      <p className="mt-2 text-tenue">
        Esta página habla con tu base de datos de Postgres en la nube.
      </p>
      {children}
    </main>
  );
}

function Aviso({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm">
      <p className="font-semibold text-amber-300">{titulo}</p>
      <p className="mt-1 text-tenue">{children}</p>
    </div>
  );
}
