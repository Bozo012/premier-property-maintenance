# Website Settings CRM Integration Plan

## Goal
Keep the public website lightweight while moving frequently edited business content into the CRM. The CRM should be the source of truth for contact details, hero messaging, promotions, and featured service cards; this React/Vercel website should continue to own page structure, routing, layout, styling, and safe rendering fallbacks.

## Repository ownership boundary
This repo is the public website frontend only. It may document the website-facing contract and consume published content, but it should not own database schema, CRM admin screens, or backend API implementation.

The canonical implementation belongs in the Premier-CRM repo, including:

- Supabase tables, migrations, RLS policies, and seed data.
- CRM admin UI at `/app/settings/website`.
- Any authenticated CRUD services for staff editing.
- Any public read API or Supabase publication strategy.

## Preconditions for this website PR
- Freeze any cleanup pull request until `src/app/pages/RequestService.tsx` is verified against the main branch because it posts lead/service-request data to the CRM API.
- Keep the contact-normalisation work small and isolated: only consolidate phone/email values and fix mismatched `tel:`/`sms:` links.
- Do not change service-request POST behavior in this PR beyond contact display/link cleanup.
- Ship future settings consumption in phases so the public site always has local fallbacks if CRM/Supabase content is unavailable.

## CRM-managed content contract
The first CRM pass should make these fields available to the website:

### `website_settings`
- Public phone number display text.
- Public phone number URI value used by `tel:` and `sms:` links.
- Public contact email.
- Hero headline, subheadline, and primary CTA label/path.
- Emergency/availability text such as "Available 24/7".
- SEO defaults: site title, meta description, and social share image URL.

### `website_promotions`
- Timed homepage or sitewide banner copy.
- Optional CTA label and URL.
- Start/end dates, priority, and active flag.
- Lightweight targeting metadata, such as placement (`home_hero`, `site_banner`, or `services_cta`).

### `website_service_highlights`
- Featured home-page service title.
- Short description.
- Icon key that maps to an approved front-end icon.
- CTA label/path.
- Sort order and active flag.

## Static website responsibilities
These should remain in this repo for maintainability and speed:

- Page templates, route definitions, and layout components.
- Form structure and validation for service requests.
- Component styling, spacing, and responsive behavior.
- Approved icon mappings and safety constraints on outbound links.
- Hardcoded fallback content used if CRM/Supabase content is unavailable.

## Future public-site data flow
1. The CRM repo creates and owns read-optimized tables/API for website settings, promotions, and service highlights.
2. The CRM repo publishes only safe active content for public website consumption.
3. The website repo adds a small website-content client that reads the published content using the agreed public contract.
4. The website loads content at the page/component boundary, merges it with local fallbacks, and renders the same presentational components.
5. If the site later moves to server-side rendering, cache or revalidate content at a short interval; for the current Vite app, keep client fetches small and resilient.

## Future CRM admin UI scope
The separate CRM PR should cover:

- Settings form: single-record editor for phone, email, hero, CTA, and SEO defaults.
- Promotions list: create/edit/archive promotions with date windows.
- Service highlights list: create/edit/reorder/archive highlighted services.
- Validation: require safe CTA paths or approved external URLs; validate email and phone URI formatting.
- Auditability: store timestamps and updated-by fields where the CRM already tracks authenticated users.

## Deferred CMS additions
Defer these until the simple settings model proves useful:

- `website_pages` for full page-level CMS control.
- `website_faqs` for editable FAQ sections.
- Localized content tables if the business needs multilingual pages.
