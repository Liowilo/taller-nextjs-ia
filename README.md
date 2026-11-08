# 🧱 Muro del Taller — Next.js · Tailwind · Node · OpenCode · v0 · Supabase

Hoy vas a construir **tu propia página** dentro de una app real de Next.js, usar IA para diseñar
y programar, conectar un agente a una base de datos… y entregarlo todo con un **Pull Request**.

Al final, tu tarjeta aparecerá en el muro de la clase. 🎯

> **Regla de oro:** solo tocas **tus** archivos:
> `alumnos/<tu-usuario>.json` y `src/app/alumnos/<tu-usuario>/`.
> El robot de GitHub rechaza el PR si modificas otra cosa.

---

## 🗺️ Mapa del proyecto

```
alumnos/                      ← un JSON por estudiante (los datos de tu tarjeta)
src/app/
  layout.tsx                  ← envuelve TODAS las páginas (navbar)
  page.tsx                    ← el muro: lee /alumnos y pinta las tarjetas
  alumnos/
    _plantilla/               ← plantilla (el "_" hace que Next la ignore)
    ejemplo-profe/            ← ejemplo terminado: /alumnos/ejemplo-profe
    <tu-usuario>/             ← ¡TU página! la creas en la Misión 1
  supabase/page.tsx           ← página que lee tu base de datos (Misión 5)
src/lib/                      ← funciones compartidas (no se tocan)
ejercicios/node/              ← scripts de práctica de Node
scripts/                      ← herramientas del taller (crear alumno, validar)
opencode.json                 ← configuración de OpenCode: modelo de NVIDIA + MCP de Supabase
AGENTS.md                     ← reglas que OpenCode lee antes de trabajar
```

---

## 🟢 Misión 0 · Prepárate (antes de clase)

