/**
 * Represents a single stage in the hiring pipeline.
 *
 * @property id - Unique identifier for the stage
 * @property label - Display name (e.g., "Applied", "Screening")
 * @property count - Number of candidates in this stage (undefined = loading)
 * @property description - Short description of what happens in this stage
 * @property iconPath - SVG path string for the stage icon (24px viewBox)
 * @property status - Corresponding ApplicationStatus enum value
 */
interface PipelineStage {
  id: string;
  label: string;
  count: number | undefined;
  description: string;
  iconPath: string;
  status: string;
}

/**
 * Props for the DashboardPipelineSection component.
 *
 * @property stages - Optional array of pipeline stages with counts.
 *                    When undefined, uses default stages with loading state.
 *                    When provided, displays actual candidate counts.
 */
interface DashboardPipelineSectionProps {
  stages?: PipelineStage[];
}

/**
 * Default pipeline stages with loading state.
 * Maps to the ApplicationStatus enum: APPLIED, SCREENING, INTERVIEW, OFFER, HIRED.
 * Excludes REJECTED status as it's not part of the primary progression flow.
 *
 * Icons are inline SVG path strings (24-px viewBox, Heroicons outline style).
 */
const DEFAULT_PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "applied",
    label: "Applied",
    count: undefined, // Loading state
    description: "New submissions",
    iconPath:
      "M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.251 2.251 0 00-.1.661Z",
    status: "APPLIED",
  },
  {
    id: "screening",
    label: "Screening",
    count: undefined,
    description: "Resume review",
    iconPath:
      "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z",
    status: "SCREENING",
  },
  {
    id: "interview",
    label: "Interview",
    count: undefined,
    description: "Live evaluation",
    iconPath:
      "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
    status: "INTERVIEW",
  },
  {
    id: "offer",
    label: "Offer",
    count: undefined,
    description: "Pending terms",
    iconPath:
      "M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12",
    status: "OFFER",
  },
  {
    id: "hired",
    label: "Hired",
    count: undefined,
    description: "Offer accepted",
    iconPath:
      "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z",
    status: "HIRED",
  },
];

/**
 * DashboardPipelineSection — Visual overview of the hiring pipeline.
 *
 * Shows the 5 primary recruitment stages (Applied → Screening → Interview → Offer → Hired)
 * with candidate counts at each stage. Excludes REJECTED status from the primary flow.
 *
 * When no data is provided, displays loading skeletons.
 * When data is provided, shows actual candidate counts.
 * Empty stages (count = 0) are displayed with muted styling but remain visible.
 *
 * Responsive layout:
 * - Mobile: 1 column (vertical stack)
 * - Tablet: 2 columns
 * - Medium: 3 columns
 * - Desktop: 5 columns (single row)
 *
 * Pure Server Component - no client-side logic, no data fetching.
 */
export function DashboardPipelineSection({
  stages = DEFAULT_PIPELINE_STAGES,
}: DashboardPipelineSectionProps) {
  return (
    <section aria-labelledby="pipeline-heading" className="space-y-3">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            id="pipeline-heading"
            className="text-base font-semibold text-zinc-900 sm:text-lg dark:text-zinc-100"
          >
            Hiring Pipeline
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Track candidates across your recruitment stages
          </p>
        </div>
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          {stages.length} Stages
        </span>
      </div>

      {/* Pipeline container */}
      <div className="rounded-xl border border-zinc-200/90 bg-white p-5 shadow-xs transition-colors dark:border-zinc-800 dark:bg-zinc-900/60">
        {/* Responsive grid: 1 col → 2 col → 3 col → 5 col */}
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {stages.map((stage, idx) => {
            const isLoading = stage.count === undefined;
            const isEmpty = stage.count === 0;

            return (
              <li
                key={stage.id}
                className="relative flex flex-col justify-between rounded-lg border border-zinc-100 bg-zinc-50/60 p-3.5 transition-colors motion-reduce:transition-none dark:border-zinc-800/80 dark:bg-zinc-800/40"
              >
                {/* Top row: Icon + Stage indicator */}
                <div className="flex items-center justify-between">
                  {/* Icon container */}
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.75}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d={stage.iconPath} />
                    </svg>
                  </div>

                  {/* Stage counter */}
                  <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Stage {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Middle: Stage label + Count */}
                <div className="my-3 space-y-1.5">
                  {/* Stage label */}
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {stage.label}
                  </h3>

                  {/* Count or skeleton */}
                  {isLoading ? (
                    /* Loading skeleton */
                    <div
                      className="h-7 w-16 animate-pulse rounded bg-zinc-200/70 dark:bg-zinc-700/60"
                      aria-label={`Loading ${stage.label} count`}
                      role="status"
                    />
                  ) : (
                    /* Actual count */
                    <div className="space-y-0.5">
                      <p
                        className={[
                          "text-2xl font-bold tabular-nums tracking-tight",
                          isEmpty
                            ? "text-zinc-400 dark:text-zinc-600"
                            : "text-zinc-900 dark:text-zinc-50",
                        ].join(" ")}
                        aria-label={`${stage.count ?? 0} candidates in ${stage.label} stage`}
                      >
                        {(stage.count ?? 0).toLocaleString()}
                      </p>
                      <p
                        className={[
                          "text-[11px]",
                          isEmpty
                            ? "text-zinc-400 dark:text-zinc-500"
                            : "text-zinc-500 dark:text-zinc-400",
                        ].join(" ")}
                      >
                        {isEmpty
                          ? "No candidates yet"
                          : stage.count === 1
                            ? "candidate"
                            : "candidates"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom: Description */}
                <div className="border-t border-zinc-200/50 pt-2 dark:border-zinc-700/50">
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    {stage.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
