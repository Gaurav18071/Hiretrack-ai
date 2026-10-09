import Link from "next/link";
import LogoutButton from "@/components/logout-button";

interface DashboardHeaderProps {
  user?: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
  };
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const rawName = user?.name?.trim();
  const firstName = rawName ? rawName.split(/\s+/)[0] : null;
  const greeting = firstName ? `Welcome back, ${firstName}` : "Welcome back";
  const userRole = user?.role || "RECRUITER";

  return (
    <header className="border-b border-zinc-200/80 bg-white/70 backdrop-blur-md transition-colors dark:border-zinc-800/80 dark:bg-zinc-900/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
              Dashboard
            </h1>
            <span
              className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              aria-label={`User role: ${userRole}`}
            >
              {userRole}
            </span>
          </div>

          <p className="text-sm font-medium text-zinc-600 sm:text-base dark:text-zinc-400">
            <span className="text-zinc-900 dark:text-zinc-200">{greeting}.</span>{" "}
            Here is your recruitment overview, active pipeline, and candidate status.
          </p>

          {user?.email && (
            <p className="text-xs text-zinc-500 dark:text-zinc-500">
              Signed in as <span className="font-mono">{user.email}</span>
            </p>
          )}
        </div>

        <nav aria-label="Dashboard actions" className="flex flex-wrap items-center gap-2.5 pt-2 sm:pt-0">
          <Link
            href="/jobs"
            className="inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-sm font-medium text-zinc-700 shadow-xs transition-colors hover:bg-zinc-50 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:outline-hidden dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 dark:focus-visible:ring-zinc-100"
          >
            <svg
              className="mr-2 h-4 w-4 text-zinc-500 dark:text-zinc-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            View Jobs
          </Link>

          <Link
            href="/jobs/create"
            className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-3.5 py-2 text-sm font-medium text-white shadow-xs transition-all hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:outline-hidden dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:ring-zinc-100"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Job
          </Link>

          <LogoutButton className="inline-flex items-center justify-center rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:outline-hidden dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 dark:focus-visible:ring-zinc-100" />
        </nav>
      </div>
    </header>
  );
}
