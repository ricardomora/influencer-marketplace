# InfluenceHub — Issue Backlog

Prefixes:

- **`LAND-*`** — landing pública (venta)
- **`DEMO-*`** — `/[locale]/demo/*` vitrina **sin login** (presentación al cliente)
- **`DASH-*`** — `/[locale]/dashboard/*` **marcas logueadas** (producto real, planificado después)
- **`INFL-*`** — dashboard **influencer** logueado
- **`AI-*`** — Fase 2, requiere OK

**Regla:** Si una feature ya funciona en dashboard con Convex, no hace falta reimplementarla en demo — solo alinear la vitrina visual. Los cambios de lógica y datos van en `DASH-*` / `INFL-*`.

Referencia interna: [reference-socialpubli.md](./reference-socialpubli.md) · Plan: [docs/PRODUCT-ROADMAP.md](../../../docs/PRODUCT-ROADMAP.md)

---

## Track A — Landing (convencer, sin producto crudo)

### LAND-001 — Layout shell ✅

Sticky header, footer, i18n, anchors.

### LAND-002 — Hero CTAs + métricas ✅

Dual CTA marca/influencer, métricas POC.

### LAND-003 — ~~Demo funcional en hero~~ ❌ CANCELADO

**Motivo:** Tabla/buscador en landing expone producto incompleto. Implementar discover en `DEMO-002`, no en home.

### LAND-014 — Landing futurista (premium) ✅

Hero interactivo, mockups estáticos, herramientas + visión IA, sin demo funcional ni nombres de competidores.

### LAND-006 — Cómo funciona (5 pasos) ✅

### LAND-007 — Grid herramientas ✅

`marketing-tools-section.tsx` + tarjetas IA (Visión IA / En POC).

---

### LAND-008 — Beneficios marca / influencer (bullets) ✅

Sección `#producto` con bullets y CTAs por rol.

### LAND-009 — Strip redes ✅

Strip bajo el hero (Instagram, TikTok, YouTube, LinkedIn).

### LAND-010 — FAQ + CTA final ✅

`marketing-faq-section.tsx` + anchor `#faq`.

---

### LAND-011 — Brand visual (OG, metadata, paleta) ✅

`generateMetadata` en `[locale]/layout`, `opengraph-image.tsx`, `ogTitle` en metadata es/en.

---

### LAND-012 — Signup `?role=` ✅

---

### LAND-013 — Guion de ventas (`docs/DEMO-SCRIPT.md`) ✅

Guion 5–10 min: landing → demo pública → signup marca → search → campaña → propuesta; FAQ y qué no prometer.

---

## Track B — Demos SocialPubli (cuando UX esté lista)

### DEMO-001 — Hub `/[locale]/demo` ✅

`demo-shell.tsx` + hub + rutas discover / analyzer / campaigns (vistas estáticas, sin auth).

---

### DEMO-002 — Discover demo (vitrina) ✅

Filtros vivos + tabla + modal signup en `/demo/discover` (`demo-discover-panel.tsx`, `discover-fixtures.ts`).

**Producto real (después):** `DASH-002` en `/dashboard/brand/search`

---

### DEMO-003 — Analyzer ✅

`/demo/analyzer?creator=` — ficha dinámica desde fixtures + audiencia mock.

**App real:** perfil + `socialAccounts` + demographics

---

### DEMO-004 — Campaign planner ✅

`/demo/campaigns` — wizard interactivo por pasos + resumen.

**App real:** `/dashboard/brand/campaigns`

---

### DEMO-005 — Panel + propuestas ✅

`/demo/panel` — KPIs + tabla campañas. `/demo/proposals` — lista propuestas mock.

---

### DEMO-006 — Convex público para demos (opcional)

`publicDemoInfluencers` + documentar seed en README.

**Dependencies:** DEMO-002

---

## Track D — Dashboard marca (logueado, planificado después)

Implementar aquí la paridad “de sistema”. Reutilizar `brand-search-panel`, `brand-campaigns-panel`, `brand-proposals-panel`.

### DASH-001 — Overview panel marca ✅

`brand-overview-panel.tsx` — home `/dashboard/brand` con KPIs, recientes y CTAs.

---

### DASH-002 — Discover UX (datos reales) ✅

`/dashboard/brand/search` — layout sidebar + tabla, filtros, campaña para propuesta.

**Prioridad:** P0 · **Depende:** POC search ya existe

---

### DASH-003 — Analyzer desde búsqueda ✅

`brand-analyzer-drawer.tsx` — drawer con perfil + redes Convex al clic en fila.

---

### DASH-004 — Campaign planner (wizard) ✅

Wizard 3 pasos en `brand-campaigns-panel.tsx` + lista campañas con estados i18n.

---

### DASH-005 — Propuestas y estados ✅

Filtros por estado, badges, fechas en `brand-proposals-panel.tsx`.

---

### DASH-006 — Demographics en analyzer ✅

`getProfileById` + `audienceDemographics` en `brand-analyzer-drawer.tsx`.

---

### DASH-007 — Nav activa en subrutas ✅

`isDashboardNavActive` + `exact` en overview del shell.

---

### DASH-008 — Flujo Discover → Analyzer → Propuesta ✅

`brand-flow-strip.tsx` en search y proposals; drawer enlaza campañas/propuestas.

---

## Track E — Dashboard influencer (logueado)

### INFL-001 — Overview influencer ✅

`influencer-overview-panel.tsx` — KPIs, propuestas recientes, CTAs.

### INFL-002 — Perfil y redes (UX) ✅

Rutas `/profile` y `/social`; hint en `social-accounts-panel.tsx`.

### INFL-003 — Propuestas entrantes ✅

Filtros, estados i18n, accept/reject con toasts en `influencer-proposals-panel.tsx`.

---

### INFL-004 — Checklist de perfil ✅

`influencer-profile-checklist.tsx` en `/dashboard/influencer/profile`.

---

## Sprint sugerido

| Fase | Enfoque | Issues |
|------|---------|--------|
| **Hecho** | Vender (público) | LAND-*, DEMO-* v1 |
| **Hecho** | Marca logueada | DASH-001 → DASH-005 |
| **Hecho** | Influencer logueado | INFL-001 → INFL-003 |
| **Siguiente** | Opcional | DEMO-006 Convex público, `metadataBase` prod |
| **Fase 2** | IA | AI-* (solo con OK) |

---

## Optimizaciones (aplicar en DASH-*, no solo demo)

1. Flujo único Discover → Analyzer → Campaña → Propuesta  
2. Shell consistente (`dashboard-shell`)  
3. Copy y filtros LATAM-first  
4. Estados de propuesta legibles en español  

---

## Track C — Visión IA (Fase 2+, requiere OK explícito)

### AI-001 — Avatares de IA para briefs y pautas

Marca configura avatar (tono, vertical); genera briefs y copy de campaña asistidos.

### AI-002 — Agente de campañas (marcas)

Chat/voz que guía: objetivo → presupuesto → creadores → propuestas → logística.

### AI-003 — Logística como servicio

Recomendaciones operativas, recordatorios, estados — capa sobre campañas y propuestas.

---

## Fuera de alcance sin aprobación

Stripe, OAuth real, nombres de competidores en UI pública.
