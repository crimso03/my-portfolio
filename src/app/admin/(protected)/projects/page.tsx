import PublishProjectButton from "@/components/admin/PublishProjectButton";

import DeleteProjectButton from "@/components/admin/DeleteProjectButton";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  ArrowLeft,
  ExternalLink,
  FolderKanban,
  Plus,
  Pencil,
} from "lucide-react";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [
      { sortOrder: "asc" },
      { createdAt: "desc" },
    ],
  });

  return (
    <main className="min-h-screen bg-[#080811] px-5 py-10 text-white sm:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Back to Dashboard */}
        <Link
          href="/admin"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-purple-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Page Header */}
        <div className="mb-9 flex flex-wrap items-center justify-between gap-5">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm text-purple-400">
              <FolderKanban className="h-4 w-4" />
              Project Management
            </div>

            <h1 className="text-3xl font-bold sm:text-4xl">
              Manage <span className="text-purple-400">Projects</span>
            </h1>

            <p className="mt-3 text-sm text-gray-400">
              View and manage your portfolio projects.
            </p>
          </div>

          {/* Add Project Button */}
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white transition hover:from-purple-500 hover:to-fuchsia-500"
          >
            <Plus className="h-4 w-4" />
            Add Project
          </Link>
        </div>

        {/* Projects Table */}
        {projects.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center text-gray-400">
            No projects found.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03]">
            <table className="w-full min-w-[850px] text-left text-sm">
              {/* Table Headings */}
              <thead className="border-b border-white/10 bg-white/[0.03] text-gray-400">
                <tr>
                  <th className="px-6 py-4 font-medium">
                    Project
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Technologies
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Status
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Order
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Links
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b border-white/5 transition last:border-0 hover:bg-white/[0.03]"
                  >
                    {/* Project Name */}
                    <td className="px-6 py-5">
                      <p className="font-semibold text-white">
                        {project.title}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {project.subtitle || "No subtitle"}
                      </p>
                    </td>

                    {/* Technologies */}
                    <td className="px-6 py-5 text-gray-400">
                      {project.technologies
                        .slice(0, 3)
                        .join(", ")}

                      {project.technologies.length > 3 &&
                        " ..."}
                    </td>

                    {/* Publication Status */}
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          project.published
                            ? "bg-green-500/10 text-green-400"
                            : "bg-gray-500/10 text-gray-400"
                        }`}
                      >
                        {project.published
                          ? "Published"
                          : "Draft"}
                      </span>
                    </td>

                    {/* Display Order */}
                    <td className="px-6 py-5 text-gray-400">
                      {project.sortOrder}
                    </td>

                    {/* Project Links */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Live preview of ${project.title}`}
                            className="text-gray-400 transition hover:text-purple-400"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`GitHub repository of ${project.title}`}
                            className="text-xs text-gray-400 transition hover:text-purple-400"
                          >
                            GitHub
                          </a>
                        )}

                        {!project.liveUrl &&
                          !project.githubUrl && (
                            <span className="text-xs text-gray-600">
                              No links
                            </span>
                          )}
                      </div>
                    </td>

                    {/* Actions - Edit Project */}
                    
<td className="px-6 py-5">
  <div className="flex items-center gap-2">
    <Link
      href={`/admin/projects/${project.id}/edit`}
      className="inline-flex items-center gap-2 rounded-lg border border-purple-500/20 bg-purple-500/10 px-3 py-2 text-xs font-medium text-purple-300 transition hover:bg-purple-500/20"
    >
      <Pencil className="h-3.5 w-3.5" />
      Edit
    </Link>
    <PublishProjectButton
  projectId={project.id}
  published={project.published}
/>                      
    <DeleteProjectButton
      projectId={project.id}
      projectTitle={project.title}
    />
  </div>
</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
