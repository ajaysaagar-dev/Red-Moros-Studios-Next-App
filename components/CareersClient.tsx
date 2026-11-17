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
  Image as ImageIcon,
  X,
  ArrowRight,
} from "lucide-react";

export type FieldType =
  | "text"
  | "email"
  | "textarea"
  | "url"
  | "number"
  | "document"
  | "image";

export interface CustomField {
  id: string;
  label: string;
  type?: FieldType;
  required?: boolean;
  value?: string;
  placeholder?: string;
  description?: string;
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

export default function CareersClient() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Dynamic application form states
  const [formResponses, setFormResponses] = useState<Record<string, string>>({});
  const [fileResponses, setFileResponses] = useState<Record<string, File>>({});
  const [candidateSummaryName, setCandidateSummaryName] = useState("");

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
    setFormResponses({});
    setFileResponses({});
    setCandidateSummaryName("");
    setSubmitSuccess(false);
    setErrorMessage("");
  };

  const closeApplyModal = () => {
    setSelectedJob(null);
    setFormResponses({});
    setFileResponses({});
    setCandidateSummaryName("");
    setErrorMessage("");
    setSubmitSuccess(false);
  };

  const handleTextInputChange = (fieldId: string, val: string) => {
    setFormResponses((prev) => ({ ...prev, [fieldId]: val }));
  };

  const handleDynamicFileChange = (fieldId: string, file: File | null) => {
    if (file && file.size > 20 * 1024 * 1024) {
      setErrorMessage(`File exceeds 20MB limit: ${file.name}`);
      return;
    }
    setErrorMessage("");
    if (file) {
      setFileResponses((prev) => ({ ...prev, [fieldId]: file }));
    } else {
      setFileResponses((prev) => {
        const copy = { ...prev };
        delete copy[fieldId];
        return copy;
      });
    }
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    const fields = selectedJob.custom_fields || [];

    // Validate required fields
    for (const field of fields) {
      const isReq = !!field.required;
      if (isReq) {
        if (field.type === "document" || field.type === "image") {
          if (!fileResponses[field.id]) {
            setErrorMessage(`${field.label} is required. Please upload a file.`);
            return;
          }
        } else {
          const val = (formResponses[field.id] || "").trim();
          if (!val) {
            setErrorMessage(`${field.label} is required.`);
            return;
          }
          if (field.type === "email" && !val.includes("@")) {
            setErrorMessage(`Please enter a valid email address for ${field.label}.`);
            return;
          }
        }
      }
    }

    try {
      setSubmitting(true);
      setErrorMessage("");

      const formData = new FormData();
      formData.append("job_id", selectedJob.id.toString());
      formData.append("job_title", selectedJob.title);

      const payloadFields = fields.map((field) => ({
        id: field.id,
        label: field.label,
        type: field.type || "text",
        required: !!field.required,
        value: formResponses[field.id] || "",
      }));

      formData.append("responses", JSON.stringify(payloadFields));

      // Append attached files
      Object.entries(fileResponses).forEach(([fieldId, file]) => {
        formData.append(`file_${fieldId}`, file);
      });

      // Find display name for confirmation screen
      const nameField = payloadFields.find(
        (f) =>
          f.value &&
          (f.label.toLowerCase().includes("name") || f.type === "text")
      );
      setCandidateSummaryName(nameField ? nameField.value : "Candidate");

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

                      {/* Role Description */}
                      {job.description && (
                        <p className="font-mono text-xs sm:text-sm text-[#B8AEB1] leading-relaxed font-light whitespace-pre-line">
                          {job.description}
                        </p>
                      )}

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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-hidden">
            <div className="relative w-full max-w-2xl bg-[#151115] border border-[#FF0000]/50 text-left my-auto max-h-[92vh] flex flex-col shadow-[0_0_50px_rgba(255,0,0,0.25)] overflow-hidden">
              {/* Corner Accents */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#FF0000] z-20 pointer-events-none" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#FF0000] z-20 pointer-events-none" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#FF0000] z-20 pointer-events-none" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#FF0000] z-20 pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={closeApplyModal}
                className="absolute top-4 right-4 p-1.5 text-[#B8AEB1] hover:text-[#FF0000] hover:bg-white/5 transition-colors cursor-pointer z-20"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {submitSuccess ? (
                <div className="p-8 sm:p-12 text-center space-y-4 font-mono my-auto">
                  <CheckCircle2 className="w-12 h-12 text-[#FF0000] mx-auto animate-bounce" />
                  <h3 className="text-2xl font-bold uppercase tracking-tight text-white">
                    APPLICATION TRANSMITTED
                  </h3>
                  <p className="text-xs sm:text-sm text-[#B8AEB1] max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-bold">{candidateSummaryName}</span>. Your application for <span className="text-[#FF0000] font-bold">{selectedJob.title}</span> has been securely transmitted. Our recruiting team will review your dossier.
                  </p>
                  <button
                    onClick={closeApplyModal}
                    className="mt-6 px-6 py-3 bg-[#FF0000] text-[#09090C] font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
                  >
                    CLOSE WINDOW
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplicationSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden font-mono">
                  {/* Sticky Modal Header */}
                  <div className="p-5 sm:p-7 pb-4 shrink-0 border-b border-white/10 bg-[#17090D]/50 pr-12">
                    <div className="text-[10px] text-[#FF0000] uppercase tracking-widest font-bold">
                      ROLE APPLICATION
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight mt-0.5">
                      {selectedJob.title}
                    </h2>
                    {selectedJob.description && (
                      <p className="text-xs text-[#B8AEB1] mt-1 whitespace-pre-line font-light">
                        {selectedJob.description}
                      </p>
                    )}
                    <p className="text-[11px] text-[#B8AEB1]/70 mt-1">
                      Please complete the fields requested by Red Moros Studios for this role.
                    </p>
                  </div>

                  {/* Error Banner */}
                  {errorMessage && (
                    <div className="mx-5 sm:mx-7 mt-3 p-3 bg-red-950/60 border border-red-500/50 text-red-300 text-xs flex items-center gap-2 shrink-0">
                      <AlertCircle className="w-4 h-4 shrink-0 text-[#FF0000]" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Scrollable Fields Container with Custom Themed Scroll Slider */}
                  {selectedJob.custom_fields && selectedJob.custom_fields.length > 0 ? (
                    <div className="p-5 sm:p-7 py-4 flex-1 min-h-0 overflow-y-auto overflow-x-hidden custom-scrollbar space-y-4">
                      {selectedJob.custom_fields.map((field) => (
                        <div key={field.id} className="space-y-1.5">
                          <label className="text-[11px] text-[#B8AEB1] uppercase tracking-wider block flex items-center justify-between">
                            <span>
                              {field.label}{" "}
                              {field.required ? (
                                <span className="text-[#FF0000] font-bold">* (MANDATORY)</span>
                              ) : (
                                <span className="text-[#B8AEB1]/50 text-[10px] font-normal">(OPTIONAL)</span>
                              )}
                            </span>
                            <span className="text-[10px] text-[#FF0000]/70 uppercase tracking-widest">
                              {field.type === "document"
                                ? "PDF / DOC"
                                : field.type === "image"
                                ? "IMAGE"
                                : field.type}
                            </span>
                          </label>

                          {/* Document Upload */}
                          {field.type === "document" && (
                            <label className="border-2 border-dashed border-white/20 hover:border-[#FF0000] p-4 flex flex-col items-center justify-center cursor-pointer bg-[#09090C] transition-colors">
                              <Upload className="w-5 h-5 text-[#FF0000] mb-1.5" />
                              {fileResponses[field.id] ? (
                                <div className="text-center space-y-1">
                                  <div className="text-xs text-white font-bold flex items-center justify-center gap-1.5">
                                    <FileText className="w-3.5 h-3.5 text-[#FF0000]" />
                                    <span>{fileResponses[field.id].name}</span>
                                  </div>
                                  <div className="text-[10px] text-[#B8AEB1]">
                                    {(fileResponses[field.id].size / (1024 * 1024)).toFixed(2)} MB • Click to replace
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center space-y-0.5">
                                  <span className="text-xs text-white font-medium">
                                    Click to attach {field.label}
                                  </span>
                                  <div className="text-[10px] text-[#B8AEB1]">
                                    Accepted formats: PDF, DOC, DOCX (Max 20MB)
                                  </div>
                                </div>
                              )}
                              <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) =>
                                  handleDynamicFileChange(
                                    field.id,
                                    e.target.files && e.target.files[0] ? e.target.files[0] : null
                                  )
                                }
                                className="hidden"
                              />
                            </label>
                          )}

                          {/* Image Upload */}
                          {field.type === "image" && (
                            <label className="border-2 border-dashed border-white/20 hover:border-[#FF0000] p-4 flex flex-col items-center justify-center cursor-pointer bg-[#09090C] transition-colors">
                              <ImageIcon className="w-5 h-5 text-[#FF0000] mb-1.5" />
                              {fileResponses[field.id] ? (
                                <div className="text-center space-y-1">
                                  <div className="text-xs text-white font-bold flex items-center justify-center gap-1.5">
                                    <ImageIcon className="w-3.5 h-3.5 text-[#FF0000]" />
                                    <span>{fileResponses[field.id].name}</span>
                                  </div>
                                  <div className="text-[10px] text-[#B8AEB1]">
                                    {(fileResponses[field.id].size / (1024 * 1024)).toFixed(2)} MB • Click to replace
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center space-y-0.5">
                                  <span className="text-xs text-white font-medium">
                                    Click to attach image for {field.label}
                                  </span>
                                  <div className="text-[10px] text-[#B8AEB1]">
                                    Accepted formats: PNG, JPG, JPEG, WEBP (Max 20MB)
                                  </div>
                                </div>
                              )}
                              <input
                                type="file"
                                accept=".png,.jpg,.jpeg,.webp"
                                onChange={(e) =>
                                  handleDynamicFileChange(
                                    field.id,
                                    e.target.files && e.target.files[0] ? e.target.files[0] : null
                                  )
                                }
                                className="hidden"
                              />
                            </label>
                          )}

                          {/* Textarea */}
                          {field.type === "textarea" && (
                            <textarea
                              rows={3}
                              value={formResponses[field.id] || ""}
                              onChange={(e) => handleTextInputChange(field.id, e.target.value)}
                              placeholder={field.placeholder || `Enter ${field.label}...`}
                              className="w-full bg-[#09090C] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:border-[#FF0000] focus:outline-none placeholder:text-[#B8AEB1]/30 leading-relaxed"
                            />
                          )}

                          {/* Email */}
                          {field.type === "email" && (
                            <input
                              type="email"
                              value={formResponses[field.id] || ""}
                              onChange={(e) => handleTextInputChange(field.id, e.target.value)}
                              placeholder={field.placeholder || "e.g. name@example.com"}
                              className="w-full bg-[#09090C] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:border-[#FF0000] focus:outline-none placeholder:text-[#B8AEB1]/30"
                            />
                          )}

                          {/* URL */}
                          {field.type === "url" && (
                            <input
                              type="url"
                              value={formResponses[field.id] || ""}
                              onChange={(e) => handleTextInputChange(field.id, e.target.value)}
                              placeholder={field.placeholder || "https://..."}
                              className="w-full bg-[#09090C] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:border-[#FF0000] focus:outline-none placeholder:text-[#B8AEB1]/30"
                            />
                          )}

                          {/* Number */}
                          {field.type === "number" && (
                            <input
                              type="number"
                              value={formResponses[field.id] || ""}
                              onChange={(e) => handleTextInputChange(field.id, e.target.value)}
                              placeholder={field.placeholder || "e.g. 5"}
                              className="w-full bg-[#09090C] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:border-[#FF0000] focus:outline-none placeholder:text-[#B8AEB1]/30"
                            />
                          )}

                          {/* Text (default) */}
                          {(!field.type || field.type === "text") && (
                            <input
                              type="text"
                              value={formResponses[field.id] || ""}
                              onChange={(e) => handleTextInputChange(field.id, e.target.value)}
                              placeholder={field.placeholder || `Enter ${field.label}...`}
                              className="w-full bg-[#09090C] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:border-[#FF0000] focus:outline-none placeholder:text-[#B8AEB1]/30"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center border border-white/10 bg-[#09090C] space-y-2 m-5 sm:m-7">
                      <div className="text-xs text-[#B8AEB1]">
                        No specific custom fields required for this role.
                      </div>
                    </div>
                  )}

                  {/* Sticky Modal Actions Footer */}
                  <div className="p-5 sm:p-7 py-4 shrink-0 border-t border-white/10 bg-[#130E14] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={closeApplyModal}
                      className="text-xs text-[#B8AEB1] hover:text-white transition-colors cursor-pointer uppercase font-bold tracking-wider"
                    >
                      CANCEL
                    </button>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-3 bg-[#FF0000] text-[#09090C] font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <span>{submitting ? "TRANSMITTING..." : "SUBMIT APPLICATION"}</span>
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
