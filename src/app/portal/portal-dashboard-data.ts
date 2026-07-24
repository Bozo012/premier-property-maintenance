import { supabase } from "../lib/supabase";

export interface ServiceRequestRow {
  id: string;
  requestNumber: string;
  status: string;
  serviceTitle: string;
  serviceDescription: string;
  submittedAt: string;
  propertyAddressLine1: string;
  propertyCity: string;
  propertyState: string;
}

export interface PropertyRow {
  id: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  zip: string;
  relationship: string | null;
  isPrimary: boolean | null;
}

export interface PortalDashboardData {
  accountStatus: string;
  activeRequests: ServiceRequestRow[];
  completedRequests: ServiceRequestRow[];
  properties: PropertyRow[];
  outstandingBalance: number;
  partialLoadError: boolean;
}

export type PortalDashboardResult =
  | { state: "linked"; data: PortalDashboardData }
  | { state: "not-linked" }
  | { state: "error"; message: string };

function isCompleted(status: string): boolean {
  return ["completed", "cancelled", "spam"].includes(status);
}

export async function fetchPortalDashboard(userId: string): Promise<PortalDashboardResult> {
  if (!supabase) {
    return { state: "error", message: "Portal data is not configured." };
  }

  const { data: account, error: accountError } = await supabase
    .from("customer_accounts")
    .select("customer_id, email, status")
    .eq("auth_user_id", userId)
    .limit(1)
    .maybeSingle();

  if (accountError) {
    return { state: "error", message: "Could not load your account. Please try again." };
  }
  if (!account || account.status !== "active") {
    return { state: "not-linked" };
  }

  const customerId = account.customer_id as string;

  const [requestsResult, propertiesResult, invoicesResult] = await Promise.all([
    supabase
      .from("service_requests")
      .select(
        "id, request_number, status, service_title, service_description, submitted_at, property_address_line_1, property_city, property_state",
      )
      .eq("customer_id", customerId)
      .order("submitted_at", { ascending: false }),
    supabase
      .from("customer_properties")
      .select("relationship, is_primary, properties(id, address_line_1, address_line_2, city, state, zip)")
      .eq("customer_id", customerId),
    supabase
      .from("invoices")
      .select("id, status, amount_due, jobs!inner(customer_id)")
      .eq("jobs.customer_id", customerId)
      .neq("status", "void"),
  ]);

  const partialLoadError = Boolean(requestsResult.error || propertiesResult.error || invoicesResult.error);

  const serviceRequests: ServiceRequestRow[] = (requestsResult.data ?? []).map((row) => ({
    id: row.id,
    requestNumber: row.request_number,
    status: row.status,
    serviceTitle: row.service_title,
    serviceDescription: row.service_description,
    submittedAt: row.submitted_at,
    propertyAddressLine1: row.property_address_line_1,
    propertyCity: row.property_city,
    propertyState: row.property_state,
  }));

  const properties: PropertyRow[] = (propertiesResult.data ?? [])
    .filter((row) => row.properties)
    .map((row) => {
      const property = row.properties as unknown as {
        id: string;
        address_line_1: string;
        address_line_2: string | null;
        city: string;
        state: string;
        zip: string;
      };
      return {
        id: property.id,
        addressLine1: property.address_line_1,
        addressLine2: property.address_line_2,
        city: property.city,
        state: property.state,
        zip: property.zip,
        relationship: row.relationship,
        isPrimary: row.is_primary,
      };
    });

  const outstandingBalance = (invoicesResult.data ?? []).reduce(
    (sum, row) => sum + (typeof row.amount_due === "number" ? row.amount_due : Number(row.amount_due ?? 0)),
    0,
  );

  return {
    state: "linked",
    data: {
      accountStatus: account.status,
      activeRequests: serviceRequests.filter((request) => !isCompleted(request.status)),
      completedRequests: serviceRequests.filter((request) => isCompleted(request.status)),
      properties,
      outstandingBalance,
      partialLoadError,
    },
  };
}
