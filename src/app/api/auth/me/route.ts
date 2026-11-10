
import { NextRequest, NextResponse, connection } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

// export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    // 1. Prevent prerendering before accessing request-specific data
    await connection();

    // 2. Get authentication cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("quno_token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required",
        },
        { status: 401 }
      );
    }

    // 3. Verify JWT
    const payload = await verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired session",
        },
        { status: 401 }
      );
    }

    // 4. Connect to MongoDB
    await connectDB();

    // 5. Fetch current user
    const user = await User.findById(payload.userId).select(
      "fullName email role isActive createdAt"
    );

    if (!user || !user.isActive) {
      const response = NextResponse.json(
        {
          success: false,
          message: "User account not found or inactive",
        },
        { status: 401 }
      );

      response.cookies.set("quno_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });

      return response;
    }

    // 6. Return current user
    return NextResponse.json(
      {
        success: true,
        user: {
          id: user._id.toString(),
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get Current User API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while fetching user",
      },
      { status: 500 }
    );
  }
}
