# Clerk webhook (user sync)

New Clerk accounts are mirrored into Convex via `POST /api/clerk`. Without this webhook, signup still works (onboarding calls `bootstrapCurrentUser`), but production signups are more reliable when the webhook is configured.

## Production (Vercel)

1. Deploy the app and note the URL, e.g. `https://influencehub.vercel.app`.
2. [Clerk Dashboard](https://dashboard.clerk.com) → **Webhooks** → **Add endpoint**
   - **URL:** `https://YOUR_DOMAIN/api/clerk`
   - **Events:** `user.created`, `user.updated`
3. Copy the **Signing secret** (`whsec_...`).
4. Set env vars:
   - **Vercel:** `CLERK_WEBHOOK_SECRET=whsec_...`
   - **Local:** same key in `.env.local`
5. Redeploy Vercel after adding the secret.

## Local development

Clerk cannot reach `localhost`. Use a tunnel:

```bash
ngrok http 3000
```

Point the Clerk webhook to `https://YOUR-NGROK-ID.ngrok-free.app/api/clerk` and put the signing secret in `.env.local`.

## Verify

1. Sign up a new test user.
2. Clerk Dashboard → Webhooks → your endpoint → **Message attempts** should show `200 OK`.
3. Convex dashboard → **Data** → `users` table should contain a row with matching `clerkId`.

## Related fixes

Clerk **path routing** requires catch-all routes:

- `src/app/[locale]/login/[[...rest]]/page.tsx`
- `src/app/[locale]/signup/[[...rest]]/page.tsx`

Without them, subpaths like `/es/signup/verify-email-address` return **404** during signup.
