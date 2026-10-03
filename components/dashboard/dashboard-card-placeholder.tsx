import Link from "next/link";

interface DashboardCardPlaceholderProps {
  title: string;
  subtitle: string;
  actionHref?: string;
  actionLabel?: string;
  badge?: string;
  rowCount?: number;
  emptyHint?: string;
}

export function DashboardCardPlaceholder({
  title,
  subtitle,
  actionHref,
  actionLabel,
  badge,
  rowCount = 3,
  emptyHint = "No records logged yet. Activity will appear here automatically.",
}: DashboardCardPlaceholderProps) {
  return (
    <section className="flex flex-col justify-between rounded-xl border border-zinc-200/90 bg-white p-5 shadow-xs transition-colors dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {title}
              </h2>
              {badge && (
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                  {badge}
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
              {subtitle}
            </p>
          </div>

          {actionHref && actionLabel && (
            <Link
              href={actionHref}
              className="text-xs font-medium text-zinc-700 hover:text-zinc-900 hover:underline dark:text-zinc-300 dark:hover:text-zinc-100"
            >
              {actionLabel}
            </Link>
          )}
        </div>

        {/* Skeleton placeholder rows */}
        <div className="space-y-2.5" aria-hidden="true">
          {Array.from({ length: rowCount }).map((_, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-lg border border-zinc-100 bg-zinc-50/70 p-3 dark:border-zinc-800/80 dark:bg-zinc-800/30"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-zinc-200/80 animate-pulse dark:bg-zinc-700/60" />
                <div className="space-y-1.5">
                  <div className="h-3 w-28 rounded bg-zinc-200/90 animate-pulse dark:bg-zinc-700/70" />
                  <div className="h-2.5 w-16 rounded bg-zinc-200/60 animate-pulse dark:bg-zinc-700/40" />
                </div>
              </div>
              <div className="h-5 w-14 rounded-full bg-zinc-200/70 animate-pulse dark:bg-zinc-700/50" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer hint */}
      <div className="mt-4 border-t border-zinc-100 pt-3 dark:border-zinc-800/80">
        <p className="text-xs text-zinc-500 line-clamp-1 dark:text-zinc-400">
          {emptyHint}
        </p>
      </div>
    </section>
  );
}
