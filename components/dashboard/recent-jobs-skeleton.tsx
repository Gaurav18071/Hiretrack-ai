/**
 * Loading skeleton for the Recent Jobs section.
 * 
 * Displays 5 animated placeholder rows that match the final layout,
 * preventing layout shift when real data loads.
 */
export function RecentJobsSkeleton() {
  return (
    <div className="space-y-3">
      {/* Desktop table skeleton */}
      <div className="hidden lg:block">
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-lg border border-zinc-100 bg-zinc-50/70 p-4 dark:border-zinc-800/80 dark:bg-zinc-800/30"
              aria-hidden="true"
            >
              {/* Title skeleton */}
              <div className="flex-1 space-y-2">
                <div className="h-4 w-48 animate-pulse rounded bg-zinc-200/90 dark:bg-zinc-700/70" />
                <div className="h-3 w-32 animate-pulse rounded bg-zinc-200/60 dark:bg-zinc-700/40" />
              </div>

              {/* Status badge skeleton */}
              <div className="mx-6 h-6 w-16 animate-pulse rounded-full bg-zinc-200/70 dark:bg-zinc-700/50" />

              {/* Applicants count skeleton */}
              <div className="mx-6 h-4 w-12 animate-pulse rounded bg-zinc-200/80 dark:bg-zinc-700/60" />

              {/* Date skeleton */}
              <div className="h-3 w-16 animate-pulse rounded bg-zinc-200/70 dark:bg-zinc-700/50" />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile card skeleton */}
      <div className="space-y-3 lg:hidden">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-zinc-100 bg-zinc-50/70 p-4 dark:border-zinc-800/80 dark:bg-zinc-800/30"
            aria-hidden="true"
          >
            <div className="space-y-3">
              {/* Title skeleton */}
              <div className="h-5 w-3/4 animate-pulse rounded bg-zinc-200/90 dark:bg-zinc-700/70" />

              {/* Status badge skeleton */}
              <div className="h-6 w-20 animate-pulse rounded-full bg-zinc-200/70 dark:bg-zinc-700/50" />

              {/* Metadata row skeleton */}
              <div className="flex items-center gap-2">
                <div className="h-3 w-24 animate-pulse rounded bg-zinc-200/80 dark:bg-zinc-700/60" />
                <div className="h-3 w-3 animate-pulse rounded-full bg-zinc-200/60 dark:bg-zinc-700/40" />
                <div className="h-3 w-16 animate-pulse rounded bg-zinc-200/70 dark:bg-zinc-700/50" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
