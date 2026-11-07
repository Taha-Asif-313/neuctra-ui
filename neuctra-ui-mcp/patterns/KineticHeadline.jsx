"use client";

import { useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useLoopingStages } from "./useLoopingStages";

/**
 * A hero whose headline changes one word at a time, letter by letter, while a
 * product visual beside it shows that same stage. One stage number drives
 * both, so the words and the picture never disagree. Not pinned.
 *
 * eyebrow:      small label above the headline
 * before/after: fixed headline text around the changing word
 * phrases:      [{ word, caption }] one per stage; caption is the short
 *               line under the visual for that stage
 * lead, actions: hero copy and buttons
 * renderVisual: (stage) => node, the product at that stage, built from real
 *               components with labelled sample data
 * durationMs:   time per stage
 */
export default function KineticHeadline({
  eyebrow,
  before,
  after,
  phrases,
  lead,
  actions,
  renderVisual,
  durationMs = 3200,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });
  const { stage, select } = useLoopingStages({
    count: phrases.length,
    durationMs,
    lastHoldMs: 1600,
    inView,
    // Reduced motion opens on the finished result.
    reducedStage: phrases.length - 1,
  });
  const longest = phrases.reduce(
    (best, phrase) => (phrase.word.length > best.length ? phrase.word : best),
    "",
  );

  return (
    <section
      ref={ref}
      className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-28 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:px-8 lg:pt-36"
    >
      <div>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl xl:text-6xl">
          {/* Screen readers get one stable sentence instead of a moving word. */}
          <span className="sr-only">
            {before} {phrases.map((phrase) => phrase.word).join(", ")} {after}
          </span>
          <span aria-hidden="true">
            {before}{" "}
            <span className="relative inline-grid align-bottom">
              {/* The longest word, invisible, reserves the width. */}
              <span className="invisible col-start-1 row-start-1">{longest}</span>
              <span className="col-start-1 row-start-1 overflow-hidden text-primary">
                <AnimatePresence mode="wait" initial={false}>
                  <Word key={phrases[stage].word} text={phrases[stage].word} />
                </AnimatePresence>
              </span>
            </span>{" "}
            {after}
          </span>
        </h1>
        {lead && (
          <p className="mt-5 max-w-xl text-base leading-7 text-secondary sm:text-lg">
            {lead}
          </p>
        )}
        {actions && (
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">{actions}</div>
        )}

        {/* Stage dots double as controls. */}
        <div className="mt-10 flex items-center gap-2">
          {phrases.map((phrase, index) => (
            <button
              key={phrase.word}
              type="button"
              onClick={() => select(index)}
              aria-label={`Show ${phrase.word}`}
              aria-pressed={index === stage}
              className="flex h-11 items-center px-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  index === stage ? "w-8 bg-primary" : "w-3 bg-border"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <div
          aria-hidden="true"
          inert
          className="relative min-h-80 overflow-hidden rounded-3xl border border-border bg-card"
        >
          {renderVisual(stage)}
        </div>
        {/* Not a live region: it changes every few seconds. */}
        <p className="mt-3 text-center text-xs text-muted-foreground">
          {phrases[stage].caption}
        </p>
      </div>
    </section>
  );
}

const letter = {
  hidden: { y: "100%" },
  shown: { y: "0%" },
  gone: { y: "-100%" },
};

function Word({ text }) {
  return (
    <motion.span
      className="inline-flex"
      initial="hidden"
      animate="shown"
      exit="gone"
      transition={{ staggerChildren: 0.03 }}
    >
      {[...text].map((character, index) => (
        <motion.span
          key={`${character}-${index}`}
          variants={letter}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
          className="inline-block whitespace-pre"
        >
          {character}
        </motion.span>
      ))}
    </motion.span>
  );
}
