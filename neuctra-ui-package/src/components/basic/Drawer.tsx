"use client";

import React, { useState, useEffect, ReactNode } from "react";
import clsx from "clsx";
import { X } from "lucide-react";

/* ---------------- 🧩 Drawer Button ---------------- */
interface DrawerButtonProps {
  label?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  labelClassName?: string;
  iconClassName?: string;
}

export const DrawerButton: React.FC<DrawerButtonProps> = ({
  label = "",
  icon,
  iconPosition = "left",
  onClick,
  className,
  style,
  labelClassName,
  iconClassName,
}) => (
  <button
    type="button"
    onClick={onClick}
    style={style}
    className={clsx(
      "inline-flex items-center justify-centertransition-all",
      className
    )}
  >
    {icon && iconPosition === "left" && <span className={iconClassName}>{icon}</span>}
    <span className={labelClassName}>{label}</span>
    {icon && iconPosition === "right" && <span className={iconClassName}>{icon}</span>}
  </button>
);

/* ---------------- 🧱 Drawer ---------------- */
interface DrawerProps {
  open: boolean;
  onClose?: () => void;
  position?: "left" | "right" | "top" | "bottom";
  size?: string;
  children?: ReactNode;
  showCloseButton?: boolean;
  className?: string;
  style?: React.CSSProperties;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  panelClassName?: string;
  panelStyle?: React.CSSProperties;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
  closeButtonClassName?: string;
  closeButtonStyle?: React.CSSProperties;
  zIndex?: number;
  renderContent?: (close: () => void) => ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  position = "right",
  size = "320px",
  children,
  showCloseButton = true,
  className,
  style,
  overlayClassName,
  overlayStyle,
  panelClassName,
  panelStyle,
  contentClassName,
  contentStyle,
  closeButtonClassName,
  closeButtonStyle,
  zIndex = 50,
  renderContent,
}) => {
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      // Double RAF: first frame commits the mount with off-screen transform,
      // second frame triggers the transition from that position into view.
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => {
          setIsAnimating(true);
        });
        return () => cancelAnimationFrame(raf2);
      });
      return () => cancelAnimationFrame(raf1);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Slide-in transform: off-screen when !isAnimating, in-view when isAnimating
  const getTransform = (): string => {
    if (isAnimating) return "translate(0, 0)";
    switch (position) {
      case "left":   return "translateX(-100%)";
      case "right":  return "translateX(100%)";
      case "top":    return "translateY(-100%)";
      case "bottom": return "translateY(100%)";
    }
  };

  // Panel is fixed and anchored to the correct edge.
  // FIX: each position only sets the edges it needs — no conflicting constraints.
  const getPanelStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: "fixed",
      transform: getTransform(),
      transitionProperty: "transform",
    };

    switch (position) {
      case "left":
        return { ...base, top: 0, left: 0, width: size, height: "100%" };
      case "right":
        return { ...base, top: 0, right: 0, width: size, height: "100%" };
      case "top":
        return { ...base, top: 0, left: 0, width: "100%", height: size };
      case "bottom":
        return { ...base, bottom: 0, left: 0, width: "100%", height: size };
    }
  };

  // Close button stays in the corner that makes sense per position
  const getCloseButtonPosition = (): string => {
    switch (position) {
      case "top":    return "bottom-2 right-2";
      case "bottom": return "top-2 right-2";
      default:       return "top-4 right-4";
    }
  };

  if (!mounted) return null;

  return (
    <div className={clsx("fixed inset-0", className)} style={{ zIndex, ...style }}>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={overlayStyle}
        className={clsx(
          "absolute inset-0 transition-all duration-300 ease-in-out",
          "bg-black/50 dark:bg-black/70",
          isAnimating ? "opacity-100" : "opacity-0 pointer-events-none",
          overlayClassName
        )}
      />

      {/* Panel */}
      <div
        className={clsx(
          "flex flex-col shadow-xl transition-transform duration-300 ease-in-out",
          "bg-white text-gray-900 dark:bg-zinc-900 dark:text-gray-100",
          panelClassName
        )}
        style={{ ...getPanelStyles(), ...panelStyle }}
      >
        {/* Close Button */}
        {showCloseButton && (
          <button
            onClick={onClose}
            aria-label="Close drawer"
            style={closeButtonStyle}
            className={clsx(
              "absolute p-2 rounded-full transition-colors",
              "hover:bg-gray-100 dark:hover:bg-zinc-800",
              "focus:outline-none focus:ring-2 focus:ring-blue-500",
              getCloseButtonPosition(),
              closeButtonClassName
            )}
          >
            <X size={20} />
          </button>
        )}

        {/* Content */}
        <div
          className={clsx("flex-1 overflow-auto", contentClassName)}
          style={contentStyle}
        >
          {renderContent ? renderContent(onClose || (() => {})) : children}
        </div>
      </div>
    </div>
  );
};