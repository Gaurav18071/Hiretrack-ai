
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

type JobDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function JobDetailsPage({
  params,
}: JobDetailsPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { id } = await params;

  const job = await prisma.job.findFirst({
    where: {
      id,
      recruiterId: session.user.id,
    },
    include: {
      applications: {
        include: {
          candidate: true,
        },
        orderBy: {
          appliedAt: "desc",
        },
      },
    },
  });

  if (!job) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl p-8">
      <Link href="/jobs" className="mb-6 inline-block underline">
        ← Back to Jobs
      </Link>

      <h1 className="text-3xl font-bold">{job.title}</h1>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded border p-4">
          <p className="text-sm text-gray-500">Total Candidates</p>
          <h2 className="text-3xl font-bold">
            {job.applications.length}
          </h2>
        </div>

        <div className="rounded border p-4">
          <p className="text-sm text-gray-500">Status</p>
          <h2 className="text-2xl font-bold">{job.status}</h2>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <p>
          <strong>Department:</strong> {job.department}
        </p>

        <p>
          <strong>Location:</strong> {job.location}
        </p>

        <p>
          <strong>Employment Type:</strong> {job.employmentType}
        </p>

        <p>
          <strong>Minimum Experience:</strong>{" "}
          {job.minimumExperience} years
        </p>

        <p>
          <strong>Minimum Education:</strong>{" "}
          {job.minimumEducation || "Not specified"}
        </p>
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Description</h2>
        <p className="mt-2">{job.description}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Required Skills</h2>
        <p className="mt-2">
          {job.requiredSkills.join(", ")}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Preferred Skills</h2>
        <p className="mt-2">
          {job.preferredSkills.join(", ") || "None"}
        </p>
      </section>

      <section className="mt-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Candidates ({job.applications.length})
          </h2>

          <Link
            href={`/jobs/${job.id}/candidates/new`}
            className="rounded bg-black px-4 py-2 text-white"
          >
            + Add Candidate
          </Link>
        </div>

        {job.applications.length === 0 ? (
          <div className="rounded border p-6 text-center">
            <p className="text-gray-600">No candidates have applied yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {job.applications.map((application) => (
              <Link
                key={application.id}
                href={`/jobs/${job.id}/candidates/${application.candidate.id}`}
                className="block rounded-lg border p-5 transition hover:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {application.candidate.name}
                    </h3>
                    <p className="text-gray-600">
                      {application.candidate.email}
                    </p>
                  </div>
                  <span className="rounded bg-gray-100 px-3 py-1 text-sm">
                    {application.status}
                  </span>
                </div>

                <div className="mt-3">
                  <p>
                    <strong>Experience:</strong>{" "}
                    {application.candidate.experience ?? 0} years
                  </p>
                  <p className="mt-1">
                    <strong>Skills:</strong>{" "}
                    {application.candidate.skills.length > 0
                      ? application.candidate.skills.join(", ")
                      : "No skills added"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}