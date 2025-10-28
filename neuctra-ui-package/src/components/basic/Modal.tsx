import React, { ReactNode, CSSProperties } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  overlayStyle?: CSSProperties;
  modalStyle?: CSSProperties;
  closeButtonStyle?: CSSProperties;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  overlayStyle,
  modalStyle,
  closeButtonStyle,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        ...overlayStyle,
      }}
      onClick={onClose} // Close modal if clicking on overlay
    >
      <div
        style={{
          position: "relative",
          backgroundColor: "#fff",
          borderRadius: 12,
          width: "90vw",
          maxWidth: 700,
          maxHeight: "90vh",
          overflowY: "auto",
          padding: 24,
          boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
          ...modalStyle,
        }}
        onClick={(e) => e.stopPropagation()} // Prevent close on clicking inside modal
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 4,
            color: "#444",
            transition: "color 0.2s ease",
            ...closeButtonStyle,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};
