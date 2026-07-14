"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Candidate {
  candidate: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    experience?: number;
    skills?: string[];
    resumeUrl?: string;
  };
  id: string;
  status: string;
  createdAt: string;
  matchScore?: number;
}

export default function CandidateDetailPage() {
  const params = useParams();
  const router = useRouter();

  const jobId = params.id as string;
  const candidateId = params.candidateId as string;

  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCandidate() {
      try {
        const response = await fetch(`/api/jobs/${jobId}/candidates`);

        if (!response.ok) {
          throw new Error("Failed to fetch candidates");
        }

        const candidates: Candidate[] = await response.json();
        const found = candidates.find((c) => c.candidate.id === candidateId);

        if (!found) {
          setError("Candidate not found");
          return;
        }

        setCandidate(found);
      } catch (err) {
        setError("Error loading candidate details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (jobId && candidateId) {
      fetchCandidate();
    }
  }, [jobId, candidateId]);

  if (loading) {
    return (
      <main className="mx-auto max-w-2xl p-8">
        <p>Loading...</p>
      </main>
    );
  }

  if (error || !candidate) {
    return (
      <main className="mx-auto max-w-2xl p-8">
        <p className="text-red-600">{error || "Candidate not found"}</p>
        <Link href={`/jobs/${jobId}`} className="mt-4 text-blue-600">
          Back to Job
        </Link>
      </main>
    );
  }

  const { candidate: cand } = candidate;

  return (
    <main className="mx-auto max-w-2xl p-8">
      <Link href={`/jobs/${jobId}`} className="mb-6 text-blue-600">
        ← Back to Job
      </Link>

      <div className="mt-6 border p-6">
        <h1 className="mb-4 text-3xl font-bold">{cand.name}</h1>

        <div className="space-y-4">
          <div>
            <p className="font-semibold">Email</p>
            <p>{cand.email}</p>
          </div>

          {cand.phone && (
            <div>
              <p className="font-semibold">Phone</p>
              <p>{cand.phone}</p>
            </div>
          )}

          {cand.experience !== undefined && (
            <div>
              <p className="font-semibold">Experience (Years)</p>
              <p>{cand.experience}</p>
            </div>
          )}

          {cand.skills && cand.skills.length > 0 && (
            <div>
              <p className="font-semibold">Skills</p>
              <div className="flex flex-wrap gap-2">
                {cand.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-gray-200 px-3 py-1 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="font-semibold">Application Status</p>
            <p className="capitalize">{candidate.status}</p>
          </div>

          {cand.resumeUrl && (
            <div>
              <p className="font-semibold">Resume</p>
              <a
                href={cand.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Resume
              </a>
            </div>
          )}
        </div>

        <button
          onClick={() => router.back()}
          className="mt-6 rounded bg-black px-4 py-2 text-white"
        >
          Back
        </button>
      </div>
    </main>
  );
}
