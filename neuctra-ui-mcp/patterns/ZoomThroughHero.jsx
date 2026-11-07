"use client";

import { useRef, useSyncExternalStore } from "react";
import { motion, useTransform } from "framer-motion";
import { useScrub } from "./useScrub";

const OFFSET = ["start start", "end end"];
const DESKTOP_QUERY = "(min-width: 1024px)";
// Scroll share spent flying in. The rest holds the full screen still.
const ARRIVED = 0.65;

function subscribeDesktop(listener) {
  const query = window.matchMedia(DESKTOP_QUERY);
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
}

/** False on the server, so the static HTML is the simple stacked layout. */
function useIsDesktop() {
  return useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  );
}

/**
 * The camera flies into the product. The headline sits above a small product
 * screen; on scroll the headline lifts away and the screen grows until it
 * fills the view, ready to use. Pinned on desktop only. Phones, reduced motion,
 * and the static HTML get a normal hero with the screen below the headline.
 *
 * eyebrow, title, lead: hero copy. Keep the title a real H1 string or node.
 * actions:  buttons or links under the lead
 * caption:  short note shown once the screen has arrived, such as
 *           "Real components with sample data"
 * children: the product screen, built from real components
 */
export default function ZoomThroughHero({
  eyebrow,
  title,
  lead,
  actions,
  caption,
  children,
}) {
  const ref = useRef(null);
  const isDesktop = useIsDesktop();
  const { progress, reduced } = useScrub(ref, OFFSET);
  const pinned = isDesktop && !reduced;

  const scale = useTransform(progress, [0, ARRIVED], [0.62, 1]);
  // Starts low enough to clear the headline and buttons on a laptop screen.
  // Raise it if the copy is longer.
  const y = useTransform(progress, [0, ARRIVED], ["54%", "0%"]);
  const radius = useTransform(progress, [0, ARRIVED], [28, 16]);
  const copyOpacity = useTransform(progress, [0, ARRIVED * 0.55], [1, 0]);
  const copyY = useTransform(progress, [0, ARRIVED * 0.55], [0, -60]);
  const captionOpacity = useTransform(progress, [ARRIVED, Math.min(1, ARRIVED + 0.1)], [0, 1]);

  const copy = (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </p>
      )}
      <h1 className="mt-4 text-4xl font-bold leading-[1.06] tracking-tight text-foreground sm:text-5xl xl:text-6xl">
        {title}
      </h1>
      {lead && (
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-secondary sm:text-lg">
          {lead}
        </p>
      )}
      {actions && (
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {actions}
        </div>
      )}
    </div>
  );

  if (!pinned) {
    return (
      <section
        ref={ref}
        className="relative overflow-x-clip px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-36"
      >
        {copy}
        <div className="mx-auto mt-14 max-w-6xl overflow-hidden rounded-2xl border border-border bg-card">
          {children}
        </div>
        {caption && (
          <p className="mt-4 text-center text-xs text-muted-foreground">{caption}</p>
        )}
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[260vh] overflow-x-clip">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-hidden px-8">
        <motion.div
          style={{ opacity: copyOpacity, y: copyY }}
          className="absolute inset-x-8 top-[9vh] z-0"
        >
          {copy}
        </motion.div>

        <motion.div
          style={{ scale, y, borderRadius: radius, originY: 0 }}
          className="absolute inset-x-8 bottom-6 top-6 z-10 overflow-hidden border border-border bg-card"
        >
          {children}
        </motion.div>

        {caption && (
          <motion.p
            style={{ opacity: captionOpacity }}
            className="absolute inset-x-0 bottom-0 z-20 text-center text-xs text-muted-foreground"
          >
            {caption}
          </motion.p>
        )}
      </div>
    </section>
  );
}
