# Phase 4 — Production implementation and release gates

Date: 13 October 2026  
Environment: local implementation only  
Production status: not deployed  

## Implemented

- Rebuilt the primary AI7Lab surface in Next.js using the approved blue-and-white visual direction and blue shades derived from the AI7Lab logo.
- Replaced the homepage hero motion with a product-evidence engine built around the AI7Lab mark and Vendoreye and RoleField operating figures.
- Created crawlable product routes for `/products/vendoreye` and `/products/rolefield`.
- Positioned RoleField as the complete support, calling and call-centre operation, including Seer kiosk AI.
- Created `/enterprise-ai` for problem-to-production organisational work.
- Rebuilt `/technology` around replaceable, observable, controlled and versioned agentic architecture.
- Created `/technology/taed` as a supporting capability rather than a principal portfolio product.
- Rebuilt `/vision` as the Company route while preserving its existing URL.
- Added Signzy and RZOLUT to the partner band using local logo assets.
- Updated global metadata, Open Graph artwork, manifest, sitemap, robots policy, contact messaging and machine-readable LLM context.
- Added a site-wide newsletter dialog that appears four seconds into each new browser session on any entry route, with AI News, Product Insights and Releases preferences.
- Added a site-wide thirty-minute meeting scheduler to every “Discuss” CTA, constrained to Monday–Friday, 9:00 AM–5:00 PM Gulf Standard Time. The form captures name, work email, phone number and organisation, previews the selected slot in the visitor's timezone, supports English/Arabic preferences and optional attendees, and routes product or enterprise enquiries to the relevant AI7Lab audience.
- Added a two-message server-side SMTP flow: a branded, product-aware thank-you email to the visitor followed by a separately branded iCalendar invitation for the visitor, optional attendees and mapped internal recipient. No SMTP secret is stored in source control.
- Added an AWS DynamoDB persistence layer while retaining Render as the intended website runtime: newsletter preferences upsert into an encrypted subscribers table, and scheduled calls move through `PENDING_EMAIL`, `CONFIRMED` or `EMAIL_FAILED` states in a separate bookings table.
- Preserved the existing insights, announcements, careers, partner and legacy platform routes and their indexed content.

## Release gate results

| Gate | Result | Evidence |
|---|---|---|
| Production build and TypeScript | Pass | `pnpm build` compiled all 252 generated pages successfully, including the dynamic newsletter and scheduling endpoints. |
| AWS data-layer unit tests | Pass | Two deterministic tests validate normalized subscriber upserts, topic-set merging, booking contact/context persistence, initial delivery state and two-year TTL calculation. |
| New route availability | Pass | Home, product, product-detail, enterprise, technology, Taed, Company, Insights, Contact, robots, sitemap and LLM routes returned HTTP 200 locally. |
| Canonical metadata | Pass | Every representative new route exposes one H1, a route-specific title and description, and the intended `https://www.ai7lab.net/...` canonical. |
| Responsive layout | Pass | Desktop and mobile browser QA found no horizontal overflow on the homepage or representative Phase 4 routes. |
| Navigation | Pass | Desktop active states and the expandable mobile navigation were verified. |
| Browser runtime | Pass | No browser console errors or warnings on the homepage. |
| Image rendering | Pass with note | Above-the-fold product and company assets render. Lazy-loaded partner/supporting assets remain deferred until near the viewport as expected. |
| Reduced motion | Pass | A global `prefers-reduced-motion` override stops animation and transition loops; the evidence engine presents both product states statically. |
| Newsletter session behaviour | Pass; database deployment pending | Verified on a direct RoleField entry route: appears after four seconds, focuses the email field, supports Escape dismissal, and stays suppressed after navigation for the current session. The production form now upserts the selected topic preferences through `/api/newsletter` into DynamoDB once the AWS stack and Render secrets are configured. |
| Scheduler interaction | Pass | “Discuss” CTAs open the same accessible modal from every route, with the relevant conversation preselected. Opening the scheduler suppresses the newsletter for that session so the dialogs cannot compete. UAE weekday and business-hour constraints are enforced in both browser and API layers. |
| Scheduler email delivery | Pass locally; visual review pending | Four deterministic email tests pass, covering two-message sequencing, branding, escaping, audience routing and `.ics` fields. Secure SMTP authentication succeeds on port 465; a controlled API booking returned HTTP 200; and IMAP verification found both the thank-you and calendar-invite messages in the supplied AI7Lab mailbox. Visual inbox rendering and RSVP acceptance still require human confirmation; deployment-secret configuration remains required before release. |
| AWS staging index protection | Pass | A staging production build returned `Disallow: /` and `noindex, nofollow, nocache`; canonical URLs remained production URLs. |
| Lint | Tooling gap | `pnpm lint` cannot run because the repository defines the script but does not include ESLint. Build-time TypeScript validation passes. Add and configure ESLint before cutover. |
| Product metrics | Pass | Vendoreye figures show 134,000+ registered vendors, 20+ large scale buyers and 8,000+ tenders published. RoleField figures show 60M+ calls, approximately 10M calls/month and $1M+ in customer savings. Taed is presented as a supporting tool with 1,000+ API calls/day. |
| Hosting direction | Render retained | The rehaul remains designed for the existing Render runtime for now; the earlier separate AWS website-hosting path is deferred. |
| AWS database architecture | Pass locally | Two encrypted, point-in-time-recoverable, deletion-protected DynamoDB tables use on-demand billing, retained stateful-resource policies and a least-privilege application policy. |
| AWS database provisioning | Pass | Stack `ai7lab-website-data` is `CREATE_COMPLETE` in `me-central-1`. Both tables and indexes are active with encryption, point-in-time recovery, deletion protection and on-demand billing; scheduled-call TTL is enabled. A live write/read/update test passed and its synthetic records were removed. |
| Render staging deployment | Not started | Deploy only after DynamoDB provisioning and Render secret configuration are approved. |
| Production cutover and DNS | Not authorised | Existing Render deployment and DNS were not accessed or changed. |

## Required before release

1. Add an ESLint dependency and configuration, then make the lint gate pass.
2. Confirm the two QA messages received by the supplied mailbox render correctly and that the `.ics` RSVP works, then move the SMTP values into the deployment secret store and replace the temporary single-inbox audience routing if needed.
3. Add deployment-grade abuse protection for the public scheduling endpoint (rate limiting or managed bot protection); the current honeypot is only a baseline control.
4. Create or select a non-root AWS runtime identity, attach the generated least-privilege policy, and configure its credentials plus the table outputs as Render secrets.
5. Deploy to an isolated Render staging service with `NEXT_PUBLIC_DEPLOY_ENV=staging`.
6. Run end-to-end database, accessibility, performance, structured-data and cross-browser checks against staging.
7. Approve the production cutover plan separately. Do not replace the existing Render service or change DNS during staging.

## Rollback boundary

The current Render production site and DNS are outside this implementation. No Render service, custom domain or DNS record was modified. Until a separate production cutover is approved, rollback is simply to leave those systems unchanged.
