"use client";

import React, { forwardRef } from "react";
import { cn } from "../../lib/cn";

/* -------------------------------------------------------------------------- */
/* 🧩 Types                                                                  */
/* -------------------------------------------------------------------------- */

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual style of the card surface. */
  variant?: "default" | "outline" | "elevated" | "ghost";
  /** Inner padding scale applied by the sub-components. */
  padding?: "none" | "sm" | "md" | "lg";
  /** Lift the card slightly on hover. */
  hoverable?: boolean;
}

export interface CardSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface CardHeaderProps
  // `title` here is a ReactNode slot, not the native tooltip attribute.
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  /** Slot rendered at the far right of the header (menu, action button…). */
  action?: React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/* 🃏 Card                                                                   */
/* -------------------------------------------------------------------------- */

const paddingContext = React.createContext<"none" | "sm" | "md" | "lg">("md");

const SECTION_PADDING = {
  none: "",
  sm: "px-4 py-3",
  md: "px-6 py-4",
  lg: "px-8 py-6",
} as const;

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = "default", padding = "md", hoverable = false, className, children, ...rest },
  ref,
) {
  const variants = {
    default: "bg-card text-card-foreground border border-border",
    outline: "bg-transparent text-foreground border border-border",
    elevated:
      "bg-card text-card-foreground border border-border shadow-lg shadow-black/5",
    ghost: "bg-muted/50 text-foreground border border-transparent",
  } as const;

  return (
    <paddingContext.Provider value={padding}>
      <div
        ref={ref}
        className={cn(
          // No overflow-hidden: it clipped any Popover/Dropdown/DatePicker
          // rendered inside the card. The footer rounds itself instead.
          "rounded-xl transition-shadow",
          variants[variant] ?? variants.default,
          hoverable && "hover:shadow-lg hover:shadow-black/10",
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    </paddingContext.Provider>
  );
});

Card.displayName = "Card";

/* -------------------------------------------------------------------------- */
/* Sub-components                                                            */
/* -------------------------------------------------------------------------- */

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader(
    { title, description, icon, action, className, children, ...rest },
    ref,
  ) {
    const padding = React.useContext(paddingContext);

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-start justify-between gap-3 border-b border-border",
          SECTION_PADDING[padding],
          className,
        )}
        {...rest}
      >
        <div className="flex min-w-0 items-start gap-3">
          {icon && (
            <span
              aria-hidden="true"
              // h-6 matches the title's leading-6, so the icon is optically
              // centered on the title line whether or not a description exists
              // (a fixed mt nudge previously left it visibly high).
              className="flex h-6 shrink-0 items-center text-primary [&_svg]:h-5 [&_svg]:w-5"
            >
              {icon}
            </span>
          )}
          <div className="min-w-0">
            {title && (
              <h3 className="text-sm font-semibold leading-6 text-foreground">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
            {children}
          </div>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    );
  },
);

CardHeader.displayName = "CardHeader";

export const CardBody = forwardRef<HTMLDivElement, CardSectionProps>(
  function CardBody({ className, children, ...rest }, ref) {
    const padding = React.useContext(paddingContext);
    return (
      <div ref={ref} className={cn(SECTION_PADDING[padding], className)} {...rest}>
        {children}
      </div>
    );
  },
);

CardBody.displayName = "CardBody";

export const CardFooter = forwardRef<HTMLDivElement, CardSectionProps>(
  function CardFooter({ className, children, ...rest }, ref) {
    const padding = React.useContext(paddingContext);
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-end gap-3 border-t border-border bg-accent/40",
          // The card no longer clips its children, so the tinted footer
          // rounds its own bottom corners to match the card radius.
          "rounded-b-[inherit]",
          SECTION_PADDING[padding],
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

CardFooter.displayName = "CardFooter";
