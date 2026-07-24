import { supabase } from "../lib/supabase";

export interface PortalApiError {
  message: string;
}

export type PortalApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

/**
 * Calls the CRM's link-account bridge so the newly-authenticated Supabase user
 * gets matched or created against `customers` and linked via `customer_accounts`.
 * This can't happen purely client-side: matching by email across all customers
 * requires a privileged lookup the signed-in user's own RLS identity can't do
 * (they have no customer_accounts row yet at signup time). The CRM verifies the
 * access token itself server-side — it never trusts a client-submitted user id.
 */
export async function linkPortalAccount(accessToken: string, fullName: string): Promise<PortalApiResult<{ customerId: string }>> {
  const crmApiUrl = import.meta.env.VITE_CRM_API_URL?.trim();
  if (!crmApiUrl) {
    return { success: false, error: "Portal linking is not configured." };
  }

  try {
    const response = await fetch(`${crmApiUrl}/api/v1/portal/link-account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ fullName }),
    });

    const body: unknown = await response.json().catch(() => null);

    if (!response.ok || !body || typeof body !== "object" || !("success" in body) || !body.success) {
      const message =
        body && typeof body === "object" && "error" in body && typeof body.error === "string"
          ? body.error
          : "Could not finish linking your portal account.";
      return { success: false, error: message };
    }

    const data = (body as unknown as { data: { customerId: string } }).data;
    return { success: true, data };
  } catch {
    return { success: false, error: "Could not reach the server. Please try again." };
  }
}

export async function signUpPortalCustomer(
  fullName: string,
  email: string,
  password: string,
): Promise<PortalApiResult<{ needsEmailConfirmation: boolean; userId: string | null }>> {
  if (!supabase) return { success: false, error: "Portal sign-up is not configured." };

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        account_type: "customer",
      },
      // Without this, Supabase's confirmation email falls back to the
      // project's configured Site URL — currently the CRM app, not this
      // site — leaving the customer with nowhere to land after confirming.
      emailRedirectTo: `${window.location.origin}/customer-portal/confirmed`,
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  const accessToken = data.session?.access_token;
  if (!accessToken) {
    // Email confirmation is required before a session exists — nothing to
    // link yet. Linking happens on their first successful sign-in instead.
    return { success: true, data: { needsEmailConfirmation: true, userId: null } };
  }

  const linkResult = await linkPortalAccount(accessToken, fullName);
  if (!linkResult.success) {
    return { success: false, error: linkResult.error };
  }

  return { success: true, data: { needsEmailConfirmation: false, userId: data.user?.id ?? null } };
}

/**
 * Returns the signed-in user's id only once linking has actually finished —
 * callers should use this id to trigger the dashboard fetch directly instead
 * of relying solely on the reactive auth-state-change listener, which fires
 * as soon as the SDK has a token (before this function's awaited link call
 * resolves) and can otherwise race the dashboard's own "is this customer
 * linked yet" query, showing a false not-linked state on first sign-in.
 */
export async function signInPortalCustomer(email: string, password: string): Promise<PortalApiResult<{ userId: string }>> {
  if (!supabase) return { success: false, error: "Portal sign-in is not configured." };

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { success: false, error: "Could not sign in with those credentials." };
  }

  const accessToken = data.session?.access_token;
  if (accessToken) {
    // Idempotent safety net: guards against a prior signup whose link step
    // failed partway (network drop, etc.) leaving an auth user with no
    // customer_accounts row yet.
    const fullName = typeof data.user?.user_metadata?.full_name === "string" ? data.user.user_metadata.full_name : "";
    await linkPortalAccount(accessToken, fullName);
  }

  return { success: true, data: { userId: data.user.id } };
}

/**
 * Called from the /customer-portal/confirmed landing page after a customer
 * clicks their confirmation email link. supabase-js auto-detects the token
 * in the URL and establishes a session before this runs, but that session
 * never goes through signUpPortalCustomer/signInPortalCustomer — so without
 * this, a confirmed customer would land on the site "signed in" but never
 * actually linked to a customer_accounts row.
 */
export async function completeEmailConfirmation(): Promise<PortalApiResult<{ userId: string }>> {
  if (!supabase) return { success: false, error: "Portal sign-up is not configured." };

  const { data } = await supabase.auth.getSession();
  const session = data.session;
  if (!session) {
    return { success: false, error: "No confirmation session found. Try signing in directly." };
  }

  const fullName =
    typeof session.user.user_metadata?.full_name === "string" ? session.user.user_metadata.full_name : "";
  const linkResult = await linkPortalAccount(session.access_token, fullName);
  if (!linkResult.success) {
    return { success: false, error: linkResult.error };
  }

  return { success: true, data: { userId: session.user.id } };
}

export async function signOutPortalCustomer(): Promise<void> {
  if (!supabase) return;
  await supabase.auth.signOut();
}
