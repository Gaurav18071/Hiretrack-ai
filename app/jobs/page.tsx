import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function JobsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const jobs = await prisma.job.findMany({
    where: {
      recruiterId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="mx-auto max-w-4xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Jobs</h1>

        <Link href="/jobs/create" className="bg-black px-4 py-2 text-white">
          Create Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <p>No jobs created yet.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              className="block border p-5"
            >
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p>{job.department}</p>
              <p>{job.location}</p>
              <p>Status: {job.status}</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}