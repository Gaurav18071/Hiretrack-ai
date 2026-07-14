import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const createJobSchema = z.object({
  title: z.string().trim().min(2, "Title is required"),
  description: z.string().trim().min(10, "Description is too short"),
  department: z.string().trim().min(2, "Department is required"),
  location: z.string().trim().min(2, "Location is required"),
  employmentType: z.string().trim().min(2, "Employment type is required"),

  salaryMin: z.number().int().nonnegative().optional(),
  salaryMax: z.number().int().nonnegative().optional(),

  requiredSkills: z.array(z.string()).default([]),
  preferredSkills: z.array(z.string()).default([]),

  minimumExperience: z.number().int().nonnegative().default(0),
  minimumEducation: z.string().trim().optional(),
});

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const result = createJobSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Invalid job data",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = result.data;

    if (
      data.salaryMin !== undefined &&
      data.salaryMax !== undefined &&
      data.salaryMin > data.salaryMax
    ) {
      return NextResponse.json(
        { message: "Minimum salary cannot exceed maximum salary" },
        { status: 400 }
      );
    }

    const job = await prisma.job.create({
      data: {
        ...data,
        recruiterId: session.user.id,
      },
    });

    return NextResponse.json(
      {
        message: "Job created successfully",
        job,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE_JOB_ERROR:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}