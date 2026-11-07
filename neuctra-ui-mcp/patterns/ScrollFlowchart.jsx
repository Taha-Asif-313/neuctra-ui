"use client";

import { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { useScrub } from "./useScrub";

// Runs forward on any height: the end reaches 50% only after the start has
// passed 80%, so short stages still fill.
const OFFSET = ["start 80%", "end 50%"];

/**
 * A workflow drawn by scroll. One line runs down the page, lights each stage
 * as it arrives, splits into parallel branches, and joins again. Not pinned,
 * so it scrolls naturally on touch screens.
 *
 * heading: node shown above the flow
 * stages:  [{ id, label, title, desc, icon, branches?: [{ title, desc }] }]
 *          label is a short tag such as "Trigger" or "Step 2".
 *          branches renders work that happens in parallel at that stage.
 */
export default function ScrollFlowchart({ heading, stages }) {
  return (
    <section className="relative mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      {heading}
      <ol className="mt-14">
        {stages.map((stage, index) => (
          <Stage
            key={stage.id}
            stage={stage}
            isLast={index === stages.length - 1}
          />
        ))}
      </ol>
    </section>
  );
}

function Stage({ stage, isLast }) {
  const ref = useRef(null);
  const { progress } = useScrub(ref, OFFSET);
  const lit = useTransform(progress, [0, 0.12], [0, 1]);
  const fill = useTransform(progress, [0.12, 1], [0, 1]);
  const headTop = useTransform(fill, (value) => `${value * 100}%`);
  const headOpacity = useTransform(fill, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);
  const Icon = stage.icon;

  return (
    <li
      ref={ref}
      className="relative grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-5 sm:gap-x-8"
    >
      <div aria-hidden="true" className="relative flex flex-col items-center">
        <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground">
          <Icon className="h-4 w-4" />
          <motion.span
            style={{ opacity: lit }}
            className="absolute inset-[-1px] flex items-center justify-center rounded-full border border-primary bg-background text-primary"
          >
            <span className="absolute inset-0 rounded-full bg-primary/10" />
            <Icon className="relative h-4 w-4" />
          </motion.span>
        </span>

        {!isLast && (
          <span className="relative mt-1 w-px flex-1 bg-border">
            <motion.span
              style={{ scaleY: fill, originY: 0 }}
              className="absolute inset-0 bg-primary"
            />
            {/* The packet travelling down the line. */}
            <motion.span
              style={{ top: headTop, opacity: headOpacity }}
              className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-4 ring-primary/20"
            />
          </span>
        )}
      </div>

      <div className={isLast ? "pb-2" : "pb-16"}>
        <p className="pt-2.5 font-mono text-xs uppercase tracking-[0.16em] text-primary">
          {stage.label}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {stage.title}
        </h3>
        <p className="mt-2 max-w-xl text-sm leading-6 text-secondary sm:text-base">
          {stage.desc}
        </p>
        {stage.branches?.length > 0 && (
          <Branches branches={stage.branches} progress={progress} />
        )}
      </div>
    </li>
  );
}

/** A bar travels across the top and drops into each parallel branch. */
function Branches({ branches, progress }) {
  const count = branches.length;
  const bar = useTransform(progress, [0.2, 0.6], [0, 1]);
  // The bar runs from the left edge to the centre of the last branch.
  const reach = 1 - 0.5 / count;

  return (
    <div className="mt-6">
      <div aria-hidden="true" className="relative hidden h-6 sm:block">
        <span
          className="absolute left-0 top-0 h-px bg-border"
          style={{ right: `${50 / count}%` }}
        />
        <motion.span
          style={{ scaleX: bar, originX: 0, right: `${50 / count}%` }}
          className="absolute left-0 top-0 h-px bg-primary"
        />
      </div>
      <ul
        className="grid gap-3 sm:[grid-template-columns:var(--cols)]"
        style={{ "--cols": `repeat(${count}, minmax(0, 1fr))` }}
      >
        {branches.map((branch, index) => (
          <Branch
            key={branch.title}
            branch={branch}
            bar={bar}
            // Where this branch's centre sits along the bar, from 0 to 1.
            at={(index + 0.5) / count / reach}
          />
        ))}
      </ul>
    </div>
  );
}

function Branch({ branch, bar, at }) {
  const from = Math.max(0, Math.min(1, at) - 0.08);
  const on = useTransform(bar, [from, Math.min(1, at)], [0, 1]);

  return (
    <li className="relative rounded-2xl border border-border bg-card p-4">
      <motion.span
        aria-hidden="true"
        style={{ opacity: on }}
        className="pointer-events-none absolute inset-[-1px] rounded-2xl border border-primary"
      />
      {/* The drop from the bar into this branch, at the card's centre. */}
      <motion.span
        aria-hidden="true"
        style={{ opacity: on }}
        className="absolute -top-6 left-1/2 hidden h-6 w-px -translate-x-1/2 bg-primary sm:block"
      />
      <p className="text-sm font-semibold text-foreground">{branch.title}</p>
      <p className="mt-1 text-sm leading-6 text-secondary">{branch.desc}</p>
    </li>
  );
}
