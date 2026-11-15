"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import {
  Briefcase,
  Users,
  Plus,
  Eye,
  EyeOff,
  Download,
  ExternalLink,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileText,
  X,
  Search,
  Filter,
  RefreshCw,
  Copy,
  Check,
  Lock,
  LogOut,
  KeyRound,
  ShieldAlert,
  ArrowLeft,
  Mail,
  UserCheck,
  Ban,
  Clock,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Pencil,
  Image as ImageIcon,
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

export interface ApplicationFieldResponse {
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
  application_count?: number;
  created_at: string;
}

interface Application {
  id: number;
  job_id: number;
  job_title: string;
  first_name: string;
  last_name?: string;
  email?: string;
  years_of_experience?: number;
  discord_username?: string;
  portfolio_link?: string | null;
  linkedin_profile?: string | null;
  cv_filename?: string;
  cv_mimetype?: string;
  cv_data?: string;
  responses?: ApplicationFieldResponse[];
  status: string;
  created_at: string;
}

export default function AdminPage() {
  // In-memory authentication state (resets on every page refresh)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Tab & Data State
  const [activeTab, setActiveTab] = useState<"applications" | "create-job" | "manage-jobs">("applications");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  // Status & action states
  const [updatingStatusId, setUpdatingStatusId] = useState<number | null>(null);
  const [deletingAppId, setDeletingAppId] = useState<number | null>(null);

  // New Job Form State
  const [newTitle, setNewTitle] = useState("");
  const [newCustomFields, setNewCustomFields] = useState<CustomField[]>([]);
  const [creatingJob, setCreatingJob] = useState(false);
  const [jobSuccess, setJobSuccess] = useState(false);
  const [jobError, setJobError] = useState("");

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [copiedDiscord, setCopiedDiscord] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Job Reordering state
  const [reordering, setReordering] = useState(false);
  const [reorderSuccess, setReorderSuccess] = useState("");

  // Edit Job State
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editStatus, setEditStatus] = useState("Open");
  const [editCustomFields, setEditCustomFields] = useState<CustomField[]>([]);
  const [savingEdit, setSavingEdit] = useState(false);
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState(false);

  // Dynamic Field Handlers for New Job
  const addFieldToNewJob = (
    defaultLabel = "",
    type: FieldType = "text",
    required = true,
    placeholder = ""
  ) => {
    setNewCustomFields((prev) => [
      ...prev,
      {
        id: "f_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
        label: defaultLabel,
        type,
        required,
        placeholder,
        value: "",
      },
    ]);
  };

  const updateNewJobField = (
    id: string,
    key: "label" | "type" | "required" | "placeholder" | "value",
    val: unknown
  ) => {
    setNewCustomFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [key]: val } : f))
    );
  };

  const toggleNewJobFieldRequired = (id: string) => {
    setNewCustomFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, required: !f.required } : f))
    );
  };

  const removeNewJobField = (id: string) => {
    setNewCustomFields((prev) => prev.filter((f) => f.id !== id));
  };

  const moveNewJobField = (index: number, direction: "up" | "down") => {
    setNewCustomFields((prev) => {
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
  };

  // Dynamic Field Handlers for Edit Job
  const addFieldToEditJob = (
    defaultLabel = "",
    type: FieldType = "text",
    required = true,
    placeholder = ""
  ) => {
    setEditCustomFields((prev) => [
      ...prev,
      {
        id: "f_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
        label: defaultLabel,
        type,
        required,
        placeholder,
        value: "",
      },
    ]);
  };

  const updateEditJobField = (
    id: string,
    key: "label" | "type" | "required" | "placeholder" | "value",
    val: unknown
  ) => {
    setEditCustomFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [key]: val } : f))
    );
  };

  const toggleEditJobFieldRequired = (id: string) => {
    setEditCustomFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, required: !f.required } : f))
    );
  };

  const removeEditJobField = (id: string) => {
    setEditCustomFields((prev) => prev.filter((f) => f.id !== id));
  };

  const moveEditJobField = (index: number, direction: "up" | "down") => {
    setEditCustomFields((prev) => {
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
  };

  // Fetch jobs and applications using the verified admin key
  const fetchDataWithKey = async (key: string) => {
    try {
      setLoading(true);
      const [jobsRes, appsRes] = await Promise.all([
        fetch("/api/jobs"),
        fetch("/api/applications", {
          headers: { "x-admin-password": key },
        }),
      ]);

      const jobsData = await jobsRes.json();
      const appsData = await appsRes.json();

      if (jobsData.success && Array.isArray(jobsData.jobs)) {
        setJobs(jobsData.jobs);
      }
      if (appsData.success && Array.isArray(appsData.applications)) {
        setApplications(appsData.applications);
      }
    } catch (err: unknown) {
      console.error("Admin fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Authenticate against server environment variable
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput.trim()) {
      setAuthError("Please enter the security password.");
      return;
    }

    try {
      setAuthLoading(true);
      setAuthError("");

      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput.trim() }),
      });

      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        const verifiedKey = passwordInput.trim();
        setAdminKey(verifiedKey);
        setPasswordInput("");
        await fetchDataWithKey(verifiedKey);
      } else {
        setAuthError(data.error || "Access Denied: Incorrect password.");
      }
    } catch (err: unknown) {
      console.error("Admin authentication error:", err);
      setAuthError("Network connection error. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  // Lock console / Log out
  const handleLockConsole = () => {
    setIsAuthenticated(false);
    setAdminKey("");
    setPasswordInput("");
    setJobs([]);
    setApplications([]);
    setSelectedApp(null);
  };

  // Handle Update Candidate Status
  const handleUpdateAppStatus = async (id: number, newStatus: string) => {
    try {
      setUpdatingStatusId(id);
      const res = await fetch("/api/applications", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminKey,
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      const data = await res.json();
      if (data.success) {
        setApplications((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
        );
        if (selectedApp && selectedApp.id === id) {
          setSelectedApp((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      } else {
        alert(data.error || "Failed to update candidate status.");
      }
    } catch (err: unknown) {
      console.error("Status update error:", err);
      alert("Network error updating candidate status.");
    } finally {
      setUpdatingStatusId(null);
    }
  };

  // Handle Delete Candidate Application
  const handleDeleteApplication = async (id: number) => {
    if (
      !confirm(
        "Are you sure you want to permanently delete this candidate application and their CV dossier? This cannot be undone."
      )
    ) {
      return;
    }

    try {
      setDeletingAppId(id);
      const res = await fetch(`/api/applications?id=${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": adminKey },
      });

      const data = await res.json();
      if (data.success) {
        setApplications((prev) => prev.filter((a) => a.id !== id));
        if (selectedApp && selectedApp.id === id) {
          setSelectedApp(null);
        }
      } else {
        alert(data.error || "Failed to delete candidate application.");
      }
    } catch (err: unknown) {
      console.error("Delete application error:", err);
      alert("Network error deleting candidate application.");
    } finally {
      setDeletingAppId(null);
    }
  };

  // Handle Create Job
  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      setJobError("Job Title (Role) is required.");
      return;
    }

    try {
      setCreatingJob(true);
      setJobError("");
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminKey,
        },
        body: JSON.stringify({
          title: newTitle.trim(),
          status: "Open",
          custom_fields: newCustomFields,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setJobSuccess(true);
        setNewTitle("");
        setNewCustomFields([]);
        fetchDataWithKey(adminKey);
        setTimeout(() => setJobSuccess(false), 3000);
      } else {
        setJobError(data.error || "Failed to create job.");
      }
    } catch (err: unknown) {
      console.error("Create job error:", err);
      setJobError("Network error occurred.");
    } finally {
      setCreatingJob(false);
    }
  };

  // Handle Delete Job
  const handleDeleteJob = async (id: number) => {
    if (!confirm("Are you sure you want to delete this job posting?")) return;
    try {
      const res = await fetch(`/api/jobs?id=${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": adminKey },
      });
      const data = await res.json();
      if (data.success) {
        setJobs((prev) => prev.filter((j) => j.id !== id));
      }
    } catch (err: unknown) {
      console.error("Delete job error:", err);
    }
  };

  // Handle Toggle Job Status
  const handleToggleStatus = async (job: Job) => {
    const nextStatus = job.status === "Open" ? "Closed" : "Open";
    try {
      const res = await fetch("/api/jobs", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminKey,
        },
        body: JSON.stringify({ id: job.id, status: nextStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setJobs((prev) => prev.map((j) => (j.id === job.id ? { ...j, status: nextStatus } : j)));
      }
    } catch (err: unknown) {
      console.error("Toggle status error:", err);
    }
  };

  // Move job up in list for Careers page order
  const handleMoveJobUp = async (index: number) => {
    if (index <= 0 || reordering) return;
    const updated = [...jobs];
    const item = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = item;
    setJobs(updated);
    await saveJobOrder(updated);
  };

  // Move job down in list for Careers page order
  const handleMoveJobDown = async (index: number) => {
    if (index >= jobs.length - 1 || reordering) return;
    const updated = [...jobs];
    const item = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = item;
    setJobs(updated);
    await saveJobOrder(updated);
  };

  // Persist updated job sequence to PostgreSQL
  const saveJobOrder = async (orderedList: Job[]) => {
    try {
      setReordering(true);
      const res = await fetch("/api/jobs", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminKey,
        },
        body: JSON.stringify({ order: orderedList.map((j) => j.id) }),
      });
      const data = await res.json();
      if (data.success) {
        if (Array.isArray(data.jobs)) {
          setJobs(data.jobs);
        }
        setReorderSuccess("Careers page order updated live!");
        setTimeout(() => setReorderSuccess(""), 3000);
      } else {
        alert(data.error || "Failed to update job order");
        fetchDataWithKey(adminKey);
      }
    } catch (err: unknown) {
      console.error("Save job order error:", err);
      fetchDataWithKey(adminKey);
    } finally {
      setReordering(false);
    }
  };

  // Copy discord username
  const handleCopyDiscord = (tag: string) => {
    navigator.clipboard.writeText(tag);
    setCopiedDiscord(true);
    setTimeout(() => setCopiedDiscord(false), 2000);
  };

  // Copy candidate email
  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Open Edit Job Modal
  const openEditJobModal = (job: Job) => {
    setEditingJob(job);
    setEditTitle(job.title);
    setEditStatus(job.status || "Open");
    setEditCustomFields(
      job.custom_fields && Array.isArray(job.custom_fields)
        ? job.custom_fields.map((f) => ({ ...f }))
        : []
    );
    setEditError("");
    setEditSuccess(false);
  };

  // Close Edit Job Modal
  const closeEditJobModal = () => {
    setEditingJob(null);
    setEditCustomFields([]);
    setEditError("");
    setEditSuccess(false);
  };

  // Save Edited Job
  const handleSaveEditJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;
    if (!editTitle.trim()) {
      setEditError("Job title (role) is required.");
      return;
    }

    try {
      setSavingEdit(true);
      setEditError("");

      const res = await fetch("/api/jobs", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminKey,
        },
        body: JSON.stringify({
          id: editingJob.id,
          title: editTitle.trim(),
          status: editStatus,
          custom_fields: editCustomFields,
        }),
      });

      const data = await res.json();
      if (data.success && data.job) {
        setJobs((prev) =>
          prev.map((j) => (j.id === editingJob.id ? { ...j, ...data.job } : j))
        );
        // Also update applications list if titles changed
        setApplications((prev) =>
          prev.map((a) =>
            a.job_id === editingJob.id ? { ...a, job_title: editTitle.trim() } : a
          )
        );
        setEditSuccess(true);
        setTimeout(() => {
          closeEditJobModal();
        }, 600);
      } else {
        setEditError(data.error || "Failed to update role posting.");
      }
    } catch (err: unknown) {
      console.error("Save edit job error:", err);
      setEditError("Network error while updating role.");
    } finally {
      setSavingEdit(false);
    }
  };

  // Status badge styling helper
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Selected":
        return "bg-emerald-950/60 border border-emerald-500/60 text-emerald-400";
      case "Reviewed":
        return "bg-sky-950/60 border border-sky-500/60 text-sky-400";
      case "Rejected":
        return "bg-rose-950/60 border border-rose-500/60 text-rose-400";
      default:
        return "bg-amber-950/60 border border-amber-500/60 text-amber-400";
    }
  };

  // Filtered applications
  const filteredApplications = applications.filter((app) => {
    const matchesRole = roleFilter === "ALL" || app.job_title === roleFilter;
    const matchesStatus = statusFilter === "ALL" || (app.status || "Pending") === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      app.first_name.toLowerCase().includes(q) ||
      app.last_name.toLowerCase().includes(q) ||
      (app.email && app.email.toLowerCase().includes(q)) ||
      app.discord_username.toLowerCase().includes(q) ||
      app.job_title.toLowerCase().includes(q);
    return matchesRole && matchesStatus && matchesSearch;
  });

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#09090C] text-[#F7F2F3] flex flex-col font-sans selection:bg-[#FF0000] selection:text-[#09090C]">
        <Navbar />

        {/* PASSWORD GATE LOCK SCREEN (IF NOT AUTHENTICATED) */}
        {!isAuthenticated ? (
          <main className="flex-1 flex items-center justify-center px-4 py-20 w-full relative">
            {/* Ambient Background Glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vh] max-w-[800px] pointer-events-none opacity-40"
              style={{
                background: "radial-gradient(circle, rgba(255, 0, 0, 0.3) 0%, rgba(9, 9, 12, 0) 70%)",
              }}
            />

            <div className="relative z-10 w-full max-w-md bg-[#130E14] border border-[#FF0000]/40 p-8 sm:p-10 shadow-[0_0_50px_rgba(255,0,0,0.15)] text-left">
              {/* Corner Accents */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#FF0000]" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#FF0000]" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#FF0000]" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#FF0000]" />

              {/* Header Badge */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div>
                  <div className="font-mono text-xs font-black tracking-widest text-white uppercase">
                    RED MOROS STUDIOS
                  </div>
                  <div className="font-mono text-[9px] text-[#FF0000] tracking-[0.2em] uppercase font-bold">
                    INTERNAL ADMIN CONSOLE
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-[#FF0000] animate-pulse" />
              </div>

              {/* Title & Instructions */}
              <div className="space-y-2 mb-6">
                <h1 className="font-mono text-xl sm:text-2xl font-black uppercase text-white tracking-tight flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-[#FF0000]" />
                  <span>AUTHORIZATION REQUIRED</span>
                </h1>
                <p className="font-mono text-xs text-[#B8AEB1] leading-relaxed font-light">
                  Enter the master administration security key configured in environment variables to access candidate applications, manage roles, and inspect CV dossiers.
                </p>
                <div className="text-[10px] font-mono text-[#FF0000]/80 tracking-wider">
                  {"// SESSION SECURITY: ACCESS RE-LOCKS ON EVERY PAGE REFRESH"}
                </div>
              </div>

              {/* Error Banner */}
              {authError && (
                <div className="p-3.5 bg-[#2A080C] border border-[#FF0000] text-[#FF0000] font-mono text-xs flex items-center gap-2.5 mb-6">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              {/* Password Form */}
              <form onSubmit={handleAuthSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="font-mono text-xs text-[#B8AEB1] uppercase tracking-wider block font-bold">
                    SECURITY PASSWORD:
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Enter master admin key..."
                      autoFocus
                      required
                      className="w-full bg-[#09090C] border border-white/20 focus:border-[#FF0000] px-4 py-3 text-white font-mono text-sm tracking-wider focus:outline-none pr-11 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B8AEB1] hover:text-white transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3.5 bg-[#FF0000] hover:bg-white text-[#09090C] font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,0,0,0.4)]"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{authLoading ? "VERIFYING SECURITY KEY..." : "UNLOCK ADMIN CONSOLE"}</span>
                </button>
              </form>

              {/* Back to Home Link */}
              <div className="mt-6 pt-4 border-t border-white/10 text-center">
                <Link
                  href="/"
                  className="font-mono text-xs text-[#B8AEB1] hover:text-white inline-flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#FF0000]" />
                  <span>Return to Main Website</span>
                </Link>
              </div>
            </div>
          </main>
        ) : (
          /* AUTHENTICATED ADMIN CONSOLE */
          <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 w-full">
            {/* Admin Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/5 mb-10 text-left">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF0000]" />
                  <span className="font-mono text-xs text-[#FF0000] tracking-widest uppercase font-bold">
                    {"INTERNAL ADMIN PORTAL // SECURE SESSION ACTIVE"}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-mono font-black uppercase text-white tracking-tight">
                  STUDIO RECRUITMENT <span className="text-[#FF0000]">MANAGEMENT</span>
                </h1>
                <p className="font-mono text-xs sm:text-sm text-[#B8AEB1] font-light">
                  Manage candidate applications, update candidate status, review CV dossiers, and control studio role postings.
                </p>
              </div>

              <div className="flex items-center gap-3 self-start md:self-auto">
                <button
                  onClick={() => fetchDataWithKey(adminKey)}
                  className="px-4 py-2.5 bg-[#151115] border border-white/10 hover:border-[#FF0000] text-[#B8AEB1] hover:text-white font-mono text-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                  <span>SYNC POSTGRESQL</span>
                </button>

                <button
                  onClick={handleLockConsole}
                  className="px-4 py-2.5 bg-[#17090D] border border-[#FF0000]/50 hover:bg-[#FF0000] text-[#F7F2F3] hover:text-[#09090C] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
                  title="Locks the admin console immediately"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>LOCK CONSOLE</span>
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
              <button
                onClick={() => setActiveTab("applications")}
                className={`px-5 py-2.5 font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-all cursor-pointer border ${
                  activeTab === "applications"
                    ? "bg-[#17090D] border-[#FF0000] text-white shadow-[0_0_20px_rgba(255,0,0,0.2)]"
                    : "bg-[#151115] border-white/10 text-[#B8AEB1] hover:text-white hover:border-[#FF0000]/40"
                }`}
              >
                <Users className="w-3.5 h-3.5 text-[#FF0000]" />
                <span>CANDIDATES ({applications.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("create-job")}
                className={`px-5 py-2.5 font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-all cursor-pointer border ${
                  activeTab === "create-job"
                    ? "bg-[#17090D] border-[#FF0000] text-white shadow-[0_0_20px_rgba(255,0,0,0.2)]"
                    : "bg-[#151115] border-white/10 text-[#B8AEB1] hover:text-white hover:border-[#FF0000]/40"
                }`}
              >
                <Plus className="w-3.5 h-3.5 text-[#FF0000]" />
                <span>POST NEW JOB</span>
              </button>

              <button
                onClick={() => setActiveTab("manage-jobs")}
                className={`px-5 py-2.5 font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-all cursor-pointer border ${
                  activeTab === "manage-jobs"
                    ? "bg-[#17090D] border-[#FF0000] text-white shadow-[0_0_20px_rgba(255,0,0,0.2)]"
                    : "bg-[#151115] border-white/10 text-[#B8AEB1] hover:text-white hover:border-[#FF0000]/40"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-[#FF0000]" />
                <span>ROLES CATALOG ({jobs.length})</span>
              </button>
            </div>

            {/* TAB 1: APPLICATIONS LIST */}
            {activeTab === "applications" && (
              <div className="space-y-6 text-left">
                {/* Search & Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B8AEB1]" />
                    <input
                      type="text"
                      placeholder="Search candidates by name, email, Discord, or role..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#151115] border border-white/10 pl-10 pr-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#FF0000] placeholder:text-[#B8AEB1]/40"
                    />
                  </div>

                  {/* Filter by Role */}
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-[#FF0000]" />
                    <select
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                      className="bg-[#151115] border border-white/10 px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#FF0000]"
                    >
                      <option value="ALL">ALL ROLES ({applications.length})</option>
                      {jobs.map((j) => (
                        <option key={j.id} value={j.title}>
                          {j.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Filter by Status */}
                  <div className="flex items-center gap-2">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-[#151115] border border-white/10 px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#FF0000]"
                    >
                      <option value="ALL">ALL STATUSES</option>
                      <option value="Pending">Pending</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Selected">Selected</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                {/* Applications Table / Cards */}
                {loading ? (
                  <div className="py-20 text-center font-mono text-xs text-[#B8AEB1] animate-pulse">
                    {"[ LOADING CANDIDATES FROM POSTGRESQL ]"}
                  </div>
                ) : filteredApplications.length === 0 ? (
                  <div className="p-12 text-center border border-white/10 bg-[#151115] font-mono text-xs text-[#B8AEB1]">
                    No candidate applications found for the selected criteria.
                  </div>
                ) : (
                  <div className="border border-white/10 overflow-hidden bg-[#151115]">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-mono text-xs">
                        <thead className="bg-[#17090D] border-b border-white/10 text-[#FF0000] uppercase text-[10px] tracking-wider">
                          <tr>
                            <th className="py-3 px-4">Candidate</th>
                            <th className="py-3 px-4">Role Applied</th>
                            <th className="py-3 px-4">Experience</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Discord</th>
                            <th className="py-3 px-4">CV Document</th>
                            <th className="py-3 px-4">Applied Date</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {filteredApplications.map((app) => (
                            <tr
                              key={app.id}
                              onClick={() => setSelectedApp(app)}
                              className="hover:bg-white/[0.03] cursor-pointer transition-colors group"
                            >
                              <td className="py-3 px-4">
                                <div className="text-white font-bold group-hover:text-[#FF0000] transition-colors">
                                  {app.first_name} {app.last_name}
                                </div>
                                {app.email ? (
                                  <div className="text-[11px] text-[#B8AEB1] font-normal flex items-center gap-1.5 mt-0.5">
                                    <Mail className="w-3 h-3 text-[#FF0000] shrink-0" />
                                    <span className="truncate max-w-[180px]">{app.email}</span>
                                  </div>
                                ) : (
                                  <div className="text-[10px] text-white/30 font-normal">No email on record</div>
                                )}
                              </td>
                              <td className="py-3 px-4 text-[#B8AEB1]">
                                <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-[10px]">
                                  {app.job_title}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-[#F7F2F3]">
                                <span className="font-bold text-[#FF0000]">{app.years_of_experience}</span> YRS
                              </td>
                              <td className="py-3 px-4">
                                <span
                                  className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider inline-block ${getStatusBadge(
                                    app.status || "Pending"
                                  )}`}
                                >
                                  {app.status || "Pending"}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-[#B8AEB1] font-mono">
                                <span className="bg-[#09090C] px-2 py-0.5 border border-white/5 text-[11px]">
                                  {app.discord_username}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-[#B8AEB1]">
                                <div className="flex items-center gap-1.5 truncate max-w-[150px]">
                                  <FileText className="w-3.5 h-3.5 text-[#FF0000] shrink-0" />
                                  <span className="truncate">{app.cv_filename}</span>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-[#B8AEB1]/70 text-[11px]">
                                {new Date(app.created_at).toLocaleDateString()}
                              </td>
                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedApp(app);
                                    }}
                                    className="px-2.5 py-1 bg-white/5 hover:bg-[#FF0000] hover:text-[#09090C] text-[10px] font-bold uppercase transition-colors"
                                  >
                                    VIEW
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteApplication(app.id);
                                    }}
                                    disabled={deletingAppId === app.id}
                                    className="p-1 text-[#B8AEB1] hover:text-[#FF0000] hover:bg-[#FF0000]/10 transition-colors disabled:opacity-40"
                                    title="Delete candidate application"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: CREATE JOB FORM */}
            {activeTab === "create-job" && (
              <div className="max-w-2xl bg-[#151115] border border-white/10 p-6 sm:p-8 text-left space-y-6">
                <div>
                  <h2 className="text-xl font-mono font-bold uppercase text-white flex items-center gap-2">
                    <Plus className="w-4 h-4 text-[#FF0000]" />
                    <span>CREATE NEW STUDIO ROLE</span>
                  </h2>
                  <p className="font-mono text-xs text-[#B8AEB1] mt-1">
                    Added roles immediately appear in the PostgreSQL database and on the public /careers page.
                  </p>
                </div>

                {jobSuccess && (
                  <div className="p-3 bg-green-950/60 border border-green-500/60 text-green-300 font-mono text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Role successfully created and published to PostgreSQL!</span>
                  </div>
                )}

                {jobError && (
                  <div className="p-3 bg-red-950/60 border border-[#FF0000] text-[#FF0000] font-mono text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{jobError}</span>
                  </div>
                )}

                <form onSubmit={handleCreateJob} className="space-y-4 font-mono text-xs">
                  {/* Job Title / Role */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-[#B8AEB1] uppercase tracking-wider block font-bold">
                      ROLE TITLE <span className="text-[#FF0000]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Lead Technical Artist / Senior C++ Systems Engineer"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                      className="w-full bg-[#09090C] border border-white/15 px-3 py-2.5 text-white focus:border-[#FF0000] focus:outline-none placeholder:text-[#B8AEB1]/30"
                    />
                  </div>

                  {/* Dynamic Custom Fields Section */}
                  <div className="space-y-3 pt-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                      <div>
                        <span className="text-[11px] text-white uppercase tracking-wider font-bold block">
                          DYNAMIC FIELDS ({newCustomFields.length})
                        </span>
                        <p className="text-[10px] text-[#B8AEB1]">
                          No static fields are enforced. Add any custom fields with their label and value.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => addFieldToNewJob("")}
                        className="self-start sm:self-auto px-3 py-1.5 bg-[#FF0000]/10 border border-[#FF0000] text-[#FF0000] hover:bg-[#FF0000] hover:text-[#09090C] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>ADD FIELD</span>
                      </button>
                    </div>

                    {/* Quick Suggestion Presets */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] text-[#B8AEB1]/60 uppercase tracking-widest font-bold mr-1">
                        QUICK PRESETS:
                      </span>
                      {[
                        { label: "Full Name", type: "text" as FieldType, req: true },
                        { label: "Email Address", type: "email" as FieldType, req: true },
                        { label: "Resume / CV Document", type: "document" as FieldType, req: true },
                        { label: "Art Portfolio / Screenshots", type: "image" as FieldType, req: false },
                        { label: "Portfolio / Reel Link", type: "url" as FieldType, req: false },
                        { label: "Discord Handle", type: "text" as FieldType, req: true },
                        { label: "Years of Experience", type: "number" as FieldType, req: false },
                        { label: "Cover Letter / Notes", type: "textarea" as FieldType, req: false },
                      ].map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => addFieldToNewJob(preset.label, preset.type, preset.req)}
                          className="px-2 py-0.5 bg-[#09090C] border border-white/15 hover:border-[#FF0000] text-[10px] text-[#B8AEB1] hover:text-white transition-colors cursor-pointer"
                        >
                          + {preset.label}
                        </button>
                      ))}
                    </div>

                    {/* Empty State */}
                    {newCustomFields.length === 0 ? (
                      <div className="p-6 text-center border border-dashed border-white/15 bg-[#09090C]/50 space-y-2">
                        <div className="text-[11px] text-[#B8AEB1] font-bold">
                          NO CUSTOM FIELDS ADDED YET
                        </div>
                        <p className="text-[10px] text-[#B8AEB1]/60 max-w-sm mx-auto">
                          This role starts completely empty. Use the quick presets above or click &quot;ADD FIELD&quot; to configure document, image, or text fields with custom required/optional settings.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {newCustomFields.map((field, idx) => (
                          <div
                            key={field.id}
                            className="p-3.5 bg-[#09090C] border border-white/10 hover:border-white/20 space-y-2.5 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-[#FF0000] tracking-wider uppercase">
                                  FIELD #{idx + 1}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => toggleNewJobFieldRequired(field.id)}
                                  className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
                                    field.required
                                      ? "bg-[#FF0000] border-[#FF0000] text-black"
                                      : "bg-[#151115] border-white/20 text-[#B8AEB1] hover:text-white"
                                  }`}
                                  title="Toggle Required / Optional"
                                >
                                  {field.required ? "REQUIRED *" : "OPTIONAL"}
                                </button>
                              </div>

                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => moveNewJobField(idx, "up")}
                                  disabled={idx === 0}
                                  className="p-1 text-[#B8AEB1] hover:text-white disabled:opacity-20 cursor-pointer"
                                  title="Move up"
                                >
                                  <ArrowUp className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => moveNewJobField(idx, "down")}
                                  disabled={idx === newCustomFields.length - 1}
                                  className="p-1 text-[#B8AEB1] hover:text-white disabled:opacity-20 cursor-pointer"
                                  title="Move down"
                                >
                                  <ArrowDown className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removeNewJobField(field.id)}
                                  className="p-1 text-[#B8AEB1] hover:text-[#FF0000] cursor-pointer ml-1"
                                  title="Remove field"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              {/* Field Label */}
                              <div className="space-y-1">
                                <label className="text-[10px] text-[#B8AEB1] uppercase tracking-wider block font-bold">
                                  FIELD LABEL / NAME
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g. CV Document, Art Portfolio"
                                  value={field.label}
                                  onChange={(e) =>
                                    updateNewJobField(field.id, "label", e.target.value)
                                  }
                                  required
                                  className="w-full bg-[#151115] border border-white/15 px-3 py-2 text-white focus:border-[#FF0000] focus:outline-none text-xs"
                                />
                              </div>

                              {/* Field Type */}
                              <div className="space-y-1">
                                <label className="text-[10px] text-[#B8AEB1] uppercase tracking-wider block font-bold">
                                  FIELD TYPE
                                </label>
                                <select
                                  value={field.type || "text"}
                                  onChange={(e) =>
                                    updateNewJobField(
                                      field.id,
                                      "type",
                                      e.target.value as FieldType
                                    )
                                  }
                                  className="w-full bg-[#151115] border border-white/15 px-3 py-2 text-white focus:border-[#FF0000] focus:outline-none text-xs"
                                >
                                  <option value="text">Text (Single-line)</option>
                                  <option value="email">Email Address</option>
                                  <option value="document">
                                    Document Upload (PDF, DOC, DOCX)
                                  </option>
                                  <option value="image">
                                    Image Upload (PNG, JPG, WEBP)
                                  </option>
                                  <option value="textarea">Textarea (Multi-line)</option>
                                  <option value="url">Web Link / Portfolio URL</option>
                                  <option value="number">Number / Years</option>
                                </select>
                              </div>

                              {/* Field Help Text / Placeholder */}
                              <div className="space-y-1">
                                <label className="text-[10px] text-[#B8AEB1] uppercase tracking-wider block font-bold">
                                  HELP TEXT / PLACEHOLDER
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g. Upload PDF up to 20MB..."
                                  value={field.placeholder || ""}
                                  onChange={(e) =>
                                    updateNewJobField(field.id, "placeholder", e.target.value)
                                  }
                                  className="w-full bg-[#151115] border border-white/15 px-3 py-2 text-white focus:border-[#FF0000] focus:outline-none text-xs"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={creatingJob}
                    className="w-full py-3 bg-[#FF0000] hover:bg-white text-[#09090C] font-mono font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{creatingJob ? "COMMITTING TO DATABASE..." : "PUBLISH ROLE POSTING"}</span>
                  </button>
                </form>
              </div>
            )}

            {/* TAB 3: MANAGE ROLES CATALOG & REORDERING */}
            {activeTab === "manage-jobs" && (
              <div className="space-y-4 text-left">
                {/* Information Header & Reorder Notification */}
                <div className="p-4 bg-[#151115] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
                  <div>
                    <div className="text-white font-bold uppercase flex items-center gap-2">
                      <ArrowUpDown className="w-4 h-4 text-[#FF0000]" />
                      <span>CAREERS PAGE DISPLAY ORDER</span>
                    </div>
                    <div className="text-[#B8AEB1] text-[11px] mt-0.5">
                      Use the Up / Down controls to reorder roles. The sequence below directly defines how roles appear on the public /careers page.
                    </div>
                  </div>

                  {reorderSuccess && (
                    <div className="px-3 py-1.5 bg-green-950/60 border border-green-500/60 text-green-300 font-mono text-xs flex items-center gap-1.5 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                      <span>{reorderSuccess}</span>
                    </div>
                  )}
                </div>

                <div className="border border-white/10 overflow-hidden bg-[#151115]">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-xs">
                      <thead className="bg-[#17090D] border-b border-white/10 text-[#FF0000] uppercase text-[10px] tracking-wider">
                        <tr>
                          <th className="py-3 px-4 text-center w-24">Order</th>
                          <th className="py-3 px-4">Role Title</th>
                          <th className="py-3 px-4">Dynamic Custom Fields</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">Applications</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {jobs.map((job, index) => (
                          <tr key={job.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center justify-center gap-2">
                                <span className="text-[11px] text-[#FF0000] font-bold w-6 text-center">
                                  #{index + 1}
                                </span>
                                <div className="flex flex-col gap-0.5">
                                  <button
                                    onClick={() => handleMoveJobUp(index)}
                                    disabled={index === 0 || reordering}
                                    className="p-1 bg-[#09090C] border border-white/10 hover:border-[#FF0000] hover:text-[#FF0000] text-[#B8AEB1] transition-colors disabled:opacity-20 disabled:hover:border-white/10 disabled:hover:text-[#B8AEB1] cursor-pointer"
                                    title="Move role up (higher on Careers page)"
                                  >
                                    <ArrowUp className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => handleMoveJobDown(index)}
                                    disabled={index === jobs.length - 1 || reordering}
                                    className="p-1 bg-[#09090C] border border-white/10 hover:border-[#FF0000] hover:text-[#FF0000] text-[#B8AEB1] transition-colors disabled:opacity-20 disabled:hover:border-white/10 disabled:hover:text-[#B8AEB1] cursor-pointer"
                                    title="Move role down (lower on Careers page)"
                                  >
                                    <ArrowDown className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                              {job.title}
                            </td>
                            <td className="py-3 px-4">
                              {job.custom_fields && job.custom_fields.length > 0 ? (
                                <div className="flex flex-wrap gap-1.5 max-w-md">
                                  {job.custom_fields.map((field) => (
                                    <span
                                      key={field.id}
                                      className="px-2 py-0.5 bg-[#09090C] border border-white/10 text-[10px] text-white flex items-center gap-1"
                                      title={field.value}
                                    >
                                      <span className="text-[#FF0000] font-bold">{field.label}:</span>
                                      <span className="text-[#B8AEB1] truncate max-w-[120px]">
                                        {field.value}
                                      </span>
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-[10px] text-[#B8AEB1]/40 italic">
                                  No custom fields
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => handleToggleStatus(job)}
                                className={`px-2 py-0.5 text-[10px] uppercase font-bold border transition-colors cursor-pointer ${
                                  job.status === "Open"
                                    ? "bg-green-950/40 border-green-500/50 text-green-400 hover:bg-green-900/50"
                                    : "bg-red-950/40 border-red-500/50 text-red-400 hover:bg-red-900/50"
                                }`}
                              >
                                {job.status || "Open"}
                              </button>
                            </td>
                            <td className="py-3 px-4 text-[#FF0000] font-bold">
                              {job.application_count || 0}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => openEditJobModal(job)}
                                  className="p-1.5 text-[#B8AEB1] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                                  title="Edit role details"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteJob(job.id)}
                                  className="p-1.5 text-[#B8AEB1] hover:text-[#FF0000] hover:bg-[#FF0000]/10 transition-colors cursor-pointer"
                                  title="Delete role"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </main>
        )}

        {/* CANDIDATE DOSSIER MODAL WITH CV PREVIEW & STATUS MANAGEMENT */}
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="relative w-full max-w-2xl bg-[#130E14] border border-[#FF0000]/60 p-6 sm:p-8 text-left shadow-[0_0_50px_rgba(255,0,0,0.25)] space-y-6 max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF0000]" />
                    <span className="font-mono text-[10px] text-[#FF0000] tracking-widest uppercase font-bold">
                      CANDIDATE DOSSIER // APPLICANT #{selectedApp.id}
                    </span>
                  </div>
                  <h2 className="text-2xl font-mono font-black text-white uppercase">
                    {selectedApp.first_name} {selectedApp.last_name}
                  </h2>
                  <div className="font-mono text-xs text-[#B8AEB1]">
                    Applied for: <span className="text-white font-bold">{selectedApp.job_title}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-1 text-[#B8AEB1] hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Decision Panel */}
              <div className="p-4 bg-[#17090D] border border-white/10 space-y-3 font-mono">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] text-[#B8AEB1] uppercase tracking-wider font-bold">
                    CANDIDATE STATUS:
                  </span>
                  <span
                    className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${getStatusBadge(
                      selectedApp.status || "Pending"
                    )}`}
                  >
                    {selectedApp.status || "Pending"}
                  </span>
                </div>

                <div className="text-[10px] text-[#B8AEB1]/70">
                  Update candidate status or disposition for this application:
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {/* Select candidate */}
                  <button
                    onClick={() => handleUpdateAppStatus(selectedApp.id, "Selected")}
                    disabled={updatingStatusId === selectedApp.id}
                    className={`px-3 py-2 text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                      selectedApp.status === "Selected"
                        ? "bg-emerald-600 text-white border-emerald-400"
                        : "bg-emerald-950/40 border-emerald-500/40 text-emerald-400 hover:bg-emerald-600 hover:text-white"
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>SELECT</span>
                  </button>

                  {/* Reviewed */}
                  <button
                    onClick={() => handleUpdateAppStatus(selectedApp.id, "Reviewed")}
                    disabled={updatingStatusId === selectedApp.id}
                    className={`px-3 py-2 text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                      selectedApp.status === "Reviewed"
                        ? "bg-sky-600 text-white border-sky-400"
                        : "bg-sky-950/40 border-sky-500/40 text-sky-400 hover:bg-sky-600 hover:text-white"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>REVIEWED</span>
                  </button>

                  {/* Rejected */}
                  <button
                    onClick={() => handleUpdateAppStatus(selectedApp.id, "Rejected")}
                    disabled={updatingStatusId === selectedApp.id}
                    className={`px-3 py-2 text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                      selectedApp.status === "Rejected"
                        ? "bg-rose-600 text-white border-rose-400"
                        : "bg-rose-950/40 border-rose-500/40 text-rose-400 hover:bg-rose-600 hover:text-white"
                    }`}
                  >
                    <Ban className="w-3.5 h-3.5" />
                    <span>REJECT</span>
                  </button>

                  {/* Reset Pending */}
                  <button
                    onClick={() => handleUpdateAppStatus(selectedApp.id, "Pending")}
                    disabled={updatingStatusId === selectedApp.id}
                    className={`px-3 py-2 text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                      selectedApp.status === "Pending"
                        ? "bg-amber-600 text-white border-amber-400"
                        : "bg-amber-950/40 border-amber-500/40 text-amber-400 hover:bg-amber-600 hover:text-white"
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>PENDING</span>
                  </button>
                </div>
              </div>

              {/* Candidate Contact & Info Grid */}
              <div className="space-y-4 font-mono text-xs">
                {/* Email & Discord */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#17090D] border border-white/10">
                  {/* Email */}
                  <div>
                    <span className="text-[10px] text-[#B8AEB1] block uppercase">EMAIL ADDRESS</span>
                    {selectedApp.email ? (
                      <div className="flex items-center gap-2 mt-0.5">
                        <a
                          href={`mailto:${selectedApp.email}`}
                          className="text-white hover:text-[#FF0000] font-bold underline flex items-center gap-1.5 truncate"
                        >
                          <Mail className="w-3.5 h-3.5 text-[#FF0000] shrink-0" />
                          <span className="truncate">{selectedApp.email}</span>
                        </a>
                        <button
                          onClick={() => handleCopyEmail(selectedApp.email || "")}
                          className="text-[#FF0000] hover:text-white transition-colors cursor-pointer shrink-0"
                          title="Copy Email"
                        >
                          {copiedEmail ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    ) : (
                      <span className="text-white/40 italic">No email on record</span>
                    )}
                  </div>

                  {/* Discord */}
                  <div>
                    <span className="text-[10px] text-[#B8AEB1] block uppercase">DISCORD USERNAME</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-white font-bold">{selectedApp.discord_username}</span>
                      <button
                        onClick={() => handleCopyDiscord(selectedApp.discord_username)}
                        className="text-[#FF0000] hover:text-white transition-colors cursor-pointer shrink-0"
                        title="Copy Discord handle"
                      >
                        {copiedDiscord ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Experience & External Links */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-[#17090D] border border-white/10">
                  <div>
                    <span className="text-[10px] text-[#B8AEB1] block uppercase">EXPERIENCE</span>
                    <span className="text-base font-bold text-white">{selectedApp.years_of_experience} Years</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#B8AEB1] block uppercase">PORTFOLIO / REEL</span>
                    {selectedApp.portfolio_link ? (
                      <a
                        href={selectedApp.portfolio_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FF0000] hover:underline flex items-center gap-1 truncate mt-1"
                      >
                        <span className="truncate">{selectedApp.portfolio_link}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    ) : (
                      <span className="text-[#B8AEB1]/50 mt-1 block">Not Provided</span>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] text-[#B8AEB1] block uppercase">LINKEDIN PROFILE</span>
                    {selectedApp.linkedin_profile ? (
                      <a
                        href={selectedApp.linkedin_profile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FF0000] hover:underline flex items-center gap-1 truncate mt-1"
                      >
                        <span className="truncate">{selectedApp.linkedin_profile}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    ) : (
                      <span className="text-[#B8AEB1]/50 mt-1 block">Not Provided</span>
                    )}
                  </div>
                </div>

                {/* Dynamic Responses & Uploads Section */}
                {selectedApp.responses &&
                  Array.isArray(selectedApp.responses) &&
                  selectedApp.responses.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <div className="text-[10px] text-[#FF0000] uppercase font-bold tracking-wider border-b border-white/10 pb-1.5 flex items-center justify-between">
                        <span>
                          CANDIDATE SUBMISSIONS ({selectedApp.responses.length})
                        </span>
                        <span className="text-[10px] text-[#B8AEB1]">ROLE SPECIFIC DATA</span>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {selectedApp.responses.map((resp, i) => (
                          <div
                            key={resp.id || i}
                            className="p-3.5 bg-[#17090D] border border-white/10 space-y-2 text-xs"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white uppercase text-[11px]">
                                {resp.label}
                              </span>
                              <span className="text-[10px] text-[#FF0000] uppercase tracking-wider font-bold">
                                {resp.type}
                              </span>
                            </div>

                            {/* If Document Upload */}
                            {resp.type === "document" && resp.data && (
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2.5 bg-[#09090C] border border-white/10">
                                <div className="flex items-center gap-2 truncate">
                                  <FileText className="w-4 h-4 text-[#FF0000] shrink-0" />
                                  <span className="text-white truncate font-medium">
                                    {resp.filename || "Document.pdf"}
                                  </span>
                                  {resp.size ? (
                                    <span className="text-[10px] text-[#B8AEB1]">
                                      ({(resp.size / (1024 * 1024)).toFixed(2)} MB)
                                    </span>
                                  ) : null}
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  <a
                                    href={`data:${resp.mimetype || "application/pdf"};base64,${resp.data}`}
                                    download={resp.filename || "document.pdf"}
                                    className="px-3 py-1.5 bg-[#FF0000] hover:bg-white text-[#09090C] text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
                                  >
                                    <Download className="w-3 h-3" />
                                    <span>DOWNLOAD</span>
                                  </a>
                                </div>
                              </div>
                            )}

                            {/* If Image Upload */}
                            {resp.type === "image" && resp.data && (
                              <div className="space-y-2">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2.5 bg-[#09090C] border border-white/10">
                                  <div className="flex items-center gap-2 truncate">
                                    <ImageIcon className="w-4 h-4 text-[#FF0000] shrink-0" />
                                    <span className="text-white truncate font-medium">
                                      {resp.filename || "Artwork.png"}
                                    </span>
                                  </div>
                                  <a
                                    href={`data:${resp.mimetype || "image/png"};base64,${resp.data}`}
                                    download={resp.filename || "artwork.png"}
                                    className="px-3 py-1.5 bg-[#FF0000] hover:bg-white text-[#09090C] text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
                                  >
                                    <Download className="w-3 h-3" />
                                    <span>DOWNLOAD IMAGE</span>
                                  </a>
                                </div>
                                <div className="border border-white/10 p-2 bg-black/50 flex justify-center">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={`data:${resp.mimetype || "image/png"};base64,${resp.data}`}
                                    alt={resp.label}
                                    className="max-h-64 object-contain rounded"
                                  />
                                </div>
                              </div>
                            )}

                            {/* If URL */}
                            {resp.type === "url" && resp.value && (
                              <a
                                href={
                                  resp.value.startsWith("http")
                                    ? resp.value
                                    : `https://${resp.value}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#FF0000] hover:underline break-all block flex items-center gap-1 font-medium"
                              >
                                <span>{resp.value}</span>
                                <ExternalLink className="w-3 h-3 shrink-0" />
                              </a>
                            )}

                            {/* If text / textarea / email / number */}
                            {resp.type !== "document" &&
                              resp.type !== "image" &&
                              resp.type !== "url" && (
                                <div className="text-[#B8AEB1] whitespace-pre-line leading-relaxed bg-[#09090C] p-2.5 border border-white/5">
                                  {resp.value || (
                                    <span className="italic text-white/30">
                                      No response provided
                                    </span>
                                  )}
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* CV Action Card (if primary CV file exists) */}
                {selectedApp.cv_filename && selectedApp.cv_filename !== "none" && (
                  <div className="p-5 bg-[#17090D] border border-[#FF0000]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-[10px] text-[#FF0000] uppercase font-bold tracking-wider">
                        UPLOADED CV / RESUME
                      </div>
                      <div className="text-sm text-white font-bold flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#FF0000]" />
                        <span className="truncate max-w-[240px]">{selectedApp.cv_filename}</span>
                      </div>
                      <div className="text-[10px] text-[#B8AEB1]">MIME: {selectedApp.cv_mimetype}</div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      {/* VIEW IN SEPARATE TAB WITHOUT DOWNLOADING */}
                      <a
                        href={`/api/cv/${selectedApp.id}?key=${encodeURIComponent(adminKey)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 bg-[#FF0000] text-[#09090C] hover:bg-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>VIEW IN SEPARATE TAB</span>
                      </a>

                      {/* DOWNLOAD CV BUTTON */}
                      <a
                        href={`/api/cv/${selectedApp.id}?action=download&key=${encodeURIComponent(adminKey)}`}
                        download
                        className="px-4 py-2.5 bg-[#09090C] border border-white/20 hover:border-[#FF0000] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>DOWNLOAD</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* Danger Zone: Delete application */}
                <div className="p-4 bg-red-950/20 border border-red-500/30 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-red-400 uppercase">
                      DANGER ZONE: DELETE APPLICATION
                    </div>
                    <div className="text-[10px] text-[#B8AEB1]/70">
                      Permanently purge this candidate record and attached CV from PostgreSQL database.
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteApplication(selectedApp.id)}
                    disabled={deletingAppId === selectedApp.id}
                    className="px-3.5 py-2 bg-red-900/60 hover:bg-[#FF0000] text-white font-bold text-[11px] uppercase flex items-center gap-1.5 transition-colors cursor-pointer border border-red-500/50 disabled:opacity-40"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{deletingAppId === selectedApp.id ? "DELETING..." : "DELETE"}</span>
                  </button>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-center text-[10px] text-[#B8AEB1]">
                  <span>SUBMITTED: {new Date(selectedApp.created_at).toLocaleString()}</span>
                  <button
                    onClick={() => setSelectedApp(null)}
                    className="text-white hover:text-[#FF0000] uppercase cursor-pointer"
                  >
                    CLOSE [ESC]
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EDIT POSTED ROLE MODAL */}
        {editingJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
            <div className="relative w-full max-w-2xl bg-[#130E14] border border-[#FF0000]/60 p-5 sm:p-8 text-left shadow-[0_0_50px_rgba(255,0,0,0.25)] space-y-5 sm:space-y-6 max-h-[88vh] overflow-y-auto my-auto">
              {/* Corner Accents */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#FF0000]" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#FF0000]" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#FF0000]" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#FF0000]" />

              {/* Header */}
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF0000] animate-pulse" />
                    <span className="font-mono text-[10px] text-[#FF0000] tracking-widest uppercase font-bold">
                      ROLE CONFIGURATION // ROLE #{editingJob.id}
                    </span>
                  </div>
                  <h2 className="text-2xl font-mono font-black text-white uppercase">
                    EDIT POSTED ROLE
                  </h2>
                  <div className="font-mono text-xs text-[#B8AEB1]">
                    Changes will immediately update the PostgreSQL database and public /careers listings.
                  </div>
                </div>

                <button
                  onClick={closeEditJobModal}
                  className="p-1 text-[#B8AEB1] hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {editSuccess && (
                <div className="p-3 bg-green-950/60 border border-green-500/60 text-green-300 font-mono text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-green-400" />
                  <span>Role successfully updated and synchronized!</span>
                </div>
              )}

              {editError && (
                <div className="p-3 bg-red-950/60 border border-[#FF0000] text-[#FF0000] font-mono text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{editError}</span>
                </div>
              )}

              <form onSubmit={handleSaveEditJob} className="space-y-4 font-mono text-xs">
                {/* Role Title */}
                <div className="space-y-1.5">
                  <label className="text-[11px] text-[#B8AEB1] uppercase tracking-wider block font-bold">
                    ROLE TITLE <span className="text-[#FF0000]">*</span>
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    required
                    className="w-full bg-[#09090C] border border-white/15 px-3 py-2.5 text-white focus:border-[#FF0000] focus:outline-none placeholder:text-[#B8AEB1]/30"
                  />
                </div>

                {/* Posting Status */}
                <div className="space-y-1.5">
                  <label className="text-[11px] text-[#B8AEB1] uppercase tracking-wider block font-bold">
                    POSTING STATUS
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full bg-[#09090C] border border-white/15 px-3 py-2.5 text-white focus:border-[#FF0000] focus:outline-none"
                  >
                    <option value="Open">Open (Accepting Applications on /careers)</option>
                    <option value="Closed">Closed (Hidden from public listing)</option>
                  </select>
                </div>

                {/* Dynamic Custom Fields Section for Edit */}
                <div className="space-y-3 pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                    <div>
                      <span className="text-[11px] text-white uppercase tracking-wider font-bold block">
                        DYNAMIC FIELDS ({editCustomFields.length})
                      </span>
                      <p className="text-[10px] text-[#B8AEB1]">
                        Add, remove, or customize any field labels and descriptions for this role.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => addFieldToEditJob("")}
                      className="self-start sm:self-auto px-3 py-1.5 bg-[#FF0000]/10 border border-[#FF0000] text-[#FF0000] hover:bg-[#FF0000] hover:text-[#09090C] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>ADD FIELD</span>
                    </button>
                  </div>

                  {/* Quick Suggestion Presets */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] text-[#B8AEB1]/60 uppercase tracking-widest font-bold mr-1">
                      QUICK PRESETS:
                    </span>
                    {[
                      { label: "Full Name", type: "text" as FieldType, req: true },
                      { label: "Email Address", type: "email" as FieldType, req: true },
                      { label: "Resume / CV Document", type: "document" as FieldType, req: true },
                      { label: "Art Portfolio / Screenshots", type: "image" as FieldType, req: false },
                      { label: "Portfolio / Reel Link", type: "url" as FieldType, req: false },
                      { label: "Discord Handle", type: "text" as FieldType, req: true },
                      { label: "Years of Experience", type: "number" as FieldType, req: false },
                      { label: "Cover Letter / Notes", type: "textarea" as FieldType, req: false },
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => addFieldToEditJob(preset.label, preset.type, preset.req)}
                        className="px-2 py-0.5 bg-[#09090C] border border-white/15 hover:border-[#FF0000] text-[10px] text-[#B8AEB1] hover:text-white transition-colors cursor-pointer"
                      >
                        + {preset.label}
                      </button>
                    ))}
                  </div>

                  {/* Empty State */}
                  {editCustomFields.length === 0 ? (
                    <div className="p-6 text-center border border-dashed border-white/15 bg-[#09090C]/50 space-y-2">
                      <div className="text-[11px] text-[#B8AEB1] font-bold">
                        NO CUSTOM FIELDS CONFIGURED
                      </div>
                      <p className="text-[10px] text-[#B8AEB1]/60 max-w-sm mx-auto">
                        This role currently has no custom fields. Use the presets above or click &quot;ADD FIELD&quot; to define custom labels and descriptions.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {editCustomFields.map((field, idx) => (
                        <div
                          key={field.id}
                          className="p-3.5 bg-[#09090C] border border-white/10 hover:border-white/20 space-y-2.5 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-[#FF0000] tracking-wider uppercase">
                                FIELD #{idx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => toggleEditJobFieldRequired(field.id)}
                                className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
                                  field.required
                                    ? "bg-[#FF0000] border-[#FF0000] text-black"
                                    : "bg-[#151115] border-white/20 text-[#B8AEB1] hover:text-white"
                                }`}
                                title="Toggle Required / Optional"
                              >
                                {field.required ? "REQUIRED *" : "OPTIONAL"}
                              </button>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => moveEditJobField(idx, "up")}
                                disabled={idx === 0}
                                className="p-1 text-[#B8AEB1] hover:text-white disabled:opacity-20 cursor-pointer"
                                title="Move up"
                              >
                                <ArrowUp className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => moveEditJobField(idx, "down")}
                                disabled={idx === editCustomFields.length - 1}
                                className="p-1 text-[#B8AEB1] hover:text-white disabled:opacity-20 cursor-pointer"
                                title="Move down"
                              >
                                <ArrowDown className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => removeEditJobField(field.id)}
                                className="p-1 text-[#B8AEB1] hover:text-[#FF0000] cursor-pointer ml-1"
                                title="Remove field"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {/* Field Label */}
                            <div className="space-y-1">
                              <label className="text-[10px] text-[#B8AEB1] uppercase tracking-wider block font-bold">
                                FIELD LABEL / NAME
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. CV Document, Art Portfolio"
                                value={field.label}
                                onChange={(e) =>
                                  updateEditJobField(field.id, "label", e.target.value)
                                }
                                required
                                className="w-full bg-[#151115] border border-white/15 px-3 py-2 text-white focus:border-[#FF0000] focus:outline-none text-xs"
                              />
                            </div>

                            {/* Field Type */}
                            <div className="space-y-1">
                              <label className="text-[10px] text-[#B8AEB1] uppercase tracking-wider block font-bold">
                                FIELD TYPE
                              </label>
                              <select
                                value={field.type || "text"}
                                onChange={(e) =>
                                  updateEditJobField(
                                    field.id,
                                    "type",
                                    e.target.value as FieldType
                                  )
                                }
                                className="w-full bg-[#151115] border border-white/15 px-3 py-2 text-white focus:border-[#FF0000] focus:outline-none text-xs"
                              >
                                <option value="text">Text (Single-line)</option>
                                <option value="email">Email Address</option>
                                <option value="document">
                                  Document Upload (PDF, DOC, DOCX)
                                </option>
                                <option value="image">
                                  Image Upload (PNG, JPG, WEBP)
                                </option>
                                <option value="textarea">Textarea (Multi-line)</option>
                                <option value="url">Web Link / Portfolio URL</option>
                                <option value="number">Number / Years</option>
                              </select>
                            </div>

                            {/* Field Help Text / Placeholder */}
                            <div className="space-y-1">
                              <label className="text-[10px] text-[#B8AEB1] uppercase tracking-wider block font-bold">
                                HELP TEXT / PLACEHOLDER
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. Upload PDF up to 20MB..."
                                value={field.placeholder || ""}
                                onChange={(e) =>
                                  updateEditJobField(field.id, "placeholder", e.target.value)
                                }
                                className="w-full bg-[#151115] border border-white/15 px-3 py-2 text-white focus:border-[#FF0000] focus:outline-none text-xs"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="sticky bottom-0 bg-[#130E14] pt-3 pb-1 border-t border-white/10 flex flex-col sm:flex-row items-center justify-end gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={closeEditJobModal}
                    className="w-full sm:w-auto px-5 py-2.5 border border-white/20 text-[#B8AEB1] hover:text-white uppercase font-bold tracking-wider text-xs transition-colors cursor-pointer"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    disabled={savingEdit}
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#FF0000] hover:bg-white text-[#09090C] uppercase font-bold tracking-widest text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Check className="w-4 h-4" />
                    <span>{savingEdit ? "SAVING CHANGES..." : "SAVE CHANGES"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </SmoothScroll>
  );
}