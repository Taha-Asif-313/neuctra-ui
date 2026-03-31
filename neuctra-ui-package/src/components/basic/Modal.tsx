"use client";

import React, { useEffect, useCallback, type ReactNode } from "react";
import { X } from "lucide-react";
import clsx from "clsx";

/* =========================
   Modal (Overlay Controller)
========================= */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  disableOverlayClose?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  children,
  disableOverlayClose = false,
}: ModalProps) {
  /* Escape key */
  useEffect(() => {
    const handleEsc = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  /* Scroll lock */
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in"
      onClick={handleOverlayClick}
    >
      {children}
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
}

export function ModalContent({
  children,
  onClose,
  className,
}: ModalContentProps) {
  return (
    <div
      onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      className={clsx(
        `
        relative w-[95vw] sm:w-full max-w-lg
        max-h-[90vh] overflow-y-auto
        rounded-2xl border border-white/10
        bg-white dark:bg-zinc-900
        p-6 shadow-xl
        animate-in zoom-in-95 slide-in-from-bottom-4
        `,
        className
      )}
    >
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-1 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition"
        >
          <X size={20} />
        </button>
      )}

      {children}
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
}

export function ModalHeader({
  title,
  icon,
  className,
}: ModalHeaderProps) {
  if (!title) return null;

  return (
    <div className={clsx("flex items-center gap-2 mb-4", className)}>
      {icon && <span>{icon}</span>}
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
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
}

export function ModalBody({ children, className }: ModalBodyProps) {
  return (
    <div
      className={clsx(
        "text-sm text-zinc-600 dark:text-zinc-300",
        className
      )}
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
}

export function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <div className={clsx("flex justify-end gap-2 mt-6", className)}>
      {children}
    </div>
  );
}