"use client";

import { useAuth } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";

export type ClerkConvexTokenStatus = "idle" | "loading" | "ok" | "error";

export function useClerkConvexToken() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const [status, setStatus] = useState<ClerkConvexTokenStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const check = useCallback(async () => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      setStatus("idle");
      setError(null);
      return;
    }
    setStatus("loading");
    setError(null);
    try {
      const token = await getToken({ template: "convex", skipCache: true });
      if (token) {
        setStatus("ok");
      } else {
        setStatus("error");
        setError(
          "Clerk no devolvió un JWT. En Clerk Dashboard activa la integración «Convex» (plantilla JWT «convex»).",
        );
      }
    } catch (e) {
      setStatus("error");
      setError(
        e instanceof Error
          ? e.message
          : "No se pudo obtener el token Convex desde Clerk",
      );
    }
  }, [isLoaded, isSignedIn, getToken]);

  useEffect(() => {
    void check();
  }, [check]);

  return { status, error, retry: check, isLoaded, isSignedIn };
}
