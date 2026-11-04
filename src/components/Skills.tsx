
"use client";

import { motion, useReducedMotion } from "motion/react";
import { type IconType } from "react-icons";
import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiReact,
  SiTailwindcss,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiPrisma,
  SiGit,
  SiFigma,
  SiPostman,
  SiVercel,
} from "react-icons/si";
import { Code2, Database, Layers3, Server, Wrench } from "lucide-react";

type Skill = {
  name: string;
  Icon: IconType;
  color: string;
};

const skillGroups: {
  title: string;
  description: string;
  Icon: typeof Code2;
  skills: Skill[];
}[] = [
  {
    title: "Programming Languages",
    description: "Languages I use to build applications",
    Icon: Code2,
    skills: [
      { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
    ],
  },
  {
    title: "Frontend Development",
    description: "Building responsive and interactive interfaces",
    Icon: Layers3,
    skills: [
      { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", Icon: SiCss, color: "#1572B6" },
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Bootstrap", Icon: SiBootstrap, color: "#7952B3" },
    ],
  },
  {
    title: "Backend Development",
    description: "Developing server-side application logic",
    Icon: Server,
    skills: [
      { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Express.js", Icon: SiExpress, color: "#E5E7EB" },
    ],
  },
  {
    title: "Databases & ORM",
    description: "Working with structured and document databases",
    Icon: Database,
    skills: [
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
      { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
      { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
      { name: "Prisma", Icon: SiPrisma, color: "#A78BFA" },
    ],
  },
  {
    title: "Tools & Platforms",
    description: "Tools I use throughout development",
    Icon: Wrench,
    skills: [
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
      { name: "Postman", Icon: SiPostman, color: "#FF6C37" },
      { name: "Vercel", Icon: SiVercel, color: "#FFFFFF" },
    ],
  },
];

export default function Skills() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="skills"
      className="relative scroll-mt-20 overflow-hidden px-6 py-24 sm:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-purple-700/10 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">
            My technical toolkit
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Skills &{" "}
            <span className="text-purple-400">Technologies</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-zinc-400">
            Technologies and tools I work with to develop
            modern web applications.
          </p>
        </motion.div>

        {/* Categorized skills */}
        <div className="space-y-12">
          {skillGroups.map((group, groupIndex) => {
            const CategoryIcon = group.Icon;

            return (
              <motion.div
                key={group.title}
                initial={
                  reduceMotion ? false : { opacity: 0, y: 30 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: groupIndex * 0.05,
                }}
              >
                {/* Category heading */}
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl border border-purple-500/20 bg-purple-500/10 p-3 text-purple-400">
                    <CategoryIcon size={22} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {group.title}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500">
                      {group.description}
                    </p>
                  </div>
                </div>

                {/* Skill cards */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                  {group.skills.map((skill) => {
                    const Icon = skill.Icon;

                    return (
                      <div
                        key={skill.name}
                        className="group flex min-h-36 cursor-default flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-[#11111f] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40 hover:bg-[#1b1730] hover:shadow-lg hover:shadow-purple-500/10"
                      >
                        <Icon
                          size={38}
                          color={skill.color}
                          className="opacity-75 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"
                        />

                        <span className="text-center text-sm font-semibold text-zinc-300 transition-colors group-hover:text-white">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
