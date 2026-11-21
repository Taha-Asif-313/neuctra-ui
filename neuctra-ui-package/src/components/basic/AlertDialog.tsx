"use client";

import React, {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { TriangleAlert } from "lucide-react";
import { cn } from "../../lib/cn";
import { useScrollLock } from "../../lib/useScrollLock";
import { useFocusTrap } from "../../lib/useFocusTrap";
import { useControllableState } from "../../lib/useControllableState";
import { Button } from "./Button";
import { Input } from "./Input";

export interface AlertDialogProps {
  /** Controlled open state; omit to let the dialog manage it internally. */
  open?: boolean;
  /** Initial open state in uncontrolled mode. */
  defaultOpen?: boolean;
  /** Called whenever the open state changes, controlled or not. */
  onOpenChange?: (open: boolean) => void;
  /** Dialog heading, also used as the accessible name. */
  title: React.ReactNode;
  /** Supporting copy rendered under the heading. */
  description?: React.ReactNode;
  /** Label of the primary action button. */
  confirmLabel?: string;
  /** Label of the button that dismisses the dialog. */
  cancelLabel?: string;
  /** Visual treatment of the primary action. */
  tone?: "default" | "destructive";
  /** Leading icon; defaults to a warning icon for the destructive tone. Pass `null` to hide it. */
  icon?: React.ReactNode;
  /** When set, the confirm button stays disabled until this exact text is typed. */
  requireText?: string;
  /** Called when the primary action is confirmed. If it returns a promise, the confirm button shows a spinner and the dialog closes once it resolves (and stays open if it rejects). */
  onConfirm?: () => void | Promise<void>;
  /** Called when the dialog is dismissed with Cancel, Escape or the overlay. */
  onCancel?: () => void;
  /** Extra body content between the description and the confirmation input. */
  children?: React.ReactNode;
  /** Allows closing by clicking the overlay; off by default for forced choices. */
  closeOnOverlayClick?: boolean;
  /** Allows closing with Escape; off by default for forced choices. */
  closeOnEscape?: boolean;
  /** Styles the dialog card. */
  className?: string;
  /** Inline styles for the dialog card. */
  style?: React.CSSProperties;
  /** Styles the dimmed overlay behind the card. */
  overlayClassName?: string;
  /** Styles the round icon badge. */
  iconClassName?: string;
  /** Styles the title heading. */
  titleClassName?: string;
  /** Styles the description paragraph. */
  descriptionClassName?: string;
  /** Styles the typed-confirmation input. */
  inputClassName?: string;
  /** Styles the footer that holds the action buttons. */
  footerClassName?: string;
}

/** Confirmation dialog that announces itself assertively and focuses Cancel first. */
export const AlertDialog = forwardRef<HTMLDivElement, AlertDialogProps>(
  function AlertDialog(
    {
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      title,
      description,
      confirmLabel = "Confirm",
      cancelLabel = "Cancel",
      tone = "default",
      icon,
      requireText,
      onConfirm,
      onCancel,
      children,
      closeOnOverlayClick = false,
      closeOnEscape = false,
      className,
      style,
      overlayClassName,
      iconClassName,
      titleClassName,
      descriptionClassName,
      inputClassName,
      footerClassName,
    },
    ref,
  ) {
    const [open, setOpen] = useControllableState<boolean>({
      value: controlledOpen,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });
    const [typed, setTyped] = useState("");
    const [pending, setPending] = useState(false);
    const [mounted, setMounted] = useState(false);

    const baseId = useId();
    const titleId = `${baseId}-title`;
    const descriptionId = `${baseId}-description`;
    const inputId = `${baseId}-confirm`;
    const dialogRef = useRef<HTMLDivElement | null>(null);
    const cancelRef = useRef<HTMLButtonElement | null>(null);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
    const pressedOnOverlay = useRef(false);
    const reduceMotion = useReducedMotion();

    useEffect(() => setMounted(true), []);
    useScrollLock(open);
    useFocusTrap(dialogRef, open);

    // Ref-routed so the Escape listener never holds a stale onCancel.
    const dismissRef = useRef(() => {});
    dismissRef.current = () => {
      if (pending) return;
      onCancel?.();
      setOpen(false);
    };

    useEffect(() => {
      if (!open) {
        setTyped("");
        setPending(false);
        return;
      }
      // useFocusTrap focuses the first focusable (the typed-confirmation
      // input, when present). Scheduling after its own rAF keeps Cancel
      // first, as the ARIA pattern recommends for destructive confirmations.
      const frame = requestAnimationFrame(() => cancelRef.current?.focus());
      return () => cancelAnimationFrame(frame);
    }, [open]);

    // Input has no autoComplete/spellCheck props; a typed confirmation must
    // never be autofilled, so set them on the element directly.
    useEffect(() => {
      const el = inputRef.current;
      if (!open || !el) return;
      el.setAttribute("autocomplete", "off");
      el.setAttribute("spellcheck", "false");
    }, [open, requireText]);

    useEffect(() => {
      if (!open || !closeOnEscape) return;
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") dismissRef.current();
      };
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    }, [open, closeOnEscape]);

    const confirmDisabled = Boolean(requireText) && typed !== requireText;

    const handleConfirm = async () => {
      if (confirmDisabled || pending) return;
      const result = onConfirm?.();
      if (result && typeof (result as Promise<void>).then === "function") {
        setPending(true);
        try {
          await result;
        } catch {
          // Leave the dialog open so the user can retry.
          setPending(false);
          return;
        }
        setPending(false);
      }
      setOpen(false);
    };

    const resolvedIcon =
      icon === undefined
        ? tone === "destructive"
          ? <TriangleAlert className="h-5 w-5" />
          : null
        : icon;

    if (!mounted) return null;

    return createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            key="alert-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.15 }}
            onMouseDown={(event) => {
              pressedOnOverlay.current = event.target === event.currentTarget;
            }}
            onClick={() => {
              if (closeOnOverlayClick && pressedOnOverlay.current) dismissRef.current();
              pressedOnOverlay.current = false;
            }}
            className={cn(
              "fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm",
              overlayClassName,
            )}
          >
            <motion.div
              ref={(element) => {
                dialogRef.current = element;
                if (typeof ref === "function") ref(element);
                else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = element;
              }}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={description ? descriptionId : undefined}
              tabIndex={-1}
              initial={
                reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97 }
              }
              transition={{ duration: reduceMotion ? 0 : 0.18 }}
              className={cn(
                "w-full max-w-md max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl border border-border bg-background p-6 text-foreground shadow-2xl outline-none",
                className,
              )}
              style={style}
            >
              <div className="flex items-start gap-4">
                {resolvedIcon && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                      tone === "destructive"
                        ? "bg-destructive/10 text-destructive"
                        : "bg-primary/10 text-primary",
                      iconClassName,
                    )}
                  >
                    {resolvedIcon}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <h2
                    id={titleId}
                    className={cn("text-base font-semibold text-foreground", titleClassName)}
                  >
                    {title}
                  </h2>
                  {description && (
                    <p
                      id={descriptionId}
                      className={cn(
                        "mt-1.5 text-sm leading-relaxed text-secondary",
                        descriptionClassName,
                      )}
                    >
                      {description}
                    </p>
                  )}
                </div>
              </div>

              {children && (
                <div className="mt-4 text-sm text-secondary">{children}</div>
              )}

              {requireText && (
                <div className="mt-4 space-y-1.5">
                  <label
                    htmlFor={inputId}
                    className="block text-xs text-muted-foreground"
                  >
                    Type{" "}
                    <span className="font-semibold text-foreground">
                      {requireText}
                    </span>{" "}
                    to confirm
                  </label>
                  {/* Enter bubbles up from the Neuctra Input, which has no
                      onKeyDown prop of its own. */}
                  <div
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        void handleConfirm();
                      }
                    }}
                  >
                    <Input
                      ref={inputRef}
                      id={inputId}
                      value={typed}
                      onChange={(event) => setTyped(event.target.value)}
                      disabled={pending}
                      placeholder={requireText}
                      inputClassName={inputClassName}
                    />
                  </div>
                </div>
              )}

              <div
                className={cn(
                  "mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
                  footerClassName,
                )}
              >
                <Button
                  ref={cancelRef}
                  variant="outline"
                  disabled={pending}
                  onClick={() => dismissRef.current()}
                >
                  {cancelLabel}
                </Button>
                <Button
                  variant={tone === "destructive" ? "destructive" : "default"}
                  disabled={confirmDisabled}
                  loading={pending}
                  loadingText={confirmLabel}
                  onClick={() => void handleConfirm()}
                >
                  {confirmLabel}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
    );
  },
);

AlertDialog.displayName = "AlertDialog";
