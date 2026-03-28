"use client";
import React, { useState, useEffect, useMemo, ReactNode } from "react";
import { X } from "lucide-react";

/* ---------------- 🧩 Drawer Button ---------------- */
interface DrawerButtonProps {
  label?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  className?: string;
}

export const DrawerButton: React.FC<DrawerButtonProps> = ({
  label = "Open Drawer",
  icon,
  iconPosition = "left",
  onClick,
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
    >
      {icon && iconPosition === "left" && icon}
      {label}
      {icon && iconPosition === "right" && icon}
    </button>
  );
};

/* ---------------- 🧱 Drawer ---------------- */
interface DrawerProps {
  open: boolean;
  onClose?: () => void;
  position?: "left" | "right" | "top" | "bottom";
  size?: string; // width for left/right, height for top/bottom
  className?: string;
  overlayClassName?: string;
  children?: ReactNode;
  showCloseButton?: boolean;
  closeButtonClassName?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  position = "right",
  size = "320px",
  children,
  showCloseButton = true,
  className = "",
  overlayClassName = "",
  closeButtonClassName = "",
}) => {
  const [mounted, setMounted] = useState(open);

  useEffect(() => {
    if (open) setMounted(true);
    else setTimeout(() => setMounted(false), 300); // smooth exit
  }, [open]);

  const transform = useMemo(() => {
    if (open) return "translate(0,0)";
    switch (position) {
      case "left":
        return "translateX(-100%)";
      case "right":
        return "translateX(100%)";
      case "top":
        return "translateY(-100%)";
      case "bottom":
        return "translateY(100%)";
      default:
        return "translate(0,0)";
    }
  }, [open, position]);

  if (!mounted && !open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        } ${overlayClassName}`}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed bg-white shadow-lg flex flex-col transition-transform duration-300 ${className}`}
        style={{
          width: position === "left" || position === "right" ? size : "100%",
          height: position === "top" || position === "bottom" ? size : "100%",
          top: position === "bottom" || position === "top" ? (position === "bottom" ? "auto" : 0) : 0,
          bottom: position === "bottom" ? 0 : "auto",
          left: position === "left" ? 0 : position === "right" ? "auto" : 0,
          right: position === "right" ? 0 : position === "left" ? "auto" : 0,
          transform,
        }}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 transition-colors ${closeButtonClassName}`}
            aria-label="Close drawer"
          >
            <X size={20} />
          </button>
        )}

        <div className="flex-1 overflow-auto p-4">{children}</div>
      </div>
    </>
  );
};