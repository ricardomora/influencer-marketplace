import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";
import { isClerkConfigured } from "@/lib/clerk-config";

const isProtectedRoute = createRouteMatcher([
  "/:locale/dashboard(.*)",
  "/:locale/onboarding(.*)",
]);

const locales = ["en", "es"] as const;
const defaultLocale = "es";

function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage?.toLowerCase().startsWith("en")) return "en";
  return defaultLocale;
}

function localeRouting(
  request: NextRequest,
  userId: string | null,
  sessionClaims: Record<string, unknown> | null,
) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    if (userId && pathname.match(/^\/(en|es)\/(login|signup)$/)) {
      const locale = pathname.split("/")[1] ?? defaultLocale;
      const role = (sessionClaims?.metadata as { role?: string } | undefined)
        ?.role;
      const dest =
        role === "influencer"
          ? `/${locale}/dashboard/influencer`
          : role === "brand"
            ? `/${locale}/dashboard/brand`
            : role === "admin"
              ? `/${locale}/dashboard/admin`
              : `/${locale}/onboarding`;
      return NextResponse.redirect(new URL(dest, request.url));
    }
    return NextResponse.next();
  }

  if (pathname === "/") {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(userId ? `/${locale}/dashboard` : `/${locale}`, request.url),
    );
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first === "login" || first === "signup" || first === "onboarding") {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url),
    );
  }

  return NextResponse.next();
}

const withClerk = clerkMiddleware(async (auth, request) => {
  const { userId, sessionClaims } = await auth();

  if (isProtectedRoute(request)) {
    await auth.protect();
  }

  return localeRouting(
    request,
    userId,
    sessionClaims as Record<string, unknown> | null,
  );
});

function withoutClerk(request: NextRequest) {
  if (isProtectedRoute(request)) {
    const locale = request.nextUrl.pathname.match(/^\/(en|es)/)?.[1] ?? defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }
  return localeRouting(request, null, null);
}

export default function middleware(
  request: NextRequest,
  event: Parameters<typeof withClerk>[1],
) {
  if (!isClerkConfigured()) {
    return withoutClerk(request);
  }
  return withClerk(request, event);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html|css|js|json|jpe?g|webp|png|gif|svg|ico)).*)",
    "/(api|trpc)(.*)",
  ],
};
