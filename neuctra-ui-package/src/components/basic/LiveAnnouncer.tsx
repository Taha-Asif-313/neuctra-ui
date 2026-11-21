"use client";

import React, { forwardRef, useEffect, useState } from "react";

import { cn } from "../../lib/cn";

export interface LiveAnnouncerProps {
  /** Message (or nodes) announced to assistive technology. Change it to announce something new. */
  children?: React.ReactNode;
  /** Urgency of the announcement: "polite" waits for the user to be idle, "assertive" interrupts. */
  politeness?: "polite" | "assertive";
  /** Announce the whole region on each update instead of only changed nodes. */
  atomic?: boolean;
  /** Which kinds of changes are announced. */
  relevant?: "additions" | "removals" | "text" | "all" | "additions text";
  /** Delay in ms before new content is written into the region (lets screen readers register an empty region first). */
  delay?: number;
  /** Clears the region this many ms after announcing, so the same message can be announced again later. */
  clearAfter?: number;
  /** Renders the region visibly instead of screen-reader only (e.g. for a visible status line). */
  visible?: boolean;
  /** Additional classes merged onto the region. */
  className?: string;
  /** Inline styles for the live region. */
  style?: React.CSSProperties;
}

/**
 * A live region that reliably announces changing content to screen readers.
 *
 * The region always mounts empty and writes the message after `delay`, because
 * most screen readers ignore content that is present when a live region first
 * appears in the DOM.
 */
export const LiveAnnouncer = forwardRef<HTMLDivElement, LiveAnnouncerProps>(
  function LiveAnnouncer(
    {
      children,
      politeness = "polite",
      atomic = true,
      relevant,
      delay = 100,
      clearAfter,
      visible = false,
      className,
      style,
    },
    ref,
  ) {
    const [message, setMessage] = useState<React.ReactNode>(null);

    // Primitive messages are compared by value so re-renders with the same
    // string don't restart the timers; element children compare by identity.
    const signature =
      typeof children === "string" || typeof children === "number" ? String(children) : children;

    useEffect(() => {
      const show = setTimeout(() => setMessage(children), delay);
      const clear =
        clearAfter !== undefined
          ? setTimeout(() => setMessage(null), delay + clearAfter)
          : undefined;
      return () => {
        clearTimeout(show);
        if (clear) clearTimeout(clear);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signature, delay, clearAfter]);

    return (
      <div
        ref={ref}
        role={politeness === "assertive" ? "alert" : "status"}
        aria-live={politeness}
        aria-atomic={atomic}
        aria-relevant={relevant}
        className={cn(!visible && "sr-only", className)}
        style={style}
      >
        {message}
      </div>
    );
  },
);
LiveAnnouncer.displayName = "LiveAnnouncer";
