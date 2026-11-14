import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET /api/jobs - List all jobs ordered by display_order
export async function GET() {
  try {
    const result = await query(`
      SELECT 
        j.*, 
        COUNT(a.id)::int as application_count 
      FROM jobs j
      LEFT JOIN job_applications a ON j.id = a.job_id
      GROUP BY j.id
      ORDER BY COALESCE(j.display_order, 999999) ASC, j.id ASC;
    `);
    return NextResponse.json({ success: true, jobs: result.rows });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to fetch jobs";
    console.error("GET /api/jobs error:", error);
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}

// POST /api/jobs - Create a new job
export async function POST(request: Request) {
  try {
    const adminPassword = request.headers.get("x-admin-password");
    if (!adminPassword || adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access: invalid admin key" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, description, department, location, type, status } = body;

    if (!title || !title.trim()) {
      return NextResponse.json(
        { success: false, error: "Job title (role) is required" },
        { status: 400 }
      );
    }

    const result = await query(
      `
      INSERT INTO jobs (title, description, department, location, type, status, display_order)
      VALUES (
        $1, $2, $3, $4, $5, $6,
        (SELECT COALESCE(MAX(display_order), 0) + 1 FROM jobs)
      )
      RETURNING *;
      `,
      [
        title.trim(),
        description ? description.trim() : "",
        department ? department.trim() : "Engineering",
        location ? location.trim() : "Remote",
        type ? type.trim() : "Full-time",
        status ? status.trim() : "Open",
      ]
    );

    return NextResponse.json({ success: true, job: result.rows[0] }, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to create job";
    console.error("POST /api/jobs error:", error);
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}

// DELETE /api/jobs - Delete a job by id
export async function DELETE(request: Request) {
  try {
    const adminPassword = request.headers.get("x-admin-password");
    if (!adminPassword || adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access: invalid admin key" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Job id is required" },
        { status: 400 }
      );
    }

    await query("DELETE FROM jobs WHERE id = $1;", [parseInt(id, 10)]);
    return NextResponse.json({ success: true, message: "Job deleted successfully" });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to delete job";
    console.error("DELETE /api/jobs error:", error);
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}

// PATCH /api/jobs - Update job status or ordering
export async function PATCH(request: Request) {
  try {
    const adminPassword = request.headers.get("x-admin-password");
    if (!adminPassword || adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access: invalid admin key" },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Batch reorder jobs: body = { order: [id1, id2, id3, ...] }
    if (Array.isArray(body.order)) {
      const orderList = body.order as number[];
      for (let i = 0; i < orderList.length; i++) {
        await query("UPDATE jobs SET display_order = $1 WHERE id = $2;", [
          i + 1,
          parseInt(String(orderList[i]), 10),
        ]);
      }

      const updated = await query(`
        SELECT 
          j.*, 
          COUNT(a.id)::int as application_count 
        FROM jobs j
        LEFT JOIN job_applications a ON j.id = a.job_id
        GROUP BY j.id
        ORDER BY COALESCE(j.display_order, 999999) ASC, j.id ASC;
      `);

      return NextResponse.json({
        success: true,
        message: "Job ordering updated successfully",
        jobs: updated.rows,
      });
    }

    // Single job display_order update
    if (body.id && body.display_order !== undefined) {
      const result = await query(
        "UPDATE jobs SET display_order = $1 WHERE id = $2 RETURNING *;",
        [parseInt(body.display_order, 10), parseInt(body.id, 10)]
      );
      return NextResponse.json({ success: true, job: result.rows[0] });
    }

    // Single job status update
    if (body.id && body.status) {
      const result = await query(
        "UPDATE jobs SET status = $1 WHERE id = $2 RETURNING *;",
        [body.status, parseInt(body.id, 10)]
      );
      return NextResponse.json({ success: true, job: result.rows[0] });
    }

    return NextResponse.json(
      { success: false, error: "Invalid update parameters provided" },
      { status: 400 }
    );
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to update job";
    console.error("PATCH /api/jobs error:", error);
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}
