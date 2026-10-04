import { StatsCard } from "@/components/dashboard/stats-card";

/**
 * The four KPI metrics surfaced on the main dashboard.
 *
 * All fields are optional so the section can render in a loading state
 * before real data is available.  A future commit will pass actual counts
 * fetched from the database via Prisma.
 */
export interface DashboardStats {
  totalJobs?: number;
  activeJobs?: number;
  totalCandidates?: number;
  totalApplications?: number;
}

interface StatsSectionProps {
  stats?: DashboardStats;
}

/** SVG path strings (24-px hero-icons outline style). */
const ICONS = {
  briefcase:
    "M20 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z" +
    "M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",
  checkCircle:
    "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  users:
    "M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952" +
    "4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07" +
    "M15 19.128v.106A12.318 12.318 0 0 1 8.624 21" +
    "a12.315 12.315 0 0 1-5.144-1.082l-.002-.001" +
    "M15 19.128A4.5 4.5 0 0 0 9 14.25" +
    "M9 14.25A4.5 4.5 0 0 0 4.5 18.75M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Z",
  clipboardList:
    "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108" +
    "c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08" +
    "m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75" +
    " 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15" +
    "c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08" +
    "C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875" +
    "c-.621 0-1.125.504-1.125 1.125v11.25" +
    "c0 .621.504 1.125 1.125 1.125h9.75" +
    "c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z",
} as const;

/**
 * StatsSection — responsive 4-card KPI grid.
 *
 * Pass `stats` when real data is available; omit it (or pass `undefined`)
 * to render the full-layout loading skeleton.
 *
 * No Prisma queries, no API calls, no fake business numbers.
 */
export function StatsSection({ stats }: StatsSectionProps) {
  const cards = [
    {
      id: "total-jobs",
      label: "Total Jobs",
      value: stats?.totalJobs,
      description: "All job requisitions created",
      iconPath: ICONS.briefcase,
    },
    {
      id: "active-jobs",
      label: "Active Jobs",
      value: stats?.activeJobs,
      description: "Open listings accepting applications",
      iconPath: ICONS.checkCircle,
      accentClass:
        "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
    },
    {
      id: "total-candidates",
      label: "Total Candidates",
      value: stats?.totalCandidates,
      description: "Candidate profiles on record",
      iconPath: ICONS.users,
      accentClass:
        "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400",
    },
    {
      id: "total-applications",
      label: "Total Applications",
      value: stats?.totalApplications,
      description: "Applications submitted across all jobs",
      iconPath: ICONS.clipboardList,
      accentClass:
        "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400",
    },
  ] as const;

  return (
    <section aria-labelledby="stats-section-heading" className="space-y-3">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h2
          id="stats-section-heading"
          className="text-base font-semibold text-zinc-900 sm:text-lg dark:text-zinc-100"
        >
          Overview
        </h2>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {stats === undefined ? "Loading metrics…" : "Your recruitment summary"}
        </span>
      </div>

      {/* Responsive grid: 1 col → 2 col → 4 col */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <StatsCard
            key={card.id}
            id={card.id}
            label={card.label}
            value={card.value}
            description={card.description}
            iconPath={card.iconPath}
            accentClass={"accentClass" in card ? card.accentClass : undefined}
          />
        ))}
      </div>
    </section>
  );
}
