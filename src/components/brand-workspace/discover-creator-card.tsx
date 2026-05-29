import {
  CreatorAvatar,
  MetricBlock,
  PostThumbPlaceholder,
} from "@/components/dashboard/dashboard-primitives";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function DiscoverCreatorCard({
  displayName,
  subtitle,
  category,
  followers,
  reach,
  engagementRate,
  followersLabel,
  reachLabel,
  engagementLabel,
  footer,
  onClick,
  className,
}: {
  displayName: string;
  subtitle: string;
  category?: string;
  followers: string;
  reach: string;
  engagementRate: string;
  followersLabel: string;
  reachLabel: string;
  engagementLabel: string;
  footer: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "cursor-pointer rounded-xl border border-gray-200/90 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900",
        className,
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 gap-3">
          <CreatorAvatar name={displayName} />
          <div className="min-w-0">
            <p className="truncate font-semibold text-gray-900 dark:text-gray-100">
              {displayName}
            </p>
            <p className="truncate text-xs text-gray-500">{subtitle}</p>
            {category && (
              <Badge className="mt-1 text-[10px]">{category}</Badge>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 border-y border-gray-100 py-3 dark:border-gray-800">
        <MetricBlock label={followersLabel} value={followers} />
        <MetricBlock label={reachLabel} value={reach} />
        <MetricBlock label={engagementLabel} value={engagementRate} highlight />
      </div>
      <div className="mt-3 flex justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <PostThumbPlaceholder key={i} index={i} />
        ))}
      </div>
      <div className="mt-4" onClick={(e) => e.stopPropagation()}>
        {footer}
      </div>
    </article>
  );
}
