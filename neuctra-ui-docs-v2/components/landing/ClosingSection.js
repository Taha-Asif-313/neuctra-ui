"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useTransform } from "framer-motion";
import { ArrowRight, Bot, Check, LayoutTemplate, Mail, Rocket } from "lucide-react";
import CopyCommand from "./CopyCommand";
import { useScrub } from "./useScrub";

// Measured on the short line itself: it enters at the bottom of the screen and
// finishes just above, so the whole fill happens while it is in view.
const OFFSET = ["start 100%", "end 88%"];
const STAGES = ["Set up", "Describe", "Compose", "Theme", "Ship"];

const NEXT_STEPS = [
  {
    icon: Bot,
    title: "Connect your AI tool",
    text: "Give your coding assistant the real component docs.",
    href: "/docs/ai-assistant",
  },
  {
    icon: LayoutTemplate,
    title: "Open the playground",
    text: "Experiment with layouts before you write code.",
    href: "/docs/layout-playground",
  },
  {
    icon: Mail,
    title: "Contact us",
    text: "Ask a question or tell us what you are building.",
    href: "/contact",
  },
];

export default function ClosingSection() {
  const ref = useRef(null);
  const { progress } = useScrub(ref, OFFSET);

  return (
    <section
      id="start"
      aria-labelledby="closing-heading"
      className="relative z-10 overflow-hidden border-t border-border"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-full max-w-4xl -translate-x-1/2 rounded-full bg-primary/15 blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pt-28 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Your turn
            </p>
            <h2
              id="closing-heading"
              className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl xl:text-6xl"
            >
              Build your next interface with{" "}
              <span className="text-primary">Neuctra UI</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-secondary sm:text-lg">
              Free to use, and one command away from your first screen.
            </p>
            <div className="mt-7 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/docs"
                className="flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
              >
                Read the docs <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <CopyCommand
                command="npx @neuctra/ui-cli@latest init"
                className="w-full sm:max-w-sm"
              />
            </div>
          </div>

          <ul className="divide-y divide-border border-y border-border">
            {NEXT_STEPS.map((step) => (
              <li key={step.href}>
                <NextStep step={step} />
              </li>
            ))}
          </ul>
        </div>

        <FinishLine containerRef={ref} progress={progress} />
      </div>
    </section>
  );
}

function NextStep({ step }) {
  const { icon: Icon, title, text, href } = step;

  return (
    <Link href={href} className="group flex items-center gap-4 py-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-primary transition-colors duration-200 group-hover:border-primary">
        <Icon size={18} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-foreground">{title}</span>
        <span className="block text-sm text-muted-foreground">{text}</span>
      </span>
      <ArrowRight
        size={18}
        aria-hidden="true"
        className="shrink-0 text-muted-foreground transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:text-primary"
      />
    </Link>
  );
}

/** The page's five-stage line, finished, with the last stop left to the reader. */
function FinishLine({ containerRef, progress }) {
  const fill = useTransform(progress, [0, 0.85], [0, 1]);

  return (
    <div ref={containerRef} className="mt-16 sm:mt-20">
      <ol className="relative grid grid-cols-6">
        <span aria-hidden="true" className="absolute left-[8.33%] right-[8.33%] top-[0.9375rem] h-px bg-border" />
        <motion.span
          aria-hidden="true"
          style={{ scaleX: fill, originX: 0 }}
          className="absolute left-[8.33%] right-[8.33%] top-[0.9375rem] h-0.5 bg-primary"
        />
        {STAGES.map((stage, index) => (
          <Stop key={stage} label={stage} index={index} progress={fill} />
        ))}
        <li className="relative flex flex-col items-center gap-2 text-center">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <span className="nx-pulse absolute inset-0 rounded-full border border-primary" />
            <Rocket size={15} aria-hidden="true" className="text-primary-foreground" />
          </span>
          <span className="text-[11px] font-semibold text-foreground sm:text-sm">Your product</span>
        </li>
      </ol>
    </div>
  );
}

function Stop({ label, index, progress }) {
  const point = index / STAGES.length;
  const opacity = useTransform(progress, [point, Math.min(1, point + 0.04)], [0, 1]);

  return (
    <li className="relative flex flex-col items-center gap-2 text-center">
      <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background">
        <motion.span
          style={{ opacity }}
          className="absolute inset-0 flex items-center justify-center rounded-full border border-primary bg-background text-primary"
        >
          <Check size={14} aria-hidden="true" />
        </motion.span>
      </span>
      <span className="text-[11px] text-secondary sm:text-sm">{label}</span>
    </li>
  );
}
