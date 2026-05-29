# InfluenceHub — Plan de producto

Última actualización: alineado con posicionamiento **nueva generación + IA**, sin referencias públicas a competidores.

## Visión

Marketplace de influencer marketing **LATAM-first**, stack unificado y preparado para **IA nativa**: avatares que ayudan con briefs y pautas, y un agente que asiste a marcas en diseño y logística de campañas.

## Principios de comunicación

| Hacer | No hacer |
|-------|----------|
| Hablar de tecnología de punta, integración, LATAM | Nombrar SocialPubli, Fluvip u otros en UI pública |
| Etiquetar **En POC** / **Visión IA** / **Próximamente** | Prometer IA en vivo antes de implementarla |
| Usar referentes solo en docs internos del equipo | Copiar URLs o marca de competidores |

Referencias internas de UX: `.agents/skills/influencehub-landing/reference-socialpubli.md`

## Fases

### Fase 1 — POC (actual, aprobada)

- Auth Clerk + Convex, roles marca / influencer / admin
- Discover (búsqueda + filtros), campañas, propuestas
- Mock OAuth y métricas, seed LATAM
- **Landing premium** (venta, sin demo funcional en home)
- Deploy Vercel + Convex dev

### Fase 1.5 — Presentación producto (próximo)

Rutas públicas `/[locale]/demo/*` (cuando UX esté pulida), inspiradas en flujos de mercado pero marca propia:

| Demo | Objetivo |
|------|----------|
| `DEMO-001` Hub panel | Shell anunciante |
| `DEMO-002` Discover | Búsqueda avanzada |
| `DEMO-003` Analyzer | Ficha + KPIs + audiencia |
| `DEMO-004` Campaign planner | Wizard por red (ej. Instagram) |

Backlog detallado: `.agents/skills/influencehub-landing/issues.md`

### Fase 2 — IA (requiere OK explícito)

| ID | Entrega |
|----|---------|
| AI-001 | Avatares de IA para briefs y pautas publicitarias |
| AI-002 | Agente conversacional de campañas para marcas |
| AI-003 | Logística de campaña como servicio (recomendaciones, estados) |

También en roadmap general: búsqueda IA, Stripe, OAuth real, Qdrant.

## Landing (Track A)

- Hero futurista, mockups estáticos, grid herramientas, sección visión IA
- Sin tabla/buscador funcional en la home
- Issues: `LAND-*` en el skill

## Configuración local

Si ves `Publishable key not valid`:

1. Abre [Clerk Dashboard](https://dashboard.clerk.com) → API Keys
2. Copia **Publishable key** (`pk_test_…`) y **Secret key** (`sk_test_…`) a `.env.local`
3. No uses valores `placeholder` del template
4. Reinicia `pnpm dev`

`CLERK_JWT_ISSUER_DOMAIN` sigue en el deployment de Convex (no en Vercel para validación JWT).
