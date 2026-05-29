# Guion de demo — InfluenceHub (POC Fase 1)

Guion para que un socio o comercial presente el producto en **5–10 minutos**.  
Sustituir `TU_URL` por la URL de Vercel (ej. `https://influencer-marketplace.vercel.app`).

---

## Antes de la reunión (checklist)

- [ ] Deploy en Vercel activo y variables Clerk/Convex configuradas (no placeholders).
- [ ] Seed ejecutado en el deployment Convex que usa producción:
  ```bash
  pnpm exec convex run seed:seedDemoData
  ```
- [ ] Navegador en incógnito o sesión limpia para el flujo “marca nueva”.
- [ ] Tener a mano este guion en una segunda pantalla.

**URLs base (español):**

| Qué | URL |
|-----|-----|
| Landing | `TU_URL/es` |
| Demo pública | `TU_URL/es/demo` |
| Alta marca | `TU_URL/es/signup?role=brand` |
| Login | `TU_URL/es/login` |

---

## Mensaje de apertura (30 s)

> “InfluenceHub es una plataforma nueva para conectar **marcas** con **influencers en LATAM** — hoy Colombia y Venezuela en el POC. No es solo un directorio: unifica **descubrimiento**, **análisis**, **campañas** y **propuestas** en un solo panel. Estamos preparando una capa de **IA** — avatares para briefs y un agente de campañas — que verán en el roadmap; lo que les muestro hoy ya opera de punta a punta en el entorno de prueba.”

**No decir:** nombres de competidores, “ya tenemos IA en producción”, pagos con Stripe.

---

## Parte 1 — Vitrina pública (3 min) · sin login

Objetivo: impacto visual y lenguaje de “plataforma seria”. **No** es el producto operativo; es presentación.

### 1.1 Landing `TU_URL/es`

1. Hero: nueva generación, IA nativa, LATAM.
2. Mockups estáticos (Discover / Analyzer / Campaign planner) — aclarar: *“ilustración del producto, no datos en vivo aquí”*.
3. Scroll a **Herramientas**: Discover, Analyzer, Campaign planner, Propuestas — badges **En POC** vs **Visión IA**.
4. Sección **Inteligencia artificial en el núcleo** (roadmap).
5. **Cómo funciona** en 5 pasos.
6. **FAQ** si preguntan cobertura o IA.

### 1.2 Demo pública `TU_URL/es/demo`

1. Hub — cinco vistas: panel, discover, analyzer, campañas, propuestas.
2. **Mi panel** (`/demo/panel`) → KPIs + tabla de campañas mock.
3. **Discover** (`/demo/discover`) → filtros vivos; clic en fila → modal o enlace a analyzer (`?creator=`).
4. **Analyzer** → ficha según creador elegido en discover.
5. **Campaign planner** → wizard paso a paso hasta resumen.
6. **Propuestas** (`/demo/proposals`) → estados enviada / aceptada / rechazada.
7. CTA: *“Para operar con datos reales y enviar propuestas, creamos cuenta de marca.”*

---

## Parte 2 — Producto real como marca (5–7 min) · login

Objetivo: demostrar que **el sistema funciona** con Convex + Clerk.

### 2.1 Registro

1. Ir a `TU_URL/es/signup?role=brand`.
2. Completar registro (email de prueba).
3. Onboarding: elegir **Marca** → Continuar.

### 2.2 Buscar influencers `…/dashboard/brand/search`

1. Filtros: **Colombia** o **Venezuela**, rango de seguidores, engagement.
2. Buscar → ver lista con datos del seed (nombres LATAM demo).
3. Frase: *“Esto es el Discover real — conectado a nuestra base en la nube.”*

### 2.3 Campaña `…/dashboard/brand/campaigns`

1. Crear campaña: título, presupuesto, fechas.
2. Frase: *“Equivalente al campaign planner que vieron en la demo, pero persistido en base de datos.”*

### 2.4 Propuesta `…/dashboard/brand/search` (o proposals)

1. Desde búsqueda: elegir influencer + campaña + tarifa → **Enviar propuesta**.
2. Ir a `…/dashboard/brand/proposals` → ver propuesta **enviada**.

### 2.5 Cierre parte marca

> “En el POC la marca ya puede descubrir, planificar y proponer colaboraciones. Lo que viene después en el **panel logueado** es pulir el overview, el analyzer integrado al clic en un creador y el wizard de campaña — sin cambiar la arquitectura.”

---

## Parte 3 — Vista influencer (opcional, 2 min)

Si el cliente pregunta por el lado creador:

1. Cerrar sesión o usar otro navegador incógnito.
2. `TU_URL/es/signup?role=influencer` → onboarding **Influencer**.
3. `…/dashboard/influencer`: perfil, conectar red (mock), sincronizar métricas (demo).
4. Ver propuesta entrante → **Aceptar** o **Rechazar**.

Frase: *“Mismo marketplace, dos experiencias según rol.”*

---

## Parte 4 — Admin (solo si preguntan)

- Usuario con `role: admin` en tabla Convex `users` → `TU_URL/es/dashboard/admin`.
- Vista overview de solo lectura en POC.

---

## Preguntas frecuentes en la reunión

| Pregunta | Respuesta sugerida |
|----------|-------------------|
| ¿Ya tienen IA? | Roadmap: avatares para briefs y agente de campañas. El marketplace E2E está en POC. |
| ¿Qué países? | Colombia y Venezuela en demo/seed; arquitectura lista para ampliar. |
| ¿Pagos? | Fase 2 (Stripe); no en este POC. |
| ¿Redes reales? | Conexión y métricas simuladas en POC; OAuth real planificado. |
| ¿Diferencia demo vs app? | Demo = vitrina sin login. App logueada = operación real. |

---

## Qué prometer vs qué no (Fase 1)

| Sí (hoy) | No (sin OK explícito) |
|----------|------------------------|
| Búsqueda con filtros LATAM | Búsqueda con IA / Qdrant |
| Campañas y propuestas E2E | Pagos y comisiones Stripe |
| Roles marca / influencer | OAuth Instagram/TikTok real |
| Demo pública + landing | Clonar UX de terceros en marketing |

---

## Después de la demo (siguiente desarrollo)

Según [PRODUCT-ROADMAP.md](./PRODUCT-ROADMAP.md), prioridad en **dashboard logueado** (`DASH-*`), no en ampliar la demo pública:

1. Overview panel marca  
2. Discover UX (paridad visual con demo, datos Convex)  
3. Analyzer al seleccionar creador  
4. Campaign wizard guiado  
5. Pulido influencer (`INFL-*`)

---

## Demo corta (solo 5 min)

Si hay poco tiempo:

1. `TU_URL/es` — 1 min hero + herramientas.  
2. `TU_URL/es/demo/discover` — 1 min.  
3. Signup marca → search → enviar 1 propuesta — 3 min.

---

## English one-liner (optional)

> “InfluenceHub is a LATAM-first influencer marketplace POC: brands discover creators, run campaigns, and send proposals in one stack — with an AI layer on the roadmap for briefs and campaign agents.”
