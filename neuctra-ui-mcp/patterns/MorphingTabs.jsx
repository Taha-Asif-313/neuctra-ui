"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useLoopingStages } from "./useLoopingStages";
import { useMotionStill } from "./MotionPreference";

/**
 * Feature tabs that run themselves. The active marker slides between tabs,
 * a thin bar shows time left on the current one, and the demo slides in from
 * the side of the tab that was chosen. It stops looping for good once the
 * visitor picks a tab.
 *
 * heading:    node shown above
 * features:   [{ id, label, title, desc, Demo }]
 *             Demo is a component that shows the feature working.
 * durationMs: time on each tab while it loops
 */
export default function MorphingTabs({ heading, features, durationMs = 5200 }) {
  const ref = useRef(null);
  const marker = useId();
  const inView = useInView(ref, { amount: 0.4 });
  const still = useMotionStill();
  const { stage, select } = useLoopingStages({
    count: features.length,
    durationMs,
    inView,
    stopOnSelect: true,
  });
  // Adjusting state during render is React's pattern for tracking a previous value.
  const [previous, setPrevious] = useState(stage);
  const [direction, setDirection] = useState(1);
  if (stage !== previous) {
    setDirection(stage > previous ? 1 : -1);
    setPrevious(stage);
  }
  const active = features[stage];
  const Demo = active.Demo;

  const moveFocus = (event, index) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (index + step + features.length) % features.length;
    select(next);
    event.currentTarget.parentElement.children[next]?.focus();
  };

  return (
    <section
      ref={ref}
      className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      {heading}

      <div
        role="tablist"
        aria-label="Features"
        className="mt-10 flex gap-1 overflow-x-auto rounded-2xl border border-border bg-card p-1"
      >
        {features.map((feature, index) => {
          const isActive = index === stage;
          return (
            <button
              key={feature.id}
              type="button"
              role="tab"
              id={`${marker}-tab-${index}`}
              aria-selected={isActive}
              aria-controls={`${marker}-panel`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={(event) => moveFocus(event, index)}
              className={`relative min-h-11 flex-1 whitespace-nowrap rounded-xl px-4 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId={marker}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute inset-0 overflow-hidden rounded-xl bg-background"
                >
                  {!still && (
                    <motion.span
                      key={stage}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: durationMs / 1000, ease: "linear" }}
                      style={{ originX: 0 }}
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-primary"
                    />
                  )}
                </motion.span>
              )}
              <span className="relative">{feature.label}</span>
            </button>
          );
        })}
      </div>

      <div
        id={`${marker}-panel`}
        role="tabpanel"
        aria-labelledby={`${marker}-tab-${stage}`}
        className="relative mt-4 grid overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"
      >
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={active.id}
            custom={direction}
            variants={{
              enter: (dir) => ({ opacity: 0, x: dir * 40 }),
              center: { opacity: 1, x: 0 },
              exit: (dir) => ({ opacity: 0, x: dir * -40 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-full grid lg:grid-cols-subgrid"
          >
            <div className="p-6 sm:p-10">
              <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                {active.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-secondary sm:text-base">
                {active.desc}
              </p>
            </div>
            <div
              aria-hidden="true"
              inert
              className="relative min-h-72 border-t border-border bg-background lg:border-l lg:border-t-0"
            >
              <Demo />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
