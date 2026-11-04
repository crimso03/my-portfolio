
"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const roles = [
  "Full-Stack Developer",
  "Software Engineer",
  "React & Next.js Developer",
];

export default function TypingText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const currentRole = roles[roleIndex];
    const finishedTyping = characterCount === currentRole.length;
    const finishedDeleting = characterCount === 0 && deleting;

    const timeout = setTimeout(() => {
      if (finishedDeleting) {
        setDeleting(false);
        setRoleIndex((previous) => (previous + 1) % roles.length);
      } else if (finishedTyping && !deleting) {
        setDeleting(true);
      } else {
        setCharacterCount((previous) =>
          previous + (deleting ? -1 : 1)
        );
      }
    }, finishedTyping && !deleting ? 1600 : deleting ? 45 : 90);

    return () => clearTimeout(timeout);
  }, [roleIndex, characterCount, deleting, reduceMotion]);

  return (
    <span className="inline-flex min-h-[1.5em] items-center">
      <span>
        {reduceMotion
          ? roles[0]
          : roles[roleIndex].slice(0, characterCount)}
      </span>
      {!reduceMotion && (
        <span
          aria-hidden="true"
          className="ml-1 animate-pulse text-purple-400"
        >
          |
        </span>
      )}
    </span>
  );
}
