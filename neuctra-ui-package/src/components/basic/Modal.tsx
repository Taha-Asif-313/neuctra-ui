import React, {
  ReactNode,
  CSSProperties,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { X } from "lucide-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabel?: string;
  title?: string;
  overlayStyle?: CSSProperties;
  modalStyle?: CSSProperties;
  closeButtonStyle?: CSSProperties;
  disableOverlayClose?: boolean;
  transitionDuration?: number;
  className?: string;
  /** Dark mode toggle */
  darkMode?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  ariaLabel,
  title,
  overlayStyle,
  modalStyle,
  closeButtonStyle,
  disableOverlayClose = false,
  transitionDuration = 200,
  className,
  darkMode = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  /* ------------------------------ Escape Close ----------------------------- */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  /* ------------------------------ Scroll Lock ------------------------------ */
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  /* ------------------------------ Click Outside ---------------------------- */
  const handleOverlayClick = useCallback(() => {
    if (!disableOverlayClose) onClose();
  }, [disableOverlayClose, onClose]);

  if (!isOpen) return null;

  /* ------------------------------- Base Styles ----------------------------- */
  const baseOverlay: CSSProperties = {
    position: "fixed",
    inset: 0,
    backgroundColor: darkMode ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    opacity: isOpen ? 1 : 0,
    transition: `opacity ${transitionDuration}ms ease`,
    ...overlayStyle,
  };

  const baseModal: CSSProperties = {
    position: "relative",
    backgroundColor: darkMode ? "#1f1f1f" : "#fff",
    color: darkMode ? "#f5f5f5" : "#111",
    borderRadius: 12,
    width: "90vw",
    maxWidth: 700,
    maxHeight: "90vh",
    overflowY: "auto",
    padding: 24,
    boxShadow: darkMode
      ? "0 10px 40px rgba(0,0,0,0.7)"
      : "0 10px 40px rgba(0,0,0,0.25)",
    transform: isOpen ? "scale(1)" : "scale(0.95)",
    transition: `transform ${transitionDuration}ms ease, opacity ${transitionDuration}ms ease`,
    ...modalStyle,
  };

  const baseCloseBtn: CSSProperties = {
    position: "absolute",
    top: 16,
    right: 16,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 4,
    color: darkMode ? "#f5f5f5" : "#444",
    transition: "color 0.2s ease, transform 0.2s ease",
    ...closeButtonStyle,
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel || title || "Modal"}
      style={baseOverlay}
      onClick={handleOverlayClick}
      className={className}
    >
      <div
        ref={modalRef}
        style={baseModal}
        onClick={(e) => e.stopPropagation()} // prevent close on content click
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={baseCloseBtn}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = darkMode ? "#fff" : "#000";
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = darkMode ? "#f5f5f5" : "#444";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <X size={24} />
        </button>

        {title && (
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              marginBottom: "1rem",
            }}
          >
            {title}
          </h2>
        )}

        {children}
      </div>
    </div>
  );
};
