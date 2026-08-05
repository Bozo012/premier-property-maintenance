export type PortalAuthMode = "signin" | "request-access";

const DEFAULT_FORGE_PORTAL_ORIGIN = "https://app.ppmnky.com";

const STATUS_MESSAGES: Record<string, string> = {
  "missing-credentials": "Enter your email and password to sign in.",
  "missing-access-fields": "Enter your name, email, and password to request access.",
  "password-too-short": "Use at least 8 characters for your portal password.",
  "invalid-credentials": "Could not sign in with those portal credentials.",
  "account-created-check-email": "Account created. Check your email to confirm it, then sign in.",
  "account-link-failed": "We could not finish linking your portal account. Please try again.",
  "portal-unavailable": "The customer portal is not available right now. Please contact Premier.",
  "signed-out": "You have been signed out.",
};

function normalizeOrigin(value: string | undefined): string {
  const trimmed = value?.trim();
  if (!trimmed) return DEFAULT_FORGE_PORTAL_ORIGIN;
  return trimmed.replace(/\/+$/, "");
}

export function getForgePortalOrigin(): string {
  return normalizeOrigin(
    import.meta.env.VITE_FORGE_PORTAL_ORIGIN ??
      import.meta.env.VITE_CRM_API_URL,
  );
}

export function buildForgePortalUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getForgePortalOrigin()}${normalizedPath}`;
}

export function buildPortalFormAction(mode: PortalAuthMode): string {
  return buildForgePortalUrl(
    mode === "signin"
      ? "/portal/handoff/sign-in"
      : "/portal/handoff/request-access",
  );
}

export function getPortalStatusMessage(status: string | null): string | null {
  if (!status) return null;
  return STATUS_MESSAGES[status] ?? null;
}
