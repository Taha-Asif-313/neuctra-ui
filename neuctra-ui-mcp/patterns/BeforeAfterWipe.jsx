"use client";

import { useId, useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { useScrub } from "./useScrub";

const OFFSET = ["start 85%", "end 35%"];
// Where the divider sits at the start and end of the scroll, in percent.
const FROM = 88;
const TO = 12;

/**
 * Shows the same thing before and after the product, split by a divider.
 * Scroll sweeps the divider across. Once the visitor drags it or uses the
 * arrow keys, scrolling stops moving it, so they stay in control.
 *
 * heading:     node shown above
 * before:      node showing the problem state (left side)
 * after:       node showing the same content solved (right side)
 * beforeLabel, afterLabel: short honest labels such as "By hand" / "With Acme"
 * summary:     one sentence describing the difference, for screen readers
 *              and for anyone who never moves the divider
 */
export default function BeforeAfterWipe({
  heading,
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  summary,
}) {
  const ref = useRef(null);
  const touched = useRef(false);
  const inputId = useId();
  const { progress } = useScrub(ref, OFFSET);
  const position = useMotionValue(FROM);
  const scrolled = useTransform(progress, [0, 1], [FROM, TO]);

  useMotionValueEvent(scrolled, "change", (value) => {
    if (!touched.current) position.set(value);
  });

  const clipPath = useTransform(position, (value) => `inset(0 0 0 ${value}%)`);
  const left = useTransform(position, (value) => `${value}%`);

  return (
    <section
      ref={ref}
      className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      {heading}

      {/* The input is invisible, so the frame shows its keyboard focus. */}
      <div className="relative mt-12 overflow-hidden rounded-3xl border border-border bg-card has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-primary">
        <div aria-hidden="true" inert className="relative">
          <div className="relative">{before}</div>
          <motion.div style={{ clipPath }} className="absolute inset-0 bg-card">
            {after}
          </motion.div>

          <span className="absolute left-4 top-4 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-secondary">
            {beforeLabel}
          </span>
          <span className="absolute right-4 top-4 rounded-full border border-primary bg-background px-3 py-1 text-xs font-medium text-primary">
            {afterLabel}
          </span>

          <motion.div
            style={{ left }}
            className="absolute inset-y-0 w-px -translate-x-1/2 bg-primary"
          >
            <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary bg-background font-mono text-xs text-primary">
              ⇆
            </span>
          </motion.div>
        </div>

        {/* A real range input on top: drag anywhere, or focus and use arrows. */}
        <label htmlFor={inputId} className="sr-only">
          Compare {beforeLabel} and {afterLabel}
        </label>
        <input
          id={inputId}
          type="range"
          min={0}
          max={100}
          defaultValue={FROM}
          onChange={(event) => {
            touched.current = true;
            position.set(Number(event.target.value));
          }}
          // pan-y keeps vertical swipes scrolling the page on touch screens.
          className="absolute inset-0 h-full w-full cursor-ew-resize touch-pan-y opacity-0"
        />
      </div>

      {summary && (
        <p className="mt-4 text-center text-sm text-muted-foreground">{summary}</p>
      )}
    </section>
  );
}
