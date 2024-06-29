import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    console.log("Received login attempt:", { username, password });

    if (username === "admin" && password === "password") {
      const token = jwt.sign(
        { username },
        process.env.JWT_SECRET || "fallback_secret",
        { expiresIn: "1h" }
      );
      console.log("Login successful for:", username);
      return NextResponse.json({ token });
    } else {
      console.log("Login failed for:", username);
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
