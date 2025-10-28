import React, { useEffect, useState } from "react";
import { X, Info, CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";

type AlertType = "success" | "error" | "warning" | "info";

type AlertPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

interface AlertProps {
  title?: string;
  description?: string;
  type?: AlertType;
  dismissible?: boolean;
  onClose?: () => void;
  duration?: number;
  icon?: React.ReactNode;
  actionButton?: React.ReactNode;
  position?: AlertPosition;
  className?: string; // ✅ NEW
  style?: React.CSSProperties; // ✅ NEW
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

const getPositionStyle = (position: AlertPosition): React.CSSProperties => {
  const base: React.CSSProperties = {
    position: "fixed",
    zIndex: 9999,
  };

  switch (position) {
    case "top-left":
      return { ...base, top: "20px", left: "20px" };
    case "top-center":
      return { ...base, top: "20px", left: "50%", transform: "translateX(-50%)" };
    case "top-right":
      return { ...base, top: "20px", right: "20px" };
    case "bottom-left":
      return { ...base, bottom: "20px", left: "20px" };
    case "bottom-center":
      return { ...base, bottom: "20px", left: "50%", transform: "translateX(-50%)" };
    case "bottom-right":
    default:
      return { ...base, bottom: "20px", right: "20px" };
  }
};

export const Alert: React.FC<AlertProps> = ({
  title = "",
  description = "",
  type = "info",
  dismissible = true,
  onClose,
  duration,
  icon,
  actionButton,
  position = "top-right",
  className,
  style,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!visible) return null;

  const { bg, border, iconColor, Icon } = typeStyles[type];
  const positionStyle = getPositionStyle(position);

  return (
    <div
      className={className}
      style={{
        ...positionStyle,
        display: "flex",
        gap: "12px",
        padding: "16px",
        backgroundColor: bg,
        borderLeft: `4px solid ${border}`,
        borderRadius: "8px",
        color: "#111827",
        alignItems: "flex-start",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        animation: "slideIn 0.3s ease",
        maxWidth: "600px",
        width: "calc(100% - 40px)",
        ...style, // ✅ User custom styles merged last
      }}
    >
      <div style={{ color: iconColor, marginTop: "3px" }}>{icon || Icon}</div>

      <div style={{ flex: 1 }}>
        {title && (
          <div style={{ fontWeight: "600", marginBottom: "4px" }}>{title}</div>
        )}
        {description && (
          <div style={{ fontSize: "14px", color: "#374151" }}>
            {description}
          </div>
        )}
        {actionButton && (
          <div style={{ marginTop: "10px" }}>{actionButton}</div>
        )}
      </div>

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
          }}
        >
          <X size={16} />
        </button>
      )}

      {/* Inline keyframes */}
      <style>
        {`
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};