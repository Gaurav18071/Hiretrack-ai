"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface DemoAccount {
  name: string;
  role: "RECRUITER" | "HR";
  email: string;
  password: string;
  badgeLabel: string;
}

const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    name: "Sarah Jenkins",
    role: "RECRUITER",
    email: "recruiter@hiretrack.ai",
    password: "Password123!",
    badgeLabel: "Recruiter Account",
  },
  {
    name: "David Vance",
    role: "HR",
    email: "hr@hiretrack.ai",
    password: "Password123!",
    badgeLabel: "HR Partner Account",
  },
  {
    name: "Elena Rostova",
    role: "RECRUITER",
    email: "talent@hiretrack.ai",
    password: "Password123!",
    badgeLabel: "Talent Lead",
  },
];

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeQuickLogin, setActiveQuickLogin] = useState<string | null>(null);

  async function performLogin(targetEmail: string, targetPass: string) {
    setError("");
    setIsLoading(true);

    const result = await signIn("credentials", {
      email: targetEmail,
      password: targetPass,
      redirect: false,
    });

    setIsLoading(false);
    setActiveQuickLogin(null);

    if (result?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await performLogin(email, password);
  }

  async function handleDemoLogin(account: DemoAccount) {
    setEmail(account.email);
    setPassword(account.password);
    setActiveQuickLogin(account.email);
    await performLogin(account.email, account.password);
  }

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-zinc-50 dark:bg-zinc-950 p-4 text-zinc-900 dark:text-zinc-100 transition-colors">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-sm font-black">
              HT
            </span>
            HireTrack AI
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Sign in to your account</h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Smart recruitment, pipeline management, and candidate tracking
          </p>
        </div>

        {/* Demo Credentials Quick-Login Banner */}
        <section
          aria-label="Demo accounts for review"
          className="rounded-xl border border-zinc-200/90 bg-white p-4 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/70"
        >
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-1.5">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Portfolio Demo Accounts
              </h2>
            </div>
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
              One-Click Sign In
            </span>
          </div>

          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            Reviewing this project? Click any account below to sign in instantly without typing:
          </p>

          <div className="mt-3 space-y-2">
            {DEMO_ACCOUNTS.map((account) => (
              <button
                key={account.email}
                type="button"
                onClick={() => handleDemoLogin(account)}
                disabled={isLoading}
                className="w-full group flex items-center justify-between p-2.5 rounded-lg border border-zinc-100 bg-zinc-50 hover:bg-zinc-100/80 hover:border-zinc-300 transition-all text-left dark:border-zinc-800/80 dark:bg-zinc-800/40 dark:hover:bg-zinc-800 dark:hover:border-zinc-700 disabled:opacity-60 cursor-pointer"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:underline">
                      {account.name}
                    </span>
                    <span
                      className={`text-[10px] font-medium px-1.5 py-0.2 rounded ${
                        account.role === "HR"
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                      }`}
                    >
                      {account.role}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                    {account.email} · <span className="text-zinc-400 dark:text-zinc-600">Password123!</span>
                  </div>
                </div>

                <div className="text-xs font-medium text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 flex items-center gap-1">
                  {activeQuickLogin === account.email && isLoading ? (
                    <span className="text-xs text-zinc-500 animate-pulse">Signing in...</span>
                  ) : (
                    <>
                      <span>Login</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Manual Login Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-zinc-200/90 bg-white p-6 shadow-xs space-y-4 dark:border-zinc-800 dark:bg-zinc-900/70"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Or sign in manually
            </span>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="email-input"
              className="block text-xs font-medium text-zinc-700 dark:text-zinc-300"
            >
              Email address
            </label>
            <input
              id="email-input"
              type="email"
              placeholder="e.g. recruiter@hiretrack.ai"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full rounded-lg border border-zinc-200 px-3.5 py-2.5 text-sm bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:ring-zinc-100"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password-input"
              className="block text-xs font-medium text-zinc-700 dark:text-zinc-300"
            >
              Password
            </label>
            <input
              id="password-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="w-full rounded-lg border border-zinc-200 px-3.5 py-2.5 text-sm bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:ring-zinc-100"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-2.5 text-xs text-red-600 border border-red-200/80 dark:bg-red-950/40 dark:border-red-900/60 dark:text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center rounded-lg bg-zinc-900 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-zinc-800 focus:outline-hidden focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus:ring-zinc-100 cursor-pointer"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
          HireTrack AI · Smart ATS & Candidate Pipeline System
        </p>
      </div>
    </main>
  );
}