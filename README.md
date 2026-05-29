# InfluenceHub — Influencer Marketplace POC (Fase 1)

Cloud-first marketplace connecting **brands** and **influencers** in LATAM (Colombia & Venezuela). Built with Next.js 16, Convex, and Clerk — deployable to Vercel without Docker.

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16 App Router, TypeScript, Tailwind CSS 4 |
| Backend | Convex (queries, mutations, actions) |
| Auth | Clerk (JWT → Convex) |
| Deploy | Vercel + Convex Cloud |

## Prisma → Convex mapping

| Brief entity | Convex table |
|--------------|--------------|
| User | `users` |
| InfluencerProfile | `influencerProfiles` |
| SocialAccount | `socialAccounts` |
| AudienceDemographics | `audienceDemographics` |
| Brand | `brands` |
| Campaign | `campaigns` |
| SearchQuery | `searchQueries` |
| Proposal | `proposals` |
| Transaction | `transactions` (schema only, Fase 2) |
| Subscription | `subscriptions` |

See [convex/README.md](convex/README.md) for the function catalog.

## Git (solo este repositorio)

Configura tu identidad **local** para commits en este proyecto (no afecta otros repos):

```bash
cd influencer-marketplace
git config --local user.name "ricardomora"
git config --local user.email "ricardo10mora@gmail.com"
git config --local --get-regexp user
```

Al crear el remoto en GitHub, usa tu cuenta **ricardomora**:

```bash
git remote add origin https://github.com/ricardomora/influencer-marketplace.git
git push -u origin main
```

## Quick start (cloud)

### 1. Prerequisites

- Node.js 22+
- pnpm
- [Clerk](https://clerk.com) application
- [Convex](https://convex.dev) project

### 2. Install

```bash
cd influencer-marketplace
pnpm install
```

### 3. Convex

```bash
pnpm exec convex dev
```

Copy `NEXT_PUBLIC_CONVEX_URL` from the Convex dashboard into `.env.local`.

### 4. Clerk + Convex (auth bridge)

Clerk gives you **two different** configs:

| Variable | Where it goes | Purpose |
|----------|---------------|---------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `.env.local` (Next.js) | Login UI in the browser |
| `CLERK_SECRET_KEY` | `.env.local` (Next.js) | Server-side Clerk |
| `CLERK_JWT_ISSUER_DOMAIN` | **Convex Dashboard** (dev deployment) | Convex validates Clerk JWTs |

**Steps:**

1. In [Clerk Dashboard](https://dashboard.clerk.com) → your app → **Configure** → enable the **Convex** integration (or **JWT Templates** → use the Convex template). This creates a JWT template named `convex`.
2. Copy your **Frontend API URL** (Clerk → **API keys** or **Domains**). Dev format: `https://something-00.clerk.accounts.dev` (no trailing slash).
3. In [Convex Dashboard](https://dashboard.convex.dev) → your **development** deployment → **Settings** → **Environment variables** → add:
   - Name: `CLERK_JWT_ISSUER_DOMAIN`
   - Value: `https://your-app.clerk.accounts.dev` (your Frontend API URL)
4. Or from the project folder:
   ```bash
   pnpm exec convex env set CLERK_JWT_ISSUER_DOMAIN "https://your-app.clerk.accounts.dev"
   ```
5. Restart `pnpm exec convex dev` — the error should disappear.
6. Put Clerk keys in `.env.local` (see [.env.example](.env.example)):
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/es/login
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/es/signup
   ```
7. (Optional, for user sync) Webhook → `http://localhost:3000/api/clerk` via ngrok in dev; events `user.created`, `user.updated`; set `CLERK_WEBHOOK_SECRET` in `.env.local`.

### Troubleshooting: `Publishable key not valid` (browser)

Your `.env.local` still has **placeholder** Clerk keys (e.g. `pk_test_placeholder`). Fix:

1. [Clerk Dashboard](https://dashboard.clerk.com) → **API Keys**
2. Copy the real **Publishable key** and **Secret key** into `.env.local`
3. Restart `pnpm dev`

The landing page works without valid keys; login/signup and the dashboard need real keys. See [docs/PRODUCT-ROADMAP.md](docs/PRODUCT-ROADMAP.md) for the product plan.

### Troubleshooting: “Conectando con el servidor…” on onboarding

Convex stays loading until it **validates** a Clerk JWT (not just `CLERK_JWT_ISSUER_DOMAIN` in the dashboard).

1. **Clerk → Integrations → Convex** (must be enabled). This creates the JWT template named `convex`.
2. **CLERK_JWT_ISSUER_DOMAIN** = Clerk **Frontend API URL** (e.g. `https://happy-oryx-12.clerk.accounts.dev`) — **not** the publishable key, **no** trailing `/`.
3. Set it on the **same** Convex deployment as `NEXT_PUBLIC_CONVEX_URL` in `.env.local`.
4. Restart: stop `convex dev`, run `pnpm exec convex dev` again (pushes `convex/auth.config.ts`).
5. Hard-refresh the browser (or sign out / sign in again).
6. On onboarding, read the amber diagnostic box (Clerk JWT vs Convex validation).

Verify Convex env from CLI:

```bash
pnpm exec convex env list
```

### 5. Run locally

```bash
pnpm dev
```

Open `http://localhost:3000/es`.

### 6. Demo data

```bash
pnpm exec convex run seed:seedDemoData
```

Creates 10 LATAM influencers (mock metrics), 2 demo brands, campaigns, and a sample proposal.

### Demo script (sales)

Step-by-step walkthrough for partners: [docs/DEMO-SCRIPT.md](docs/DEMO-SCRIPT.md).  
Product plan (public vs logged-in app): [docs/PRODUCT-ROADMAP.md](docs/PRODUCT-ROADMAP.md).

### 7. Deploy

```bash
pnpm exec convex deploy
# Vercel: import repo, set env vars, deploy
```

Update Clerk redirect URLs and webhook endpoint to production.

## User flows (Fase 1)

1. **Sign up** → onboarding (choose influencer or brand).
2. **Influencer**: profile → connect social (mock) → sync metrics → accept/reject proposals.
3. **Brand**: company profile → search influencers (filters) → create campaign → send proposals.
4. **Admin**: read-only overview at `/es/dashboard/admin` (set `role: admin` in Convex `users` table).

## Tests

```bash
pnpm test
```

Runs Convex unit tests for search and proposals.

## Fase 2 (not included)

AI search (`POST /search/ai`), Stripe payments, Qdrant, real Instagram/TikTok OAuth — requires explicit approval before implementation.

## Business env (Convex dashboard)

- `PLATFORM_COMMISSION_RATE` — e.g. `0.15`
- `SUBSCRIPTION_BYPASS_COMMISSION` — e.g. `true`
