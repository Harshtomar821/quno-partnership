
import { cookies } from "next/headers";

import { connectDB } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";
import User from "@/models/User";

export async function getCurrentUser() {
  try {
    // 1. Read JWT cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("quno_token")?.value;

    if (!token) {
      return null;
    }

    // 2. Verify JWT
    const payload = await verifyToken(token);

    if (!payload) {
      return null;
    }

    // 3. Connect to MongoDB
    await connectDB();

    // 4. Fetch active user
    const user = await User.findOne({
      _id: payload.userId,
      isActive: true,
    }).select("fullName email role createdAt");

    if (!user) {
      return null;
    }

    // 5. Return safe user information
    return {
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  } catch (error) {
    console.error("Get Current User Error:", error);
    return null;
  }
}
