"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "../../lib/cn";

export interface CopyButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  /** Text placed on the clipboard. */
  value: string;
  /** Optional visible label next to the icon. */
  label?: React.ReactNode;
  /** How long the "copied" state shows, in ms. */
  feedbackDuration?: number;
  size?: "sm" | "md" | "lg";
  onCopied?: (value: string) => void;
}

const SIZES = {
  sm: "h-7 px-1.5 text-xs [&_svg]:h-3.5 [&_svg]:w-3.5",
  md: "h-9 px-2 text-sm [&_svg]:h-4 [&_svg]:w-4",
  lg: "h-11 px-3 text-base [&_svg]:h-5 [&_svg]:w-5",
} as const;

/* Icon-only buttons render as squares instead of narrow rectangles. */
const ICON_ONLY = {
  sm: "w-7 px-0 justify-center",
  md: "w-9 px-0 justify-center",
  lg: "w-11 px-0 justify-center",
} as const;

export const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
  function CopyButton(
    {
      value,
      label,
      feedbackDuration = 1500,
      size = "md",
      onCopied,
      className,
      onClick,
      ...rest
    },
    ref,
  ) {
    const [copied, setCopied] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(
      () => () => {
        if (timer.current) clearTimeout(timer.current);
      },
      [],
    );

    const copy = async (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(value);
        } else {
          // Fallback for non-secure contexts.
          const textarea = document.createElement("textarea");
          textarea.value = value;
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
        }
        setCopied(true);
        onCopied?.(value);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), feedbackDuration);
      } catch {
        // Clipboard access denied — leave the state unchanged.
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-label={copied ? "Copied" : "Copy to clipboard"}
        aria-live="polite"
        onClick={copy}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors",
          "text-muted-foreground hover:bg-accent hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:pointer-events-none disabled:opacity-50",
          SIZES[size] ?? SIZES.md,
          !label && (ICON_ONLY[size] ?? ICON_ONLY.md),
          className,
        )}
        {...rest}
      >
        {copied ? (
          <Check aria-hidden="true" className="text-success" />
        ) : (
          <Copy aria-hidden="true" />
        )}
        {label && <span>{copied ? "Copied" : label}</span>}
      </button>
    );
  },
);

CopyButton.displayName = "CopyButton";
