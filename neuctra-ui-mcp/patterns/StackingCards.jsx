"use client";

import { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { useScrub } from "./useScrub";

const OFFSET = ["start start", "end end"];

/**
 * Cards stick near the top and stack as the visitor scrolls. Each earlier card
 * shrinks and dims as the next one slides over it, so the page reads as a deck
 * being dealt. Sticky, not pinned, so it also works on touch screens.
 *
 * heading: node shown above the deck
 * cards:   [{ id, eyebrow, title, desc, Visual }]
 *          Visual is a component that shows that card's result working.
 */
export default function StackingCards({ heading, cards }) {
  const ref = useRef(null);
  const { progress, reduced } = useScrub(ref, OFFSET);

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      {heading}
      <div ref={ref} className="mt-12">
        {cards.map((card, index) => (
          <DeckCard
            key={card.id}
            card={card}
            index={index}
            count={cards.length}
            progress={progress}
            still={reduced}
          />
        ))}
      </div>
    </section>
  );
}

function DeckCard({ card, index, count, progress, still }) {
  const isLast = index === count - 1;
  // Each card starts shrinking when the next one begins to cover it.
  const start = Math.min(1, (index + 1) / count);
  const target = 1 - (count - 1 - index) * 0.04;
  const scale = useTransform(progress, [start, 1], [1, still ? 1 : target]);
  const shade = useTransform(
    progress,
    [start, 1],
    [0, still ? 0 : Math.min(0.5, (count - 1 - index) * 0.14)],
  );
  const Visual = card.Visual;

  // Every card is a direct child of the same container, so each one stays
  // stuck until the container ends and they pile up. The bottom margin is the
  // scroll distance before the next card arrives.
  return (
    <motion.article
      style={{ scale, top: `calc(5.5rem + ${index * 1.25}rem)`, originY: 0 }}
      className={`relative grid overflow-hidden rounded-3xl border border-border bg-card lg:sticky lg:min-h-[28rem] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] ${
        isLast ? "" : "mb-8 lg:mb-[35vh]"
      }`}
    >
      <div className="flex flex-col justify-center p-6 sm:p-10">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
          {String(index + 1).padStart(2, "0")} · {card.eyebrow}
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {card.title}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-6 text-secondary sm:text-base">
          {card.desc}
        </p>
      </div>
      <div
        aria-hidden="true"
        inert
        className="relative min-h-64 border-t border-border bg-background lg:border-l lg:border-t-0"
      >
        <Visual />
      </div>
      {/* Dims the card as the next one covers it. */}
      <motion.span
        aria-hidden="true"
        style={{ opacity: shade }}
        className="pointer-events-none absolute inset-0 bg-background"
      />
    </motion.article>
  );
}
