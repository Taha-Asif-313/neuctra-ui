"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/*
 * Keeps Tab focus inside `containerRef` while `active`, moves focus into the
 * container on open, and returns it to whatever was focused before on close.
 *
 * Without this, Tab from inside a dialog walks straight out into the page
 * behind the overlay — the content is visually covered but still reachable.
 */
export const useFocusTrap = (
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
) => {
  useEffect(() => {
    if (!active) return;

    const container = containerRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusFirst = () => {
      const node = containerRef.current;
      if (!node) return;
      const target =
        node.querySelector<HTMLElement>(FOCUSABLE) ??
        // Nothing focusable inside: focus the container itself so the dialog
        // is at least the starting point for the next Tab.
        node;
      target.focus?.();
    };

    const frame = requestAnimationFrame(focusFirst);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const node = containerRef.current;
      if (!node) return;

      const focusable = Array.from(
        node.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);

      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeEl = document.activeElement;

      if (e.shiftKey && (activeEl === first || !node.contains(activeEl))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && activeEl === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
      // Only restore if focus is still somewhere inside the closing dialog —
      // otherwise we'd steal it from wherever the user has since moved.
      if (!container || container.contains(document.activeElement)) {
        previouslyFocused?.focus?.();
      }
    };
  }, [active, containerRef]);
};
