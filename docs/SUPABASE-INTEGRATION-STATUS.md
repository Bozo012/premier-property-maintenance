# Supabase Integration Status

Audit date: 2026-07-24 (supersedes the 2026-07-22 version below)
Repo: `C:\dev\Modern Service System Website`
Branch: `main`

---

## 1. Current state — public portal doorway hands off to Forge

The marketing site owns the public `/customer-portal` presentation only. It no
longer creates Supabase sessions, stores customer portal tokens, links customer
accounts, or queries customer-safe CRM data in the browser.

- **Public route**: `src/app/pages/CustomerPortal.tsx` keeps the Premier
  Property Maintenance branded sign-in/sign-up UI.
- **Handoff**: the form posts directly to Forge-owned endpoints under
  `VITE_FORGE_PORTAL_ORIGIN`:
  - `POST /portal/handoff/sign-in`
  - `POST /portal/handoff/sign-up`
- **Rental properties route**: `/rental-properties` includes portal sign-in and
  sign-up CTAs that preselect the correct `/customer-portal` mode while keeping
  the marketing site as the public doorway.
- **Password recovery**: "Forgot password?" links to Forge's
  `/portal/forgot-password`; Forge owns reset email generation and the
  `/update-password` callback.
- **Request access**: the existing customer-account creation/linking path is
  executed in Forge, not in this Vite app.
- **Session boundary**: Forge establishes its own Supabase SSR cookie session on
  `app.ppmnky.com` and redirects successful customers to the authenticated
  Forge portal dashboard.
- **Service requests**: `/request-service` remains a public, no-login channel
  and posts to Forge CRM's `POST /api/v1/service-requests` endpoint via
  `VITE_CRM_API_URL`; Forge creates or deduplicates the CRM customer/property
  records and inserts the `service_requests` row.
- **Configuration**: `.env.example` now uses `VITE_FORGE_PORTAL_ORIGIN`; the
  old `VITE_SUPABASE_URL`/`VITE_SUPABASE_PUBLISHABLE_KEY` browser configuration
  is intentionally removed from the marketing repo.

## 2. Historical state — direct website Supabase integration retired

The customer portal (`/customer-portal`) is wired to real Supabase Auth and real
CRM data. This is a genuine integration, not a mock:

- **Dependency**: `@supabase/supabase-js` (`^2.110.8`) in `dependencies`.
- **Client**: `src/app/lib/supabase.ts` — browser client using the anon/publishable
  key (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`). Safe to expose:
  every read is gated by the CRM's RLS policies, not by client-side trust.
- **Env vars** (see `.env.example`): `VITE_CRM_API_URL` (unchanged, points at the
  CRM's public API), `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (new).
- **Auth**: `src/app/portal/portal-api.ts` — `signUpPortalCustomer`,
  `signInPortalCustomer`, `signOutPortalCustomer`. Calls Supabase Auth directly
  from the browser (safe — anon key), then calls a new CRM bridge endpoint
  (`POST /api/v1/portal/link-account`) to run the match-or-create-by-email
  linking logic ported from `Premier-CRM`'s `ensureCustomerAccount`. That step
  can't happen client-side: it requires a privileged lookup across all
  customers by email, which the caller's own RLS identity can't do before
  they have a `customer_accounts` row. The CRM endpoint verifies the caller's
  identity from their Supabase access token itself (`auth.getUser(token)`) —
  it never trusts a client-submitted user id or email.
- **Session**: `src/app/portal/use-portal-session.ts` — tracks the Supabase
  session reactively (`getSession()` + `onAuthStateChange`).
- **Dashboard data**: `src/app/portal/portal-dashboard-data.ts` — real queries
  against `service_requests`, `customer_properties`/`properties`, and
  `invoices` (new — see RLS section), scoped by the signed-in user's linked
  `customer_id`, RLS-enforced. Mirrors the query shape of `Premier-CRM`'s
  `apps/web/app/portal/dashboard/page.tsx`.
- **UI**: `src/app/pages/CustomerPortal.tsx` — same visual layout/component
  structure as before (no design changes). The sign-in card now has a working
  submit handler and a sign-up mode toggle (new — the mockup only had a
  "Request Access" `href="#"` placeholder; the added full-name field matches
  the existing input styling exactly). The "Dashboard Preview" section (the
  hardcoded `3 / 12 / 5 / $0` stats + 3-entry mock request list) is gone —
  replaced by the same visual structure showing real data, shown only when
  signed in, with honest loading/not-linked/error states instead of any
  fabricated fallback numbers.
- **Request Service** (`/request-service`): unchanged. Still posts directly to
  the CRM's public `/api/v1/service-requests` endpoint (CORS-locked,
  rate-limited, honeypot-protected), independent of portal auth. This is by
  design per the integration plan — it stays a public, no-login channel.
- **Phone placeholders**: already fixed by earlier work (not part of this
  pass) — `Home.tsx`/`RequestService.tsx`/`Root.tsx` all use
  `buildPhoneHref`/`buildSmsHref` from `src/app/config/contact.ts` with the
  real number, sourced from the CRM-backed `website-content-provider`.
- **Staff login entry point**: added — a "Staff Login" link in the footer
  (`Root.tsx`, "Company" column) pointing to `https://app.ppmnky.com/login`,
  matching the existing footer link styling exactly.

