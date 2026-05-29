---
name: influencehub-landing
description: >-
  InfluenceHub public marketing site and SocialPubli-inspired product roadmap.
  Use for landing page (premium, no live product demo), platform demo routes,
  marketing i18n, and advertiser UX parity planning.
---

# InfluenceHub Landing & Platform Presentation

## Three surfaces (do not mix goals)

| Track | Goal | Where | When |
|-------|------|--------|------|
| **A — Landing** | Convencer: diseño premium, visión IA | `/[locale]` | Now |
| **B — Public demo** | Vitrina sin login para el socio | `/[locale]/demo/*` | Now (presentation only) |
| **D/E — Logged-in app** | Producto real: Convex, auth, CRUD | `/[locale]/dashboard/*` | **Planned next** |

**User decision:** Cambios “de sistema” (marcas e influencers logueados) van en **dashboard**, no en landing ni demo. La demo puede quedarse estática si el dashboard ya cubre el flujo.

See [docs/PRODUCT-ROADMAP.md](../../../docs/PRODUCT-ROADMAP.md) and issues `DASH-*` / `INFL-*`.

## Brand voice (público)

- **Nunca** nombrar competidores (SocialPubli, Fluvip, etc.) en copy de producto, landing ni metadata.
- Posicionar InfluenceHub como **nueva generación**: integrado, LATAM-first, tecnología de punta, **IA en el núcleo** (avatares + agente de campañas en roadmap).
- Competidores solo en docs internos del skill (`reference-socialpubli.md`, issues `DEMO-*`).
- Diferenciar con honestidad: etiquetar **En POC** vs **Visión IA** vs **Próximamente** — no prometer IA en vivo hasta Fase 2 aprobada.

## SocialPubli routes to emulate (Track B)

- `…/advertisers/discover` → Discover
- `…/advertisers/analyzer` → Analyzer
- `…/campaign_planner/instagram_cm` → Campaign planner
- `…/advertisers/home/my_panel` → Brand home / panel

Backlog: [issues.md](./issues.md) — issues `LAND-*` (landing) and `DEMO-*` (product demos).

## Landing rules (Track A)

1. **i18n:** `src/lib/i18n/dictionaries/{es,en}/marketing.json` only.
2. **Visual:** Dark hero, animated background (`marketing-hero-background`), glass cards, lucide icons, static UI mockups (`platform-preview-mockups`).
3. **No auth** on landing; CTAs → `/[locale]/signup?role=brand|influencer`.
4. **Honest POC copy** — no AI/Stripe claims unless labeled roadmap.
5. Run `pnpm run build` after changes.

## Source files

- `src/components/marketing/marketing-home.tsx` — landing composition
- `src/components/marketing/marketing-layout.tsx` — header/footer
- `src/components/marketing/marketing-hero-background.tsx` — interactive background (client)
- `src/components/marketing/platform-preview-mockups.tsx` — static product chrome
- `src/app/globals.css` — marketing animations
- `/demo` routes (future) — build discover UI when `DEMO-002` ships; do not embed live search on landing

## Real app (post-signup)

- Search: `brand-search-panel.tsx`
- Campaigns: `brand-campaigns-panel.tsx`
- Proposals: `brand-proposals-panel.tsx`

## Workflow

1. Confirm track A vs B from issue ID prefix.
2. Read [issues.md](./issues.md) + [reference-socialpubli.md](./reference-socialpubli.md).
3. One issue per PR when possible.
