# InfluenceHub — Plan de producto

Última actualización: dos superficies — **pública (venta)** vs **app logueada (producto real)**.

## Visión

Marketplace de influencer marketing **LATAM-first**, stack unificado y preparado para **IA nativa**: avatares que ayudan con briefs y pautas, y un agente que asiste a marcas en diseño y logística de campañas.

## Dos superficies (decisión de arquitectura)

| Superficie | Quién | Para qué | Cuándo priorizamos |
|------------|--------|----------|-------------------|
| **Landing** `/[locale]` | Público | Convencer agencias/clientes — diseño premium, visión IA | **Ahora** |
| **Demo** `/[locale]/demo/*` | Público (sin login) | Mostrar flujos tipo panel anunciante (Discover, Analyzer, Campaign planner) | **Ahora** — pulir presentación |
| **Dashboard** `/[locale]/dashboard/*` | Marca / influencer / admin **logueados** | Operar de verdad: búsqueda, campañas, propuestas, perfiles | **Después** — aquí va la paridad “de sistema” |

Los cambios “de verdad” (datos Convex, permisos, envío de propuestas, UX avanzada) se planifican en el **dashboard autenticado**, no en la demo ni en el landing.

```
Público                    Registro              Producto real
────────                   ────────              ─────────────
/es  (landing)      →     /signup      →     /dashboard/brand/*
/es/demo/*  (vitrina)                         /dashboard/influencer/*
```

## Principios de comunicación

| Hacer | No hacer |
|-------|----------|
| Hablar de tecnología de punta, integración, LATAM | Nombrar competidores en UI pública |
| Etiquetar **En POC** / **Visión IA** / **Próximamente** | Prometer IA en vivo antes de implementarla |
| Demo = “vista de presentación” | Confundir demo pública con el panel operativo |

Referencias internas de UX: `.agents/skills/influencehub-landing/reference-socialpubli.md`

## Mapeo demo → dashboard (producto logueado)

| Vista demo (pública) | Ruta app real (marca logueada) | Estado POC |
|----------------------|--------------------------------|------------|
| `/demo` hub | `/dashboard/brand` | Shell básico ✅ |
| `/demo/discover` | `/dashboard/brand/search` | Funcional ✅ — mejorar UX después |
| `/demo/analyzer` | Perfil influencer + métricas (desde search) | Parcial — mock sync |
| `/demo/campaigns` | `/dashboard/brand/campaigns` | Funcional ✅ — mejorar wizard después |
| Propuestas | `/dashboard/brand/proposals` | Funcional ✅ |
| — | `/dashboard/influencer` | Perfil + propuestas ✅ |

## Fases

### Fase 1 — POC operativo (actual)

- Auth Clerk + Convex, roles marca / influencer / admin
- Dashboard con search, campañas, propuestas (flujo E2E)
- Mock OAuth y métricas, seed LATAM
- Landing premium + demo pública v1
- Deploy Vercel + Convex dev

### Fase 1.5 — Presentación (ahora, sin tocar lógica de negocio)

Issues `LAND-*` y `DEMO-*`: solo capa pública para que el socio **venda**.

- Pulir `/demo/*` (estático → interactivo opcional con fixtures)
- LAND-011 metadata, LAND-013 guion de ventas
- **No** es obligatorio duplicar cada feature en demo si el dashboard ya la tiene

### Fase 1.6 — Producto logueado (planificado después)

Issues `DASH-*` en [issues.md](../.agents/skills/influencehub-landing/issues.md): mejoras **solo** en rutas autenticadas.

Prioridad sugerida para **marcas**:

1. Panel overview (resumen campañas / propuestas)
2. Discover UX (paridad visual con demo, datos reales Convex)
3. Analyzer integrado (ficha al seleccionar influencer)
4. Campaign planner guiado (wizard alineado con demo)
5. Propuestas y estados más claros

Para **influencers**:

1. Panel overview (propuestas entrantes, earnings mock)
2. Perfil + redes + sync métricas (mejor feedback)
3. Aceptar/rechazar propuestas (UX pulida)

### Fase 2 — IA (requiere OK explícito)

| ID | Entrega |
|----|---------|
| AI-001 | Avatares de IA (marcas) — briefs y pautas |
| AI-002 | Agente de campañas |
| AI-003 | Logística como servicio |

IA vive primero en **dashboard marca**, no en landing.

## Backlog

- Público: `.agents/skills/influencehub-landing/issues.md` (`LAND-*`, `DEMO-*`)
- App logueada: mismo archivo (`DASH-*`, `INFL-*`)
- IA: `AI-*`

## Configuración local

Si ves `Publishable key not valid`: claves reales de Clerk en `.env.local` (no `placeholder`). Ver README.
