# AI7Lab website rehaul — Phase 3 release gates

Prepared: 13 October 2026  
Decision: **Implemented** — review artifact completed and carried into the Phase 4 application

## Gate summary

| ID | Gate | Status | Evidence / condition |
|---|---|---|---|
| G0 | Scope and portfolio hierarchy | PASS | Vendoreye and RoleField are the only primary products. Taed is a compact **From the lab** supporting note on Home and a secondary tool strip on Products, with detail reserved for its dedicated technology route. |
| G1 | IA and SEO continuity | PASS (design) | All approved primary routes are represented. Existing article/resource URLs remain unchanged in the Phase 1 migration map. No production redirects were created. |
| G2 | Visual direction | PASS | The user selected the established AI7Lab blue-and-white theme. All blue UI color now originates from four shades sampled from the AI7Lab logo—`#004AAD`, `#1973BD`, `#298CC6`, and `#4FC9DE`; lighter, darker, and transparent states are derived from those primitives only. |
| G3 | Core desktop coverage | PASS | Ten review states are implemented: Home, Products, Vendoreye, RoleField, Enterprise AI, Technology, Taed, Insights, Company, and Contact. |
| G4 | Responsive behavior | PASS (prototype) | Automated browser checks at a 389px CSS viewport found no horizontal overflow on any of the ten states. Mobile navigation expands correctly. Desktop and mobile states were visually inspected. |
| G5 | Accessibility baseline | PASS (prototype) | Skip link, semantic landmarks, one H1 per state, form labels, keyboard-visible focus, 44px mobile controls, reduced-motion support, and status feedback are present. A formal WCAG audit remains a production gate. |
| G6 | Product metrics | PASS | Vendoreye, RoleField, and Taed metrics are grouped by product to prevent misattribution. |
| G7 | Prototype interaction | PASS | Hash routing, active navigation, mobile menu, insight filters, theme/motion controls, and the non-submitting form state were exercised in-browser. |
| G8 | Design system | PASS (prototype) | Color, type, spacing, layout, focus, button, card, metric, workflow, and form patterns are centralized in the prototype stylesheet. Figma component publication remains blocked. |
| G9 | Visual and runtime QA | PASS (prototype) | Desktop and mobile product-evidence cards were inspected. The revised Home and Products portfolio hierarchy retains Vendoreye and RoleField metrics inside their respective product cards and was visually checked at desktop and 390px mobile widths. All ten routes rendered one visible H1 without horizontal overflow; browser warnings/errors: 0. |
| G10 | Stakeholder approval | PASS | Blue-and-white direction, portfolio hierarchy, product metrics, and conversion flows are reflected in the implementation. |
| G11 | Production implementation | NOT STARTED | This phase is design-only. The Next.js application has not been rebuilt from the prototype. |
| G12 | AWS staging and cutover | NOT STARTED | No AWS resources, DNS, or deployment were changed. Existing Render production remains untouched. |
| G13 | Motion system | PASS (prototype) | The homepage hero now alternates between Vendoreye and RoleField operating evidence rather than using an abstract AI animation. Product identity, active signal, and metric output resolve together; animated color states use only the four logo-sampled AI7 shades. Explicit and OS-level reduced-motion modes stop animation and expose both product summaries together. |
| G14 | Partner identity | PASS (prototype) | Signzy and RZOLUT appear in a restrained homepage partner band. Both locally retained SVG marks were sourced from current official company properties, render at desktop and 390px mobile widths, and link to the respective official websites. |
| G15 | RoleField product scope | PASS (prototype) | RoleField is presented as the customer-operations platform across support, calling, call-centre operations, and Seer kiosk AI. Calling metrics remain visible as evidence from one operating surface rather than the definition of the whole product. Seer capabilities are grounded in the supplied `seer 2` product materials. |
| G16 | Brand palette provenance | PASS (prototype) | A static palette scan and browser computed-style check confirm that the UI's blue family is limited to the four logo-sampled primitives and their white, black, or transparent derivatives. Product and partner marks retain their own official brand colors. |

## Automated and visual QA evidence

Run on 13 October 2026 against the local prototype served from the repository:

- Routes checked: `home`, `products`, `vendoreye`, `rolefield`, `enterprise-ai`, `technology`, `taed`, `insights`, `company`, `contact`.
- Each route resolved to its intended active page state.
- Each route exposed exactly one visible H1.
- Each route reported `scrollWidth <= clientWidth` at a 389px CSS viewport.
- Mobile menu changed `aria-expanded` from `false` to `true` and exposed the navigation.
- The review-only form produced its success state without sending information.
- Captured browser warnings and errors: none.
- Desktop viewport was restored after responsive testing.
- Motion-off state exposes content immediately and preserves navigation, counters, and form behavior.
- Signzy and RZOLUT partner marks load successfully from local SVG assets and stack without horizontal overflow at the mobile breakpoint.
- RoleField's four operating surfaces and Seer showcase are present in the dedicated product state and remain legible at desktop and mobile widths.
- Palette provenance was rechecked after the logo-color revision: the primary computed field is `rgb(0, 74, 173)` (`#004AAD`), all legacy generic-blue literals were removed, and the Products state retained one visible H1 with zero horizontal overflow at desktop and mobile review widths.
- Motion palette was verified in-browser: the AI7 core, signal packets, scroll progress, route wipe, Seer scan, RoleField waveform, and Taed scan resolve only through the four logo colors. The visible reduced-motion control changes all checked animation names to `none` and restores them when re-enabled.
- The replacement hero evidence engine was inspected in both timed states: Vendoreye and RoleField activation matched their respective metric panels, both product logos loaded locally, and no horizontal overflow appeared on desktop or narrow responsive layouts. The motion-off view exposed both product summaries with both animation names computed as `none`.
- The evidence-engine core now renders the local AI7Lab wordmark inside a white circular field with a four-color logo ring. Its transparent internal system boundary, corner anchors, product inputs, and metric panel were visually checked on desktop and narrow layouts with zero horizontal overflow.

## Claim approval register

| Claim | Required before release |
|---|---|
| Vendoreye — 134,000+ vendors | Define what counts as a vendor, source system, deduplication rule, geography, and as-of date. |
| Vendoreye — 20+ organisations | Define “trust/use,” whether trials count, customer confidentiality rules, and as-of date. |
| RoleField — 60M+ calls | Confirm cumulative start/end period, completed/attempted definition, exclusions, and reporting source. |
| RoleField — approximately 10M calls/month | Confirm whether this is current run rate, average, or peak; specify measurement month. |
| RoleField — US$1M+ saved | Approve currency, calculation methodology, baseline, time period, and whether the figure is audited or customer-reported. |
| Taed — 1,000+ API calls/day | Confirm the original milestone date, environment, time window, and whether the claim remains representative. |

## Phase 3 exit criteria

Phase 3 can be called complete only when:

1. Requested design revisions are incorporated and rechecked.
2. Every published scale claim is approved, revised, or removed.
3. The design source is finalized in Figma or the user explicitly accepts the local prototype as the design source of record.
4. G6, G8, and G10 are closed.

Only then should Phase 4 begin: production implementation on an isolated branch/environment, followed by AWS staging. Render and production DNS must remain unchanged until a separately approved cutover plan is executed.

## Figma limitation

Figma file: [AI7Lab Website Rehaul — Phase 3 Design](https://www.figma.com/design/O7fJoTZsD2SiSDUgV54MXX)

The Starter workspace reached its MCP tool-call limit after file creation, reference capture, library inspection, and design-system discovery attempts. No claim is made that the Figma canvas is final. This limitation is explicitly treated as an open gate rather than hidden behind a completion label.

