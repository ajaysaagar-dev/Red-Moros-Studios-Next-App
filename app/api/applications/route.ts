import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET /api/applications - List all job applications (Admin only)
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
        email,
        years_of_experience, 
        discord_username, 
        portfolio_link, 
        linkedin_profile, 
        cv_filename, 
        cv_mimetype, 
        cv_data,
        status,
        responses,
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

interface ApplicationFieldResponse {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  value?: string;
  filename?: string;
  mimetype?: string;
  data?: string;
  size?: number;
}

// POST /api/applications - Submit a job application with dynamic role-specific fields
export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const jobIdRaw = formData.get("job_id");
    const jobTitle = (formData.get("job_title") as string) || "General Application";
    const jobId = jobIdRaw ? parseInt(jobIdRaw.toString(), 10) : null;

    const responsesRaw = formData.get("responses");
    const processedResponses: ApplicationFieldResponse[] = [];
    let derivedName = "";
    let derivedEmail = "";
    let derivedDiscord = "";
    let primaryDocFilename = "";
    let primaryDocMimetype = "";
    let primaryDocData = "";

    if (responsesRaw && typeof responsesRaw === "string") {
      try {
        const parsedFields: ApplicationFieldResponse[] = JSON.parse(responsesRaw);
        if (Array.isArray(parsedFields)) {
          for (const field of parsedFields) {
            const fieldId = field.id;
            const fieldType = field.type || "text";
            const fieldLabel = field.label || "Field";
            const isRequired = !!field.required;

            if (fieldType === "document" || fieldType === "image") {
              const fileKey = `file_${fieldId}`;
              const uploadedFile = formData.get(fileKey) as File | null;

              if (isRequired && (!uploadedFile || typeof uploadedFile === "string" || uploadedFile.size === 0)) {
                return NextResponse.json(
                  { success: false, error: `${fieldLabel} is required. Please upload a file.` },
                  { status: 400 }
                );
              }

              if (uploadedFile && typeof uploadedFile !== "string" && uploadedFile.size > 0) {
                // Limit file size to 20MB
                if (uploadedFile.size > 20 * 1024 * 1024) {
                  return NextResponse.json(
                    { success: false, error: `${fieldLabel} exceeds maximum allowed size (20MB).` },
                    { status: 400 }
                  );
                }

                const fileBytes = await uploadedFile.arrayBuffer();
                const buffer = Buffer.from(fileBytes);
                const fileBase64 = buffer.toString("base64");
                const fname = uploadedFile.name || "upload";
                const fmimetype = uploadedFile.type || (fieldType === "image" ? "image/png" : "application/pdf");

                processedResponses.push({
                  id: fieldId,
                  label: fieldLabel,
                  type: fieldType,
                  required: isRequired,
                  filename: fname,
                  mimetype: fmimetype,
                  data: fileBase64,
                  size: uploadedFile.size,
                });

                if (fieldType === "document" && !primaryDocData) {
                  primaryDocFilename = fname;
                  primaryDocMimetype = fmimetype;
                  primaryDocData = fileBase64;
                }
              } else {
                processedResponses.push({
                  id: fieldId,
                  label: fieldLabel,
                  type: fieldType,
                  required: isRequired,
                  filename: "",
                  mimetype: "",
                  data: "",
                  size: 0,
                });
              }
            } else {
              // Text, email, textarea, url, number
              const textVal = (field.value || "").trim();

              if (isRequired && !textVal) {
                return NextResponse.json(
                  { success: false, error: `${fieldLabel} is required.` },
                  { status: 400 }
                );
              }

              if (fieldType === "email" && textVal && !textVal.includes("@")) {
                return NextResponse.json(
                  { success: false, error: `Please enter a valid email address for ${fieldLabel}.` },
                  { status: 400 }
                );
              }

              processedResponses.push({
                id: fieldId,
                label: fieldLabel,
                type: fieldType,
                required: isRequired,
                value: textVal,
              });

              // Extract top-level name / email / discord
              const lowerLabel = fieldLabel.toLowerCase();
              if (!derivedName && (lowerLabel.includes("name") || lowerLabel.includes("candidate"))) {
                derivedName = textVal;
              }
              if (!derivedEmail && (fieldType === "email" || lowerLabel.includes("email"))) {
                derivedEmail = textVal.toLowerCase();
              }
              if (!derivedDiscord && lowerLabel.includes("discord")) {
                derivedDiscord = textVal;
              }
            }
          }
        }
      } catch (e) {
        console.error("Failed to parse dynamic responses:", e);
      }
    }

    // Legacy fallback support
    if (processedResponses.length === 0) {
      const firstName = (formData.get("first_name") as string) || "";
      const lastName = (formData.get("last_name") as string) || "";
      const email = (formData.get("email") as string) || "";
      const discordUsername = (formData.get("discord_username") as string) || "";
      const cvFile = formData.get("cv_file") as File | null;

      if (!firstName.trim() || !lastName.trim()) {
        return NextResponse.json({ success: false, error: "First and last name are required" }, { status: 400 });
      }
      if (!email.trim() || !email.includes("@")) {
        return NextResponse.json({ success: false, error: "A valid email is required" }, { status: 400 });
      }
      if (!cvFile || typeof cvFile === "string") {
        return NextResponse.json({ success: false, error: "CV file is required" }, { status: 400 });
      }

      const fileBytes = await cvFile.arrayBuffer();
      const buffer = Buffer.from(fileBytes);
      primaryDocData = buffer.toString("base64");
      primaryDocFilename = cvFile.name || "resume.pdf";
      primaryDocMimetype = cvFile.type || "application/pdf";
      derivedName = `${firstName.trim()} ${lastName.trim()}`;
      derivedEmail = email.trim().toLowerCase();
      derivedDiscord = discordUsername.trim();
    }

    // Ensure candidate name is not empty
    if (!derivedName) {
      const firstText = processedResponses.find((r) => r.value && r.type !== "email");
      derivedName = firstText ? firstText.value! : "Anonymous Applicant";
    }

    // Insert into job_applications table with dynamic responses
    const result = await query(
      `
      INSERT INTO job_applications (
        job_id,
        job_title,
        first_name,
        last_name,
        email,
        discord_username,
        cv_filename,
        cv_mimetype,
        cv_data,
        responses,
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10::jsonb, 'Pending')
      RETURNING id, job_title, first_name, email, discord_username, status, created_at;
      `,
      [
        jobId,
        jobTitle.trim(),
        derivedName,
        "",
        derivedEmail,
        derivedDiscord,
        primaryDocFilename,
        primaryDocMimetype,
        primaryDocData,
        JSON.stringify(processedResponses),
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

// PATCH /api/applications - Update candidate application status (Reviewed, Selected, Rejected, Pending)
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
    const { id, status } = body;

    if (!id || typeof id !== "number") {
      return NextResponse.json(
        { success: false, error: "Application ID is required" },
        { status: 400 }
      );
    }

    const validStatuses = ["Pending", "Reviewed", "Selected", "Rejected"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    const result = await query(
      `
      UPDATE job_applications
      SET status = $1
      WHERE id = $2
      RETURNING id, job_title, first_name, last_name, email, status;
      `,
      [status, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Application #${id} status updated to ${status}`,
      application: result.rows[0],
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to update application status";
    console.error("PATCH /api/applications error:", error);
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}

// DELETE /api/applications - Delete a candidate application
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
    const queryId = searchParams.get("id");
    let appId: number | null = queryId ? parseInt(queryId, 10) : null;

    if (!appId || isNaN(appId)) {
      const body = await request.json().catch(() => ({}));
      if (body.id && typeof body.id === "number") {
        appId = body.id;
      }
    }

    if (!appId || isNaN(appId)) {
      return NextResponse.json(
        { success: false, error: "Valid application ID is required" },
        { status: 400 }
      );
    }

    const result = await query(
      `DELETE FROM job_applications WHERE id = $1 RETURNING id;`,
      [appId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Application not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Application #${appId} deleted successfully`,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to delete application";
    console.error("DELETE /api/applications error:", error);
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}
