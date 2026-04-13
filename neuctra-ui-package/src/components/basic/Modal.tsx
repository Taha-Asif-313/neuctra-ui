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
      if (onClick) onClick(e);

      if (action) {
        await action();
      }

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
        "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
        "text-foreground",
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
        "relative overflow-y-auto rounded-2xl border border-border bg-background text-foreground p-6 shadow-xl",
        "animate-in zoom-in-95 slide-in-from-bottom-4",
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
            "absolute top-4 right-4 p-1 rounded-full text-muted-foreground",
            "hover:bg-accent hover:text-foreground transition-colors",
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
      className={clsx(
        "flex items-center gap-2 mb-4 text-foreground",
        className,
      )}
      style={style}
    >
      {icon && (
        <span className={iconClassName} style={iconStyle}>
          {icon}
        </span>
      )}

      <h2
        className={clsx(
          "text-lg font-semibold text-foreground",
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

  className?: string;
  style?: CSSProperties;
}

export function ModalBody({ children, className, style }: ModalBodyProps) {
  return (
    <div
      className={clsx("text-sm text-muted-foreground", className)}
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

  modalContent: (props: { close: () => void }) => React.ReactNode;

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
      <Button size="sm" {...buttonProps} onClick={openModal}>
        {children}
      </Button>

      <Modal isOpen={open} onClose={close}>
        {modalContent({ close })}
      </Modal>
    </>
  );
}
