"use client";

import React, {
  useEffect,
  useCallback,
  type ReactNode,
  CSSProperties,
  useState,
} from "react";
import { X } from "lucide-react";
import clsx from "clsx";
import { Button, type ButtonProps } from "./Button";

/* =========================
   ModalButton
========================= */
interface ModalButtonProps extends ButtonProps {
  onClose?: () => void;
  closeOnClick?: boolean;
  action?: () => void | Promise<void>;
}

export function ModalButton({
  onClose,
  closeOnClick = false,
  action,
  onClick,
  loading,
  ...rest
}: ModalButtonProps) {
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      // run custom click first
      if (onClick) onClick(e);

      // run async action if provided
      if (action) {
        await action();
      }

      // close modal if required
      if (closeOnClick && onClose) {
        onClose();
      }
    } catch (err) {
      console.error("ModalButton action error:", err);
    }
  };

  return <Button size="sm" {...rest} loading={loading} onClick={handleClick} />;
}

/* =========================
   Modal (Overlay Controller)
========================= */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  disableOverlayClose?: boolean;

  /** 🔥 Customization */
  className?: string;
  style?: CSSProperties;
  overlayClassName?: string;
  overlayStyle?: CSSProperties;
}

export function Modal({
  isOpen,
  onClose,
  children,
  disableOverlayClose = false,
  className,
  style,
  overlayClassName,
  overlayStyle,
}: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) document.addEventListener("keydown", handleEsc);

    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const handleOverlayClick = useCallback(() => {
    if (!disableOverlayClose) onClose();
  }, [disableOverlayClose, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleOverlayClick}
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in",
        overlayClassName,
      )}
      style={overlayStyle}
    >
      <div className={className} style={style}>
        {children}
      </div>
    </div>
  );
}

/* =========================
   ModalContent
========================= */
interface ModalContentProps {
  children: ReactNode;
  onClose?: () => void;

  /** 🔥 Customization */
  className?: string;
  style?: CSSProperties;
  closeButtonClassName?: string;
  closeButtonStyle?: CSSProperties;
  contentClassName?: string;
  contentStyle?: CSSProperties;
}

export function ModalContent({
  children,
  onClose,
  className,
  style,
  closeButtonClassName,
  closeButtonStyle,
  contentClassName,
  contentStyle,
}: ModalContentProps) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={clsx(
        "relative overflow-y-auto rounded-2xl border dark:border-zinc-900 border-zinc-200 bg-white dark:bg-zinc-950 p-6 shadow-xl animate-in zoom-in-95 slide-in-from-bottom-4",
        className,
      )}
      style={{ ...style }}
    >
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className={clsx(
            "absolute top-4 right-4 p-1 rounded-full text-red-500 hover:text-zinc-900 dark:hover:text-white transition",
            closeButtonClassName,
          )}
          style={closeButtonStyle}
        >
          <X size={20} />
        </button>
      )}

      <div className={contentClassName} style={contentStyle}>
        {children}
      </div>
    </div>
  );
}

/* =========================
   ModalHeader
========================= */
interface ModalHeaderProps {
  title?: string;
  icon?: ReactNode;

  /** 🔥 Customization */
  className?: string;
  style?: CSSProperties;
  titleClassName?: string;
  titleStyle?: CSSProperties;
  iconClassName?: string;
  iconStyle?: CSSProperties;
}

export function ModalHeader({
  title,
  icon,
  className,
  style,
  titleClassName,
  titleStyle,
  iconClassName,
  iconStyle,
}: ModalHeaderProps) {
  if (!title) return null;

  return (
    <div
      className={clsx("flex items-center gap-2 mb-4", className)}
      style={style}
    >
      {icon && (
        <span className={iconClassName} style={iconStyle}>
          {icon}
        </span>
      )}

      <h2
        className={clsx(
          "text-lg font-semibold text-zinc-900 dark:text-white",
          titleClassName,
        )}
        style={titleStyle}
      >
        {title}
      </h2>
    </div>
  );
}

/* =========================
   ModalBody
========================= */
interface ModalBodyProps {
  children: ReactNode;

  /** 🔥 Customization */
  className?: string;
  style?: CSSProperties;
}

export function ModalBody({ children, className, style }: ModalBodyProps) {
  return (
    <div
      className={clsx("text-sm text-zinc-600 dark:text-zinc-300", className)}
      style={style}
    >
      {children}
    </div>
  );
}

/* =========================
   ModalFooter
========================= */
interface ModalFooterProps {
  children: ReactNode;

  /** 🔥 Customization */
  className?: string;
  style?: CSSProperties;
}

export function ModalFooter({ children, className, style }: ModalFooterProps) {
  return (
    <div
      className={clsx("flex justify-end gap-2 mt-6", className)}
      style={style}
    >
      {children}
    </div>
  );
}

/* =========================
   Modal Trigger Button
========================= */
interface ModalTriggerButtonProps extends ButtonProps {
  children: React.ReactNode;

  /** Modal content */
  modalContent: (props: { close: () => void }) => React.ReactNode;

  /** optional control */
  defaultOpen?: boolean;
}

export function ModalTriggerButton({
  children,
  modalContent,
  defaultOpen = false,
  ...buttonProps
}: ModalTriggerButtonProps) {
  const [open, setOpen] = useState(defaultOpen);

  const close = () => setOpen(false);
  const openModal = () => setOpen(true);

  return (
    <>
      {/* Trigger Button */}
      <Button size="sm" {...buttonProps} onClick={openModal}>
        {children}
      </Button>

      {/* Modal */}
      <Modal isOpen={open} onClose={close}>
        {modalContent({ close })}
      </Modal>
    </>
  );
}
