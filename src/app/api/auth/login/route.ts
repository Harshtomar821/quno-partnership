
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { loginSchema } from "@/lib/validations";
import { generateToken } from "@/lib/auth";

// export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    // 1. Read and validate request body
    const body = await request.json();

    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid login details",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    // 2. Connect to MongoDB
    await connectDB();

    // 3. Find user and explicitly select password
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    // 4. Check account status
    if (!user.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: "Your account has been deactivated",
        },
        { status: 403 }
      );
    }

    // 5. Compare password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    // 6. Generate JWT
    const token = await generateToken({
      userId: user._id.toString(),
      role: user.role,
    });

    // 7. Create response
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: {
          id: user._id.toString(),
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );

    // 8. Set HttpOnly cookie
    response.cookies.set("quno_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("Login API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while logging in",
      },
      { status: 500 }
    );
  }
}
