# SocialPubli — Referencia de demos públicas

Rutas que el cliente conoce y que InfluenceHub debe **emular por fases** (no clonar URLs ni marca).

| Ruta SocialPubli | Qué muestra (observado / documentado) | InfluenceHub (objetivo) |
|------------------|----------------------------------------|------------------------|
| `/advertisers/home/my_panel` | Home del anunciante: resumen, accesos rápidos, campañas activas | `/[locale]/dashboard/brand` + overview card |
| `/advertisers/discover` | Motor de descubrimiento: filtros avanzados, listado, segmentación | `/[locale]/dashboard/brand/search` (real) · demo futuro `/[locale]/demo/discover` |
| `/advertisers/analyzer` | Ficha de influencer: audiencia, KPIs, tipo de contenido | Perfil + `socialAccounts` + demographics (mock) · demo `/[locale]/demo/analyzer` |
| `/campaign_planner/instagram_cm` | Wizard de campaña por red: objetivo, fechas, presupuesto, formato | `/[locale]/dashboard/brand/campaigns` · demo `/[locale]/demo/campaign-planner` |

## Optimizaciones propuestas vs SocialPubli

1. **Un solo shell** — Discover, Analyzer y Campaigns comparten layout (como nuestro `dashboard-shell`), no tres productos desconectados.
2. **Flujo lineal** — Discover → Analyzer → Crear campaña → Propuesta (menos saltos de contexto).
3. **LATAM-first** — País/ciudad y moneda visibles desde el primer filtro.
4. **Estados claros** — Propuestas con estados legibles (enviada / aceptada / rechazada) vs gatekeeping/queued opacos.
5. **Landing separado del producto** — La web pública vende la visión; los demos interactivos viven en rutas `/demo/*` cuando estén pulidos.

## Qué NO va en el landing público

- Tabla/buscador funcional con datos mock (parece producto incompleto).
- Promesas de IA, pagos o OAuth real (Fase 2).

## Qué SÍ va en el landing público

- Hero futurista, métricas de confianza, grid de herramientas, previews **estáticos** (screenshot-style), CTAs a signup.
