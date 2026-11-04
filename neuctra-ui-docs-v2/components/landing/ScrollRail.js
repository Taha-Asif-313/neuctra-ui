"use client";

import { motion, useScroll } from "framer-motion";

const STOPS = [
  { href: "#assemble", label: "Assemble" },
  { href: "#untangle", label: "Why" },
  { href: "#pipeline", label: "How" },
  { href: "#try", label: "Try it" },
  { href: "#who", label: "Who" },
  { href: "#start", label: "Start" },
];

/** The wire that runs down the whole page, filled by scroll. */
export default function ScrollRail() {
  const { scrollYProgress } = useScroll();

  return (
    <nav
      aria-label="Page sections"
      className="fixed left-5 top-1/2 z-40 hidden h-72 -translate-y-1/2 2xl:block"
    >
      <span className="absolute inset-y-0 left-[5px] w-px bg-border" />
      <motion.span
        style={{ scaleY: scrollYProgress, originY: 0 }}
        className="absolute inset-y-0 left-[5px] w-px bg-primary"
      />
      <ol className="relative flex h-full flex-col justify-between">
        {STOPS.map((stop) => (
          <li key={stop.href}>
            <a
              href={stop.href}
              className="group flex items-center gap-3 text-xs text-muted-foreground hover:text-primary"
            >
              <span className="h-[11px] w-[11px] rounded-full border border-border bg-background transition-colors duration-200 group-hover:border-primary" />
              {stop.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
