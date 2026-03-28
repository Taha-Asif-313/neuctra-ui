import React, { ReactNode, useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";
import clsx from "clsx";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  icon?: ReactNode; // <-- Optional icon in header
  ariaLabel?: string;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  closeButtonClassName?: string;
  disableOverlayClose?: boolean;
  darkMode?: boolean;
  transitionDuration?: number; // in ms
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  icon,
  ariaLabel,
  className,
  overlayClassName,
  contentClassName,
  closeButtonClassName,
  disableOverlayClose = false,
  darkMode = false,
  transitionDuration = 200,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  /* Escape key close */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  /* Scroll lock */
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  const handleOverlayClick = useCallback(() => {
    if (!disableOverlayClose) onClose();
  }, [disableOverlayClose, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel || title || "Modal"}
      className={clsx(
        "fixed inset-0 flex items-center justify-center z-50 transition-opacity",
        darkMode ? "bg-black/80" : "bg-black/60",
        overlayClassName
      )}
      style={{ transitionDuration: `${transitionDuration}ms` }}
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={clsx(
          "relative w-[90vw] max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg transition-transform",
          darkMode ? "bg-zinc-900 text-white" : "bg-white text-gray-900",
          "scale-100",
          contentClassName
        )}
        style={{ transitionDuration: `${transitionDuration}ms` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className={clsx(
            "absolute top-4 right-4 p-1 rounded-full hover:scale-110 transition-transform",
            darkMode ? "text-white hover:text-gray-200" : "text-gray-700 hover:text-gray-900",
            closeButtonClassName
          )}
        >
          <X size={24} />
        </button>

        {/* Header */}
        {title && (
          <div className="flex items-center gap-2 mb-4">
            {icon && <span className="flex-shrink-0">{icon}</span>}
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
        )}

        {/* Content */}
        {children}
      </div>
    </div>
  );
};