import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 text-center transition-colors dark:bg-zinc-950 dark:text-zinc-100">
      <div className="max-w-xl space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1 text-xs font-medium text-zinc-700 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          HireTrack AI · Smart ATS Platform
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-zinc-900 dark:text-zinc-50">
            HireTrack AI
          </h1>
          <p className="text-lg text-zinc-600 sm:text-xl dark:text-zinc-400">
            Your Smart Hiring Assistant & Recruitment Pipeline
          </p>
          <p className="text-sm text-zinc-500 max-w-md mx-auto dark:text-zinc-400">
            Manage job requisitions, analyze resumes with AI, and track candidate progression through interview stages.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            id="get-started"
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:outline-hidden dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:ring-zinc-100 cursor-pointer"
          >
            Get Started &rarr;
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 shadow-xs transition-colors hover:bg-zinc-50 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:outline-hidden dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 dark:focus-visible:ring-zinc-100"
          >
            Demo Accounts Login
          </Link>
        </div>

        <div className="pt-6 border-t border-zinc-200/80 dark:border-zinc-800/80 text-xs text-zinc-400 dark:text-zinc-500">
          Built for recruiters and HR teams · Powered by Next.js & Neon PostgreSQL
        </div>
      </div>
    </main>
  );
}
