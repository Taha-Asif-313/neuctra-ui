"use client";

import React, { forwardRef, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CircleCheck, CircleX, Info, TriangleAlert, X } from "lucide-react";
import { cn } from "../../lib/cn";
import { IconButton } from "./IconButton";

export interface AnnouncementBarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Announcement copy. */
  children: React.ReactNode;
  /** Semantic color tone of the bar. */
  tone?: "info" | "warning" | "success" | "destructive";
  /** "solid" fills the bar with the tone; "soft" uses a tinted background with regular text. */
  variant?: "solid" | "soft";
  /** Height and text size preset. */
  size?: "sm" | "md";
  /** Shows a dismiss button on the trailing edge. */
  dismissible?: boolean;
  /** Storage key used to remember a dismissal across visits (localStorage). */
  storageKey?: string;
  /** Controlled visibility; when set, the bar no longer hides itself on dismiss. */
  open?: boolean;
  /** Optional trailing action, usually a text link or small button. */
  action?: React.ReactNode;
  /** Leading icon; a tone-appropriate icon is used by default. Pass `null` to hide it. */
  icon?: React.ReactNode;
  /** Called when the user dismisses the bar. */
  onDismiss?: () => void;
  /** Accessible name of the landmark region. */
  ariaLabel?: string;
  /** Styles the leading icon wrapper. */
  iconClassName?: string;
  /** Styles the message text. */
  contentClassName?: string;
  /** Styles the action wrapper. */
  actionClassName?: string;
  /** Styles the dismiss button. */
  dismissButtonClassName?: string;
}

const TONE_CLASSES = {
  solid: {
    info: "bg-info text-info-foreground",
    warning: "bg-warning text-warning-foreground",
    success: "bg-success text-success-foreground",
    destructive: "bg-destructive text-destructive-foreground",
  },
  soft: {
    info: "border-b border-info/20 bg-info/10 text-foreground",
    warning: "border-b border-warning/20 bg-warning/10 text-foreground",
    success: "border-b border-success/20 bg-success/10 text-foreground",
    destructive: "border-b border-destructive/20 bg-destructive/10 text-foreground",
  },
} as const;

const SOFT_ICON = {
  info: "text-info",
  warning: "text-warning",
  success: "text-success",
  destructive: "text-destructive",
} as const;

const TONE_ICONS = {
  info: Info,
  warning: TriangleAlert,
  success: CircleCheck,
  destructive: CircleX,
} as const;

const sizeConfig = {
  sm: { root: "min-h-9 px-3 py-1.5 text-xs", icon: "mt-px sm:mt-0 [&_svg]:h-3.5 [&_svg]:w-3.5", close: "size-6" },
  md: { root: "min-h-11 px-4 py-2 text-sm", icon: "mt-0.5 sm:mt-0 [&_svg]:h-4 [&_svg]:w-4", close: "size-7" },
} as const;

/** Full-width status strip for product news, maintenance, or promotions. */
export const AnnouncementBar = forwardRef<HTMLDivElement, AnnouncementBarProps>(
  function AnnouncementBar(
    {
      children,
      tone = "info",
      variant = "solid",
      size = "md",
      dismissible = false,
      storageKey,
      open,
      action,
      icon,
      onDismiss,
      ariaLabel = "Announcement",
      className,
      style,
      iconClassName,
      contentClassName,
      actionClassName,
      dismissButtonClassName,
      ...rest
    },
    ref,
  ) {
    const [dismissed, setDismissed] = useState(false);
    const reduceMotion = useReducedMotion();
    const ToneIcon = TONE_ICONS[tone] ?? TONE_ICONS.info;
    const sizes = sizeConfig[size] ?? sizeConfig.md;
    const visible = open ?? !dismissed;

    // Read the persisted dismissal after mount (storage is client-only).
    useEffect(() => {
      if (!storageKey || typeof window === "undefined") return;
      try {
        setDismissed(window.localStorage.getItem(storageKey) === "dismissed");
      } catch {
        // Storage is optional; a failed read just means the bar is shown.
      }
    }, [storageKey]);

    const handleDismiss = () => {
      if (open === undefined) setDismissed(true);
      if (storageKey) {
        try {
          window.localStorage.setItem(storageKey, "dismissed");
        } catch {
          // Ignore storage errors, the bar still dismisses for this session.
        }
      }
      onDismiss?.();
    };

    return (
      <AnimatePresence initial={false}>
        {visible && (
          <motion.div
            ref={ref}
            role="region"
            aria-label={ariaLabel}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
            className={cn(
              "w-full overflow-hidden",
              (TONE_CLASSES[variant] ?? TONE_CLASSES.solid)[tone],
              className,
            )}
            style={style}
            {...(rest as unknown as React.ComponentProps<typeof motion.div>)}
          >
            {/* Mobile: icon beside left-aligned copy, action under it. sm and up: one centered line. */}
            <div className={cn("flex w-full items-start gap-3 sm:items-center", sizes.root)}>
              {/* Mirrors the dismiss button so the message stays optically centered. */}
              {dismissible && <span aria-hidden="true" className={cn("hidden shrink-0 sm:block", sizes.close)} />}

              <div className="flex min-w-0 flex-1 items-start gap-2 font-medium sm:items-center sm:justify-center">
                {icon !== null && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "inline-flex shrink-0",
                      sizes.icon,
                      variant === "soft" && SOFT_ICON[tone],
                      iconClassName,
                    )}
                  >
                    {icon ?? <ToneIcon />}
                  </span>
                )}
                <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1 text-left sm:justify-center sm:text-center">
                  <span className={cn("min-w-0", contentClassName)}>{children}</span>
                  {action && (
                    <span
                      className={cn(
                        "shrink-0 whitespace-nowrap [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-4 [&_a]:rounded-sm",
                        "[&_a:focus-visible]:outline-none [&_a:focus-visible]:ring-2 [&_a:focus-visible]:ring-ring",
                        actionClassName,
                      )}
                    >
                      {action}
                    </span>
                  )}
                </div>
              </div>

              {dismissible && (
                <IconButton
                  variant="ghost"
                  size="xs"
                  icon={<X />}
                  onClick={handleDismiss}
                  aria-label="Dismiss announcement"
                  // Inherits the bar's text color so it reads on solid and soft tones alike.
                  className={cn(
                    "-my-1 bg-transparent text-current opacity-80 hover:bg-current/10 hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-offset-0 sm:my-0",
                    sizes.close,
                    dismissButtonClassName,
                  )}
                  iconStyle={{ width: 16, height: 16 }}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);

AnnouncementBar.displayName = "AnnouncementBar";
