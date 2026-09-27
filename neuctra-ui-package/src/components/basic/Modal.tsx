"use client";

import React, {
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
  CSSProperties,
  useState,
} from "react";
import { X } from "lucide-react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Button, type ButtonProps } from "./Button";
import { cn } from "../../lib/cn";
import { useScrollLock } from "../../lib/useScrollLock";
import { useFocusTrap } from "../../lib/useFocusTrap";

/* =========================
   Modal Root
========================= */
export interface ModalProps {
  /** Whether the modal is mounted and visible. */
  isOpen: boolean;
  /** Called on Escape, overlay click, or a close button — drive `isOpen` from it. */
  onClose: () => void;
  /** Modal content, typically `ModalContent` and its sub-components. */
  children: ReactNode;
  /** Prevents closing on overlay click; also blocks Escape unless `disableEscapeClose` overrides it. */
  disableOverlayClose?: boolean;
  /** Also block Escape. Defaults to `disableOverlayClose`. */
  disableEscapeClose?: boolean;
  /** Accessible name for the dialog when no ModalHeader is used. */
  ariaLabel?: string;

  /** Styles the fixed, full-screen overlay behind the dialog. */
  overlayClassName?: string;
  /** Inline styles for the overlay; merged before `style`. */
  overlayStyle?: CSSProperties;
  /** Inline styles for the overlay; merged after `overlayStyle`, so it wins on conflicts. */
  style?: CSSProperties;
  /** The `role="dialog"` wrapper around `children`. */
  dialogClassName?: string;
}

