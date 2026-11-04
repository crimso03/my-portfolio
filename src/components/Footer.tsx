
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUp,
  Heart,
  ArrowUpRight,
  LockKeyhole,
} from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const reduceMotion = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0b0b16] px-6 pt-16 pb-8">
      
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-56 w-80 rounded-full bg-purple-700/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid gap-12 md:grid-cols-3"
        >
          
          <div>
            <a
              href="#home"
              className="inline-block text-2xl font-extrabold tracking-tight text-white"
            >
              Sakib
              <span className="text-purple-400">.</span>
            </a>

            <p className="mt-5 max-w-sm text-sm leading-7 text-zinc-400">
              Full-Stack Developer passionate about creating
              modern, responsive, and meaningful digital
              experiences.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://github.com/crimso03"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="rounded-xl border border-white/10 bg-white/5 p-3 text-zinc-400 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40 hover:text-purple-400"
              >
                <FaGithub size={19} />
              </a>

              <a
                href="https://www.linkedin.com/in/sihabun-sakib-hemal-211b08444"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="rounded-xl border border-white/10 bg-white/5 p-3 text-zinc-400 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40 hover:text-purple-400"
              >
                <FaLinkedinIn size={19} />
              </a>
            </div>
          </div>

          
          <div className="md:mx-auto">
            <h3 className="mb-6 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-zinc-400 transition hover:text-purple-400"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">
              Have a Project?
            </h3>

            <p className="mb-6 text-sm leading-7 text-zinc-400">
              Let's collaborate and turn your ideas into
              something great.
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-5 py-3 text-sm font-semibold text-purple-300 transition hover:bg-purple-500/20"
            >
              Let's Talk
              <ArrowUpRight size={17} />
            </a>
          </div>
        </motion.div>

        


        <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-7 text-center sm:flex-row sm:flex-wrap sm:text-left">
          <p className="text-sm text-zinc-500">
            © {year} Sihabun Sakib Hemal. All rights reserved.
          </p>

          <p className="flex items-center gap-2 text-sm text-zinc-500">
            Built with
            <Heart
              size={15}
              className="fill-purple-400 text-purple-400"
            />
            using Next.js & TypeScript
          </p>

          {/* Footer Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-zinc-400 transition hover:border-purple-500/40 hover:text-purple-400"
            >
              <LockKeyhole size={15} />
              Admin Login
            </Link>

            
            <a
              href="#home"
              aria-label="Back to top"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-zinc-300 transition hover:border-purple-500/40 hover:text-purple-400"
            >
              Back to Top
              <ArrowUp size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
