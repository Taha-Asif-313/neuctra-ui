"use client";

import { useEffect } from "react";

/*
 * Reference-counted body scroll lock, shared by every overlay in the library.
 *
 * A naive per-component implementation ("save the current overflow, restore it
 * on unmount") corrupts itself as soon as two overlays are open at once: the
 * second one saves `overflow: hidden` as the value to restore, so closing both
 * leaves the page permanently unscrollable. Counting locks fixes that — the
 * original value is captured once, by the first locker, and restored once, by
 * the last.
 */
let lockCount = 0;
let previousOverflow = "";
let previousPaddingRight = "";

const lock = () => {
  if (typeof document === "undefined") return;

  if (lockCount === 0) {
    const { body, documentElement } = document;
    previousOverflow = body.style.overflow;
    previousPaddingRight = body.style.paddingRight;

    // Removing the scrollbar reflows the page; pad by its width so the content
    // behind the overlay doesn't visibly jump.
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      const current = parseFloat(getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${current + scrollbarWidth}px`;
    }

    body.style.overflow = "hidden";
  }
  lockCount += 1;
};

const unlock = () => {
  if (typeof document === "undefined") return;

  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = previousOverflow;
    document.body.style.paddingRight = previousPaddingRight;
  }
};

/** Locks body scroll while `active` is true. */
export const useScrollLock = (active: boolean) => {
  useEffect(() => {
    if (!active) return;
    lock();
    return unlock;
  }, [active]);
};
