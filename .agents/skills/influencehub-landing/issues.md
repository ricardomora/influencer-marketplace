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

### LAND-011 — Brand visual (OG, metadata, paleta)

**Priority:** P2 · **Effort:** M

---

### LAND-012 — Signup `?role=` ✅

---

### LAND-013 — Guion de ventas (`docs/DEMO-SCRIPT.md`)

Actualizar: landing = pitch visual; producto = dashboard + futuros `/demo`.

---

## Track B — Demos SocialPubli (cuando UX esté lista)

### DEMO-001 — Hub `/[locale]/demo` ✅

`demo-shell.tsx` + hub + rutas discover / analyzer / campaigns (vistas estáticas, sin auth).

---

### DEMO-002 — Discover (interactivo) 🔄

Mejorar `/demo/discover`: filtros vivos, más filas, enlace a signup. Patrón: `brand-search-panel`.

**App real:** `/dashboard/brand/search`

---

### DEMO-003 — Analyzer ✅ (v1 estática)

`/demo/analyzer` — ficha mock con KPIs y gráfico.

**App real:** perfil + `socialAccounts` + demographics

---

### DEMO-004 — Campaign planner ✅ (v1 estática)

`/demo/campaigns` — wizard mock por pasos.

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
