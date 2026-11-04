
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  Plus,
  Save,
} from "lucide-react";

export default function NewProjectPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    technologies: "",
    features: "",
    image: "",
    liveUrl: "",
    githubUrl: "",
    sortOrder: "0",
    featured: false,
    published: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(
    field: keyof typeof form,
    value: string | boolean
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const technologies = form.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const features = form.features
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title.trim(),
          subtitle: form.subtitle.trim() || null,
          description: form.description.trim(),
          technologies,
          features,
          image: form.image.trim() || null,
          liveUrl: form.liveUrl.trim() || null,
          githubUrl: form.githubUrl.trim() || null,
          sortOrder: Number(form.sortOrder),
          featured: form.featured,
          published: form.published,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to create project.");
        return;
      }

      router.push("/admin/projects");
      router.refresh();
    } catch {
      setError("Unable to save the project. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#11111f] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10";

  const labelClass = "mb-2 block text-sm font-medium text-gray-300";

  return (
    <main className="min-h-screen bg-[#080811] px-5 py-10 text-white sm:px-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/admin/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-purple-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        <div className="mb-9">
          <div className="mb-3 flex items-center gap-2 text-sm text-purple-400">
            <Plus className="h-4 w-4" />
            Project Management
          </div>

          <h1 className="text-3xl font-bold sm:text-4xl">
            Add <span className="text-purple-400">Project</span>
          </h1>

          <p className="mt-3 text-sm text-gray-400">
            Create a new project for your portfolio.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-9"
        >
          <div>
            <label htmlFor="title" className={labelClass}>
              Project Title *
            </label>
            <input
              id="title"
              required
              maxLength={150}
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="e.g. My Awesome Project"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="subtitle" className={labelClass}>
              Subtitle
            </label>
            <input
              id="subtitle"
              maxLength={200}
              value={form.subtitle}
              onChange={(e) => updateField("subtitle", e.target.value)}
              placeholder="e.g. Full-Stack Web Application"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="description" className={labelClass}>
              Description *
            </label>
            <textarea
              id="description"
              required
              maxLength={10000}
              rows={5}
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Describe your project..."
              className={`${inputClass} resize-y`}
            />
          </div>

          <div>
            <label htmlFor="technologies" className={labelClass}>
              Technologies
            </label>
            <input
              id="technologies"
              value={form.technologies}
              onChange={(e) => updateField("technologies", e.target.value)}
              placeholder="React, TypeScript, Tailwind CSS"
              className={inputClass}
            />
            <p className="mt-2 text-xs text-gray-500">
              Separate technologies with commas.
            </p>
          </div>

          <div>
            <label htmlFor="features" className={labelClass}>
              Key Features
            </label>
            <textarea
              id="features"
              rows={5}
              value={form.features}
              onChange={(e) => updateField("features", e.target.value)}
              placeholder={"User authentication\nResponsive design\nDashboard"}
              className={`${inputClass} resize-y`}
            />
            <p className="mt-2 text-xs text-gray-500">
              Enter one feature per line.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="liveUrl" className={labelClass}>
                Live Preview URL
              </label>
              <input
                id="liveUrl"
                type="url"
                value={form.liveUrl}
                onChange={(e) => updateField("liveUrl", e.target.value)}
                placeholder="https://example.com"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="githubUrl" className={labelClass}>
                GitHub URL
              </label>
              <input
                id="githubUrl"
                type="url"
                value={form.githubUrl}
                onChange={(e) => updateField("githubUrl", e.target.value)}
                placeholder="https://github.com/..."
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="image" className={labelClass}>
              Project Image URL
            </label>
            <input
              id="image"
              type="url"
              value={form.image}
              onChange={(e) => updateField("image", e.target.value)}
              placeholder="https://example.com/image.png"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="sortOrder" className={labelClass}>
              Display Order
            </label>
            <input
              id="sortOrder"
              type="number"
              min={0}
              max={100000}
              step={1}
              required
              value={form.sortOrder}
              onChange={(e) => updateField("sortOrder", e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="space-y-4 rounded-xl border border-white/10 bg-[#11111f] p-5">
            <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  updateField("featured", e.target.checked)
                }
                className="h-4 w-4 accent-purple-500"
              />
              Featured Project
            </label>

            <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) =>
                  updateField("published", e.target.checked)
                }
                className="h-4 w-4 accent-purple-500"
              />
              Publish Immediately
            </label>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
            >
              {error}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-end gap-3 border-t border-white/10 pt-6">
            <Link
              href="/admin/projects"
              className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white transition hover:from-purple-500 hover:to-fuchsia-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Create Project
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
