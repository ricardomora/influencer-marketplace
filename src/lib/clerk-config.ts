/** True when Clerk keys look real (not docs placeholders). */
export function isClerkPublishableKeyValid(key: string | undefined): boolean {
  if (!key?.trim()) return false;
  const k = key.trim();
  if (/placeholder|your-|pk_test_\.\.\.|example/i.test(k)) return false;
  return /^pk_(test|live)_[A-Za-z0-9]+$/.test(k) && k.length >= 30;
}

export function isClerkSecretKeyValid(key: string | undefined): boolean {
  if (!key?.trim()) return false;
  const k = key.trim();
  if (/placeholder|your-|sk_test_\.\.\.|example/i.test(k)) return false;
  return /^sk_(test|live)_[A-Za-z0-9]+$/.test(k) && k.length >= 30;
}

export function isClerkConfigured(): boolean {
  return (
    isClerkPublishableKeyValid(
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    ) && isClerkSecretKeyValid(process.env.CLERK_SECRET_KEY)
  );
}
