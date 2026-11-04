
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  GraduationCap,
  Code2,
  MapPin,
} from "lucide-react";


const highlights = [
  {
    icon: GraduationCap,
    title: "Education",
    value: "B.Sc. in CSE",
    description: "Green University of Bangladesh",
  },
  {
    icon: BriefcaseBusiness,
    title: "Experience",
    value: "Software Engineering",
    description: "Internship & professional projects",
  },
  {
    icon: Code2,
    title: "Specialization",
    value: "Full-Stack Development",
    description: "React, Next.js & backend systems",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Dhaka, Bangladesh",
    description: "Building for the modern web",
  },
];

export default function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative scroll-mt-20 overflow-hidden px-6 py-24 sm:py-32"
    >
      
      <div className="pointer-events-none absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-purple-700/10 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl">

        
        <motion.div
          initial={
            reduceMotion ? false : { opacity: 0, y: 30 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">
            Get to know me
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            About <span className="text-purple-400">Me</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-zinc-400">
            A little about my background, experience, and passion
            for software development.
          </p>
        </motion.div>

        
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">

          
          <motion.div
            initial={
              reduceMotion ? false : { opacity: 0, x: -40 }
            }
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto w-full max-w-[400px]"
          >
            
            <div className="pointer-events-none absolute -inset-5 rounded-[3rem] bg-purple-600/20 blur-3xl" />

            
            <div className="relative rounded-[2rem] border border-purple-500/30 bg-gradient-to-br from-purple-500/20 via-[#141021] to-fuchsia-500/10 p-3 shadow-2xl shadow-purple-900/20">

              
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#151020]">
                <Image
                  src="/images/profile.jpg"
                  alt="Portrait of Sihabun Sakib Hemal"
                  fill
                  sizes="(max-width: 1024px) 90vw, 400px"
                  className="object-cover object-center"
                />

                
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080811]/70 to-transparent" />
              </div>
            </div>

            
            <div className="absolute -right-3 -bottom-5 rounded-2xl border border-purple-500/30 bg-[#151020] px-5 py-4 shadow-xl shadow-purple-900/20 sm:-right-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-purple-500/15 p-2.5 text-purple-400">
                  <Code2 size={22} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Full-Stack
                  </p>
                  <p className="text-xs text-zinc-400">
                    Developer
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          
          <motion.div
            initial={
              reduceMotion ? false : { opacity: 0, x: 40 }
            }
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 lg:mt-0"
          >
            
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/25 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
              <Code2 size={16} />
              Who I Am
            </div>

            
            <h3 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Turning Ideas Into{" "}
              <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                Digital Experiences.
              </span>
            </h3>

            
            <div className="space-y-5 text-base leading-8 text-zinc-400">
              <p>
                I&apos;m{" "}
                <span className="font-semibold text-white">
                  Sihabun Sakib Hemal
                </span>
                , a Computer Science and Engineering student
                at Green University of Bangladesh with a strong
                interest in full-stack web development and
                software engineering.
              </p>

              <p>
                I enjoy creating responsive, user-friendly web
                applications that combine modern design with
                reliable functionality. I have experience
                working with frontend and backend technologies,
                collaborating with teams, and solving practical
                software development challenges.
              </p>

              <p>
                My technical interests include React, Next.js,
                TypeScript, Node.js, PostgreSQL, Prisma,
                and modern web development practices.
                I&apos;m always looking for opportunities
                to learn, improve, and build meaningful
                digital products.
              </p>
            </div>

           
            <a
              href="#projects"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-purple-400 transition-all duration-300 hover:gap-3 hover:text-purple-300"
            >
              Explore My Projects
              <ArrowUpRight size={18} />
            </a>
          </motion.div>
        </div>

        
        <motion.div
          initial={
            reduceMotion ? false : { opacity: 0, y: 40 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="mt-24 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-white/10 bg-[#11111f] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40 hover:bg-[#18142a] hover:shadow-lg hover:shadow-purple-500/5"
              >
                
                <div className="mb-5 inline-flex rounded-xl border border-purple-500/20 bg-purple-500/10 p-3 text-purple-400 transition group-hover:bg-purple-500/20">
                  <Icon size={24} />
                </div>

                
                <p className="mb-2 text-sm text-zinc-500">
                  {item.title}
                </p>

                
                <h4 className="mb-2 text-lg font-bold text-white">
                  {item.value}
                </h4>

                
                <p className="text-sm leading-6 text-zinc-400">
                  {item.description}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
