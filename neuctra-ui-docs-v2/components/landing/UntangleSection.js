"use client";

import { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useScrub } from "./useScrub";

const OFFSET = ["start 70%", "end 75%"];

const ROWS = [
  {
    problem: "Rebuilding the same pieces",
    fix: "Ready-made components",
    tangle: "M0 50 C 190 470, 40 -60, 300 250",
  },
  {
    problem: "Screens that do not match",
    fix: "One shared design system",
    tangle: "M0 150 C 230 -50, 60 520, 300 250",
  },
  {
    problem: "Hours of project setup",
    fix: "One-command setup",
    tangle: "M0 250 C 120 540, 210 -70, 300 250",
  },
  {
    problem: "Forgotten mobile and empty screens",
    fix: "Responsive parts for every state",
    tangle: "M0 350 C 260 60, 30 110, 300 250",
  },
  {
    problem: "AI tools that guess",
    fix: "AI that reads the real docs",
    tangle: "M0 450 C 200 90, 110 560, 300 250",
  },
];

const straight = (index) => {
  const y = 50 + index * 100;
  return `M300 250 C 410 250, 430 ${y}, 600 ${y}`;
};

export default function UntangleSection() {
  const ref = useRef(null);
  const { progress } = useScrub(ref, OFFSET);

  const tangled = useTransform(progress, [0, 0.5], [0, 1]);
  const cleaned = useTransform(progress, [0.5, 0.95], [0, 1]);
  const hubScale = useTransform(progress, [0.42, 0.52], [0.8, 1]);
  const hubOpacity = useTransform(progress, [0.42, 0.52], [0.35, 1]);

  return (
    <section
      id="untangle"
      className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <SectionHeading
        eyebrow="The problem"
        title="Every project starts with the same mess"
        text="Almost every app needs the same buttons, forms, and tables. Neuctra UI turns that repeated work into one clean starting point."
      />

      <div
        ref={ref}
        className="relative mt-14 hidden grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1fr)] gap-4 lg:grid"
      >
        <ul className="relative z-10 grid grid-rows-5">
          {ROWS.map((row) => (
            <li key={row.problem} className="flex h-20 items-center justify-end text-right">
              <span className="text-sm text-muted-foreground xl:text-base">{row.problem}</span>
            </li>
          ))}
        </ul>

        <div className="relative">
          <svg
            aria-hidden="true"
            viewBox="0 0 600 500"
            preserveAspectRatio="none"
            fill="none"
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            {ROWS.map((row, index) => (
              <g key={row.problem}>
                <path d={row.tangle} stroke="var(--border)" strokeWidth="1.5" />
                <path d={straight(index)} stroke="var(--border)" strokeWidth="1.5" />
                <motion.path
                  data-draw
                  d={row.tangle}
                  style={{ pathLength: tangled }}
                  stroke="var(--muted-foreground)"
                  strokeWidth="2"
                />
                <motion.path
                  data-draw
                  d={straight(index)}
                  style={{ pathLength: cleaned }}
                  stroke="var(--primary)"
                  strokeWidth="2.5"
                />
              </g>
            ))}
          </svg>
          <motion.div
            aria-hidden="true"
            style={{ scale: hubScale, opacity: hubOpacity }}
            className="absolute left-1/2 top-1/2 -ml-11 -mt-11 flex h-22 w-22 items-center justify-center rounded-2xl border border-primary bg-background shadow-[0_0_50px_-10px] shadow-primary/70"
          >
            <span className="nx-pulse absolute inset-0 rounded-2xl border border-primary/50" />
            <img src="/logo.png" alt="" width="56" height="56" className="h-14 w-14 object-contain" />
          </motion.div>
        </div>

        <ul className="relative z-10 grid grid-rows-5">
          {ROWS.map((row, index) => (
            <Fix key={row.fix} progress={cleaned} index={index}>
              {row.fix}
            </Fix>
          ))}
        </ul>
      </div>

      <ul className="mt-10 flex flex-col gap-3 lg:hidden">
        {ROWS.map((row) => (
          <li key={row.problem} className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">{row.problem}</p>
            <p className="mt-1 flex items-center gap-2 font-semibold text-foreground">
              <ArrowRight size={15} aria-hidden="true" className="shrink-0 text-primary" />
              {row.fix}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Fix({ progress, index, children }) {
  const start = 0.55 + index * 0.05;
  const opacity = useTransform(progress, [start, Math.min(1, start + 0.2)], [0.3, 1]);

  return (
    <li className="flex h-20 items-center">
      <motion.span style={{ opacity }} className="font-semibold text-foreground xl:text-lg">
        {children}
      </motion.span>
    </li>
  );
}