## 2. Premier-CRM changes (schema-owning repo, per the integration plan)

- **Migration** `supabase/migrations/20260724000000_portal_customer_invoices_rls.sql`
  — adds `customer_select_own_invoices`, a SELECT-only RLS policy on
  `invoices` scoped through `jobs.customer_id` → `customer_accounts`. Additive;
  does not touch the existing `org_isolation_invoices` staff policy. Applied
  to `premier-crm-prod` with explicit approval (per the hard constraint) on
  2026-07-24. Confirmed live via direct `pg_policies` query before and after.
  This closes the one real RLS gap found: `quotes`/`invoices`/`payments`/line
  items had only staff-facing `org_isolation` policies, no customer-scoped
  policy at all, before this pass. Only `invoices` got a new policy — the
  dashboard only needs an aggregate balance, not quote or line-item detail,
  and the CRM's own reference `/portal` dashboard doesn't surface quotes
  either.
- **New route** `apps/web/app/api/v1/portal/link-account/route.ts` — the
  bridge endpoint described above. CORS-locked (same allow-list pattern as
  `service-requests`/`quote-requests`/`website-content`), rate-limited
  (20/hour/IP — generous since real usage is ~once per signup/signin, not a
  public high-volume form), requires and verifies a bearer token, reuses
  `findCustomerByEmail` from `packages/db/queries/customers.ts` and the exact
  match-or-create + `customer_accounts` upsert shape from
  `apps/web/app/portal/actions.ts`'s `ensureCustomerAccount`.
- Types regenerated (`pnpm db:types`) after the migration — no diff (RLS
  policies aren't reflected in generated table types, only schema shape).
- `Premier-CRM`'s own `apps/web/app/portal/` (the reference implementation)
  is **untouched and still live** — retiring it is an explicit later step per
  the integration plan (step 8), not part of this pass.

## 3. Verified end-to-end (real browser click-through, not just code review)

Sign up → confirm → sign in → submit request → dashboard, using a real
Gmail address (plus-addressing to an inbox the user controls) since this
Supabase project genuinely requires email confirmation — discovered during
testing, not assumed. Since I can't click a real inbox link, email
confirmation was completed via the Supabase admin API (same pattern used
elsewhere in this project for test accounts) rather than skipped.

- Sign-up with `@example.com` correctly failed (Supabase's SMTP relay rejects
  test-only domains) — not a bug in this integration, caught and understood
  before moving on with a real deliverable address.
- **Real bug found and fixed during this click-through**: the dashboard's
  reactive fetch (triggered by `onAuthStateChange`) could fire before the
  awaited account-linking call finished, showing a false "not-linked" state
  on a customer's very first sign-in even though linking was actually
  in-flight and about to succeed. Fixed by having `signInPortalCustomer`/
  `signUpPortalCustomer` return the user id only once linking has actually
  resolved, and having the sign-in submit handler load the dashboard directly
  with that id instead of relying solely on the reactive session effect.
  Re-verified clean after the fix: first-ever sign-in now shows the real
  dashboard immediately, no false fallback.
- Submitted a real request via `/request-service` using the same email as the
  signed-up portal customer — `createServiceRequest`'s existing email dedupe
  correctly attached it to the same customer record, confirmed visible on the
  portal dashboard (`SR-000003`, correct property/date/status) and directly
  in `service_requests` (same row staff `/requests` would read).
- **RLS independently verified as the real security boundary**, not just
  app-level filtering: authenticated as the test customer via a real password
  grant, queried `service_requests` with no filter (returned only their own
  row) and explicitly queried a different customer's request by number
  (returned zero rows). The anon-key + RLS model genuinely holds.
- All test data (auth user, customer, property, customer_properties,
  customer_accounts, service_request) deleted afterward; confirmed zero
  residue in `premier-crm-prod`.

## 4. Known gaps (ranked)

**Important:**
- Supabase's confirmation email links back to `https://app.ppmnky.com` (the
  CRM's configured Site URL), not this website. There's no dedicated
  confirmation-landing page on either side — a real customer clicking the
  confirmation link would land on the CRM's root, not back on the website's
  sign-in flow. Not exercised or fixed in this pass (out of scope — this is
  an Auth *configuration* question, not a website code gap), but real and
  should be resolved before this ships to actual customers.
- "Forgot password?" is still `href="#"` — not built in this pass (not
  requested, and the CRM's own reference portal doesn't have it either).

**Nice-to-have:**
- The dashboard's `Database` typing is loose (the browser Supabase client
  has no generated `Database` generic — that would mean duplicating
  `packages/db/types.ts`, which is CRM-owned per the integration plan's data
  ownership section). Manual type assertions in
  `portal-dashboard-data.ts` are minimal and scoped, not a functional risk.
- Quote acceptance from the dashboard: deferred, per the task's explicit
  default-to-defer guidance — no RLS write policy for `quotes` exists yet,
  so this isn't a low-effort addition. The token-link flow
  (`/q/[token]`) already handles quote acceptance independently of portal
  auth and is untouched.

## 5. Previous audit (2026-07-22, now superseded by the above)

At that point: zero Supabase footprint, no client, no package, no env vars,
sign-in form had no handler, dashboard stats/recent-requests were hardcoded
literals, phone links used a placeholder number. All of that is now resolved
except where noted above.
