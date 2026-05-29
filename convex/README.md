# Convex API (InfluenceHub)

## Auth

| Function | Type | Description |
|----------|------|-------------|
| `users.syncUser` | mutation | Webhook sync from Clerk |
| `users.current` | query | Current user |
| `users.setRole` | mutation | Set role (onboarding) |
| `users.completeOnboarding` | mutation | Mark onboarding done |

## Influencers

| Function | Type | Description |
|----------|------|-------------|
| `influencers.getMyProfile` | query | Own profile |
| `influencers.createProfile` | mutation | Create profile |
| `influencers.updateProfile` | mutation | Update profile |
| `search.searchInfluencers` | query | Structured search (brand/admin) |

## Social

| Function | Type | Description |
|----------|------|-------------|
| `socialAccounts.connectAccount` | mutation | Connect platform (mock OAuth) |
| `socialAccounts.syncSocialMetricsMock` | action | Generate mock metrics |

## Brands & campaigns

| Function | Type | Description |
|----------|------|-------------|
| `brands.create` / `brands.update` | mutation | Brand CRUD |
| `campaigns.create` | mutation | Create campaign |
| `proposals.send` | mutation | Brand sends proposal |
| `proposals.accept` / `reject` | mutation | Influencer response |

## Seed

```bash
pnpm exec convex run seed:seedDemoData
```
