import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

// Safe to expose client-side: this is the anon/publishable key, gated entirely
// by the RLS policies on the CRM side (customer_accounts.auth_user_id = auth.uid()).
// If unset, portal auth/dashboard features degrade to an honest "unavailable"
// state rather than throwing at import time.
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null;
