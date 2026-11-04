"use client";

import { useMotionValue, useScroll, useTransform } from "framer-motion";
import { useMotionPreference } from "@/components/patterns/MotionPreference";

/**
 * Scroll progress for one section. Under reduced motion it is fixed at 1, so
 * every scrubbed diagram simply shows its finished state.
 */
export function useScrub(target, offset) {
  const { reduced } = useMotionPreference();
  const finished = useMotionValue(1);
  const { scrollYProgress } = useScroll({ target, offset });
  // Passing the value through a function keeps it on the main thread. Without
  // this, Framer hands opacity to a native scroll timeline that ignores
  // `offset`, so scrubbed fades fall out of step with everything else.
  const live = useTransform(scrollYProgress, (value) => value);

  return { progress: reduced ? finished : live, reduced };
}