Necesitas: **Node.js 20.9+** (`node -v`), **Git** (`git -v`), **VS Code**, y cuentas en
[GitHub](https://github.com), [NVIDIA Build](https://build.nvidia.com), [Supabase](https://supabase.com) y [v0](https://v0.app).

```bash
# 1. Haz FORK de este repo (botón "Fork" arriba a la derecha en GitHub)
# 2. Clona TU fork (cambia TU-USUARIO)
git clone https://github.com/TU-USUARIO/taller-nextjs-ia.git
cd taller-nextjs-ia

# 3. Crea tu rama de trabajo
git checkout -b entrega/TU-USUARIO

# 4. Instala dependencias y arranca
npm install
npm run dev
```

Abre <http://localhost:3000>. Si ves el muro con la tarjeta del profe → **✅ escribe "M0 lista" en #checkpoints**.

---

## 🟩 Misión 1 · Node.js: JavaScript fuera del navegador

Abre **otra terminal** (deja `npm run dev` corriendo en la primera).

```bash
npm run node:hola          # Node te hace preguntas en la terminal
npm run node:archivos      # Node lee la carpeta /alumnos
```

Ahora usa un script de Node para crear tu espacio:

```bash
npm run nuevo-alumno -- TU-USUARIO-DE-GITHUB
```

1. Abre `alumnos/TU-USUARIO.json` y cambia `nombre`, `frase`, `emoji` y `color`.
2. Visita <http://localhost:3000/alumnos/TU-USUARIO>. Guarda el JSON y mira cómo cambia solo.
3. Revisa que todo esté bien: `npm run validar -- TU-USUARIO`

```bash
git add .
git commit -m "M1: creo mi página"
```

🧩 **Retos extra:** `RETO 1.1` y `RETO 1.2` dentro de `ejercicios/node/`.

---

## 🟦 Misión 2 · Next.js + Tailwind

Abre `src/app/alumnos/TU-USUARIO/page.tsx`. Ahí hay 4 retos marcados como `RETO 2.x`.

**Ideas clave**
- **Ruta = carpeta.** `src/app/alumnos/ana/page.tsx` → `/alumnos/ana`. No hay archivo de rutas.
- **Server Component** (por defecto): corre en el servidor, puede leer archivos o la base de datos.
- **Client Component** (`"use client"`): corre en el navegador, puede usar `useState` y `onClick`.
- **Tailwind = estilos como clases.** `p-6` padding, `rounded-2xl` bordes, `md:` "en pantallas medianas", `hover:` "al pasar el mouse".
- ⚠️ `bg-${color}-500` **no funciona**: Tailwind solo ve clases escritas completas. Para colores que vienen de datos usamos `style={{ color: alumno.color }}`.

Cuando termines: en tu JSON pon `"nextTailwind": true` →

```bash
git commit -am "M2: retos de Tailwind"
```

---

## 🟪 Misión 3 · v0: diseña con IA

1. Entra a [v0.app](https://v0.app) y pega uno de los prompts de [`docs/prompts-v0.md`](docs/prompts-v0.md) (o inventa el tuyo).
2. Itera 2–3 veces ("hazlo más compacto", "agrega un botón", "usa tonos morados").
3. Copia el código y **reemplaza** el contenido de `src/app/alumnos/TU-USUARIO/ComponenteV0.tsx`.
4. Requisitos para que compile:
   - Debe llamarse `export function ComponenteV0()`
   - Sin `@/components/ui/...` (pídele a v0: *"reescríbelo sin shadcn, solo HTML y Tailwind"*)
   - Si usa `useState`/`onClick`, la **primera línea** es `"use client";`

`"v0": true` en tu JSON →

```bash
git commit -am "M3: componente de v0"
```

---

## 🟧 Misión 4 · OpenCode + modelo gratuito de NVIDIA

### 4.1 Consigue tu llave
[build.nvidia.com](https://build.nvidia.com) → inicia sesión → **API Keys** → *Generate*. Empieza con `nvapi-`.

```bash
cp .env.example .env.local        # Windows: copy .env.example .env.local
```
Abre `.env.local` y pega tu llave en `NVIDIA_API_KEY=`. Deja `NVIDIA_MODEL=` vacío.
Prueba que funciona **sin agente**:

```bash
npm run node:nvidia -- "¿Qué es Tailwind en una línea?"
npm run node:nvidia -- --probar       # cuáles modelos de opencode.json funcionan hoy
```

### 4.2 Instala OpenCode
```bash
npm install -g opencode-ai
# o en macOS/Linux:  curl -fsSL https://opencode.ai/install | bash
```

### 4.3 Dale tu llave a OpenCode

> ⚠️ **Tu llave tiene que estar en DOS lugares**, porque son dos programas distintos:
>
> | Programa | ¿De dónde lee la llave? | ¿Ya lo hiciste? |
> |---|---|---|
> | `npm run node:nvidia` y Next.js | del archivo `.env.local` | ✅ sí, en el paso 4.1 |
> | **OpenCode** | de una **variable de entorno de tu terminal** llamada `NVIDIA_API_KEY` | ❌ todavía no, es este paso |
>
> OpenCode **no lee** tu `.env.local`. Por eso, aunque `npm run node:nvidia` te funcione, OpenCode puede fallar.

#### Paso 1 · ¿Qué terminal estás usando?

Mira el inicio de la línea donde escribes:

| Si ves algo como… | Es… | Usa los comandos marcados como |
|---|---|---|
| `PS C:\Users\ana>` | **PowerShell** (Windows, y la terminal por defecto de VS Code en Windows) | `# PowerShell` |
| `C:\Users\ana>` (sin `PS`) | **Símbolo del sistema / CMD** (Windows) | `:: CMD` |
| `ana@laptop MINGW64 ~` | **Git Bash** (Windows) | `# Linux o Git Bash` |
| `ana@MacBook ~ %` | **Mac** | `# Mac` |
| `ana@pc:~$` | **Linux** | `# Linux o Git Bash` |

#### Paso 2 · Elige UNA de estas dos formas

En todos los comandos cambia `nvapi-TU-LLAVE` por tu llave real, **sin espacios**.

**🅰️ Forma temporal: solo para esta terminal.** Se borra al cerrar la terminal; cada vez que abras una nueva, lo repites.
Úsala en computadoras del laboratorio o compartidas.

```powershell
# PowerShell
$env:NVIDIA_API_KEY="nvapi-TU-LLAVE"
```
```bat
:: CMD (sin comillas)
set NVIDIA_API_KEY=nvapi-TU-LLAVE
```
```bash
# Mac, Linux o Git Bash
export NVIDIA_API_KEY="nvapi-TU-LLAVE"
```

Después, **en esa misma terminal**, sigue al paso 3.

**🅱️ Forma permanente: recomendada en tu computadora personal.** Se guarda en tu usuario y sirve en todas las terminales que abras después.

```powershell
# PowerShell
[Environment]::SetEnvironmentVariable("NVIDIA_API_KEY", "nvapi-TU-LLAVE", "User")
```
```bat
:: CMD
setx NVIDIA_API_KEY "nvapi-TU-LLAVE"
```
```bash
# Mac (zsh, la terminal por defecto)
echo 'export NVIDIA_API_KEY="nvapi-TU-LLAVE"' >> ~/.zshrc
```
```bash
# Linux o Git Bash
echo 'export NVIDIA_API_KEY="nvapi-TU-LLAVE"' >> ~/.bashrc
```

👉 **Importante:** la forma permanente **no aplica a la terminal que ya tienes abierta**. Ciérrala y abre una nueva.
Si usas la terminal de VS Code, **cierra VS Code por completo** (no solo la terminal) y ábrelo otra vez.

#### Paso 3 · Comprueba que la terminal sí tiene tu llave

```powershell
# PowerShell
echo $env:NVIDIA_API_KEY
```
```bat
:: CMD
echo %NVIDIA_API_KEY%
```
```bash
# Mac, Linux o Git Bash
echo $NVIDIA_API_KEY
```

- ✅ Si imprime `nvapi-...` → listo, sigue al paso 4.
- ❌ Si sale vacío (o en CMD sale literalmente `%NVIDIA_API_KEY%`) → la terminal no tiene la llave. Revisa que la escribiste en la misma terminal (forma temporal) o que abriste una terminal nueva (forma permanente).

#### Paso 4 · Abre OpenCode desde la carpeta del proyecto

```bash
opencode
```

Escribe `/models` y elige un modelo de **NVIDIA (gratis)**. El recomendado ya viene seleccionado.
Mándale un "hola" para probar.

| Si te sale… | Significa… | Haz esto |
|---|---|---|
| `401` / `Unauthorized` / `invalid api key` | OpenCode no encontró tu llave, o está mal copiada | Repite el paso 3. Si sale bien, revisa que no copiaste espacios de más |
| `410 Gone` / `404` / `end of life` | NVIDIA retiró ese modelo | `/models` y elige otro. Tu conversación no se pierde |
| `429` / `Too Many Requests` | Límite de peticiones por minuto del plan gratis | Espera 1 minuto o cambia de modelo con `/models` |
| Se queda pensando más de 1 minuto | El modelo está saturado | `Esc` para cancelar, `/models` y elige otro |

> 🔒 **Tu llave es como una contraseña.** No la pegues en Discord, en el chat de OpenCode ni en ningún archivo que subas a GitHub.
> Si se te escapó, entra a build.nvidia.com, bórrala y genera otra.

### 4.4 Ponlo a trabajar
OpenCode ya leyó `AGENTS.md`, así que sabe que solo debe tocar tu carpeta. Prueba (cambia TU-USUARIO):

```
Lee src/app/alumnos/TU-USUARIO/page.tsx. Crea un componente cliente Reacciones.tsx
en esa misma carpeta con 3 botones de emoji que cuenten clics, y agrégalo donde dice MISIÓN 4.
```

Luego pídele algo tuyo: un contador regresivo para vacaciones, un modo claro/oscuro solo para tu
tarjeta, una galería… **Lee lo que propone antes de aceptar.**

- Tecla `Tab`: cambia entre modo **plan** (solo propone) y **build** (edita archivos).
- `/undo` deshace el último cambio. `/share` NO lo uses (publica tu conversación).

En tu JSON: `"opencode": true` y en `promptFavorito` el prompt que mejor te funcionó →

```bash
git add .
git commit -m "M4: OpenCode agrega componente"
```
(Aquí usamos `git add .` porque OpenCode creó archivos nuevos; `commit -am` solo guarda archivos que ya existían.)

---

## 🟥 Misión 5 · Supabase + MCP: el agente habla con tu base de datos

**MCP** (Model Context Protocol) es un "enchufe" estándar que le da herramientas nuevas a un agente.
El MCP de Supabase le permite a OpenCode listar tablas, ejecutar SQL y leer la documentación de **tu** proyecto.

1. En [supabase.com/dashboard](https://supabase.com/dashboard) crea un proyecto nuevo (plan Free, región más cercana). Espera a que termine de crearse.
2. Autoriza el MCP (ya está en `opencode.json`):
   ```bash
   opencode mcp auth supabase
   ```
   Se abre el navegador → autoriza tu organización. Verifica con `opencode mcp list`.
3. Abre `opencode` y pídele:
   ```
   Usa el MCP de Supabase sobre mi proyecto <NOMBRE-DEL-PROYECTO>.
   Crea la tabla public.mensajes con: id (bigint identity, PK), usuario (text),
   mensaje (text, máx 200), creado_en (timestamptz default now()).
   Activa RLS y crea políticas para que el rol anon pueda hacer select e insert.
   Luego inserta un mensaje de prueba con mi usuario TU-USUARIO.
   ```
   Lee el SQL que te muestra **antes de aprobarlo**.
4. Pídele también: `¿Cuál es la URL y la publishable key de mi proyecto?` y pégalas en `.env.local`.
5. Reinicia `npm run dev` y abre <http://localhost:3000/supabase>. Escribe mensajes desde el formulario.
6. Pregúntale al agente: `¿Cuántos mensajes hay en la tabla mensajes?` — ¡está leyendo tu base real!

> ¿El MCP no conectó? Plan B: copia `supabase/respaldo.sql` en el **SQL Editor** de Supabase. Avísale al profe.

`"supabase": true` en tu JSON →

```bash
git commit -am "M5: Supabase con MCP"
```

---

## 🏁 Misión final · Entrega con Pull Request

1. Pon en tu JSON el `codigoSesion`: la **palabra secreta** que el profe dirá en la clase.
2. Comprueba antes de subir:
   ```bash
   npm run validar -- TU-USUARIO
   npm run build
   ```
3. Sube tu rama a **tu fork**:
   ```bash
   git add .
   git commit -m "Entrega final"
   git push -u origin entrega/TU-USUARIO
   ```
4. En GitHub verás **"Compare & pull request"**. El PR va **hacia `main` del repo del profe**.
5. Llena la plantilla: palomea misiones y **arrastra tus 3 capturas**.
6. Espera la palomita verde ✅ del robot. Si sale ❌, abre *Details*, corrige, haz commit y push (el PR se actualiza solo).
7. Pega el link de tu PR en **#entregas** de Discord.

🎉 Cuando el profe haga merge, tu tarjeta aparece en el muro.

---

## 🆘 ¿Algo falló?
Revisa [`docs/problemas-comunes.md`](docs/problemas-comunes.md) y luego pregunta en **#ayuda** con:
captura del error + qué comando corriste + tu sistema operativo.

**Nunca** pegues tu `nvapi-...` ni tu `.env.local` en Discord ni en GitHub.