
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { signupSchema } from "@/lib/validations";
import { generateToken } from "@/lib/auth";

// export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    // 1. Read and validate request body
    const body = await request.json();

    const validation = signupSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid signup details",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { fullName, email, password } = validation.data;

    // 2. Connect to MongoDB
    await connectDB();

    // 3. Check whether user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "An account with this email already exists",
        },
        { status: 409 }
      );
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 5. Create user
    // Role is always "user" for public signup.
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role: "user",
    });

    // 6. Generate JWT
    const token = await generateToken({
      userId: user._id.toString(),
      role: user.role,
    });

    // 7. Set secure HttpOnly cookie
    const response = NextResponse.json(
      {
        success: true,
        message: "Account created successfully",
        user: {
          id: user._id.toString(),
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );

    response.cookies.set("quno_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error: unknown) {
    console.error("Signup API Error:", error);

    // Handle duplicate email race condition
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "An account with this email already exists",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while creating your account",
      },
      { status: 500 }
    );
  }
}
