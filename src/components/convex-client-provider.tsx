"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProvider } from "convex/react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { isClerkPublishableKeyValid } from "@/lib/clerk-config";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

const convexOk =
  Boolean(convexUrl?.trim()) && !convexUrl!.includes("placeholder");
const clerkOk = isClerkPublishableKeyValid(clerkKey);

const convex = convexOk ? new ConvexReactClient(convexUrl!) : null;

export function ConvexClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  if (clerkOk && convex) {
    return (
      <ClerkProvider publishableKey={clerkKey!}>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          {children}
        </ConvexProviderWithClerk>
      </ClerkProvider>
    );
  }

  if (clerkOk) {
    return (
      <ClerkProvider publishableKey={clerkKey!}>{children}</ClerkProvider>
    );
  }

  if (convex) {
    return <ConvexProvider client={convex}>{children}</ConvexProvider>;
  }

  return <>{children}</>;
}
