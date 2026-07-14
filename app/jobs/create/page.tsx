"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateJobPage() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    const parseSkills = (value: FormDataEntryValue | null) =>
      String(value || "")
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

    const jobData = {
      title: String(formData.get("title") || ""),
      description: String(formData.get("description") || ""),
      department: String(formData.get("department") || ""),
      location: String(formData.get("location") || ""),
      employmentType: String(formData.get("employmentType") || ""),

      salaryMin: formData.get("salaryMin")
        ? Number(formData.get("salaryMin"))
        : undefined,

      salaryMax: formData.get("salaryMax")
        ? Number(formData.get("salaryMax"))
        : undefined,

      requiredSkills: parseSkills(formData.get("requiredSkills")),
      preferredSkills: parseSkills(formData.get("preferredSkills")),

      minimumExperience: Number(
        formData.get("minimumExperience") || 0
      ),

      minimumEducation:
        String(formData.get("minimumEducation") || "").trim() || undefined,
    };

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to create job");
        return;
      }

      router.push("/jobs");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Create Job</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="title"
          placeholder="Job title"
          required
          className="border p-3"
        />

        <textarea
          name="description"
          placeholder="Job description"
          required
          className="min-h-40 border p-3"
        />

        <input
          name="department"
          placeholder="Department"
          required
          className="border p-3"
        />

        <input
          name="location"
          placeholder="Location"
          required
          className="border p-3"
        />

        <select
          name="employmentType"
          required
          defaultValue=""
          className="border p-3"
        >
          <option value="" disabled>
            Select employment type
          </option>
          <option value="FULL_TIME">Full Time</option>
          <option value="PART_TIME">Part Time</option>
          <option value="CONTRACT">Contract</option>
          <option value="INTERNSHIP">Internship</option>
        </select>

        <input
          name="requiredSkills"
          placeholder="Required skills: React, TypeScript, Next.js"
          required
          className="border p-3"
        />

        <input
          name="preferredSkills"
          placeholder="Preferred skills: PostgreSQL, Prisma, AWS"
          className="border p-3"
        />

        <input
          name="minimumExperience"
          type="number"
          min="0"
          defaultValue="0"
          placeholder="Minimum experience in years"
          className="border p-3"
        />

        <input
          name="minimumEducation"
          placeholder="Minimum education: B.Tech, B.E., etc."
          className="border p-3"
        />

        <input
          name="salaryMin"
          type="number"
          min="0"
          placeholder="Minimum salary"
          className="border p-3"
        />

        <input
          name="salaryMax"
          type="number"
          min="0"
          placeholder="Maximum salary"
          className="border p-3"
        />

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-black p-3 text-white disabled:opacity-50"
        >
          {isLoading ? "Creating..." : "Create Job"}
        </button>
      </form>
    </main>
  );
}