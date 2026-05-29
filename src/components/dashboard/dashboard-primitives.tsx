import { cn } from "@/lib/utils";

export function StatCard({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200/80 bg-white p-5 shadow-sm",
        className,
      )}
    >
      <p className="text-3xl font-semibold tracking-tight text-gray-900">{value}</p>
      <p className="mt-1 text-sm text-gray-500">{label}</p>
    </div>
  );
}

export function Panel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200/80 bg-white shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function PanelHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-gray-100 px-5 py-4">
      <div>
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        {subtitle && <p className="mt-0.5 text-sm text-gray-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function PanelBody({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("p-5", className)}>{children}</div>;
}

export function ListRow({
  title,
  meta,
  trailing,
  onClick,
}: {
  title: string;
  meta?: string;
  trailing?: React.ReactNode;
  onClick?: () => void;
}) {
  const Comp = onClick ? "button" : "div";
  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between gap-3 rounded-lg border border-gray-100 bg-gray-50/50 px-4 py-3 text-left transition-colors",
        onClick && "hover:border-indigo-200 hover:bg-indigo-50/40",
      )}
    >
      <div className="min-w-0">
        <p className="truncate font-medium text-gray-900">{title}</p>
        {meta && <p className="truncate text-xs text-gray-500">{meta}</p>}
      </div>
      {trailing}
    </Comp>
  );
}

export function CreatorAvatar({ name }: { name: string }) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  return (
    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-semibold text-white shadow-inner">
      {initial}
    </div>
  );
}

export function MetricBlock({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="text-center">
      <p
        className={cn(
          "text-sm font-semibold tabular-nums text-gray-900",
          highlight && "text-emerald-600",
        )}
      >
        {value}
      </p>
      <p className="mt-0.5 text-[11px] text-gray-500">{label}</p>
    </div>
  );
}

export function PostThumbPlaceholder({ index }: { index: number }) {
  const tones = [
    "from-rose-200 to-orange-200",
    "from-sky-200 to-indigo-200",
    "from-violet-200 to-fuchsia-200",
  ];
  return (
    <div
      className={cn(
        "aspect-[9/16] w-full max-w-[72px] rounded-md bg-gradient-to-br",
        tones[index % tones.length],
      )}
    />
  );
}
