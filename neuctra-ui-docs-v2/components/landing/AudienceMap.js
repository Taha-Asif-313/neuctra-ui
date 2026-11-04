"use client";

import { useRef } from "react";
import Link from "next/link";
import { useInView } from "framer-motion";
import { useLoopingStages } from "@/components/patterns/useLoopingStages";
import SectionHeading from "./SectionHeading";

const OUTCOMES = [
  { label: "SaaS dashboards", href: "/docs/stat" },
  { label: "Login and account pages", href: "/docs/input" },
  { label: "Online stores", href: "/docs/carousel" },
  { label: "Marketing websites", href: "/docs/accordion" },
  { label: "Internal business tools", href: "/docs/table" },
  { label: "Portfolios and blogs", href: "/docs/card" },
];

const PEOPLE = [
  { label: "Solo developers", builds: [3, 5], note: "Deliver client work faster and to a more polished standard." },
  { label: "Startup founders who code", builds: [0, 1], note: "Launch a first version without hiring a designer first." },
  { label: "Small product teams", builds: [0, 4], note: "Keep every screen consistent and reduce repeated work." },
  { label: "Students and learners", builds: [1, 5], note: "Build realistic projects and see how interfaces fit together." },
  { label: "Agencies", builds: [2, 3], note: "Reuse one foundation and restyle it for each client." },
  { label: "People building with AI", builds: [0, 2], note: "Get better results, because the assistant has accurate information." },
];

const rowY = (index) => 50 + index * 100;
const wire = (from, to) =>
  `M0 ${rowY(from)} C 120 ${rowY(from)}, 180 ${rowY(to)}, 300 ${rowY(to)}`;

export default function AudienceMap() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });
  const { stage: active, select } = useLoopingStages({
    count: PEOPLE.length,
    durationMs: 3200,
    inView,
    stopOnSelect: true,
  });
  const person = PEOPLE[active];

  return (
    <section
      id="who"
      aria-labelledby="who-heading"
      className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <SectionHeading
        id="who-heading"
        eyebrow="Who it is for"
        title="Different people, same parts"
        text="You need a React project and some coding knowledge, or an AI coding assistant to help. It is not a drag-and-drop website builder."
      />

      <div ref={ref} className="mt-12 grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,1fr)] md:gap-0">
        <ul className="grid gap-2 md:gap-0 md:[grid-template-rows:repeat(6,4.5rem)]">
          {PEOPLE.map((item, index) => (
            <li key={item.label} className="flex items-center">
              <button
                type="button"
                onClick={() => select(index)}
                aria-pressed={index === active}
                className={`min-h-12 w-full rounded-lg border px-4 py-2.5 text-left text-sm font-semibold transition-colors duration-200 ${
                  index === active
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border text-secondary hover:border-primary/50"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <svg
          aria-hidden="true"
          viewBox="0 0 300 600"
          preserveAspectRatio="none"
          fill="none"
          className="hidden h-[27rem] w-full self-start md:block"
        >
          {PEOPLE.flatMap((item, from) =>
            item.builds.map((to) => (
              <path
                key={`${from}-${to}`}
                d={wire(from, to)}
                stroke={from === active ? "var(--primary)" : "var(--border)"}
                strokeOpacity={from === active ? 0.4 : 1}
                strokeWidth="1.5"
                className="transition-[stroke] duration-300"
              />
            )),
          )}
          {person.builds.map((to) => (
            <path
              key={`${active}-${to}`}
              d={wire(active, to)}
              pathLength={1}
              stroke="var(--primary)"
              strokeWidth="3"
              strokeLinecap="round"
              className="nx-comet"
            />
          ))}
        </svg>

        <ul className="grid grid-cols-2 gap-2 md:grid-cols-1 md:gap-0 md:[grid-template-rows:repeat(6,4.5rem)]">
          {OUTCOMES.map((outcome, index) => (
            <li key={outcome.label} className="flex items-center">
              <Link
                href={outcome.href}
                className={`flex min-h-12 w-full items-center rounded-lg border px-4 py-2 text-sm transition-colors duration-200 hover:border-primary ${
                  person.builds.includes(index)
                    ? "border-primary/60 bg-card text-foreground"
                    : "border-border text-muted-foreground"
                }`}
              >
                {outcome.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <p className="mx-auto mt-8 min-h-14 max-w-2xl text-center text-lg text-secondary" aria-live="off">
        {person.note}
      </p>
    </section>
  );
}
