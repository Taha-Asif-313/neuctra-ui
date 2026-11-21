"use client";

import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../../lib/cn";

/** One heading entry in a TableOfContents. */
export interface TocHeading {
  /** Id of the heading element this entry links to. */
  id: string;
  /** Visible text for the link. */
  text: string;
  /** Heading depth; controls indentation. */
  level: number;
}

export interface TableOfContentsProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Ordered list of headings to show. */
  headings: TocHeading[];
  /** Id of the active heading. When omitted, the active entry follows the scroll position. */
  activeId?: string;
  /** Called when an entry is clicked, before scrolling. */
  onHeadingClick?: (id: string) => void;
  /** Called when the scroll-tracked active heading changes. */
  onActiveChange?: (id: string) => void;
  /** Pixel offset kept above the target when scrolling (e.g. a sticky header height). */
  offsetTop?: number;
  /** Heading above the list; pass null to hide it. */
  title?: React.ReactNode;
  /** Sticks the nav to the top of its scroll container. */
  sticky?: boolean;
  /** Text scale of the entries. */
  size?: "sm" | "md";
  /** Accessible label for the navigation landmark. */
  ariaLabel?: string;
  /** Additional classes for the nav element. */
  className?: string;
  /** Inline styles for the nav element. */
  style?: React.CSSProperties;
  /** Styles the title. */
  titleClassName?: string;
  /** Styles the list element. */
  listClassName?: string;
  /** Styles every link. */
  linkClassName?: string;
  /** Styles the active link (applied after `linkClassName`). */
  activeLinkClassName?: string;
}

const sizeConfig = {
  sm: { link: "py-1 text-xs", title: "mb-2 text-xs" },
  md: { link: "py-1.5 text-sm", title: "mb-3 text-xs" },
} as const;

const INDENT = ["pl-3", "pl-6", "pl-9", "pl-12"] as const;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export const TableOfContents = forwardRef<HTMLElement, TableOfContentsProps>(
  function TableOfContents(
    {
      headings,
      activeId,
      onHeadingClick,
      onActiveChange,
      offsetTop = 24,
      title = "On this page",
      sticky = true,
      size = "md",
      ariaLabel = "On this page",
      className,
      style,
      titleClassName,
      listClassName,
      linkClassName,
      activeLinkClassName,
      ...rest
    },
    ref,
  ) {
    const [spyId, setSpyId] = useState<string | undefined>(headings[0]?.id);
    const current = activeId ?? spyId;
    const sizes = sizeConfig[size] ?? sizeConfig.md;

    const onActiveChangeRef = useRef(onActiveChange);
    onActiveChangeRef.current = onActiveChange;

    const baseLevel = useMemo(
      () =>
        headings.length
          ? Math.min(...headings.map((heading) => heading.level))
          : 1,
      [headings],
    );

    const idsKey = headings.map((heading) => heading.id).join("|");

    // Scroll spy: the active heading is the last one whose top has passed the
    // offset line. Only runs in uncontrolled mode.
    useEffect(() => {
      if (activeId !== undefined || !idsKey) return;
      const ids = idsKey.split("|");
      let frame = 0;
      let last: string | undefined;

      const update = () => {
        frame = 0;
        let next = ids[0];
        const atBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 2;
        if (atBottom) {
          next = ids[ids.length - 1];
        } else {
          for (const id of ids) {
            const el = document.getElementById(id);
            if (!el) continue;
            if (el.getBoundingClientRect().top - offsetTop <= 8) next = id;
            else break;
          }
        }
        if (next !== last) {
          last = next;
          setSpyId(next);
          onActiveChangeRef.current?.(next);
        }
      };
      const schedule = () => {
        if (!frame) frame = requestAnimationFrame(update);
      };

      update();
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      return () => {
        if (frame) cancelAnimationFrame(frame);
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
      };
    }, [activeId, idsKey, offsetTop]);

    const handleClick = (id: string) => {
      onHeadingClick?.(id);
      const target = document.getElementById(id);
      if (!target) return;
      if (activeId === undefined) setSpyId(id);
      const top =
        target.getBoundingClientRect().top + window.scrollY - offsetTop;
      window.scrollTo({
        top,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
      window.history?.replaceState?.(null, "", `#${id}`);
      // Move focus with the scroll so keyboard and screen reader users land
      // on the section, not back at the top of the nav.
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        style={style}
        className={cn(sticky && "sticky top-6", "text-sm", className)}
        {...rest}
      >
        {title != null && title !== false && (
          <p
            className={cn(
              "font-semibold uppercase tracking-wide text-muted-foreground",
              sizes.title,
              titleClassName,
            )}
          >
            {title}
          </p>
        )}
        <ul className={cn("border-l border-border", listClassName)}>
          {headings.map((heading) => {
            const isActive = heading.id === current;
            const depth = Math.min(
              INDENT.length - 1,
              Math.max(0, heading.level - baseLevel),
            );
            return (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  aria-current={isActive ? "location" : undefined}
                  onClick={(event) => {
                    if (
                      event.metaKey ||
                      event.ctrlKey ||
                      event.shiftKey ||
                      event.button !== 0
                    )
                      return;
                    event.preventDefault();
                    handleClick(heading.id);
                  }}
                  className={cn(
                    "-ml-px block border-l-2 pr-2 transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                    sizes.link,
                    INDENT[depth],
                    isActive
                      ? "border-primary font-medium text-primary"
                      : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
                    linkClassName,
                    isActive && activeLinkClassName,
                  )}
                >
                  <span className="line-clamp-2">{heading.text}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  },
);

TableOfContents.displayName = "TableOfContents";
