import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "No token provided" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback_secret"
    ) as { username: string };
    console.log("Session check for user:", decoded.username);
    return NextResponse.json({ username: decoded.username });
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
