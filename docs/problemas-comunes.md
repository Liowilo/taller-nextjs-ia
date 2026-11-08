# 🆘 Problemas comunes

| Síntoma | Causa probable | Solución |
|---|---|---|
| `npm: command not found` / `'npm' no se reconoce` | Node no está instalado o la terminal se abrió antes de instalarlo | Instala Node LTS desde nodejs.org y **abre una terminal nueva** |
| `Port 3000 is in use` | Ya tienes otro `npm run dev` corriendo | Ciérralo (Ctrl+C) o usa el puerto que te ofrece (3001) |
| Mi página da **404** | El `usuario` del JSON no coincide con el nombre de la carpeta, o no guardaste | Deben ser idénticos y en minúsculas. `npm run validar -- tu-usuario` |
| `Unexpected token` al abrir la página | JSON mal escrito (coma de más/menos, comillas) | `npm run validar -- tu-usuario` te dice la línea |
| El componente de v0 rompe todo: `Module not found: @/components/ui/...` | v0 usó shadcn | Pídele a v0: "reescríbelo sin shadcn, solo HTML y Tailwind" |
| `useState only works in Client Components` | Falta `"use client"` | Agrégalo como **primera línea** del archivo del componente |
| `export 'ComponenteV0' was not found` | v0 lo llamó distinto o usó `export default` | Renómbralo: `export function ComponenteV0()` |
| OpenCode no muestra los modelos de NVIDIA | No exportaste la variable en **esa** terminal | `export NVIDIA_API_KEY=...` (o `$env:NVIDIA_API_KEY=...` en PowerShell) y vuelve a abrir `opencode` |
| `401 Unauthorized` con NVIDIA | Llave mal copiada | Genera otra en build.nvidia.com y revisa que empiece con `nvapi-` |
| `410 Gone` / `has reached its end of life` / `404 model not found` | NVIDIA retiró o renombró el modelo (pasa seguido en el plan gratis) | En OpenCode: `/models` y elige otro. Para saber cuáles sirven: `npm run node:nvidia -- --probar`. Si en `.env.local` tienes `NVIDIA_MODEL=...` viejo, bórralo |
| `429 Too Many Requests` | Límite del plan gratuito por minuto | Espera 1 minuto o cambia a otro modelo en `/models` |
| El modelo "piensa" pero no edita archivos | Estás en modo **plan** | Presiona `Tab` para pasar a modo **build** |
| `opencode mcp auth supabase` no abre el navegador | Terminal sin acceso a navegador | Copia el link que imprime y ábrelo a mano |
| La página `/supabase` dice "Falta conectar Supabase" | No hay `.env.local` o no reiniciaste | Llénalo y reinicia `npm run dev` |
| `/supabase` dice "permission denied" o la lista sale vacía al insertar | Falta la política RLS | Pídele a OpenCode: "revisa las políticas RLS de mensajes para el rol anon" |
| El robot del PR dice "archivos que NO deberías modificar" | Cambiaste algo fuera de tu carpeta (p. ej. `opencode.json`) | `git checkout origin/main -- <archivo>`, commit y push |
| El robot no corre en mi PR | Es tu primer PR al repo | Espera: el profe tiene que aprobar la ejecución |
