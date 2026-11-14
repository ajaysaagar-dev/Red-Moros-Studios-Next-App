import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action"); // "download" or null/inline
    const key = searchParams.get("key");
    const headerPassword = request.headers.get("x-admin-password");

    if (
      (!key || key !== process.env.ADMIN_PASSWORD) &&
      (!headerPassword || headerPassword !== process.env.ADMIN_PASSWORD)
    ) {
      return new NextResponse("Unauthorized: Invalid admin credentials", { status: 401 });
    }

    const result = await query(
      "SELECT cv_filename, cv_mimetype, cv_data FROM job_applications WHERE id = $1;",
      [parseInt(id, 10)]
    );

    if (result.rows.length === 0) {
      return new NextResponse("CV file not found", { status: 404 });
    }

    const { cv_filename, cv_mimetype, cv_data } = result.rows[0];

    if (!cv_data) {
      return new NextResponse("CV file content is empty", { status: 404 });
    }

    const fileBuffer = Buffer.from(cv_data, "base64");
    const mimeType = cv_mimetype || "application/pdf";
    const disposition = action === "download" ? "attachment" : "inline";

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `${disposition}; filename="${encodeURIComponent(cv_filename)}"`,
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error: unknown) {
    console.error("GET /api/cv/[id] error:", error);
    return new NextResponse("Failed to load CV file", { status: 500 });
  }
}
