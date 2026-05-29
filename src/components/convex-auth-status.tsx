"use client";

import { useConvexAuth } from "convex/react";
import { Button } from "@/components/ui/button";
import { useClerkConvexToken } from "@/hooks/use-clerk-convex-token";
import type { Locale } from "@/lib/i18n";

export function ConvexAuthStatus({ locale }: { locale: Locale }) {
  const { isLoading: convexLoading, isAuthenticated: convexOk } =
    useConvexAuth();
  const { status: tokenStatus, error: tokenError, retry, isSignedIn } =
    useClerkConvexToken();

  if (convexOk) return null;

  const es = locale === "es";

  return (
    <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
      <p className="font-medium">
        {es ? "Conectando con el servidor…" : "Connecting to the server…"}
      </p>
      <ul className="mt-2 list-inside list-disc space-y-1 text-amber-900">
        <li>
          {es ? "Sesión Clerk" : "Clerk session"}:{" "}
          {isSignedIn ? (es ? "sí" : "yes") : es ? "no" : "no"}
        </li>
        <li>
          {es ? "JWT plantilla «convex»" : "JWT template «convex»"}:{" "}
          {tokenStatus === "ok"
            ? es
              ? "obtenido"
              : "received"
            : tokenStatus === "loading"
              ? "…"
              : tokenStatus === "error"
                ? es
                  ? "falló"
                  : "failed"
                : "—"}
        </li>
        <li>
          {es ? "Convex validó el token" : "Convex validated token"}:{" "}
          {convexLoading ? "…" : convexOk ? (es ? "sí" : "yes") : es ? "no" : "no"}
        </li>
      </ul>
      {tokenError && (
        <p className="mt-2 text-red-800">
          <span className="font-medium">Clerk:</span> {tokenError}
        </p>
      )}
      {!convexOk && tokenStatus === "ok" && (
        <p className="mt-2 text-red-800">
          {es
            ? "El JWT existe pero Convex no lo acepta. Revisa que CLERK_JWT_ISSUER_DOMAIN en el dashboard de Convex sea exactamente tu Frontend API URL de Clerk (ej. https://xxx.clerk.accounts.dev), sin barra final. Luego reinicia pnpm exec convex dev."
            : "JWT exists but Convex rejected it. Ensure CLERK_JWT_ISSUER_DOMAIN in the Convex dashboard matches your Clerk Frontend API URL exactly (e.g. https://xxx.clerk.accounts.dev), no trailing slash. Then restart pnpm exec convex dev."}
        </p>
      )}
      <Button type="button" variant="outline" className="mt-3" onClick={() => retry()}>
        {es ? "Reintentar" : "Retry"}
      </Button>
    </div>
  );
}
