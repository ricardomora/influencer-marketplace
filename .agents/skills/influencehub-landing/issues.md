# InfluenceHub — Issue Backlog

Prefixes: **`LAND-*`** = landing (venta, diseño) · **`DEMO-*`** = demos tipo SocialPubli (producto pulido)

Referencia competidor: [reference-socialpubli.md](./reference-socialpubli.md)

---

## Track A — Landing (convencer, sin producto crudo)

### LAND-001 — Layout shell ✅

Sticky header, footer, i18n, anchors.

### LAND-002 — Hero CTAs + métricas ✅

Dual CTA marca/influencer, métricas POC.

### LAND-003 — ~~Demo funcional en hero~~ ❌ CANCELADO

**Motivo:** Tabla/buscador en landing expone producto incompleto. Código conservado en `embedded-search-demo.tsx` para rutas `/demo/*` futuras.

### LAND-014 — Landing futurista (premium) 🔄 EN CURSO

**Priority:** P0 · **Effort:** L

**Description**  
Reemplazar demo vivo por experiencia de marketing: fondo interactivo, hero oscuro, mockups estáticos de plataforma (Discover / Analyzer / Campaign planner), grid de herramientas, redes sociales, FAQ.

**Acceptance criteria**

- [ ] Sin `EmbeddedSearchDemo` en `marketing-home.tsx`
- [ ] `marketing-hero-background.tsx` + animaciones en `globals.css`
- [ ] `platform-preview-mockups.tsx` — solo UI decorativa
- [ ] Nav: Plataforma / Herramientas / Cómo funciona (no "Demo" en hero)
- [ ] es/en `marketing.json` actualizado
- [ ] `pnpm run build` OK

**Dependencies:** LAND-001

---

### LAND-006 — Cómo funciona (5 pasos) ✅

### LAND-007 — Grid herramientas (Discover, Analyzer, …)

**Priority:** P1 · **Effort:** S  
Mapear herramientas SocialPubli; badge "En roadmap" donde aplique.

**Dependencies:** LAND-014

---

### LAND-008 — Beneficios marca / influencer (bullets)

**Priority:** P1 · **Effort:** S

---

### LAND-009 — Strip redes (Instagram, TikTok, YouTube…)

**Priority:** P2 · **Effort:** XS

---

### LAND-010 — FAQ + CTA final

**Priority:** P1 · **Effort:** S

---

### LAND-011 — Brand visual (OG, metadata, paleta)

**Priority:** P2 · **Effort:** M

---

### LAND-012 — Signup `?role=` ✅

---

### LAND-013 — Guion de ventas (`docs/DEMO-SCRIPT.md`)

Actualizar: landing = pitch visual; producto = dashboard + futuros `/demo`.

---

## Track B — Demos SocialPubli (cuando UX esté lista)

### DEMO-001 — Hub `/[locale]/demo`

Shell tipo `my_panel`: sidebar Buscar · Campañas · Propuestas · CTA signup. Sin auth.

**Ref:** `socialpubli.com/advertisers/home/my_panel`

---

### DEMO-002 — Discover

Réplica pulida de discover: filtros + grid + detalle lateral. Reutilizar `embedded-search-demo` o Convex seed.

**Ref:** `socialpubli.com/advertisers/discover`  
**App real:** `/dashboard/brand/search`

---

### DEMO-003 — Analyzer

Ficha influencer: KPIs, audiencia, redes, gráfico mock.

**Ref:** `socialpubli.com/advertisers/analyzer`  
**App real:** perfil + `socialAccounts` + demographics

---

### DEMO-004 — Campaign planner (Instagram CM)

Wizard por pasos: objetivo → presupuesto → fechas → formato → resumen.

**Ref:** `socialpubli.com/campaign_planner/instagram_cm`  
**App real:** `/dashboard/brand/campaigns`

---

### DEMO-005 — Panel campañas (dashboard mock)

Lista campañas con estados, reach estimado, acciones — datos estáticos o seed.

---

### DEMO-006 — Convex público para demos (opcional)

`publicDemoInfluencers` + documentar seed en README.

**Dependencies:** DEMO-002

---

## Optimizaciones vs SocialPubli (aplicar en DEMO-*)

1. Flujo único Discover → Analyzer → Campaña → Propuesta  
2. Shell consistente (un sidebar, no tres productos)  
3. Copy y filtros LATAM-first  
4. Estados de propuesta legibles en español  

---

## Sprint sugerido

| Semana | Landing | Producto |
|--------|---------|----------|
| 1 | LAND-014, LAND-007, LAND-010 | — |
| 2 | LAND-008, LAND-009, LAND-011 | DEMO-001, DEMO-002 |
| 3 | LAND-013 | DEMO-003, DEMO-004 |

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
