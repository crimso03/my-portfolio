
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  Save,
  Pencil,
} from "lucide-react";

type Project = {
  id: string;
  title: string;
  subtitle: string | null;
  description: string;
  technologies: string[];
  features: string[];
  image: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  published: boolean;
  sortOrder: number;
};

export default function EditProjectForm({
  project,
}: {
  project: Project;
}) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: project.title,
    subtitle: project.subtitle ?? "",
    description: project.description,
    technologies: project.technologies.join(", "),
    features: project.features.join("\n"),
    image: project.image ?? "",
    liveUrl: project.liveUrl ?? "",
    githubUrl: project.githubUrl ?? "",
    sortOrder: String(project.sortOrder),
    featured: project.featured,
    published: project.published,
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

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `/api/admin/projects/${encodeURIComponent(project.id)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: form.title.trim(),
            subtitle: form.subtitle.trim() || null,
            description: form.description.trim(),

            technologies: form.technologies
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean),

            features: form.features
              .split("\n")
              .map((item) => item.trim())
              .filter(Boolean),

            image: form.image.trim() || null,
            liveUrl: form.liveUrl.trim() || null,
            githubUrl: form.githubUrl.trim() || null,

            sortOrder: Number(form.sortOrder),
            featured: form.featured,
            published: form.published,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error || "Failed to update project."
        );
        return;
      }

      router.push("/admin/projects");
      router.refresh();
    } catch {
      setError(
        "Unable to update project. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#11111f] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10";

  const labelClass =
    "mb-2 block text-sm font-medium text-gray-300";

  return (
    <main className="min-h-screen bg-[#080811] px-5 py-10 text-white sm:px-10">
      <div className="mx-auto max-w-3xl">

        {/* Back Button */}
        <Link
          href="/admin/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-purple-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        {/* Page Heading */}
        <div className="mb-9">
          <div className="mb-3 flex items-center gap-2 text-sm text-purple-400">
            <Pencil className="h-4 w-4" />
            Project Management
          </div>

          <h1 className="text-3xl font-bold sm:text-4xl">
            Edit{" "}
            <span className="text-purple-400">
              Project
            </span>
          </h1>

          <p className="mt-3 text-sm text-gray-400">
            Update the details of {project.title}.
          </p>
        </div>

        {/* Edit Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-9"
        >

          {/* Project Title */}
          <div>
            <label
              htmlFor="title"
              className={labelClass}
            >
              Project Title *
            </label>

            <input
              id="title"
              type="text"
              required
              maxLength={150}
              value={form.title}
              onChange={(e) =>
                updateField("title", e.target.value)
              }
              className={inputClass}
            />
          </div>

          {/* Subtitle */}
          <div>
            <label
              htmlFor="subtitle"
              className={labelClass}
            >
              Subtitle
            </label>

            <input
              id="subtitle"
              type="text"
              maxLength={200}
              value={form.subtitle}
              onChange={(e) =>
                updateField("subtitle", e.target.value)
              }
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className={labelClass}
            >
              Description *
            </label>

            <textarea
              id="description"
              required
              maxLength={10000}
              rows={5}
              value={form.description}
              onChange={(e) =>
                updateField(
                  "description",
                  e.target.value
                )
              }
              className={`${inputClass} resize-y`}
            />
          </div>

          {/* Technologies */}
          <div>
            <label
              htmlFor="technologies"
              className={labelClass}
            >
              Technologies
            </label>

            <input
              id="technologies"
              type="text"
              value={form.technologies}
              onChange={(e) =>
                updateField(
                  "technologies",
                  e.target.value
                )
              }
              placeholder="Next.js, TypeScript, Prisma"
              className={inputClass}
            />

            <p className="mt-2 text-xs text-gray-500">
              Separate technologies with commas.
            </p>
          </div>

          {/* Features */}
          <div>
            <label
              htmlFor="features"
              className={labelClass}
            >
              Key Features
            </label>

            <textarea
              id="features"
              rows={5}
              value={form.features}
              onChange={(e) =>
                updateField(
                  "features",
                  e.target.value
                )
              }
              placeholder={
                "Authentication\nAdmin Dashboard\nProject Management"
              }
              className={`${inputClass} resize-y`}
            />

            <p className="mt-2 text-xs text-gray-500">
              Enter one feature per line.
            </p>
          </div>

          {/* URLs */}
          <div className="grid gap-5 sm:grid-cols-2">

            {/* Live URL */}
            <div>
              <label
                htmlFor="liveUrl"
                className={labelClass}
              >
                Live Preview URL
              </label>

              <input
                id="liveUrl"
                type="url"
                value={form.liveUrl}
                onChange={(e) =>
                  updateField(
                    "liveUrl",
                    e.target.value
                  )
                }
                placeholder="https://example.com"
                className={inputClass}
              />
            </div>

            {/* GitHub URL */}
            <div>
              <label
                htmlFor="githubUrl"
                className={labelClass}
              >
                GitHub URL
              </label>

              <input
                id="githubUrl"
                type="url"
                value={form.githubUrl}
                onChange={(e) =>
                  updateField(
                    "githubUrl",
                    e.target.value
                  )
                }
                placeholder="https://github.com/..."
                className={inputClass}
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor="image"
              className={labelClass}
            >
              Project Image URL
            </label>

            <input
              id="image"
              type="url"
              value={form.image}
              onChange={(e) =>
                updateField(
                  "image",
                  e.target.value
                )
              }
              placeholder="https://example.com/image.jpg"
              className={inputClass}
            />
          </div>

          {/* Display Order */}
          <div>
            <label
              htmlFor="sortOrder"
              className={labelClass}
            >
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
              onChange={(e) =>
                updateField(
                  "sortOrder",
                  e.target.value
                )
              }
              className={inputClass}
            />

            <p className="mt-2 text-xs text-gray-500">
              Lower numbers appear first.
            </p>
          </div>

          {/* Project Settings */}
          <div className="space-y-4 rounded-xl border border-white/10 bg-[#11111f] p-5">

            {/* Featured */}
            <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  updateField(
                    "featured",
                    e.target.checked
                  )
                }
                className="h-4 w-4 accent-purple-500"
              />
              Featured Project
            </label>

            {/* Published */}
            <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) =>
                  updateField(
                    "published",
                    e.target.checked
                  )
                }
                className="h-4 w-4 accent-purple-500"
              />
              Published
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <p
              role="alert"
              className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
            >
              {error}
            </p>
          )}

          {/* Form Buttons */}
          <div className="flex flex-wrap justify-end gap-3 border-t border-white/10 pt-6">

            <Link
              href="/admin/projects"
              className="rounded-xl border border-white/10 px-5 py-3 text-sm text-gray-300 transition hover:bg-white/5"
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
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
