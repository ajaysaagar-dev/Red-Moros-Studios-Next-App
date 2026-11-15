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
      ORDER BY j.display_order ASC, j.created_at DESC;
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

// POST /api/jobs - Create a new job with dynamic custom fields
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
    const { title, status, custom_fields, description } = body;

    if (!title || !title.trim()) {
      return NextResponse.json(
        { success: false, error: "Job title (role) is required" },
        { status: 400 }
      );
    }

    // Clean and normalize dynamic custom fields
    const sanitizedFields = Array.isArray(custom_fields)
      ? custom_fields
          .filter((f) => f && typeof f.label === "string" && f.label.trim())
          .map((f, idx) => ({
            id: f.id || `f_${Date.now()}_${idx}`,
            label: f.label.trim(),
            type: f.type || "text",
            required: !!f.required,
            placeholder: typeof f.placeholder === "string" ? f.placeholder.trim() : "",
            value: typeof f.value === "string" ? f.value.trim() : "",
          }))
      : [];

    // Helper extractors for legacy fallback columns
    const findField = (matcher: string) => {
      const match = sanitizedFields.find((f) =>
        f.label.toLowerCase().includes(matcher.toLowerCase())
      );
      return match ? match.value : "";
    };

    const dept = findField("department") || "General";
    const loc = findField("location") || "";
    const type = findField("type") || "";
    const desc =
      typeof description === "string"
        ? description.trim()
        : findField("description") || findField("requirement") || findField("responsibilit") || "";

    const result = await query(
      `
      INSERT INTO jobs (title, status, custom_fields, department, location, type, description, display_order)
      VALUES (
        $1, $2, $3::jsonb, $4, $5, $6, $7,
        (SELECT COALESCE(MAX(display_order), 0) + 1 FROM jobs)
      )
      RETURNING *;
      `,
      [
        title.trim(),
        status ? status.trim() : "Open",
        JSON.stringify(sanitizedFields),
        dept,
        loc,
        type,
        desc,
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

// PUT /api/jobs - Edit an existing job with dynamic custom fields
export async function PUT(request: Request) {
  try {
    const adminPassword = request.headers.get("x-admin-password");
    if (!adminPassword || adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access: invalid admin key" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, title, status, custom_fields, description } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Job ID is required" },
        { status: 400 }
      );
    }

    if (!title || !title.trim()) {
      return NextResponse.json(
        { success: false, error: "Job title (role) is required" },
        { status: 400 }
      );
    }

    // Clean and normalize dynamic custom fields
    const sanitizedFields = Array.isArray(custom_fields)
      ? custom_fields
          .filter((f) => f && typeof f.label === "string" && f.label.trim())
          .map((f, idx) => ({
            id: f.id || `f_${Date.now()}_${idx}`,
            label: f.label.trim(),
            type: f.type || "text",
            required: !!f.required,
            placeholder: typeof f.placeholder === "string" ? f.placeholder.trim() : "",
            value: typeof f.value === "string" ? f.value.trim() : "",
          }))
      : [];

    const findField = (matcher: string) => {
      const match = sanitizedFields.find((f) =>
        f.label.toLowerCase().includes(matcher.toLowerCase())
      );
      return match ? match.value : "";
    };

    const dept = findField("department") || "General";
    const loc = findField("location") || "";
    const type = findField("type") || "";
    const desc =
      typeof description === "string"
        ? description.trim()
        : findField("description") || findField("requirement") || findField("responsibilit") || "";

    const result = await query(
      `
      UPDATE jobs
      SET 
        title = $1,
        status = $2,
        custom_fields = $3::jsonb,
        department = $4,
        location = $5,
        type = $6,
        description = $7
      WHERE id = $8
      RETURNING *;
      `,
      [
        title.trim(),
        status ? status.trim() : "Open",
        JSON.stringify(sanitizedFields),
        dept,
        loc,
        type,
        desc,
        parseInt(id, 10),
      ]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Job not found" },
        { status: 404 }
      );
    }

    // Also update referenced job_title in job_applications so existing applications reflect the new title
    await query("UPDATE job_applications SET job_title = $1 WHERE job_id = $2;", [
      title.trim(),
      parseInt(id, 10),
    ]);

    return NextResponse.json({ success: true, job: result.rows[0] });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to update job";
    console.error("PUT /api/jobs error:", error);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

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
