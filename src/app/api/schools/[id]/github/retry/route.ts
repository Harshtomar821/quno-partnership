
import { NextResponse } from "next/server";
import { Types } from "mongoose";

import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/current-user";
import { createSchoolPullRequest } from "@/lib/github";
import School from "@/models/School";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(
  request: Request,
  { params }: RouteContext
) {
  try {
    // 1. Authenticate user
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required",
        },
        { status: 401 }
      );
    }

    // 2. Get and validate school ID
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid school ID",
        },
        { status: 400 }
      );
    }

    // 3. Connect to MongoDB
    await connectDB();

    // 4. Find school application
    const school = await School.findById(id);

    if (!school) {
      return NextResponse.json(
        {
          success: false,
          message: "School application not found",
        },
        { status: 404 }
      );
    }

    // 5. Check ownership or admin role
    const isOwner =
      school.onboardedBy.toString() === currentUser.id;

    const isAdmin = currentUser.role === "admin";

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to retry this operation",
        },
        { status: 403 }
      );
    }

    // 6. Allow retry only for pending or failed status
    if (!["pending", "failed"].includes(school.github.status)) {
      return NextResponse.json(
        {
          success: false,
          message: `GitHub operation cannot be retried with status: ${school.github.status}`,
        },
        { status: 409 }
      );
    }

    // 7. Prepare complete application data
    // Keep the structure consistent with the initial submission API
    const githubSchoolData = {
      schoolName: school.schoolName,

      schoolProfile: school.schoolProfile,
      schoolAssessment: school.schoolAssessment,

      businessIntent: school.businessIntent,
      vendors: school.vendors,

      resistanceInsights: school.resistanceInsights,
      requirements: school.requirements,

      applicationId: school._id.toString(),
      onboardedBy: school.onboardedBy.toString(),
      submittedAt:
        school.createdAt?.toISOString() ?? new Date().toISOString(),
    };

    // 8. Retry GitHub integration
    try {
      const githubResult = await createSchoolPullRequest({
        schoolId: school._id.toString(),
        schoolName: school.schoolName,
        schoolData: githubSchoolData,
      });

      // 9. Save GitHub details in MongoDB
      school.github = {
        ...githubResult,
        status: "created",
      };

      await school.save();

      return NextResponse.json(
        {
          success: true,
          message: "GitHub Pull Request created successfully",
          school: {
            id: school._id.toString(),
            schoolName: school.schoolName,
            github: school.github,
          },
        },
        { status: 200 }
      );
    } catch (githubError) {
      console.error("GitHub Retry Error:", githubError);

      school.github = {
        status: "failed",
      };

      await school.save();

      return NextResponse.json(
        {
          success: false,
          message:
            "GitHub retry failed. School application is still safe in MongoDB.",
          githubStatus: "failed",
        },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("GitHub Retry API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while retrying GitHub integration",
      },
      { status: 500 }
    );
  }
}
