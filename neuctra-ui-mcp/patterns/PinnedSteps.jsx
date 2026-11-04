"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Check } from "lucide-react";

/**
 * Desktop: pins while scroll moves through the steps and swaps the visual.
 * Below lg: a normal stacked list, because pinning fights touch scrolling.
 *
 * steps:     [{ number, title, subtitle, desc, icon, Visual }]
 * heading:   node shown above the steps
 * vhPerStep: scroll distance per step
 */
export default function PinnedSteps({ steps, heading, vhPerStep = 93 }) {
  const pinRef = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActive(Math.min(steps.length - 1, Math.floor(value * steps.length)));
  });

  const ActiveVisual = steps[active].Visual;

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        ref={pinRef}
        className="hidden lg:block"
        style={{ height: `${steps.length * vhPerStep}vh` }}
      >
        <div className="sticky top-16 grid h-[calc(100vh-4rem)] grid-cols-2 items-center gap-16">
          <div>
            {heading}

            <ol className="relative mt-8">
              <span className="absolute bottom-6 left-[1.1875rem] top-6 w-px bg-border" />
              <motion.span
                style={{ scaleY: scrollYProgress, originY: 0 }}
                className="absolute bottom-6 left-[1.1875rem] top-6 w-px bg-primary"
              />
              {steps.map((step, index) => (
                <StepRow
                  key={step.number}
                  step={step}
                  isActive={index === active}
                  isDone={index < active}
                />
              ))}
            </ol>
          </div>

          <VisualFrame number={steps[active].number}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -24, scale: 0.97 }}
                transition={{ duration: 0.3 }}
              >
                <ActiveVisual />
              </motion.div>
            </AnimatePresence>
          </VisualFrame>
        </div>
      </div>

      <div className="py-24 lg:hidden">
        {heading}
        <ol className="mt-10 flex flex-col gap-10">
          {steps.map((step) => (
            <motion.li
              key={step.number}
              data-reveal
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <ol>
                <StepRow step={step} isActive isDone={false} />
              </ol>
              <VisualFrame number={step.number} className="mt-4 h-72">
                <div className="absolute inset-0">
                  <step.Visual />
                </div>
              </VisualFrame>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function StepRow({ step, isActive, isDone }) {
  const Icon = step.icon;

  return (
    <li className="relative flex gap-4 py-2.5">
      <span
        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-background transition-colors duration-300 ${
          isActive || isDone
            ? "border-primary text-primary"
            : "border-border text-muted-foreground"
        }`}
      >
        {isDone ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-primary">{step.subtitle}</p>
        <h3
          className={`text-xl font-semibold tracking-tight transition-colors duration-300 ${
            isActive ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {step.title}
        </h3>
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ${
            isActive
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <p className="overflow-hidden text-sm text-secondary">{step.desc}</p>
        </div>
      </div>
    </li>
  );
}

function VisualFrame({ number, className = "h-[26rem]", children }) {
  return (
    <div
      aria-hidden="true"
      className={`nx-frame relative overflow-hidden rounded-3xl border border-border bg-card ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <span className="absolute right-5 top-4 z-10 font-mono text-sm text-muted-foreground">
        {number}
      </span>
      {children}
    </div>
  );
}
