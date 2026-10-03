import Link from "next/link";

interface QuickActionItem {
  id: string;
  title: string;
  description: string;
  href?: string;
  isAvailable: boolean;
  badge?: string;
  iconPath: string;
}

const QUICK_ACTIONS: QuickActionItem[] = [
  {
    id: "post-job",
    title: "Post New Vacancy",
    description: "Define job roles, qualifications, required skills, and salary bands.",
    href: "/jobs/create",
    isAvailable: true,
    badge: "Active",
    iconPath:
      "M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    id: "view-jobs",
    title: "Manage Listings",
    description: "Browse existing postings, update drafts, or inspect applicant counts.",
    href: "/jobs",
    isAvailable: true,
    badge: "Active",
    iconPath:
      "M4 6h16M4 10h16M4 14h16M4 18h16",
  },
  {
    id: "candidate-pool",
    title: "Review Pipeline",
    description: "AI resume analysis, candidate evaluation, and interview feedback.",
    isAvailable: false,
    badge: "Next Sprint",
    iconPath:
      "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
];

export function DashboardQuickActions() {
  return (
    <section aria-labelledby="quick-actions-heading" className="space-y-3">
      <div className="flex items-center justify-between">
        <h2
          id="quick-actions-heading"
          className="text-base font-semibold text-zinc-900 sm:text-lg dark:text-zinc-100"
        >
          Quick Actions
        </h2>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          Frequently used shortcuts
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {QUICK_ACTIONS.map((action) => {
          const content = (
            <div className="flex h-full flex-col justify-between p-5">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                      action.isAvailable
                        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950"
                        : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500"
                    }`}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.75}
                        d={action.iconPath}
                      />
                    </svg>
                  </div>

                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      action.isAvailable
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60"
                        : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
                    }`}
                  >
                    {action.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {action.title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed dark:text-zinc-400">
                    {action.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center text-xs font-medium text-zinc-700 dark:text-zinc-300">
                {action.isAvailable ? (
                  <span className="inline-flex items-center gap-1 text-zinc-900 hover:underline dark:text-zinc-100">
                    Proceed
                    <svg
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
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

          if (action.isAvailable && action.href) {
            return (
              <Link
                key={action.id}
                href={action.href}
                className="group block rounded-xl border border-zinc-200/90 bg-white shadow-xs transition-all hover:border-zinc-300 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:outline-hidden dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700 dark:focus-visible:ring-zinc-100"
              >
                {content}
              </Link>
            );
          }

          return (
            <div
              key={action.id}
              className="rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50 opacity-80 dark:border-zinc-800/80 dark:bg-zinc-900/20"
            >
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
