"use client";

import { useCallback, useEffect, useState } from "react";
import { useMotionPreference, useMotionStill } from "./MotionPreference";

/**
 * Steps through 0..count-1 on a timer and loops. Holds still while paused,
 * under reduced motion, or when `inView` is false.
 *
 * reducedStage: stage to open on under reduced motion. Use the last stage for
 *               a build-up story, so visitors see the finished result.
 * stopOnSelect: stop looping for good once the visitor makes a choice.
 */
export function useLoopingStages({
  count,
  durationMs,
  lastHoldMs = 0,
  inView = true,
  reducedStage = 0,
  stopOnSelect = false,
}) {
  const { reduced } = useMotionPreference();
  const still = useMotionStill();
  const [chosen, setChosen] = useState(null);
  const [stopped, setStopped] = useState(false);
  const stage = chosen ?? (reduced ? reducedStage : 0);

  useEffect(() => {
    if (still || !inView || stopped) return undefined;

    const isLast = stage === count - 1;
    const timer = setTimeout(
      () => setChosen((stage + 1) % count),
      isLast ? durationMs + lastHoldMs : durationMs,
    );
    return () => clearTimeout(timer);
  }, [stage, count, durationMs, lastHoldMs, still, inView, stopped]);

  const select = useCallback(
    (index) => {
      setChosen(index);
      if (stopOnSelect) setStopped(true);
    },
    [stopOnSelect],
  );

  return { stage, select };
}
