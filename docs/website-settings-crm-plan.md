# Website Settings CRM Integration Plan

## Goal
Keep the public website lightweight while moving frequently edited business content into the CRM. The CRM should become the source of truth for contact details, hero messaging, promotions, and featured service cards; the React/Vercel site should continue to own page structure, routing, layout, and visual presentation.

## Preconditions
- Freeze any cleanup pull request until `src/app/pages/RequestService.tsx` is verified against the main branch because it posts lead/service-request data to the CRM API.
- Keep the contact-normalisation work small and isolated: only consolidate phone/email values and fix mismatched `tel:`/`sms:` links.
- Ship the settings feature in phases so the public site always has local fallbacks if Supabase content is missing.

## CRM-managed content
The first pass should make these fields editable from the CRM:

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
These should remain in code for maintainability and speed:

- Page templates, route definitions, and layout components.
- Form structure and validation for service requests.
- Component styling, spacing, and responsive behavior.
- Approved icon mappings and any safety constraints on outbound links.
- Hardcoded fallback content used if Supabase is unavailable.

## Public-site data flow
1. Create read-optimized Supabase tables for website settings, promotions, and service highlights.
2. Add Row Level Security policies that allow public anonymous `select` access only to active/published website content.
3. In the CRM admin area, add `/app/settings/website` with simple CRUD forms that write to those tables.
4. In the React/Vercel app, add a small website-content client that fetches from Supabase using the anon key.
5. Load content at the page/component boundary, merge it with local fallbacks, and render the same presentational components.
6. Cache or revalidate content at a short interval if the site later moves to server-side rendering; for the current Vite app, keep client fetches small and resilient.

## Admin UI scope for `/app/settings/website`
- Settings form: single-record editor for phone, email, hero, CTA, and SEO defaults.
- Promotions list: create/edit/archive promotions with date windows.
- Service highlights list: create/edit/reorder/archive highlighted services.
- Validation: require safe CTA paths or approved external URLs; validate email and phone URI formatting.
- Auditability: store timestamps and updated-by fields where the CRM already tracks authenticated users.

## Future CMS additions
Defer these until the simple settings model proves useful:

- `website_pages` for full page-level CMS control.
- `website_faqs` for editable FAQ sections.
- Localized content tables if the business needs multilingual pages.