export function Modal({
  isOpen,
  onClose,
  children,
  disableOverlayClose = false,
  disableEscapeClose,
  ariaLabel,
  overlayClassName,
  overlayStyle,
  style,
  dialogClassName,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  // A "forced choice" modal that blocks the overlay should not be dismissible
  // with Escape either, unless the consumer says otherwise.
  const escapeDisabled = disableEscapeClose ?? disableOverlayClose;

  // Keep onClose in a ref so the listener doesn't resubscribe on every parent
  // render — consumers almost always pass an inline arrow.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen || escapeDisabled) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, escapeDisabled]);

  useScrollLock(isOpen);
  useFocusTrap(dialogRef, isOpen);

  // Compare the mousedown target with the click target: otherwise selecting
  // text inside the modal and releasing over the overlay closes it.
  const pressedOnOverlay = useRef(false);

  const handleOverlayClick = useCallback(() => {
    if (!disableOverlayClose && pressedOnOverlay.current) onClose();
    pressedOnOverlay.current = false;
  }, [disableOverlayClose, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            pressedOnOverlay.current = e.target === e.currentTarget;
          }}
          onClick={handleOverlayClick}
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center",
            "bg-background/80 backdrop-blur-sm p-4",
            overlayClassName,
          )}
          style={{ ...overlayStyle, ...style }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            tabIndex={-1}
            className={cn("contents outline-none", dialogClassName)}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* =========================
   Modal Content (Card)
========================= */
export interface ModalContentProps {
  /** The dialog card's content (header/body/footer sub-components or custom markup). */
  children: ReactNode;
  /** Styles the dialog card. */
  className?: string;
  /** Inline styles for the dialog card. */
  style?: CSSProperties;
  /** Max-width utility class applied to the card. */
  maxWidth?: string;
  /** Called by the built-in close button when `showCloseButton` is set. */
  onClose?: () => void;
  /** Renders a top-right close button; requires `onClose` to also be passed. */
  showCloseButton?: boolean;
  /** Styles the top-right close button. */
  closeButtonClassName?: string;
  /** Inline styles for the top-right close button. */
  closeButtonStyle?: CSSProperties;
}

export function ModalContent({
  children,
  className,
  style,
  maxWidth = "max-w-md",
  onClose,
  showCloseButton = false,
  closeButtonClassName,
  closeButtonStyle,
}: ModalContentProps) {
  const hasCloseButton = showCloseButton && typeof onClose === "function";

  return (
    <motion.div
      initial={{ y: 20, scale: 0.96 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ y: 20, scale: 0.96 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => e.stopPropagation()}
      className={clsx(
        "relative w-full rounded-2xl border border-border bg-background shadow-2xl overflow-hidden",
        maxWidth,
        className,
      )}
      style={style}
    >
      {hasCloseButton && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className={clsx(
            "absolute top-4 right-4 z-10 p-2 rounded-full transition-colors",
            "hover:bg-accent/20 focus:outline-none ",
            closeButtonClassName,
          )}
          style={closeButtonStyle}
        >
          <X size={18} />
        </button>
      )}

      {children}
    </motion.div>
  );
}

/* =========================
   Header
========================= */
export interface ModalHeaderProps {
  /** Heading text shown next to the optional icon. */
  title?: string;
  /** Optional leading icon rendered before the title. */
  icon?: ReactNode;
  /** Renders a close button in the header when provided. */
  onClose?: () => void;

  /** Styles the header row. */
  className?: string;
  /** Inline styles for the header row. */
  style?: CSSProperties;

  /** Wrapper around `icon` + `title`. */
  titleWrapperClassName?: string;
  /** Styles the icon wrapper. */
  iconClassName?: string;
  /** Styles the title heading element. */
  titleClassName?: string;
  /** Styles the close button. */
  closeButtonClassName?: string;
}

export function ModalHeader({
  title,
  icon,
  onClose,
  className,
  style,
  titleWrapperClassName,
  iconClassName,
  titleClassName,
  closeButtonClassName,
}: ModalHeaderProps) {
  return (
    <div
      className={clsx(
        className,
        "flex items-center justify-between px-6 py-4 border-b border-border",
      )}
      style={style}
    >
      <div
        className={cn(
          "flex items-center gap-2 font-semibold text-foreground",
          titleWrapperClassName,
        )}
      >
        {icon && <span className={iconClassName}>{icon}</span>}
        {title && <h3 className={cn("text-sm", titleClassName)}>{title}</h3>}
      </div>

      {onClose && (
        <button
          // Without type="button" this submits any enclosing <form>, and with
          // no aria-label screen readers announce an empty button.
          type="button"
          aria-label="Close modal"
          onClick={onClose}
          className={cn(
            "p-2 rounded-lg hover:bg-accent transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            closeButtonClassName,
          )}
        >
          <X size={18} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

/* =========================
   Body
========================= */
export interface ModalBodyProps {
  /** Scrollable main content of the dialog. */
  children: ReactNode;
  /** Styles the body wrapper. */
  className?: string;
  /** Inline styles for the body wrapper. */
  style?: CSSProperties;
}

export function ModalBody({ children, className, style }: ModalBodyProps) {
  return (
    <div className={clsx(className, "p-6 text-foreground space-y-4")} style={style}>
      {children}
    </div>
  );
}

/* =========================
   Footer
========================= */
export interface ModalFooterProps {
  /** Footer actions, typically `Button`/`ModalButton` elements. */
  children: ReactNode;
  /** Styles the footer wrapper. */
  className?: string;
  /** Inline styles for the footer wrapper. */
  style?: CSSProperties;
}

export function ModalFooter({ children, className, style }: ModalFooterProps) {
  return (
    <div
      className={clsx(
        "flex justify-end gap-3 px-6 py-3 border-t border-border bg-accent/60",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}

/* =========================
   Modal Button
========================= */
export interface ModalButtonProps extends ButtonProps {
  /** Called after `action` resolves, when `closeOnClick` is true. */
  onClose?: () => void;
  /** Close the modal (via `onClose`) once `onClick`/`action` finish. */
  closeOnClick?: boolean;
  /** Optional async handler; the button shows a loading/disabled state while it runs. */
  action?: () => void | Promise<void>;
}

export function ModalButton({
  onClose,
  closeOnClick,
  action,
  onClick,
  disabled,
  ...rest
}: ModalButtonProps) {
  const [pending, setPending] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);

    if (action) {
      setPending(true);
      try {
        await action();
      } catch (err) {
        // Surface the failure instead of leaving an unhandled rejection, and
        // leave the modal open so the user can retry.
        setPending(false);
        throw err;
      }
      setPending(false);
    }

    if (closeOnClick && onClose) onClose();
  };

  return (
    <Button
      size="sm"
      {...rest}
      // Guard against double-submit while `action` is in flight.
      disabled={disabled || pending}
      loading={rest.loading || pending}
      onClick={handleClick}
    />
  );
}

/* =========================
   Trigger
========================= */
export interface ModalTriggerButtonProps extends ButtonProps {
  /** Label/content rendered inside the trigger `Button`. */
  children: React.ReactNode;
  /** Render function for the modal's content, given a `close` callback. */
  modalContent: (props: { close: () => void }) => React.ReactNode;
  /** Forwarded to the underlying <Modal />. */
  modalProps?: Omit<ModalProps, "isOpen" | "onClose" | "children">;
}

export function ModalTriggerButton({
  children,
  modalContent,
  modalProps,
  onClick,
  ...props
}: ModalTriggerButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        {...props}
        // Chain rather than replace — placing this after {...props} used to
        // silently drop a consumer-supplied onClick.
        onClick={(e) => {
          onClick?.(e);
          setOpen(true);
        }}
      >
        {children}
      </Button>

      <Modal {...modalProps} isOpen={open} onClose={() => setOpen(false)}>
        {modalContent({ close: () => setOpen(false) })}
      </Modal>
    </>
  );
}
