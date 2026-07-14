import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const candidateSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().optional(),
  experience: z.number().int().nonnegative().optional(),
  skills: z.array(z.string()).default([]),
  resumeUrl: z.string().trim().optional(),
});

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(request: Request, { params }: RouteContext) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id: jobId } = await params;

    // Verify that this job belongs to the logged-in recruiter
    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
        recruiterId: session.user.id,
      },
    });

    if (!job) {
      return NextResponse.json(
        { message: "Job not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const result = candidateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Invalid candidate data",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = result.data;
    const email = data.email.toLowerCase();

    // Reuse candidate if the email already exists
    const candidate = await prisma.candidate.upsert({
      where: {
        email,
      },
      update: {
        name: data.name,
        phone: data.phone,
        experience: data.experience,
        skills: data.skills,
        resumeUrl: data.resumeUrl,
      },
      create: {
        ...data,
        email,
      },
    });

    // Link candidate to this job
    const application = await prisma.application.create({
      data: {
        candidateId: candidate.id,
        jobId,
      },
    });

    return NextResponse.json(
      {
        message: "Candidate added successfully",
        candidate,
        application,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("ADD_CANDIDATE_ERROR:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request, { params }: RouteContext) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id: jobId } = await params;

    // Verify that this job belongs to the logged-in recruiter
    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
        recruiterId: session.user.id,
      },
    });

    if (!job) {
      return NextResponse.json(
        { message: "Job not found" },
        { status: 404 }
      );
    }

    const candidates = await prisma.application.findMany({
      where: {
        jobId,
      },
      include: {
        candidate: true,
      },
    });

    return NextResponse.json(candidates, { status: 200 });
  } catch (error) {
    console.error("GET_CANDIDATES_ERROR:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
