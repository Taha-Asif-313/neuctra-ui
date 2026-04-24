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
import { AnimatePresence, motion } from "framer-motion";
import { Button, type ButtonProps } from "./Button";

/* =========================
   Modal Root
========================= */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  disableOverlayClose?: boolean;

  overlayClassName?: string;
  overlayStyle?: CSSProperties;
  style?: CSSProperties;
}

export function Modal({
  isOpen,
  onClose,
  children,
  disableOverlayClose = false,
  overlayClassName,
  overlayStyle,
  style,
}: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const handleOverlayClick = useCallback(() => {
    if (!disableOverlayClose) onClose();
  }, [disableOverlayClose, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
          className={clsx(
            "fixed inset-0 z-50 flex items-center justify-center",
            "bg-background/80 backdrop-blur-sm p-4",
            overlayClassName,
          )}
          style={{ ...overlayStyle, ...style }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* =========================
   Modal Content (Card)
========================= */
interface ModalContentProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  maxWidth?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
  closeButtonClassName?: string;
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
interface ModalHeaderProps {
  title?: string;
  icon?: ReactNode;
  onClose?: () => void;

  className?: string;
  style?: CSSProperties;
}

export function ModalHeader({
  title,
  icon,
  onClose,
  className,
  style,
}: ModalHeaderProps) {
  return (
    <div
      className={clsx(
        className,
        "flex items-center justify-between px-6 py-4 border-b border-border",
      )}
      style={style}
    >
      <div className="flex items-center gap-2 font-semibold text-foreground">
        {icon && <span>{icon}</span>}
        {title && <h3 className="text-sm">{title}</h3>}
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-accent transition"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}

/* =========================
   Body
========================= */
interface ModalBodyProps {
  children: ReactNode;
  className?: string;
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
interface ModalFooterProps {
  children: ReactNode;
  className?: string;
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
interface ModalButtonProps extends ButtonProps {
  onClose?: () => void;
  closeOnClick?: boolean;
  action?: () => void | Promise<void>;
}

export function ModalButton({
  onClose,
  closeOnClick,
  action,
  onClick,
  ...rest
}: ModalButtonProps) {
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);

    if (action) await action();

    if (closeOnClick && onClose) onClose();
  };

  return <Button size="sm" {...rest} onClick={handleClick} />;
}

/* =========================
   Trigger
========================= */
interface ModalTriggerButtonProps extends ButtonProps {
  children: React.ReactNode;
  modalContent: (props: { close: () => void }) => React.ReactNode;
}

export function ModalTriggerButton({
  children,
  modalContent,
  ...props
}: ModalTriggerButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button {...props} onClick={() => setOpen(true)}>
        {children}
      </Button>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        {modalContent({ close: () => setOpen(false) })}
      </Modal>
    </>
  );
}
