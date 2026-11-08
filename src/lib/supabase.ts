import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Las variables NEXT_PUBLIC_* se leen de .env.local.
// La "publishable key" es pública a propósito: lo que protege tus datos son las políticas RLS.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function supabaseConfigurado(): boolean {
  return Boolean(url && key && !url.includes("xxxx"));
}

export function getSupabase(): SupabaseClient | null {
  if (!supabaseConfigurado()) return null;
  return createClient(url!, key!);
}
