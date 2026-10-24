import Link from "next/link";

/**
 * Job status enum values from Prisma schema.
 */
type JobStatus = "DRAFT" | "OPEN" | "CLOSED";

/**
 * A single recent job entry.
 */
export interface RecentJob {
  id: string;
  title: string;
  status: JobStatus;
  applicationsCount: number;
  createdAt: Date;
}

interface RecentJobItemProps {
  job: RecentJob;
}

/**
 * Status badge configuration mapping database values to presentation.
 */
const STATUS_CONFIG: Record<
  JobStatus,
  { label: string; variant: string }
> = {
  DRAFT: {
    label: "Draft",
    variant:
      "border-zinc-200 bg-zinc-100 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
  },
  OPEN: {
    label: "Open",
    variant:
      "border-emerald-200/60 bg-emerald-50 text-emerald-700 dark:border-emerald-800/60 dark:bg-emerald-950/60 dark:text-emerald-400",
  },
  CLOSED: {
    label: "Closed",
    variant:
      "border-zinc-200 bg-zinc-100 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-500",
  },
};

/**
 * Format date as "Oct 22", "Jan 5", etc.
 */
function formatJobDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

/**
 * RecentJobItem — displays a single job in both desktop table and mobile card layouts.
 *
 * Desktop: Single row with columns for title, status, applicants, date
 * Mobile: Stacked card with all information vertically arranged
 *
 * Links to the job detail page at /jobs/[id]
 */
export function RecentJobItem({ job }: RecentJobItemProps) {
  const statusConfig = STATUS_CONFIG[job.status];
  const formattedDate = formatJobDate(new Date(job.createdAt));
  const applicantsLabel =
    job.applicationsCount === 1 ? "applicant" : "applicants";

  return (
    <>
      {/* Desktop table row */}
      <Link
        href={`/jobs/${job.id}`}
        className="group hidden items-center justify-between rounded-lg border border-zinc-200/90 bg-white p-4 transition-all hover:border-zinc-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 motion-reduce:transition-none lg:flex dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700 dark:focus-visible:ring-zinc-100"
        aria-label={`View ${job.title} - ${statusConfig.label}, ${job.applicationsCount} ${applicantsLabel}`}
      >
        {/* Title column */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-zinc-950 truncate dark:text-zinc-100 dark:group-hover:text-zinc-50">
            {job.title}
          </h3>
        </div>

        {/* Status badge column */}
        <div className="mx-6 flex items-center">
          <span
            className={[
              "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
              statusConfig.variant,
            ].join(" ")}
          >
            {statusConfig.label}
          </span>
        </div>

        {/* Applicants count column */}
        <div className="mx-6 flex items-center gap-1.5">
          <svg
            className="h-4 w-4 text-zinc-400 dark:text-zinc-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
          <span className="text-sm font-medium tabular-nums text-zinc-700 dark:text-zinc-300">
            {job.applicationsCount}
          </span>
        </div>

        {/* Date column */}
        <div className="flex items-center gap-1.5">
          <svg
            className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {formattedDate}
          </span>
        </div>
      </Link>

      {/* Mobile card */}
      <Link
        href={`/jobs/${job.id}`}
        className="block rounded-lg border border-zinc-200/90 bg-white p-4 transition-all hover:border-zinc-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 motion-reduce:transition-none lg:hidden dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700 dark:focus-visible:ring-zinc-100"
        aria-label={`View ${job.title} - ${statusConfig.label}, ${job.applicationsCount} ${applicantsLabel}`}
      >
        <div className="space-y-3">
          {/* Title */}
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {job.title}
          </h3>

          {/* Status badge */}
          <div>
            <span
              className={[
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                statusConfig.variant,
              ].join(" ")}
            >
              {statusConfig.label}
            </span>
          </div>

          {/* Metadata row: Applicants • Date */}
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-1.5">
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              <span className="font-medium text-zinc-700 dark:text-zinc-300">
                {job.applicationsCount} {applicantsLabel}
              </span>
            </div>

            <span className="text-zinc-400 dark:text-zinc-600">•</span>

            <div className="flex items-center gap-1.5">
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
