import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET /api/applications - List all job applications
export async function GET(request: Request) {
  try {
    const adminPassword = request.headers.get("x-admin-password");
    if (!adminPassword || adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access: invalid admin key" },
        { status: 401 }
      );
    }

    const result = await query(`
      SELECT 
        id, 
        job_id, 
        job_title, 
        first_name, 
        last_name, 
        years_of_experience, 
        discord_username, 
        portfolio_link, 
        linkedin_profile, 
        cv_filename, 
        cv_mimetype, 
        created_at 
      FROM job_applications 
      ORDER BY created_at DESC;
    `);
    return NextResponse.json({ success: true, applications: result.rows });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to fetch applications";
    console.error("GET /api/applications error:", error);
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}

// POST /api/applications - Submit a job application with CV upload
export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const jobIdRaw = formData.get("job_id");
    const jobTitle = formData.get("job_title") as string;
    const firstName = formData.get("first_name") as string;
    const lastName = formData.get("last_name") as string;
    const yearsExpRaw = formData.get("years_of_experience");
    const discordUsername = formData.get("discord_username") as string;
    const portfolioLink = formData.get("portfolio_link") as string;
    const linkedinProfile = formData.get("linkedin_profile") as string;
    const cvFile = formData.get("cv_file") as File | null;

    // Validate required fields
    if (!firstName || !firstName.trim()) {
      return NextResponse.json({ success: false, error: "First name is required" }, { status: 400 });
    }
    if (!lastName || !lastName.trim()) {
      return NextResponse.json({ success: false, error: "Last name is required" }, { status: 400 });
    }
    if (!discordUsername || !discordUsername.trim()) {
      return NextResponse.json({ success: false, error: "Discord username is required" }, { status: 400 });
    }
    if (!cvFile || typeof cvFile === "string") {
      return NextResponse.json({ success: false, error: "CV file upload is required" }, { status: 400 });
    }

    const yearsOfExp = yearsExpRaw ? parseInt(yearsExpRaw.toString(), 10) : 0;
    const jobId = jobIdRaw ? parseInt(jobIdRaw.toString(), 10) : null;

    // Read CV file as base64
    const fileBytes = await cvFile.arrayBuffer();
    const buffer = Buffer.from(fileBytes);
    const cvData = buffer.toString("base64");
    const cvFilename = cvFile.name || "resume.pdf";
    const cvMimetype = cvFile.type || "application/pdf";

    // Insert into job_applications table
    const result = await query(
      `
      INSERT INTO job_applications (
        job_id,
        job_title,
        first_name,
        last_name,
        years_of_experience,
        discord_username,
        portfolio_link,
        linkedin_profile,
        cv_filename,
        cv_mimetype,
        cv_data
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id, job_title, first_name, last_name, discord_username, created_at;
      `,
      [
        jobId,
        jobTitle ? jobTitle.trim() : "General Application",
        firstName.trim(),
        lastName.trim(),
        isNaN(yearsOfExp) ? 0 : Math.min(20, Math.max(0, yearsOfExp)),
        discordUsername.trim(),
        portfolioLink ? portfolioLink.trim() : null,
        linkedinProfile ? linkedinProfile.trim() : null,
        cvFilename,
        cvMimetype,
        cvData,
      ]
    );

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
        application: result.rows[0],
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to submit application";
    console.error("POST /api/applications error:", error);
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}
