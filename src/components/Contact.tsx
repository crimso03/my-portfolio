
"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Send,
  UserRound,
  MessageSquare,
  FileText,
  LoaderCircle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormStatus = {
  type: "success" | "error";
  message: string;
} | null;

const initialForm: ContactForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const reduceMotion = useReducedMotion();

  const [form, setForm] = useState<ContactForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>(null);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setStatus(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data: { message?: string; error?: string } =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to send your message. Please try again."
        );
      }

      setStatus({
        type: "success",
        message:
          data.message ||
          "Your message was sent successfully!",
      });

      setForm({ ...initialForm });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#0c0c18] px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-zinc-600 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10 disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden px-6 py-24 sm:py-32"
    >
      
      <div className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-purple-700/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">
            Let&apos;s connect
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Get In <span className="text-purple-400">Touch</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-zinc-400">
            Have a project in mind, an opportunity to discuss,
            or just want to say hello? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div>
              <h3 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                Let&apos;s Work Together
                <span className="text-purple-400">.</span>
              </h3>

              <p className="max-w-md leading-8 text-zinc-400">
                I&apos;m interested in opportunities to collaborate,
                contribute to meaningful projects, and create
                great digital experiences.
              </p>
            </div>

            
            <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-[#11111f] p-5">
              <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">
                <MapPin size={23} />
              </div>

              <div>
                <h4 className="mb-1 font-semibold text-white">
                  Location
                </h4>

                <p className="text-sm text-zinc-400">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>

            
            <div>
              <h4 className="mb-4 font-semibold text-white">
                Find Me Online
              </h4>

              <div className="space-y-3">
                <a
                  href="https://github.com/crimso03"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-[#11111f] p-4 transition-all duration-300 hover:border-purple-500/40 hover:bg-[#18142a]"
                >
                  <span className="flex items-center gap-3 text-zinc-300">
                    <FaGithub size={22} />
                    GitHub
                  </span>

                  <ArrowUpRight
                    size={18}
                    className="text-zinc-500 transition group-hover:text-purple-400"
                  />
                </a>

                <a
                  href="https://www.linkedin.com/in/sihabun-sakib-hemal-211b08444"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-[#11111f] p-4 transition-all duration-300 hover:border-purple-500/40 hover:bg-[#18142a]"
                >
                  <span className="flex items-center gap-3 text-zinc-300">
                    <FaLinkedinIn size={22} />
                    LinkedIn
                  </span>

                  <ArrowUpRight
                    size={18}
                    className="text-zinc-500 transition group-hover:text-purple-400"
                  />
                </a>
              </div>
            </div>

            
            <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 shrink-0 rounded-full bg-purple-400" />

                <div>
                  <h4 className="font-semibold text-white">
                    Open to Opportunities
                  </h4>

                  <p className="mt-1 text-sm text-zinc-400">
                    Feel free to reach out for a conversation.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-3xl border border-white/10 bg-[#11111f] p-6 shadow-xl shadow-black/10 sm:p-9"
          >
            <div className="mb-8">
              <div className="mb-4 inline-flex rounded-xl border border-purple-500/20 bg-purple-500/10 p-3 text-purple-400">
                <Mail size={24} />
              </div>

              <h3 className="text-2xl font-bold text-white">
                Send Me a Message
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Fill out the form below to get started.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-300"
                  >
                    <UserRound size={15} />
                    Your Name
                  </label>

                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    autoComplete="name"
                    required
                    maxLength={100}
                    disabled={isSubmitting}
                    className={inputClass}
                  />
                </div>

                
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-300"
                  >
                    <Mail size={15} />
                    Email Address
                  </label>

                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    autoComplete="email"
                    required
                    maxLength={254}
                    disabled={isSubmitting}
                    className={inputClass}
                  />
                </div>
              </div>

              
              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-300"
                >
                  <FileText size={15} />
                  Subject
                </label>

                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Let's discuss a project"
                  required
                  maxLength={150}
                  disabled={isSubmitting}
                  className={inputClass}
                />
              </div>

              
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-300"
                >
                  <MessageSquare size={15} />
                  Your Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or idea..."
                  required
                  minLength={10}
                  maxLength={3000}
                  rows={6}
                  disabled={isSubmitting}
                  className={`${inputClass} resize-y`}
                />
              </div>

              
              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-purple-600 px-6 py-4 font-semibold text-white transition-all duration-300 hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    Sending Message...
                    <LoaderCircle
                      size={19}
                      className="animate-spin"
                    />
                  </>
                ) : (
                  <>
                    Send Message
                    <Send
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>

              
              {status && (
                <div
                  role={status.type === "error" ? "alert" : "status"}
                  aria-live="polite"
                  className={`flex items-start gap-3 rounded-xl border p-4 text-sm leading-6 ${
                    status.type === "success"
                      ? "border-green-500/25 bg-green-500/10 text-green-300"
                      : "border-red-500/25 bg-red-500/10 text-red-300"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 shrink-0"
                    />
                  ) : (
                    <AlertCircle
                      size={20}
                      className="mt-0.5 shrink-0"
                    />
                  )}

                  <p>{status.message}</p>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
