export const SERVICE_REQUEST_ENDPOINT_PATH = "/api/v1/service-requests";

export function buildServiceRequestEndpoint(
  crmApiUrl = import.meta.env.VITE_CRM_API_URL,
): string {
  const trimmedCrmApiUrl = crmApiUrl?.trim().replace(/\/+$/, "");

  if (!trimmedCrmApiUrl) {
    return "";
  }

  return `${trimmedCrmApiUrl}${SERVICE_REQUEST_ENDPOINT_PATH}`;
}

export function buildServiceRequestBody<T extends object>(
  payload: T,
  honeypot: string,
): T & { _hp: string } {
  return {
    ...Object.fromEntries(
      Object.entries(payload).map(([key, value]) => [
        key,
        typeof value === "string" ? value.trim() : value,
      ]),
    ),
    _hp: honeypot,
  } as T & { _hp: string };
}
