"use client";

import { useConvexAuth } from "convex/react";

/** Pass as the second argument to `useQuery` / `useMutation` when auth may be absent (e.g. after sign out). */
export function useAuthSkip(): "skip" | Record<string, never> {
  const { isAuthenticated } = useConvexAuth();
  return isAuthenticated ? {} : "skip";
}
