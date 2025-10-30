"use client";
import React, { useMemo, useState, CSSProperties, FC } from "react";

/** 🌈 Default color palette */
const defaultColors = {
  light: {
    default: "#111",
    primary: "#2563eb",
    success: "#16a34a",
    danger: "#dc2626",
    white: "#ffffff",
    muted: "#6b7280",
    border: "#d1d5db",
    hover: "#1d4ed8",
    text: "#ffffff",
  },
  dark: {
    default: "#f8fafc",
    primary: "#60a5fa",
    success: "#22c55e",
    danger: "#f87171",
    white: "#ffffff",
    muted: "#9ca3af",
    border: "#374151",
    hover: "#3b82f6",
    text: "#000000",
  },
};

/** 🎨 Adjust color shade utility */
function adjustColor(color: string, amount: number): string {
  if (!color.startsWith("#") || color.length !== 7) return color;
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (hex) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(hex, 16) + amount)).toString(16)
        ).slice(-2)
      )
  );
}

/** ⚙️ Props */
export interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;

  /** 🎨 Theme options */
  darkMode?: boolean;
  baseColor?: string;

  /** 🧩 Optional design tweaks */
  size?: "sm" | "md" | "lg";
  rounded?: boolean;

  /** 🧱 Border visibility */
  showBorder?: boolean; // ✅ new prop
}

/** 💎 Minimal customizable Button */
export const Button: FC<ButtonProps> = ({
  children,
  type = "button",
  onClick,
  iconBefore,
  iconAfter,
  className = "",
  style,
  fullWidth = false,
  disabled = false,
  loading = false,
  loadingText = "Loading...",
  darkMode = false,
  baseColor,
  size = "md",
  rounded = true,
  showBorder = false, // ✅ default: no border
}) => {
  const [hovered, setHovered] = useState(false);

  /** 🧠 Theme system */
  const theme = useMemo(() => {
    if (!baseColor) return defaultColors[darkMode ? "dark" : "light"];

    const light = {
      primary: baseColor,
      hover: adjustColor(baseColor, -40),
      text: "#ffffff",
      border: adjustColor(baseColor, -60),
    };
    const dark = {
      primary: adjustColor(baseColor, 60),
      hover: adjustColor(baseColor, 80),
      text: "#000000",
      border: adjustColor(baseColor, 40),
    };
    return darkMode ? dark : light;
  }, [baseColor, darkMode]);

  /** 📏 Sizes */
  const sizes: Record<
    NonNullable<ButtonProps["size"]>,
    { px: number; py: number; font: string }
  > = {
    sm: { px: 16, py: 6, font: "0.85rem" },
    md: { px: 24, py: 10, font: "1rem" },
    lg: { px: 32, py: 14, font: "1.125rem" },
  };

  const s = sizes[size];

  /** 💅 Computed styles */
  const buttonStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: `${s.py}px ${s.px}px`,
    fontSize: s.font,
    fontWeight: 500,
    borderRadius: rounded ? 8 : 3,
    border: showBorder ? `1px solid ${theme.border}` : "none", // ✅ conditional border
    width: fullWidth ? "100%" : "auto",
    backgroundColor: hovered && !disabled ? theme.hover : theme.primary,
    color: theme.text,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    transition: "all 0.25s ease-in-out",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.15)",
    ...style,
  };

  return (
    <button
      type={type}
      className={className}
      style={buttonStyle}
      onClick={!disabled && !loading ? onClick : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={disabled}
    >
      {loading ? (
        <>
          <span
            style={{
              width: "16px",
              height: "16px",
              border: "2px solid currentColor",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          {iconBefore && <span>{iconBefore}</span>}
          <span>{children}</span>
          {iconAfter && <span>{iconAfter}</span>}
        </>
      )}

      {/* Spinner animation */}
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </button>
  );
};

export default Button;
