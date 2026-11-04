
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import {
  ArrowUpRight,
  ExternalLink,
  Layers3,
  X,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";


type Project = {
  id: string;
  title: string;
  subtitle: string | null;
  description: string;
  features: string[];
  technologies: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  image: string | null;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};



const gradients = [
  "from-purple-700/40 via-indigo-900/40 to-[#11111f]",
  "from-fuchsia-700/35 via-purple-900/40 to-[#11111f]",
  "from-indigo-700/35 via-violet-900/40 to-[#11111f]",
];

function getInitials(title: string) {
  if (title === "Hero.IO") return "H.IO";
  if (title === "HireMaster") return "HM";
  if (title === "Personal Portfolio") return "DEV";

  return title
    .split(/\s+/)
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 3)
    .toUpperCase();
}


function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-3">
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => event.stopPropagation()}
          className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-500"
        >
          <ExternalLink size={16} />
          Live Preview
        </a>
      ) : (
        <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-zinc-500">
          <ExternalLink size={16} />
          Preview Soon
        </span>
      )}

      {project.githubUrl ? (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => event.stopPropagation()}
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-purple-500/50 hover:bg-purple-500/10"
        >
          <FaGithub size={16} />
          GitHub
        </a>
      ) : (
        <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-zinc-500">
          <FaGithub size={16} />
          Repository Soon
        </span>
      )}
    </div>
  );
}

export default function Projects() {
    
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadProjects() {
      try {
        const response = await fetch("/api/projects", {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load projects.");
        }

        const data: unknown = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid projects response.");
        }

        setProjects(data as Project[]);
      } catch (err) {
        if (controller.signal.aborted) return;

        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProjects();

    return () => controller.abort();
  }, []);

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <section
      id="projects"
      className="relative scroll-mt-20 overflow-hidden px-6 py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-purple-700/10 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">
            My recent work
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Featured <span className="text-purple-400">Projects</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-zinc-400">
            A selection of projects showcasing my development
            experience and technical skills.
          </p>
        </motion.div>

        
        {loading && (
          <p role="status" className="mb-8 text-center text-zinc-400">
            Loading projects...
          </p>
        )}

        {error && (
          <p role="alert" className="mb-8 text-center text-red-400">
            {error}
          </p>
        )}

        {!loading && !error && projects.length === 0 && (
          <p className="mb-8 text-center text-zinc-400">
            No projects available yet.
          </p>
        )}

        {/* Project grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={reduceMotion ? false : { opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#11111f] transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/10"
            >
              {/* Clickable project details area */}
              <button
                type="button"
                onClick={() => setSelectedProject(project)}
                aria-label={`View details for ${project.title}`}
                className="flex flex-1 cursor-pointer flex-col text-left"
              >
                {/* Project artwork */}
                <div
                  className={`relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br ${gradients[index % gradients.length]}`}
                >
                  <div className="absolute h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />

                  <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-purple-400/30 bg-[#080811]/60 text-3xl font-extrabold tracking-tight text-purple-200 shadow-2xl backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    {getInitials(project.title)}
                  </div>

                  <span className="absolute bottom-4 right-4 inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-xs text-zinc-200 backdrop-blur-sm">
                    View Details
                    <ArrowUpRight size={13} />
                  </span>
                </div>

                <div className="flex-1 p-6 pb-3">
                  <p className="mb-2 text-sm font-medium text-purple-400">
                    {project.subtitle}
                  </p>

                  <h3 className="mb-3 text-2xl font-bold text-white">
                    {project.title}
                  </h3>

                  <p className="line-clamp-3 text-sm leading-7 text-zinc-400">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-purple-500/15 bg-purple-500/10 px-2.5 py-1 text-xs text-purple-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </button>

              {/* External links are outside the details button */}
              <div className="border-t border-white/10 p-6 pt-4">
                <ProjectLinks project={project} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Project details modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="project-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setSelectedProject(null);
              }
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: reduceMotion ? 0 : 0.25 }}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-purple-500/25 bg-[#11111f] p-6 shadow-2xl shadow-purple-900/20 sm:p-9"
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/5 p-2 text-zinc-300 transition hover:bg-purple-500/20 hover:text-white"
              >
                <X size={20} />
              </button>

              <div className="mb-6 inline-flex rounded-xl border border-purple-500/20 bg-purple-500/10 p-3 text-purple-400">
                <Layers3 size={24} />
              </div>

              <p className="mb-2 pr-10 text-sm font-medium text-purple-400">
                {selectedProject.subtitle}
              </p>

              <h3
                id="project-modal-title"
                className="mb-5 pr-10 text-3xl font-bold text-white"
              >
                {selectedProject.title}
              </h3>

              <p className="leading-8 text-zinc-400">
                {selectedProject.description}
              </p>

              <h4 className="mb-4 mt-8 text-lg font-semibold text-white">
                Key Features
              </h4>

              <ul className="space-y-3">
                {selectedProject.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm leading-6 text-zinc-300"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-purple-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <h4 className="mb-4 mt-8 text-lg font-semibold text-white">
                Technologies Used
              </h4>

              <div className="mb-8 flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-purple-500/20 bg-purple-500/10 px-3 py-1.5 text-sm text-purple-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <ProjectLinks project={selectedProject} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
