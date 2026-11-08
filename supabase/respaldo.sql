-- ⚠️ PLAN B: usa este archivo SOLO si el MCP no te funcionó.
-- La idea de la Misión 5 es que OpenCode cree esto por ti a través del MCP.
-- Si no se pudo: Supabase → SQL Editor → pega todo esto → Run.

create table if not exists public.mensajes (
  id bigint generated always as identity primary key,
  usuario text not null check (char_length(usuario) between 1 and 39),
  mensaje text not null check (char_length(mensaje) between 1 and 200),
  creado_en timestamptz not null default now()
);

-- RLS: sin políticas, NADIE puede leer ni escribir con la llave pública.
alter table public.mensajes enable row level security;

-- Cualquiera puede leer (es un muro público de práctica)
create policy "lectura publica" on public.mensajes
  for select to anon using (true);

-- Cualquiera puede insertar (solo para practicar; en una app real se exige login)
create policy "insercion publica" on public.mensajes
  for insert to anon with check (true);

insert into public.mensajes (usuario, mensaje)
values ('ejemplo-profe', '¡Hola desde SQL!');
