"use client";

import React, { forwardRef, useEffect, useId, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "../../lib/cn";
import { useScrollLock } from "../../lib/useScrollLock";
import { useFocusTrap } from "../../lib/useFocusTrap";
import { useControllableState } from "../../lib/useControllableState";
import { IconButton } from "./IconButton";

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Sidebar content, reused in the mobile navigation panel. */
  sidebar: React.ReactNode;
  /** Header content rendered next to the mobile menu button. */
  header?: React.ReactNode;
  /** Page content rendered inside the main landmark. */
  children: React.ReactNode;
  /** Optional content pinned below the main region. */
  footer?: React.ReactNode;
  /** Max-width utility class applied to the header, main, and footer wrappers. */
  maxWidth?: string;
  /** Keeps the header visible while the page scrolls. */
  stickyHeader?: boolean;
  /** Controlled open state of the mobile navigation panel. */
  mobileSidebarOpen?: boolean;
  /** Initial open state of the mobile navigation panel. */
  defaultMobileSidebarOpen?: boolean;
  /** Called whenever the mobile navigation open state changes. */
  onMobileSidebarOpenChange?: (open: boolean) => void;
  /** Id assigned to the main landmark, used as a skip-link target. */
  mainId?: string;
  /**
   * Fits the shell inside its parent instead of the viewport: the root fills
   * the parent's height, the main region scrolls internally, and the mobile
   * panel is positioned absolutely without locking page scroll. Use for
   * embedded previews, split views, or shells inside another layout.
   */
  contained?: boolean;
  /** Heading and accessible name of the mobile navigation panel. */
  mobileNavLabel?: string;
  /** Accessible label of the mobile menu button. */
  menuButtonLabel?: string;
  /** Styles the desktop sidebar column (default width `w-64`). */
  sidebarClassName?: string;
  /** Styles the header bar. */
  headerClassName?: string;
  /** Styles the main landmark. */
  mainClassName?: string;
  /** Styles the footer bar. */
  footerClassName?: string;
  /** Styles the mobile menu button. */
  menuButtonClassName?: string;
  /** Styles the mobile navigation panel. */
  mobileSidebarClassName?: string;
}

/** Responsive application frame with a desktop sidebar and mobile drawer. */
export const AppShell = forwardRef<HTMLDivElement, AppShellProps>(
  function AppShell(
    {
      sidebar,
      header,
      children,
      footer,
      maxWidth = "max-w-7xl",
      stickyHeader = true,
      mobileSidebarOpen: controlledMobileOpen,
      defaultMobileSidebarOpen = false,
      onMobileSidebarOpenChange,
      mainId = "main-content",
      contained = false,
      mobileNavLabel = "Navigation",
      menuButtonLabel = "Open navigation",
      sidebarClassName,
      headerClassName,
      mainClassName,
      footerClassName,
      menuButtonClassName,
      mobileSidebarClassName,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const navId = useId();
    const titleId = useId();
    const panelRef = useRef<HTMLDivElement | null>(null);
    const reduceMotion = useReducedMotion();
    const [mobileOpen, setMobileOpen] = useControllableState<boolean>({
      value: controlledMobileOpen,
      defaultValue: defaultMobileSidebarOpen,
      onChange: onMobileSidebarOpenChange,
    });

    // A contained shell never owns the page, so it must not freeze its scroll.
    useScrollLock(mobileOpen && !contained);
    useFocusTrap(panelRef, mobileOpen);

    const setMobileOpenRef = useRef(setMobileOpen);
    setMobileOpenRef.current = setMobileOpen;

    useEffect(() => {
      if (!mobileOpen) return;
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") setMobileOpenRef.current(false);
      };
      const desktop = window.matchMedia("(min-width: 1024px)");
      const onDesktop = (event: MediaQueryListEvent) => {
        if (event.matches) setMobileOpenRef.current(false);
      };
      document.addEventListener("keydown", onKeyDown);
      desktop.addEventListener("change", onDesktop);
      return () => {
        document.removeEventListener("keydown", onKeyDown);
        desktop.removeEventListener("change", onDesktop);
      };
    }, [mobileOpen]);

    // Shared look for the menu and close buttons: muted ghost icon buttons.
    const iconButton =
      "rounded-lg text-muted-foreground hover:text-accent-foreground focus-visible:ring-offset-0";

    return (
      <div
        ref={ref}
        className={cn(
          "bg-background text-foreground",
          contained ? "relative h-full overflow-hidden" : "min-h-screen",
          className,
        )}
        style={style}
        {...rest}
      >
        <div className={cn("flex", contained && "h-full")}>
          <aside
            className={cn(
              "hidden w-64 shrink-0 overflow-y-auto border-r border-border bg-card lg:block",
              contained ? "h-full" : "sticky top-0 h-screen",
              sidebarClassName,
            )}
          >
            {sidebar}
          </aside>

          <div
            className={cn(
              "flex min-w-0 flex-1 flex-col",
              contained ? "h-full overflow-y-auto" : "min-h-screen",
            )}
          >
            <header
              className={cn(
                "z-30 shrink-0 border-b border-border bg-background",
                stickyHeader && "sticky top-0",
                headerClassName,
              )}
            >
              <div
                className={cn(
                  "mx-auto flex w-full items-center gap-3 px-4 py-3",
                  maxWidth,
                )}
              >
                <IconButton
                  variant="ghost"
                  size="md"
                  icon={<Menu />}
                  onClick={() => setMobileOpen(true)}
                  aria-label={menuButtonLabel}
                  aria-haspopup="dialog"
                  aria-expanded={mobileOpen}
                  aria-controls={mobileOpen ? navId : undefined}
                  className={cn(iconButton, "size-9 lg:hidden", menuButtonClassName)}
                />
                {header}
              </div>
            </header>

            <main
              id={mainId}
              tabIndex={-1}
              className={cn(
                "mx-auto w-full flex-1 px-4 py-6 outline-none",
                maxWidth,
                mainClassName,
              )}
            >
              {children}
            </main>

            {footer && (
              <footer
                className={cn(
                  "shrink-0 border-t border-border bg-background",
                  footerClassName,
                )}
              >
                <div className={cn("mx-auto w-full px-4 py-4", maxWidth)}>
                  {footer}
                </div>
              </footer>
            )}
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <div
              className={cn(
                "inset-0 z-50 lg:hidden",
                contained ? "absolute" : "fixed",
              )}
            >
              <motion.div
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.15 }}
                onClick={() => setMobileOpen(false)}
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              />
              <motion.div
                ref={panelRef}
                id={navId}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
                initial={reduceMotion ? { opacity: 0 } : { x: "-100%" }}
                animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { x: "-100%" }}
                transition={{
                  duration: reduceMotion ? 0 : 0.22,
                  ease: [0.32, 0.72, 0, 1],
                }}
                className={cn(
                  "absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col",
                  "border-r border-border bg-background text-foreground shadow-2xl outline-none",
                  mobileSidebarClassName,
                )}
              >
                <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
                  <span
                    id={titleId}
                    className="text-sm font-semibold text-foreground"
                  >
                    {mobileNavLabel}
                  </span>
                  <IconButton
                    variant="ghost"
                    size="sm"
                    icon={<X />}
                    onClick={() => setMobileOpen(false)}
                    aria-label={`Close ${mobileNavLabel.toLowerCase()}`}
                    className={iconButton}
                  />
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto">{sidebar}</div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

AppShell.displayName = "AppShell";
