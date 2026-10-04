export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 overflow-x-hidden">
      {/* Header skeleton */}
      <div className="border-b border-zinc-200/80 bg-white/70 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-900/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-8 w-40 rounded-lg bg-zinc-200 animate-pulse dark:bg-zinc-800" />
              <div className="h-5 w-20 rounded-full bg-zinc-200 animate-pulse dark:bg-zinc-800" />
            </div>
            <div className="h-4 w-72 rounded bg-zinc-200/80 animate-pulse dark:bg-zinc-800" />
          </div>

          <div className="flex items-center gap-2.5">
            <div className="h-9 w-24 rounded-lg bg-zinc-200 animate-pulse dark:bg-zinc-800" />
            <div className="h-9 w-28 rounded-lg bg-zinc-200 animate-pulse dark:bg-zinc-800" />
            <div className="h-9 w-20 rounded-lg bg-zinc-200 animate-pulse dark:bg-zinc-800" />
          </div>
        </div>
      </div>

      {/* Main content skeletons */}
      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* KPI Skeleton Grid — mirrors StatsCard layout */}
        <section className="space-y-3" aria-label="Loading overview metrics">
          <div className="h-5 w-24 rounded bg-zinc-200 animate-pulse dark:bg-zinc-800" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col justify-between rounded-xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/60"
              >
                {/* Label + icon row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="h-4 w-28 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-8 w-8 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                </div>
                {/* Value placeholder */}
                <div className="my-4 h-8 w-20 animate-pulse rounded-md bg-zinc-200/80 dark:bg-zinc-800" />
                {/* Footer description */}
                <div className="border-t border-zinc-100 pt-2.5 dark:border-zinc-800/80">
                  <div className="h-3 w-36 animate-pulse rounded bg-zinc-200/60 dark:bg-zinc-800/70" />
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* Quick Actions Skeleton */}
        <section className="space-y-3" aria-label="Loading quick actions">
          <div className="h-5 w-32 rounded bg-zinc-200 animate-pulse dark:bg-zinc-800" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-36 rounded-xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/60"
              >
                <div className="flex items-center justify-between">
                  <div className="h-8 w-8 rounded-lg bg-zinc-200 animate-pulse dark:bg-zinc-800" />
                  <div className="h-4 w-12 rounded-full bg-zinc-200 animate-pulse dark:bg-zinc-800" />
                </div>
                <div className="mt-4 h-4 w-32 rounded bg-zinc-200 animate-pulse dark:bg-zinc-800" />
                <div className="mt-2 h-3 w-48 rounded bg-zinc-200/70 animate-pulse dark:bg-zinc-800/70" />
              </div>
            ))}
          </div>
        </section>

        {/* Pipeline Skeleton */}
        <section className="space-y-3" aria-label="Loading pipeline">
          <div className="h-5 w-44 rounded bg-zinc-200 animate-pulse dark:bg-zinc-800" />
          <div className="h-36 rounded-xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/60" />
        </section>

        {/* Recent Sections Skeleton Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/60"
            >
              <div className="flex justify-between">
                <div className="h-5 w-28 rounded bg-zinc-200 animate-pulse dark:bg-zinc-800" />
                <div className="h-4 w-14 rounded bg-zinc-200 animate-pulse dark:bg-zinc-800" />
              </div>
              <div className="mt-6 space-y-3">
                <div className="h-12 rounded-lg bg-zinc-200/60 animate-pulse dark:bg-zinc-800/60" />
                <div className="h-12 rounded-lg bg-zinc-200/60 animate-pulse dark:bg-zinc-800/60" />
                <div className="h-12 rounded-lg bg-zinc-200/60 animate-pulse dark:bg-zinc-800/60" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
