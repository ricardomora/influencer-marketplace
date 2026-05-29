import Link from "next/link";

export function ClerkSetupNotice({
  locale,
  title,
  body,
  backLabel,
}: {
  locale: string;
  title: string;
  body: string;
  backLabel: string;
}) {
  return (
    <div className="mx-auto max-w-lg rounded-xl border border-amber-200 bg-amber-50 p-6 text-center dark:border-amber-900 dark:bg-amber-950/40">
      <h2 className="text-lg font-semibold text-amber-900 dark:text-amber-100">
        {title}
      </h2>
      <p className="mt-2 text-sm text-amber-800 dark:text-amber-200">{body}</p>
      <p className="mt-3 font-mono text-xs text-amber-700/80">
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY · CLERK_SECRET_KEY
      </p>
      <Link
        href={`/${locale}`}
        className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:underline"
      >
        ← {backLabel}
      </Link>
    </div>
  );
}
