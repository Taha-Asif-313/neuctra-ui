import React, { useEffect, useState, useMemo } from "react";
import {
  X,
  Info,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";

type AlertType = "success" | "error" | "warning" | "info";
type AlertPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface AlertProps {
  title?: string;
  description?: string;
  type?: AlertType;
  dismissible?: boolean;
  duration?: number;
  onClose?: () => void;

  /** Customization */
  icon?: React.ReactNode;
  actionButton?: React.ReactNode;
  position?: AlertPosition;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  borderRadius?: string | number;
  shadow?: string;
  padding?: string | number;
  fontSize?: string | number;
  fontWeight?: number | string;
  descriptionColor?: string;
  animationDuration?: string;
  maxWidth?: string;
  className?: string;
  style?: React.CSSProperties;
}

const typeStyles: Record<AlertType, any> = {
  success: {
    bg: "#ecfdf5",
    border: "#34d399",
    iconColor: "#059669",
    Icon: <CheckCircle size={20} />,
  },
  error: {
    bg: "#fef2f2",
    border: "#f87171",
    iconColor: "#dc2626",
    Icon: <AlertCircle size={20} />,
  },
  warning: {
    bg: "#fffbeb",
    border: "#facc15",
    iconColor: "#d97706",
    Icon: <AlertTriangle size={20} />,
  },
  info: {
    bg: "#eff6ff",
    border: "#3b82f6",
    iconColor: "#2563eb",
    Icon: <Info size={20} />,
  },
};

/** 📍 Dynamic position styles */
const getPositionStyle = (position: AlertPosition): React.CSSProperties => {
  const base: React.CSSProperties = {
    position: "fixed",
    zIndex: 9999,
    pointerEvents: "auto",
  };

  switch (position) {
    case "top-left":
      return { ...base, top: "1.25rem", left: "1.25rem" };
    case "top-center":
      return { ...base, top: "1.25rem", left: "50%", transform: "translateX(-50%)" };
    case "top-right":
      return { ...base, top: "1.25rem", right: "1.25rem" };
    case "bottom-left":
      return { ...base, bottom: "1.25rem", left: "1.25rem" };
    case "bottom-center":
      return { ...base, bottom: "1.25rem", left: "50%", transform: "translateX(-50%)" };
    case "bottom-right":
    default:
      return { ...base, bottom: "1.25rem", right: "1.25rem" };
  }
};

/** 🎯 Production-grade Alert Component */
export const Alert: React.FC<AlertProps> = ({
  title,
  description,
  type = "info",
  dismissible = true,
  duration,
  onClose,
  icon,
  actionButton,
  position = "top-right",
  backgroundColor,
  borderColor,
  textColor = "#111827",
  borderRadius = "0.75rem",
  shadow = "0 4px 14px rgba(0,0,0,0.1)",
  padding = "1rem",
  fontSize = "0.95rem",
  fontWeight = 500,
  descriptionColor = "#374151",
  animationDuration = "300ms",
  maxWidth = "480px",
  className = "",
  style,
}) => {
  const [visible, setVisible] = useState(true);

  /** Auto-dismiss after duration */
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const { bg, border, iconColor, Icon } = typeStyles[type];
  const positionStyle = getPositionStyle(position);

  /** Combine computed and custom styles */
  const containerStyle: React.CSSProperties = useMemo(
    () => ({
      ...positionStyle,
      display: "flex",
      alignItems: "flex-start",
      gap: "0.75rem",
      backgroundColor: backgroundColor ?? bg,
      borderLeft: `4px solid ${borderColor ?? border}`,
      borderRadius,
      color: textColor,
      boxShadow: shadow,
      padding,
      maxWidth,
      width: "calc(100% - 2.5rem)",
      opacity: visible ? 1 : 0,
      transform: visible
        ? position.includes("bottom")
          ? "translateY(0)"
          : "translateY(0)"
        : position.includes("bottom")
        ? "translateY(20px)"
        : "translateY(-20px)",
      transition: `opacity ${animationDuration} ease, transform ${animationDuration} ease`,
      ...style,
    }),
    [
      visible,
      bg,
      border,
      borderColor,
      borderRadius,
      position,
      shadow,
      padding,
      textColor,
      maxWidth,
      backgroundColor,
      animationDuration,
      style,
    ]
  );

  if (!visible) return null;

  return (
    <div className={className} style={containerStyle} role="alert">
      {/* Icon */}
      <div style={{ color: iconColor, marginTop: "2px" }}>
        {icon || Icon}
      </div>

      {/* Text content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <div style={{ fontWeight: 600, fontSize, marginBottom: "4px" }}>
            {title}
          </div>
        )}
        {description && (
          <div
            style={{
              fontSize: "0.875rem",
              color: descriptionColor,
              lineHeight: 1.4,
            }}
          >
            {description}
          </div>
        )}
        {actionButton && (
          <div style={{ marginTop: "8px" }}>{actionButton}</div>
        )}
      </div>

      {/* Dismiss button */}
      {dismissible && (
        <button
          onClick={() => {
            setVisible(false);
            onClose?.();
          }}
          style={{
            background: "transparent",
            border: "none",
            color: "#6b7280",
            cursor: "pointer",
            marginLeft: "8px",
            padding: 0,
            lineHeight: 0,
          }}
          aria-label="Close alert"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

Alert.displayName = "Alert";
