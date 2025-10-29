import React, { useState, useEffect, useMemo, CSSProperties, ReactNode } from "react";
import { X } from "lucide-react";

/* ---------------- 🧩 Drawer Button ---------------- */

export interface DrawerButtonProps {
  label?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  color?: string;
  textColor?: string;
  borderRadius?: string;
  padding?: string;
  fontSize?: string;
  gap?: string;
  style?: CSSProperties;
  className?: string;
}

export const DrawerButton: React.FC<DrawerButtonProps> = ({
  label = "Open Drawer",
  icon,
  iconPosition = "left",
  onClick,
  color = "#2563eb",
  textColor = "#fff",
  borderRadius = "6px",
  padding = "10px 16px",
  fontSize = "14px",
  gap = "8px",
  style,
  className = "",
}) => (
  <button
    onClick={onClick}
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: color,
      color: textColor,
      border: "none",
      borderRadius,
      padding,
      fontSize,
      gap,
      cursor: "pointer",
      fontWeight: 500,
      transition: "all 0.2s ease",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      ...style,
    }}
    className={className}
  >
    {icon && iconPosition === "left" && icon}
    {label}
    {icon && iconPosition === "right" && icon}
  </button>
);

/* ---------------- 🧱 Drawer ---------------- */

export interface DrawerProps {
  open: boolean;
  onClose?: () => void;
  position?: "left" | "right" | "top" | "bottom";
  width?: string;
  height?: string;
  backgroundColor?: string;
  backdropColor?: string;
  transitionDuration?: number;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
  showCloseButton?: boolean;
  closeIconColor?: string;
  closeButtonStyle?: CSSProperties;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  position = "right",
  width = "320px",
  height = "320px",
  backgroundColor = "#fff",
  backdropColor = "rgba(0,0,0,0.5)",
  transitionDuration = 300,
  style,
  className = "",
  children,
  showCloseButton = true,
  closeIconColor = "#000",
  closeButtonStyle,
}) => {
  const [visible, setVisible] = useState(open);

  // Handle mount/unmount delay for smooth fade-out
  useEffect(() => {
    if (open) setVisible(true);
    else setTimeout(() => setVisible(false), transitionDuration);
  }, [open, transitionDuration]);

  // Drawer transform direction
  const transform = useMemo(() => {
    if (open) return "translate(0, 0)";
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
        return "translate(0, 0)";
    }
  }, [open, position]);

  const drawerStyle: CSSProperties = {
    position: "fixed",
    backgroundColor,
    transition: `transform ${transitionDuration}ms ease, opacity ${transitionDuration}ms ease`,
    transform,
    opacity: open ? 1 : 0,
    zIndex: 1001,
    ...style,
    ...(position === "left" || position === "right"
      ? { top: 0, bottom: 0, [position]: 0, width, height: "100%" }
      : { left: 0, right: 0, [position]: 0, height, width: "100%" }),
  };

  const overlayStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    backgroundColor: backdropColor,
    opacity: open ? 1 : 0,
    transition: `opacity ${transitionDuration}ms ease`,
    zIndex: 1000,
    display: visible ? "block" : "none",
    pointerEvents: open ? "auto" : "none",
  };

  const defaultCloseButtonStyle: CSSProperties = {
    position: "absolute",
    top: "12px",
    right: "12px",
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.2s ease, opacity 0.2s ease",
  };

  return (
    <>
      {/* Overlay */}
      <div style={overlayStyle} onClick={onClose} />

      {/* Drawer Panel */}
      <div
        style={{
          ...drawerStyle,
          display: "flex",
          flexDirection: "column",
          visibility: visible ? "visible" : "hidden",
          pointerEvents: open ? "auto" : "none",
          boxShadow: "0 0 20px rgba(0,0,0,0.15)",
        }}
        className={className}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            style={{ ...defaultCloseButtonStyle, ...closeButtonStyle }}
            aria-label="Close drawer"
          >
            <X size={22} color={closeIconColor} />
          </button>
        )}

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px",
            scrollbarWidth: "thin",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};
