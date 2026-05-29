import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/:locale/dashboard(.*)",
  "/:locale/onboarding(.*)",
]);

const locales = ["en", "es"] as const;
const defaultLocale = "es";

function getLocale(request: Request) {
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage?.toLowerCase().startsWith("en")) return "en";
  return defaultLocale;
}

export default clerkMiddleware(async (auth, request) => {
  const { pathname } = request.nextUrl;
  const { userId, sessionClaims } = await auth();

  if (isProtectedRoute(request)) {
    await auth.protect();
  }

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
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html|css|js|json|jpe?g|webp|png|gif|svg|ico)).*)",
    "/(api|trpc)(.*)",
  ],
};
