# AI7Lab website rehaul — Phase 3 design rationale

Prepared: 13 October 2026  
Status: Review-ready; not approved for production implementation

## Deliverables

- Interactive multi-page prototype: `design/phase-3-prototype/index.html`
- Design tokens and responsive system: `design/phase-3-prototype/styles.css`
- Prototype routing and interaction states: `design/phase-3-prototype/script.js`
- Figma working file: [AI7Lab Website Rehaul — Phase 3 Design](https://www.figma.com/design/O7fJoTZsD2SiSDUgV54MXX)
- Release-gate register: `reports/phase-3-release-gates.md`

The Figma working file contains a captured reference of the current website. Further canvas authoring is blocked by the Figma Starter workspace's MCP tool-call limit. The local prototype is therefore the authoritative review artifact for this phase until the Figma limit resets or the file is moved to a workspace with sufficient access.

## Approved direction — AI7Lab logo blue and white

The revised system keeps AI7Lab's established blue-and-white identity while combining editorial clarity with technical precision. Its blue system is sampled directly from the AI7Lab wordmark: Deep `#004AAD`, Mid `#1973BD`, Sky `#298CC6`, and Cyan `#4FC9DE`. Every pale surface, border, glow, and dark blue field is derived from those four primitives with white, black, or transparency; no unrelated blue is permitted.

- White surfaces keep the company story clear, familiar, and readable.
- Deep AI7 Blue gives RoleField and enterprise work appropriate weight without introducing a separate black or green theme.
- AI7 Cyan represents intelligence moving through the system.
- Logo-derived pale and mid-blue tones communicate state, depth, and product differentiation.
- IBM Plex Sans carries large, direct headlines; Inter carries body copy; JetBrains Mono labels evidence, states, and system metadata.
- Grids, signals, workflow steps, and structured outputs express the movement from context to action without relying on generic AI imagery.

This direction is approved as the working production direction because it stays recognisably AI7Lab while supporting a credible corporate story, clear product differentiation, and a strong technical point of view.

## Portfolio treatment

- Vendoreye and RoleField are the two primary products and receive equal portfolio weight.
- Vendoreye uses a light, intelligence-led interface language.
- RoleField uses a saturated-blue, real-time customer-operations language. Its dedicated page defines four connected surfaces—support, calling, call-centre operations, and Seer kiosk AI—so calling evidence no longer defines the entire product.
- Taed is deliberately secondary to the product portfolio. On the homepage it appears only as a compact **From the lab** note after the technology principles; on the Products page it appears as a short supporting strip beneath the two primary product cards. Its dedicated technology route retains the structured input-to-output demonstration for visitors who choose to explore it.
- Enterprise AI is framed as a four-stage working model: frame, prove, integrate, operate and improve.

## Product evidence hierarchy

Operating evidence is grouped into one card per product rather than one card per metric. This prevents a visitor from accidentally attributing a Vendoreye number to RoleField or vice versa.

- The Vendoreye card uses a white surface with large Deep AI7 Blue figures for 134,000+ vendors and 20+ organisations.
- The RoleField card uses a saturated-blue surface with large white figures for 60M+ cumulative calls, approximately 10M calls per month, and more than US$1M in reported savings.
- Each product card has one identity, one evidence group, and one product-specific next step.
- The Products index retains the same grouped evidence inside each principal product card, so visitors do not lose the operating proof when moving from the homepage into the portfolio.
- Count-in motion and a restrained highlight bar make each number the first visual stop without reducing the visibility of its qualification note.
- On mobile, each metric becomes a full-width evidence row inside its parent product card.

## Portfolio emphasis revision

The hierarchy was rebalanced after review so Taed does not compete with Vendoreye or RoleField. The former full homepage showcase was removed, its 1,000+ API calls/day milestone was reduced to qualified supporting copy, and the Products-page treatment was compressed from a feature card to a low-height tool strip. Vendoreye and RoleField remain the only large product cards and the only products carrying primary operating evidence on the homepage.

## Partner treatment

Signzy and RZOLUT are presented in a compact homepage partner band immediately after the operating-evidence section. The treatment uses locally retained SVG versions of the companies' current official marks, links each mark to its official website, and keeps partner identity visually subordinate to AI7Lab's two product evidence cards. Supporting labels are deliberately descriptive rather than promotional: identity and compliance for Signzy, and risk and compliance intelligence for RZOLUT.

## Page coverage

The prototype provides review states for:

1. Homepage
2. Products index
3. Vendoreye
4. RoleField
5. Enterprise AI
6. Technology
7. Taed
8. Insights
9. Company
10. Discuss a problem

The Insights state demonstrates the taxonomy and filter direction; it does not duplicate all existing article pages. Existing article and resource URLs remain governed by the Phase 1 migration map.

## Responsive behavior

- Desktop navigation becomes a 44px minimum-height menu control below 980px.
- Four-column proof and workflow structures reduce to two columns on tablet and one column on narrow mobile.
- Product demonstration panels stack below their narrative.
- Contact fields collapse to a single column on mobile.
- Motion can be disabled through both the prototype control and the operating system's reduced-motion preference.

## Motion system — orchestration, not decoration

The initial movement language has been replaced with a forward-looking interaction system intended to feel credible for a 2030 agentic-AI company:

- The hero visual is now a live product-evidence engine rather than an abstract AI diagram. Vendoreye and RoleField alternate as active operating inputs around the AI7 proof loop; the output panel resolves to 134,000+ vendors and 20+ organisations for Vendoreye, then 60M+ calls, approximately 10M calls/month, and US$1M+ reported savings for RoleField.
- The proof-loop core uses the AI7Lab wordmark rather than a text abbreviation. A transparent logo-spectrum boundary and opposing corner anchors enclose the source, processing, and output regions so the composition reads as one system while preserving the underlying technical grid.
- Motion carries the same logo-derived spectrum as the static interface: Deep `#004AAD` resolves through Mid `#1973BD` and Sky `#298CC6` into Cyan `#4FC9DE`. The sequence is used for signal travel, progress, scanning, waveform states, route transitions, and system glows; no unrelated blue is introduced by animation.
- The evidence sequence is time-based rather than pointer-dependent, so its meaning remains available on touch devices. The reduced-motion state displays both product summaries simultaneously instead of hiding either evidence group.
- Headline and page changes use masked resolution rather than generic fades.
- Route changes use a three-part blue system wipe that suggests parallel agents resolving into the next state.
- Operating metrics count into place only when their evidence cards enter view.
- Vendoreye, RoleField, Taed, workflow, and architecture demonstrations each use motion specific to their meaning: evidence resolution, live customer-operation and kiosk-state modulation, source scanning, or staged process completion.
- A thin progress signal shows the visitor's position through long narratives.
- Hover states expose system readiness through traces, elevation, and directional response rather than arbitrary bouncing.

Continuous animations are restricted to small, transform-based interface regions. The complete system stops through either the visible motion control or the operating system's `prefers-reduced-motion` setting.

## Decision requested

Review the revised blue-and-white execution and request any targeted changes. Production implementation and staging should proceed through the technical release gates.

