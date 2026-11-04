"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useMotionStill } from "./MotionPreference";

/**
 * Renders the real number by default, then counts up to it once when seen.
 * Starting from the real value means the static HTML is never wrong.
 */
export default function CountUp({ value, durationMs = 1200 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const still = useMotionStill();
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!inView || still) return undefined;

    let frame;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / durationMs);
      setShown(Math.round(value * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
    // Runs once, the first time the number scrolls into view.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return <span ref={ref}>{shown}</span>;
}
