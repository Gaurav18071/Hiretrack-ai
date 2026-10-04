interface StatsCardProps {
  id: string;
  label: string;
  value: number | undefined;
  description: string;
  /** SVG path d= attribute for the 24-px viewBox icon */
  iconPath: string;
  /** Optional: highlight colour for the icon wrapper when value > 0 */
  accentClass?: string;
}

/**
 * A single KPI statistic card.
 *
 * When `value` is `undefined` the card renders a loading skeleton.
 * When `value` is 0 it renders the real layout with a zero-data state indicator.
 * When `value` is a positive number it renders the real value prominently.
 *
 * No client-side logic is required — this is a pure Server Component.
 */
export function StatsCard({
  id,
  label,
  value,
  description,
  iconPath,
  accentClass = "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
}: StatsCardProps) {
  const isLoading = value === undefined;
  const isEmpty = value === 0;

  return (
    <article
      aria-labelledby={`kpi-label-${id}`}
      className={[
        "group relative flex flex-col justify-between rounded-xl border bg-white p-5 shadow-xs",
        "transition-all motion-reduce:transition-none",
        "border-zinc-200/90 hover:border-zinc-300",
        "dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700",
      ].join(" ")}
    >
      {/* ── Top row: label + icon ── */}
      <div className="flex items-start justify-between gap-2">
        <span
          id={`kpi-label-${id}`}
          className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
        >
          {label}
        </span>

        <div
          className={[
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
            "transition-colors motion-reduce:transition-none",
            "group-hover:ring-1 group-hover:ring-zinc-300 dark:group-hover:ring-zinc-700",
            accentClass,
          ].join(" ")}
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
            <path d={iconPath} />
          </svg>
        </div>
      </div>

      {/* ── Middle: value or skeleton ── */}
      <div className="my-4">
        {isLoading ? (
          /* Loading skeleton — matches the real value's height */
          <div
            className="h-8 w-20 animate-pulse rounded-md bg-zinc-200/80 dark:bg-zinc-800"
            aria-label={`Loading ${label}`}
            role="status"
          />
        ) : (
          <p
            className={[
              "text-3xl font-bold tabular-nums tracking-tight",
              isEmpty
                ? "text-zinc-400 dark:text-zinc-600"
                : "text-zinc-900 dark:text-zinc-50",
            ].join(" ")}
            aria-label={`${label}: ${value}`}
          >
            {value.toLocaleString()}
          </p>
        )}
      </div>

      {/* ── Bottom: description + status dot ── */}
      <div className="border-t border-zinc-100 pt-2.5 dark:border-zinc-800/80">
        {isLoading ? (
          <div
            className="h-3 w-36 animate-pulse rounded bg-zinc-200/60 dark:bg-zinc-800/70"
            aria-hidden="true"
          />
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
            <span
              className={[
                "inline-block h-1.5 w-1.5 shrink-0 rounded-full",
                isEmpty
                  ? "bg-zinc-300 dark:bg-zinc-700"
                  : "bg-emerald-500 dark:bg-emerald-400",
              ].join(" ")}
              aria-hidden="true"
            />
            <span className="line-clamp-1">
              {isEmpty ? `No ${label.toLowerCase()} yet` : description}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
