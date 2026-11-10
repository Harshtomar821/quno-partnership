
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/current-user";
import { schoolSchema } from "@/lib/validations";
import { createSchoolPullRequest } from "@/lib/github";
import School from "@/models/School";

export async function POST(request: Request) {
  try {
    // 1. Authenticate current user
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login to submit the school application",
        },
        { status: 401 }
      );
    }

    // 2. Read request body
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body",
        },
        { status: 400 }
      );
    }

    // 3. Validate and transform form data
    const validation = schoolSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please check the application details",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // This is now the nested MongoDB-compatible structure
    const schoolData = validation.data;

    // 4. Connect to MongoDB
    await connectDB();

    // 5. Save complete application in MongoDB first
    const school = await School.create({
      ...schoolData,
      onboardedBy: currentUser.id,
      github: {
        status: "pending",
      },
    });

    // 6. Prepare complete application data for GitHub
    const githubSchoolData = {
      ...schoolData,
      applicationId: school._id.toString(),
      onboardedBy: currentUser.id,
      submittedAt: school.createdAt?.toISOString() ?? new Date().toISOString(),
    };

    // 7. Create GitHub branch, JSON file and Pull Request
    try {
      const githubResult = await createSchoolPullRequest({
        schoolId: school._id.toString(),
        schoolName: school.schoolName,
        schoolData: githubSchoolData,
      });

      // 8. Update MongoDB with GitHub details
      school.github = {
        ...githubResult,
        status: "created",
      };

      await school.save();

      return NextResponse.json(
        {
          success: true,
          message:
            "School application submitted successfully and GitHub Pull Request created",
          school: {
            id: school._id.toString(),
            schoolName: school.schoolName,
            github: school.github,
            createdAt: school.createdAt,
            onboardedBy: currentUser.id,
          },
        },
        { status: 201 }
      );
    } catch (githubError) {
      // 9. GitHub failed, but preserve MongoDB record
      console.error("GitHub Integration Error:", githubError);

      school.github = {
        status: "failed",
      };

      await school.save();

      return NextResponse.json(
        {
          success: true,
          message:
            "Application saved successfully, but GitHub integration failed. You can retry the GitHub operation later.",
          school: {
            id: school._id.toString(),
            schoolName: school.schoolName,
            githubStatus: school.github.status,
            createdAt: school.createdAt,
          },
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("School Application API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while submitting the application",
      },
      { status: 500 }
    );
  }
}
