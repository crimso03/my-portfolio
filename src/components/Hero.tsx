
"use client";

import TypingText from "@/components/TypingText";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiPostgresql,
  SiPrisma,
  SiNodedotjs,
} from "react-icons/si";


const technologies = [
  { Icon: SiReact, color: "#61DAFB", top: "16%", left: "9%", delay: 0 },
  { Icon: SiNextdotjs, color: "#FFFFFF", top: "13%", left: "80%", delay: 0.5 },
  { Icon: SiTypescript, color: "#3178C6", top: "37%", left: "5%", delay: 1 },
  { Icon: SiJavascript, color: "#F7DF1E", top: "40%", left: "90%", delay: 1.5 },
  { Icon: SiTailwindcss, color: "#06B6D4", top: "73%", left: "12%", delay: 2 },
  { Icon: SiPostgresql, color: "#4169E1", top: "76%", left: "84%", delay: 2.5 },
  { Icon: SiPrisma, color: "#A78BFA", top: "87%", left: "35%", delay: 1.2 },
  { Icon: SiNodedotjs, color: "#5FA04E", top: "84%", left: "65%", delay: 1.8 },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24 pb-16"
    >
      
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-purple-700/15 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-fuchsia-700/10 blur-[120px]" />

      
      <div
        className="pointer-events-none absolute inset-0 hidden md:block"
        aria-hidden="true"
      >
        {technologies.map(
          ({ Icon, color, top, left, delay }, index) => (
            <motion.div
              key={index}
              className="absolute rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
              style={{ top, left }}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, scale: 0.5 }
              }
              animate={{
                opacity: 0.45,
                scale: 1,
                y: reduceMotion ? 0 : [0, -16, 0],
              }}
              transition={{
                opacity: { duration: 0.8, delay },
                scale: { duration: 0.8, delay },
                y: {
                  duration: 5,
                  repeat: reduceMotion ? 0 : Infinity,
                  ease: "easeInOut",
                  delay,
                },
              }}
            >
              <Icon size={32} color={color} />
            </motion.div>
          )
        )}
      </div>

      
      <div className="relative z-10 mx-auto max-w-4xl text-center">

        
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-purple-500/25 bg-purple-500/10 px-4 py-2 text-sm text-purple-300"
        >
          <span className="h-2 w-2 rounded-full bg-green-400" />
          Welcome to my portfolio
        </motion.div>

        
        
<motion.h1
  initial={reduceMotion ? false : { opacity: 0, y: 35 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.15 }}
  className="whitespace-nowrap text-[clamp(1.1rem,4.5vw,4rem)] font-extrabold leading-tight tracking-tight"
>
  Hi, I&apos;m{" "}
  <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-500 bg-clip-text text-transparent">
    Sihabun Sakib Hemal
  </span>
</motion.h1>


        
        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-2xl font-semibold text-zinc-200 sm:text-3xl"
        >
          <TypingText />
        </motion.h2>

        
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg"
        >
          I build modern, responsive, and user-friendly web
          applications with a focus on clean design,
          performance, and seamless user experiences.
        </motion.p>

        
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-500/20"
          >
            View My Work
            <ArrowUpRight size={18} />
          </a>

          <a
            href="#contact"
            className="rounded-xl border border-purple-500/40 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-purple-500/10"
          >
            Contact Me
          </a>

          
          <button
            type="button"
            disabled
            title="Resume link will be added later"
            className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-white/10 px-6 py-3 font-medium text-zinc-500"
          >
            <Download size={18} />
            Resume
          </button>
        </motion.div>

        
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10 flex items-center justify-center gap-5"
        >
          
          <a
            href="https://github.com/crimso03"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit my GitHub profile"
            className="text-zinc-400 transition-all duration-300 hover:-translate-y-1 hover:text-purple-400"
          >
            <FaGithub size={24} />
          </a>

          
          <a
            href="https://www.linkedin.com/in/sihabun-sakib-hemal-211b08444"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit my LinkedIn profile"
            className="text-zinc-400 transition-all duration-300 hover:-translate-y-1 hover:text-purple-400"
          >
            <FaLinkedinIn size={24} />
          </a>
        </motion.div>

        
        <motion.a
          href="#about"
          aria-label="Scroll to About section"
          animate={{
            y: reduceMotion ? 0 : [0, 8, 0],
          }}
          transition={{
            duration: 2,
            repeat: reduceMotion ? 0 : Infinity,
          }}
          className="mt-14 inline-flex text-zinc-500 transition hover:text-purple-400"
        >
          <ArrowDown size={23} />
        </motion.a>
      </div>
    </section>
  );
}
