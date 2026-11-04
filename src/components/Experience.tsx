
"use client";

import { motion, useReducedMotion } from "motion/react";
import { BriefcaseBusiness, CalendarDays, MapPin } from "lucide-react";

const experiences = [
  {
    role: "Junior Software Engineer Intern",
    company: "Battery Low Interactive Ltd.",
    period: "Aug 2025 – Jan 2026",
    location: "Dhaka, Bangladesh",
    description:
      "Gained hands-on experience in a professional software engineering environment, collaborating with teams and contributing to software development activities.",
    tags: ["Software Engineering", "Team Collaboration", "Development"],
  },
  {
    role: "Project Auditor",
    company: "Dhaka North City Corporation",
    period: "Apr 2023 – Aug 2023",
    location: "Dhaka, Bangladesh",
    description:
      "Worked on project auditing and monitoring activities, supporting documentation, coordination, and review processes.",
    tags: ["Project Auditing", "Documentation", "Coordination"],
  },
  {
    role: "Client Management",
    company: "BRAC",
    period: "Jan 2022 – May 2022",
    location: "Bangladesh",
    description:
      "Gained experience in client communication, coordination, and administrative support in a professional environment.",
    tags: ["Client Relations", "Communication", "Management"],
  },
];

export default function Experience() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="experience"
      className="relative scroll-mt-20 overflow-hidden px-6 py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-purple-700/10 blur-[110px]" />

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">
            My professional journey
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Work <span className="text-purple-400">Experience</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-zinc-400">
            A timeline of the roles and experiences that have shaped
            my professional development.
          </p>
        </motion.div>

        <div className="relative ml-3 border-l border-purple-500/30 sm:ml-5">
          {experiences.map((experience, index) => (
            <motion.div
              key={`${experience.company}-${index}`}
              initial={reduceMotion ? false : { opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative mb-8 pl-8 last:mb-0 sm:pl-12"
            >
              <div className="absolute -left-[9px] top-8 flex h-[17px] w-[17px] items-center justify-center rounded-full border-4 border-[#080811] bg-purple-400 ring-2 ring-purple-500/40" />

              <div className="group rounded-2xl border border-white/10 bg-[#11111f] p-6 transition-all duration-300 hover:border-purple-500/40 hover:bg-[#18142a] hover:shadow-lg hover:shadow-purple-500/5 sm:p-8">
                <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="mb-3 inline-flex rounded-xl border border-purple-500/20 bg-purple-500/10 p-3 text-purple-400">
                      <BriefcaseBusiness size={22} />
                    </div>

                    <h3 className="text-xl font-bold text-white sm:text-2xl">
                      {experience.role}
                    </h3>

                    <p className="mt-2 font-medium text-purple-400">
                      {experience.company}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
                    <CalendarDays size={15} />
                    {experience.period}
                  </div>
                </div>

                <div className="mb-5 flex items-center gap-2 text-sm text-zinc-500">
                  <MapPin size={15} />
                  {experience.location}
                </div>

                <p className="leading-7 text-zinc-400">
                  {experience.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {experience.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
