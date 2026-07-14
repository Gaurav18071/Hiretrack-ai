"use client";

import { FormEvent, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function AddCandidatePage() {
  const router = useRouter();
  const params = useParams();

  const jobId = params.id as string;

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);

    const parseSkills = (value: FormDataEntryValue | null) =>
      String(value || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

    const body = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      experience: Number(form.get("experience") || 0),
      skills: parseSkills(form.get("skills")),
    };

    const response = await fetch(`/api/jobs/${jobId}/candidates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(data.message);
      return;
    }

    router.push(`/jobs/${jobId}`);
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Add Candidate
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          name="name"
          placeholder="Candidate Name"
          required
          className="border p-3"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="border p-3"
        />

        <input
          name="phone"
          placeholder="Phone"
          className="border p-3"
        />

        <input
          name="experience"
          type="number"
          min="0"
          defaultValue="0"
          className="border p-3"
        />

        <input
          name="skills"
          placeholder="React, Next.js, TypeScript"
          className="border p-3"
        />

        {error && (
          <p className="text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-black p-3 text-white"
        >
          {loading ? "Adding..." : "Add Candidate"}
        </button>
      </form>
    </main>
  );
}