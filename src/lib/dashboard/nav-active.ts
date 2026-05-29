/** Overview routes match exactly; nested routes match prefix. */
export function isDashboardNavActive(pathname: string, href: string, isOverview: boolean) {
  const normalized = pathname.replace(/\/$/, "");
  const target = href.replace(/\/$/, "");
  if (isOverview) return normalized === target;
  return normalized === target || normalized.startsWith(`${target}/`);
}
