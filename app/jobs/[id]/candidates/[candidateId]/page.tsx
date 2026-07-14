import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

type CandidatePageProps = {
  params: Promise<{
    id: string;
    candidateId: string;
  }>;
};

export default async function CandidatePage({
  params,
}: CandidatePageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { id: jobId, candidateId } = await params;

  const application = await prisma.application.findFirst({
    where: {
      jobId,
      candidateId,
      job: {
        recruiterId: session.user.id,
      },
    },
    include: {
      candidate: true,
      interviews: true,
      resumeAnalysis: true,
      job: true,
    },
  });

  if (!application) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl p-8">

      <Link
        href={`/jobs/${jobId}`}
        className="mb-6 inline-block underline"
      >
        ← Back to Job
      </Link>

      <h1 className="text-4xl font-bold">
        {application.candidate.name}
      </h1>

      <p className="mt-2 text-gray-600">
        Applying for {application.job.title}
      </p>

      <div className="mt-8 grid grid-cols-2 gap-6">

        <div className="rounded border p-5">
          <h2 className="mb-4 text-xl font-semibold">
            Candidate Information
          </h2>

          <p>
            <strong>Email:</strong>{" "}
            {application.candidate.email}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {application.candidate.phone || "Not Provided"}
          </p>

          <p>
            <strong>Experience:</strong>{" "}
            {application.candidate.experience ?? 0} Years
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {application.status}
          </p>
        </div>

        <div className="rounded border p-5">
          <h2 className="mb-4 text-xl font-semibold">
            Skills
          </h2>

          {application.candidate.skills.length === 0 ? (
            <p>No skills added.</p>
          ) : (
            <ul className="list-disc pl-5">
              {application.candidate.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded border p-5">
          <h2 className="mb-4 text-xl font-semibold">
            Resume
          </h2>

          <p>No resume uploaded yet.</p>
        </div>

        <div className="rounded border p-5">
          <h2 className="mb-4 text-xl font-semibold">
            AI Analysis
          </h2>

          <p>Resume has not been analyzed.</p>
        </div>

        <div className="rounded border p-5">
          <h2 className="mb-4 text-xl font-semibold">
            Interview
          </h2>

          <p>No interview scheduled.</p>
        </div>

      </div>

    </main>
  );
}