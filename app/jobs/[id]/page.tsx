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

      <div className="mt-4 mb-8 flex gap-4">
        <Link
          href={`/jobs/${job.id}/candidates/new`}
          className="rounded bg-black px-4 py-2 text-white"
        >
          + Add Candidate
        </Link>
      </div>

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
        <h2 className="mb-4 text-2xl font-bold">
          Candidates
        </h2>

        {job.applications.length === 0 ? (
          <p>No candidates added yet.</p>
        ) : (
          <div className="space-y-4">
            {job.applications.map((application) => (
              <div
                key={application.id}
                className="rounded border p-4"
              >
                <h3 className="text-lg font-semibold">
                  {application.candidate.name}
                </h3>

                <p>{application.candidate.email}</p>

                <p>
                  Experience:{" "}
                  {application.candidate.experience ?? 0} years
                </p>

                <p>
                  Skills:{" "}
                  {application.candidate.skills.join(", ")}
                </p>

                <p>Status: {application.status}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}