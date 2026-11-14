import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;
    const envPassword = process.env.ADMIN_PASSWORD;

    if (!envPassword) {
      console.error("ADMIN_PASSWORD is not configured in .env");
      return NextResponse.json(
        { success: false, error: "Server authentication configuration missing" },
        { status: 500 }
      );
    }

    if (typeof password === "string" && password === envPassword) {
      return NextResponse.json({ success: true, message: "Authentication successful" });
    }

    return NextResponse.json(
      { success: false, error: "Access Denied: Invalid security password" },
      { status: 401 }
    );
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Authentication error";
    console.error("POST /api/admin/auth error:", error);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
