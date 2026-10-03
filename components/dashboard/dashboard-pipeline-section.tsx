interface PipelineStageConfig {
  id: string;
  step: number;
  label: string;
  description: string;
}

const PIPELINE_STAGES: PipelineStageConfig[] = [
  {
    id: "applied",
    step: 1,
    label: "Applied",
    description: "New submissions",
  },
  {
    id: "screening",
    step: 2,
    label: "Screening",
    description: "AI resume parse",
  },
  {
    id: "interview",
    step: 3,
    label: "Interview",
    description: "Live evaluation",
  },
  {
    id: "offer",
    step: 4,
    label: "Offer",
    description: "Pending terms",
  },
  {
    id: "hired",
    step: 5,
    label: "Hired",
    description: "Offer accepted",
  },
];

export function DashboardPipelineSection() {
  return (
    <section aria-labelledby="pipeline-heading" className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2
            id="pipeline-heading"
            className="text-base font-semibold text-zinc-900 sm:text-lg dark:text-zinc-100"
          >
            Hiring Pipeline Funnel
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Real-time candidate transition through active stages
          </p>
        </div>
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          5 Stages
        </span>
      </div>

      <div className="rounded-xl border border-zinc-200/90 bg-white p-5 shadow-xs transition-colors dark:border-zinc-800 dark:bg-zinc-900/60">
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {PIPELINE_STAGES.map((stage, idx) => (
            <li
              key={stage.id}
              className="relative flex flex-col justify-between rounded-lg border border-zinc-100 bg-zinc-50/60 p-3.5 transition-all dark:border-zinc-800/80 dark:bg-zinc-800/40"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 text-xs font-semibold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
                  {stage.step}
                </span>
                <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Stage 0{idx + 1}
                </span>
              </div>

              <div className="my-3 space-y-1">
                <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  {stage.label}
                </p>
                <div
                  className="h-5 w-12 rounded bg-zinc-200/70 animate-pulse dark:bg-zinc-700/60"
                  aria-label={`${stage.label} count placeholder`}
                />
              </div>

              <div className="border-t border-zinc-200/50 pt-2 dark:border-zinc-700/50">
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  {stage.description}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
