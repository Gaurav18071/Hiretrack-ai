import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatsSection } from "@/components/dashboard/stats-section";
import { DashboardQuickActions } from "@/components/dashboard/dashboard-quick-actions";
import { DashboardPipelineSection } from "@/components/dashboard/dashboard-pipeline-section";
import { DashboardCardPlaceholder } from "@/components/dashboard/dashboard-card-placeholder";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100 overflow-x-hidden">
      {/* 1. Dashboard Header */}
      <DashboardHeader user={session.user} />

      {/* 2. Main Content Container */}
      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/*
          KPI Statistics — `stats` is undefined here so the section renders
          in a loading/placeholder state.  A future commit will pass real
          counts fetched from the database via Prisma.
        */}
        <StatsSection />

        {/* Quick Actions Shortcuts */}
        <DashboardQuickActions />

        {/* Hiring Pipeline Funnel Overview */}
        <DashboardPipelineSection />

        {/* Multi-Column Feature Section Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <DashboardCardPlaceholder
            title="Recent Jobs"
            subtitle="Latest active and draft job requisitions"
            actionHref="/jobs"
            actionLabel="View all jobs"
            badge="Live"
            rowCount={3}
            emptyHint="Requisitions will populate automatically when jobs are published."
          />

          <DashboardCardPlaceholder
            title="Recent Candidates"
            subtitle="New applicant profiles awaiting screening"
            actionHref="/jobs"
            actionLabel="Review"
            badge="Pipeline"
            rowCount={3}
            emptyHint="Candidate submissions will appear here upon application submission."
          />

          <DashboardCardPlaceholder
            title="Recent Activity"
            subtitle="Audit logs, status updates, and stage progressions"
            badge="Live Log"
            rowCount={3}
            emptyHint="System events and interview feedback logs will appear here."
          />
        </div>
      </main>
    </div>
  );
}