
import { SignJWT, jwtVerify } from "jose";

export type UserRole = "admin" | "user";

export interface AuthPayload {
  userId: string;
  role: UserRole;
}

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error(
    "JWT_SECRET must be at least 32 characters long"
  );
}

const secret = new TextEncoder().encode(JWT_SECRET);

// Generate JWT Token
export async function generateToken(
  payload: AuthPayload
): Promise<string> {
  return new SignJWT({
    userId: payload.userId,
    role: payload.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .setSubject(payload.userId)
    .sign(secret);
}

// Verify JWT Token
export async function verifyToken(
  token: string
): Promise<AuthPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);

    if (
      typeof payload.userId !== "string" ||
      typeof payload.role !== "string" ||
      !["admin", "user"].includes(payload.role)
    ) {
      return null;
    }

    return {
      userId: payload.userId,
      role: payload.role as UserRole,
    };
  } catch {
    return null;
  }
}
