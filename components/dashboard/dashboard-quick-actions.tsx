import Link from "next/link";

/**
 * Defines a single quick action card on the dashboard.
 *
 * Available actions navigate to existing routes.
 * Coming Soon actions render as disabled placeholders without hrefs.
 */
interface QuickAction {
  id: string;
  title: string;
  description: string;
  iconPath: string;
  href?: string;
  isAvailable: boolean;
  badge: string;
}

/**
 * The four primary recruiter workflows exposed on the dashboard.
 *
 * Icons are inline SVG path strings (24-px viewBox, Heroicons outline style).
 */
const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "create-job",
    title: "Create Job",
    description: "Create a new job posting with requirements and qualifications",
    iconPath: "M12 4v16m8-8H4",
    href: "/jobs/create",
    isAvailable: true,
    badge: "Active",
  },
  {
    id: "add-candidate",
    title: "Add Candidate",
    description: "Add a new candidate to a job opening",
    iconPath:
      "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z",
    href: "/jobs",
    isAvailable: true,
    badge: "Active",
  },
  {
    id: "schedule-interview",
    title: "Schedule Interview",
    description: "Plan an interview session with a candidate",
    iconPath:
      "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    isAvailable: false,
    badge: "Coming Soon",
  },
  {
    id: "upload-resume",
    title: "Upload Resume",
    description: "Add candidate resume for AI-powered analysis",
    iconPath:
      "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12",
    isAvailable: false,
    badge: "Coming Soon",
  },
];

/**
 * DashboardQuickActions — 4-card grid of frequently used recruiter workflows.
 *
 * Available actions navigate to existing routes using semantic <Link> elements.
 * Coming Soon actions render as disabled placeholders with dashed borders.
 *
 * Responsive layout:
 * - Mobile: 1 column
 * - Tablet: 2 columns
 * - Desktop: 4 columns
 *
 * No client-side logic, no data fetching. Pure Server Component.
 */
export function DashboardQuickActions() {
  return (
    <section aria-labelledby="quick-actions-heading" className="space-y-3">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h2
          id="quick-actions-heading"
          className="text-base font-semibold text-zinc-900 sm:text-lg dark:text-zinc-100"
        >
          Quick Actions
        </h2>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          Frequently used recruitment actions
        </span>
      </div>

      {/* Responsive grid: 1 col → 2 col → 4 col */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {QUICK_ACTIONS.map((action) => {
          const content = (
            <div className="flex h-full flex-col justify-between p-5">
              {/* Top section: icon, badge, title, description */}
              <div className="space-y-2.5">
                {/* Icon + Badge row */}
                <div className="flex items-center justify-between">
                  {/* Icon container */}
                  <div
                    className={[
                      "flex h-9 w-9 items-center justify-center rounded-lg transition-colors motion-reduce:transition-none",
                      action.isAvailable
                        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950"
                        : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.75}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d={action.iconPath} />
                    </svg>
                  </div>

                  {/* Status badge */}
                  <span
                    className={[
                      "rounded-full border px-2 py-0.5 text-xs font-medium",
                      action.isAvailable
                        ? "border-emerald-200/60 bg-emerald-50 text-emerald-700 dark:border-emerald-800/60 dark:bg-emerald-950/60 dark:text-emerald-400"
                        : "border-zinc-200 bg-zinc-100 text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
                    ].join(" ")}
                  >
                    {action.badge}
                  </span>
                </div>

                {/* Title + Description */}
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {action.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {action.description}
                  </p>
                </div>
              </div>

              {/* Bottom footer: CTA or status text */}
              <div className="mt-4 flex items-center text-xs font-medium">
                {action.isAvailable ? (
                  <span className="inline-flex items-center gap-1 text-zinc-900 group-hover:underline dark:text-zinc-100">
                    Proceed
                    <svg
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                ) : (
                  <span className="text-zinc-400 dark:text-zinc-600">
                    In development
                  </span>
                )}
              </div>
            </div>
          );

          // Available actions render as <Link> with interactive states
          if (action.isAvailable && action.href) {
            return (
              <Link
                key={action.id}
                href={action.href}
                className="group block rounded-xl border border-zinc-200/90 bg-white shadow-xs transition-all hover:border-zinc-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 motion-reduce:transition-none dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700 dark:focus-visible:ring-zinc-100"
                aria-label={`${action.title}: ${action.description}`}
              >
                {content}
              </Link>
            );
          }

          // Coming Soon actions render as non-interactive <div>
          return (
            <div
              key={action.id}
              className="rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50 opacity-75 dark:border-zinc-800/80 dark:bg-zinc-900/20"
              aria-disabled="true"
              aria-label={`${action.title}: ${action.description} - Coming Soon`}
            >
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
