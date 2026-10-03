interface KpiCardConfig {
  id: string;
  title: string;
  description: string;
  iconPath: string;
}

const KPI_CONFIGS: KpiCardConfig[] = [
  {
    id: "active-jobs",
    title: "Active Jobs",
    description: "Published openings accepting applications",
    iconPath:
      "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    id: "total-candidates",
    title: "Total Candidates",
    description: "Active profiles across open requisitions",
    iconPath:
      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    id: "interviews-scheduled",
    title: "Interviews",
    description: "Live & upcoming candidate rounds",
    iconPath:
      "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    id: "offers-pending",
    title: "Offers Pending",
    description: "Candidates awaiting decision or response",
    iconPath:
      "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
];

export function DashboardKpiSection() {
  return (
    <section aria-labelledby="kpi-heading" className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 id="kpi-heading" className="text-base font-semibold text-zinc-900 sm:text-lg dark:text-zinc-100">
          Key Performance Indicators
        </h2>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          Metrics placeholder · Sprint 3
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPI_CONFIGS.map((kpi) => (
          <article
            key={kpi.id}
            className="group relative flex flex-col justify-between rounded-xl border border-zinc-200/90 bg-white p-5 shadow-xs transition-all hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700"
          >
            <div className="flex items-start justify-between">
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {kpi.title}
              </span>
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition-colors group-hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:group-hover:bg-zinc-700"
                aria-hidden="true"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.75}
                    d={kpi.iconPath}
                  />
                </svg>
              </div>
            </div>

            {/* Skeleton / Placeholder state instead of fake business metric */}
            <div className="my-4 space-y-2">
              <div
                className="h-7 w-20 rounded-md bg-zinc-200/80 animate-pulse dark:bg-zinc-800"
                aria-label="Metric data connecting in next sprint"
              />
              <p className="text-xs text-zinc-500 line-clamp-1 dark:text-zinc-400">
                {kpi.description}
              </p>
            </div>

            <div className="border-t border-zinc-100 pt-2.5 dark:border-zinc-800/80">
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                <span>Ready for live telemetry</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
