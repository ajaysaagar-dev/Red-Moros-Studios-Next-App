"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import {
  Send,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  X,
  ArrowRight,
} from "lucide-react";

interface CustomField {
  id: string;
  label: string;
  value: string;
}

interface Job {
  id: number;
  title: string;
  status: string;
  custom_fields?: CustomField[];
  department?: string;
  location?: string;
  type?: string;
  description?: string;
  display_order?: number;
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Application form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [yearsExperience, setYearsExperience] = useState<number>(3);
  const [discordUsername, setDiscordUsername] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [linkedinProfile, setLinkedinProfile] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function loadJobs() {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        if (isMounted && data.success && Array.isArray(data.jobs)) {
          setJobs(data.jobs.filter((j: Job) => j.status === "Open" || !j.status));
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadJobs();
    return () => {
      isMounted = false;
    };
  }, []);

  const openApplyModal = (job: Job) => {
    setSelectedJob(job);
    setSubmitSuccess(false);
    setErrorMessage("");
  };

  const closeApplyModal = () => {
    setSelectedJob(null);
    setFirstName("");
    setLastName("");
    setEmail("");
    setYearsExperience(3);
    setDiscordUsername("");
    setPortfolioLink("");
    setLinkedinProfile("");
    setCvFile(null);
    setErrorMessage("");
    setSubmitSuccess(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 15 * 1024 * 1024) {
        setErrorMessage("File exceeds 15MB limit. Please upload a smaller PDF/DOC.");
        return;
      }
      setCvFile(file);
      setErrorMessage("");
    }
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    if (!firstName.trim() || !lastName.trim()) {
      setErrorMessage("First and Last name are required.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("A valid email address is required.");
      return;
    }
    if (!discordUsername.trim()) {
      setErrorMessage("Discord username is mandatory.");
      return;
    }
    if (!cvFile) {
      setErrorMessage("Please upload your CV / Resume.");
      return;
    }

    try {
      setSubmitting(true);
      setErrorMessage("");

      const formData = new FormData();
      formData.append("job_id", selectedJob.id.toString());
      formData.append("job_title", selectedJob.title);
      formData.append("first_name", firstName.trim());
      formData.append("last_name", lastName.trim());
      formData.append("email", email.trim().toLowerCase());
      formData.append("years_of_experience", yearsExperience.toString());
      formData.append("discord_username", discordUsername.trim());
      formData.append("portfolio_link", portfolioLink.trim());
      formData.append("linkedin_profile", linkedinProfile.trim());
      formData.append("cv_file", cvFile);

      const res = await fetch("/api/applications", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setSubmitSuccess(true);
      } else {
        setErrorMessage(data.error || "Submission failed. Please try again.");
      }
    } catch (err: unknown) {
      console.error("Application submission error:", err);
      setErrorMessage("An unexpected network error occurred. Please retry.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#09090C] text-[#F7F2F3] flex flex-col font-sans selection:bg-[#FF0000] selection:text-[#09090C]">
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-20 w-full">
          {/* Top Header */}
          <div className="space-y-3 sm:space-y-4 mb-10 sm:mb-16 text-left border-b border-white/5 pb-8 sm:pb-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF0000] animate-pulse" />
              <span className="font-mono text-[10px] sm:text-xs text-[#FF0000] tracking-widest uppercase font-bold">
                {"THE FOUNDRY // CAREERS"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-6xl font-mono font-black uppercase tracking-tight text-white">
              JOIN RED MOROS <span className="text-[#FF0000]">STUDIOS</span>
            </h1>

            <p className="font-mono text-sm sm:text-base text-[#B8AEB1] max-w-2xl font-light leading-relaxed">
              We are assembling an elite team of engineers, artists, and storytellers to craft the next frontier of story-driven psychological horror with best-in-class visuals.
            </p>
          </div>

          {/* Job Listings Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between font-mono text-xs text-[#B8AEB1] pb-2">
              <span className="text-[#FF0000] font-bold tracking-widest uppercase">
                OPEN POSITIONS ({jobs.length})
              </span>
              <span>FILTER: ALL DISCIPLINES</span>
            </div>

            {loading ? (
              <div className="p-12 text-center font-mono text-xs text-[#B8AEB1] space-y-3 bg-[#151115] border border-white/5">
                <div className="w-6 h-6 border-2 border-[#FF0000] border-t-transparent rounded-full animate-spin mx-auto" />
                <div>RETRIEVING OPEN POSITIONS...</div>
              </div>
            ) : jobs.length === 0 ? (
              <div className="p-12 text-center font-mono text-sm text-[#B8AEB1] bg-[#151115] border border-white/5">
                No open positions currently listed. Please check back soon or send an open inquiry.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-6 sm:p-8 bg-[#151115] border border-white/10 hover:border-[#FF0000]/70 transition-all duration-300 flex flex-col md:flex-row md:items-start justify-between gap-6 group"
                  >
                    <div className="space-y-4 max-w-2xl text-left flex-1">
                      {/* Short Dynamic Fields (Badges / Tags) - Only rendered if admin configured them */}
                      {job.custom_fields &&
                        job.custom_fields.filter(
                          (f) => f.value && f.value.length <= 50 && !f.value.includes("\n")
                        ).length > 0 && (
                          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                            {job.custom_fields
                              .filter(
                                (f) => f.value && f.value.length <= 50 && !f.value.includes("\n")
                              )
                              .map((field) => (
                                <span
                                  key={field.id}
                                  className="px-2.5 py-1 bg-[#17090D] border border-[#FF0000]/30 text-white flex items-center gap-1.5"
                                >
                                  <span className="text-[#FF0000] font-bold uppercase tracking-wider text-[10px]">
                                    {field.label}:
                                  </span>
                                  <span className="text-[#F7F2F3]">{field.value}</span>
                                </span>
                              ))}
                          </div>
                        )}

                      {/* Role Title */}
                      <h2 className="text-xl sm:text-2xl font-mono font-bold text-white uppercase tracking-wide group-hover:text-[#FF0000] transition-colors">
                        {job.title}
                      </h2>

                      {/* Long Dynamic Fields (Descriptions / Responsibilities / Requirements) */}
                      {job.custom_fields &&
                        job.custom_fields
                          .filter(
                            (f) => f.value && (f.value.length > 50 || f.value.includes("\n"))
                          )
                          .map((field) => (
                            <div key={field.id} className="space-y-1 pt-1 font-mono">
                              <span className="text-[10px] text-[#FF0000] uppercase tracking-widest font-bold block">
                                {"// "} {field.label}
                              </span>
                              <p className="text-xs sm:text-sm text-[#B8AEB1] leading-relaxed font-light whitespace-pre-line">
                                {field.value}
                              </p>
                            </div>
                          ))}
                    </div>

                    <button
                      onClick={() => openApplyModal(job)}
                      className="px-6 py-3.5 bg-[#17090D] border border-[#FF0000] text-white hover:bg-[#FF0000] hover:text-[#09090C] font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 self-start md:self-center"
                    >
                      <span>APPLY FOR ROLE</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Application Modal */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
            <div className="relative w-full max-w-2xl bg-[#151115] border border-[#FF0000]/50 p-5 sm:p-10 text-left my-auto max-h-[92vh] overflow-y-auto shadow-[0_0_50px_rgba(255,0,0,0.15)]">
              {/* Corner Accents */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#FF0000]" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#FF0000]" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#FF0000]" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#FF0000]" />

              {/* Close Button */}
              <button
                onClick={closeApplyModal}
                className="absolute top-6 right-6 p-1 text-[#B8AEB1] hover:text-[#FF0000] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {submitSuccess ? (
                <div className="text-center py-12 space-y-4 font-mono">
                  <CheckCircle2 className="w-12 h-12 text-[#FF0000] mx-auto animate-bounce" />
                  <h3 className="text-2xl font-bold uppercase tracking-tight text-white">
                    APPLICATION TRANSMITTED
                  </h3>
                  <p className="text-xs sm:text-sm text-[#B8AEB1] max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-bold">{firstName} {lastName}</span>. Your application for <span className="text-[#FF0000] font-bold">{selectedJob.title}</span> has been saved. We will review your profile and reach out via Discord/email.
                  </p>
                  <button
                    onClick={closeApplyModal}
                    className="mt-6 px-6 py-3 bg-[#FF0000] text-[#09090C] font-bold text-xs uppercase tracking-widest"
                  >
                    CLOSE WINDOW
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplicationSubmit} className="space-y-6 font-mono">
                  <div>
                    <div className="text-[10px] text-[#FF0000] uppercase tracking-widest font-bold">
                      ROLE APPLICATION
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight mt-0.5">
                      {selectedJob.title}
                    </h2>
                    {selectedJob.custom_fields && selectedJob.custom_fields.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1.5">
                        {selectedJob.custom_fields
                          .filter((f) => f.value && f.value.length <= 40)
                          .map((f) => (
                            <span
                              key={f.id}
                              className="text-[10px] text-[#B8AEB1] bg-white/5 border border-white/10 px-2 py-0.5"
                            >
                              <span className="text-[#FF0000] font-semibold">{f.label}:</span>{" "}
                              {f.value}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>

                  {errorMessage && (
                    <div className="p-3 bg-red-950/40 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* First Name & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] text-[#B8AEB1] uppercase tracking-wider block">
                        FIRST NAME <span className="text-[#FF0000]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="e.g. Elena"
                        className="w-full bg-[#09090C] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:border-[#FF0000] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] text-[#B8AEB1] uppercase tracking-wider block">
                        LAST NAME <span className="text-[#FF0000]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="e.g. Vance"
                        className="w-full bg-[#09090C] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:border-[#FF0000] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-[#B8AEB1] uppercase tracking-wider block">
                      EMAIL ADDRESS <span className="text-[#FF0000]">* (MANDATORY)</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. elena.vance@example.com"
                      className="w-full bg-[#09090C] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:border-[#FF0000] focus:outline-none"
                    />
                  </div>

                  {/* Years of Experience Slider (0 to 20) */}
                  <div className="space-y-2 p-4 bg-[#09090C] border border-white/10">
                    <div className="flex items-center justify-between text-xs">
                      <label className="text-[#B8AEB1] uppercase tracking-wider font-semibold">
                        YEARS OF EXPERIENCE:
                      </label>
                      <span className="px-2.5 py-0.5 bg-[#17090D] border border-[#FF0000] text-[#FF0000] font-bold text-xs">
                        {yearsExperience} {yearsExperience === 1 ? "YEAR" : "YEARS"}
                      </span>
                    </div>

                    <input
                      type="range"
                      min={0}
                      max={20}
                      step={1}
                      value={yearsExperience}
                      onChange={(e) => setYearsExperience(parseInt(e.target.value, 10))}
                      className="w-full h-2 bg-white/10 rounded-lg cursor-pointer"
                    />

                    <div className="flex justify-between text-[10px] text-[#B8AEB1]/60">
                      <span>0 (Entry / Junior)</span>
                      <span>10 (Lead)</span>
                      <span>20 (Veteran / Principal)</span>
                    </div>
                  </div>

                  {/* Discord Username (MUST) */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-[#B8AEB1] uppercase tracking-wider block flex items-center justify-between">
                      <span>
                        DISCORD USERNAME <span className="text-[#FF0000] font-bold">* (MANDATORY)</span>
                      </span>
                      <span className="text-[10px] text-[#FF0000]">DIRECT COMMS</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={discordUsername}
                      onChange={(e) => setDiscordUsername(e.target.value)}
                      placeholder="e.g. elena_vance or spectre#1234"
                      className="w-full bg-[#09090C] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:border-[#FF0000] focus:outline-none"
                    />
                  </div>

                  {/* Portfolio & LinkedIn */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] text-[#B8AEB1] uppercase tracking-wider block">
                        PORTFOLIO / REEL / GITHUB
                      </label>
                      <input
                        type="url"
                        value={portfolioLink}
                        onChange={(e) => setPortfolioLink(e.target.value)}
                        placeholder="https://artstation.com/your-reel"
                        className="w-full bg-[#09090C] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:border-[#FF0000] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] text-[#B8AEB1] uppercase tracking-wider block">
                        LINKEDIN PROFILE
                      </label>
                      <input
                        type="url"
                        value={linkedinProfile}
                        onChange={(e) => setLinkedinProfile(e.target.value)}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full bg-[#09090C] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:border-[#FF0000] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Upload CV */}
                  <div className="space-y-2">
                    <label className="text-[11px] text-[#B8AEB1] uppercase tracking-wider block">
                      UPLOAD CV / RESUME <span className="text-[#FF0000]">* (PDF, DOC, DOCX - MAX 15MB)</span>
                    </label>

                    <label className="border-2 border-dashed border-white/20 hover:border-[#FF0000] p-6 flex flex-col items-center justify-center cursor-pointer bg-[#09090C] transition-colors">
                      <Upload className="w-6 h-6 text-[#FF0000] mb-2" />
                      {cvFile ? (
                        <div className="text-center space-y-1">
                          <div className="text-xs text-white font-bold flex items-center justify-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-[#FF0000]" />
                            <span>{cvFile.name}</span>
                          </div>
                          <div className="text-[10px] text-[#B8AEB1]">
                            {(cvFile.size / (1024 * 1024)).toFixed(2)} MB • Click to replace
                          </div>
                        </div>
                      ) : (
                        <div className="text-center space-y-1">
                          <span className="text-xs text-white font-medium">Click to upload CV document</span>
                          <div className="text-[10px] text-[#B8AEB1]">Supported formats: PDF, DOC, DOCX</div>
                        </div>
                      )}
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={closeApplyModal}
                      className="text-xs text-[#B8AEB1] hover:text-white transition-colors"
                    >
                      CANCEL
                    </button>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-3 bg-[#FF0000] text-[#09090C] font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <span>{submitting ? "UPLOADING CV..." : "SUBMIT APPLICATION"}</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        <Footer />
      </div>
    </SmoothScroll>
  );
}
