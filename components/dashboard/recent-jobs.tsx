import Link from "next/link";
import { RecentJobItem, type RecentJob } from "./recent-job-item";
import { RecentJobsSkeleton } from "./recent-jobs-skeleton";

interface RecentJobsProps {
  /**
   * Array of up to 5 most recent jobs.
   * 
   * When undefined, displays loading skeleton.
   * When empty array, displays empty state.
   * When populated, displays job list.
   */
  jobs?: RecentJob[];
}

/**
 * RecentJobs — Dashboard section displaying the 5 most recently created jobs.
 * 
 * Shows job title, status, application count, and creation date.
 * Links to individual job detail pages and the main jobs listing.
 * 
 * States:
 * - Loading: Shows animated skeleton (jobs === undefined)
 * - Empty: Shows helpful message with create CTA (jobs.length === 0)
 * - Populated: Shows up to 5 job entries (jobs.length > 0)
 * 
 * Responsive:
 * - Desktop: Table-like layout with aligned columns
 * - Mobile: Stacked card layout
 * 
 * Pure Server Component - no client-side logic required.
 */
export function RecentJobs({ jobs }: RecentJobsProps) {
  const isLoading = jobs === undefined;
  const isEmpty = jobs !== undefined && jobs.length === 0;
  const hasJobs = jobs !== undefined && jobs.length > 0;

  return (
    <section
      aria-labelledby="recent-jobs-heading"
      className="flex flex-col justify-between rounded-xl border border-zinc-200/90 bg-white p-5 shadow-xs transition-colors dark:border-zinc-800 dark:bg-zinc-900/60"
    >
      {/* Section header */}
      <div className="mb-4 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2
                id="recent-jobs-heading"
                className="text-base font-semibold text-zinc-900 dark:text-zinc-100"
              >
                Recent Jobs
              </h2>
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                Live
              </span>
            </div>
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
              Your latest job postings at a glance
            </p>
          </div>

          {/* View all link - only show if jobs exist */}
          {hasJobs && (
            <Link
              href="/jobs"
              className="text-xs font-medium text-zinc-700 hover:text-zinc-900 hover:underline dark:text-zinc-300 dark:hover:text-zinc-100"
            >
              View all jobs →
            </Link>
          )}
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1">
        {isLoading && <RecentJobsSkeleton />}

        {isEmpty && (
          <div className="rounded-lg border border-dashed border-zinc-200 bg-zinc-50/50 p-8 text-center dark:border-zinc-800/80 dark:bg-zinc-900/20">
            <div className="space-y-3">
              {/* Empty state icon */}
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                <svg
                  className="h-6 w-6 text-zinc-400 dark:text-zinc-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </div>

              {/* Empty state text */}
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  No jobs yet
                </p>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  Create your first job posting to start building your hiring
                  pipeline.
                </p>
              </div>

              {/* Create job CTA */}
              <div>
                <Link
                  href="/jobs/create"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 motion-reduce:transition-none dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 dark:focus-visible:ring-zinc-100"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 4v16m8-8H4" />
                  </svg>
                  Create Job
                </Link>
              </div>
            </div>
          </div>
        )}

        {hasJobs && (
          <div className="space-y-2.5">
            {jobs.map((job) => (
              <RecentJobItem key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>

      {/* Footer hint */}
      {!isEmpty && (
        <div className="mt-4 border-t border-zinc-100 pt-3 dark:border-zinc-800/80">
          <p className="line-clamp-1 text-xs text-zinc-500 dark:text-zinc-400">
            {isLoading
              ? "Loading recent job postings…"
              : `Showing ${jobs?.length ?? 0} of your most recent job${jobs?.length === 1 ? "" : "s"}`}
          </p>
        </div>
      )}
    </section>
  );
}
