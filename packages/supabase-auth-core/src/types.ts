import type { SupabaseClient } from "@supabase/supabase-js";

export type AuthResult = {
  error: string | null;
};

export type AuthClientOptions = {
  /** Cliente de @supabase/supabase-js ya configurado */
  supabase: SupabaseClient;
  /** URL de redirect para email flows (signup confirm, password recovery) */
  redirectTo?: string;
};
