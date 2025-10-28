import { X } from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";

interface DrawerButtonProps {
  label?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  style?: React.CSSProperties;
}

interface DrawerProps {
  open: boolean;
  onClose?: () => void;
  position?: "left" | "right" | "top" | "bottom";
  width?: string;
  height?: string;
  backgroundColor?: string;
  transitionDuration?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  showCloseButton?: boolean;
  closeButtonStyle?: React.CSSProperties;
}

const DrawerButton: React.FC<DrawerButtonProps> = ({
  label = "Open Drawer",
  icon,
  iconPosition = "left",
  onClick,
  style = {},
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 16px",
        backgroundColor: "#2563eb",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        fontSize: "14px",
        gap: "8px",
        ...style,
      }}
    >
      {icon && iconPosition === "left" && icon}
      {label}
      {icon && iconPosition === "right" && icon}
    </button>
  );
};

const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  position = "right",
  width = "300px",
  height = "300px",
  backgroundColor = "#fff",
  transitionDuration = 300,
  style = {},
  children,
  showCloseButton = true,
  closeButtonStyle = {},
}) => {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setVisible(true);
    } else {
      setTimeout(() => setVisible(false), transitionDuration);
    }
  }, [open, transitionDuration]);

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

  const drawerStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: 1000,
    backgroundColor,
    transition: `transform ${transitionDuration}ms ease, opacity ${transitionDuration}ms ease`,
    transform,
    opacity: open ? 1 : 0,
    ...style,
    ...(position === "left" || position === "right"
      ? { top: 0, [position]: 0, width, height: "100%" }
      : { left: 0, [position]: 0, height, width: "100%" }),
  };

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    display: visible ? "block" : "none",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
    transition: `opacity ${transitionDuration}ms ease`,
    opacity: open ? 1 : 0,
    pointerEvents: open ? "auto" : "none",
  };

  const defaultCloseButtonStyle: React.CSSProperties = {
    position: "absolute",
    top: "10px",
    right: "10px",
    fontSize: "20px",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#000",
  };

  return (
    <>
      <div style={overlayStyle} onClick={onClose} />
    <div
  style={{
    ...drawerStyle,
    display: "block",
    visibility: visible ? "visible" : "hidden",
    pointerEvents: open ? "auto" : "none",
  }}
>
  {showCloseButton && (
    <button
      onClick={onClose}
      style={{ ...defaultCloseButtonStyle, ...closeButtonStyle }}
    >
      <X size={20} color="rgba(255, 0, 0, 1)" />
    </button>
  )}
  {children}
</div>

    </>
  );
};

export { Drawer, DrawerButton };
