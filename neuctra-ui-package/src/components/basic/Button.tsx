"use client";
import React, { CSSProperties } from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
  className?: string;
  style?: CSSProperties; // ✅ NEW
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;

  // Styling options
  paddingHorizontal?: number;
  paddingVertical?: number;
  fontSize?: string;
  fontWeight?: string | number;
  borderRadius?: number;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  hoverBgColor?: string;
  hoverTextColor?: string;
  hoverBorderColor?: string;
  boxShadow?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  onClick,
  iconBefore,
  iconAfter,
  className = "",
  style, // ✅ NEW
  fullWidth = false,
  disabled = false,
  loading = false,
  loadingText = "Loading...",

  paddingHorizontal = 30,
  paddingVertical = 8,
  fontSize = "16px",
  fontWeight = 400,
  borderRadius = 6,
  backgroundColor = "#02b314",
  textColor = "white",
  borderColor = "transparent",
  hoverBgColor = "transparent",
  hoverTextColor = "black",
  hoverBorderColor,
  boxShadow = "0 1px 2px rgba(0, 0, 0, 0.05)",
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const currentTextColor =
    isHovered && !disabled ? hoverTextColor || textColor : textColor;
  const currentBorderColor =
    isHovered && !disabled ? hoverBorderColor || borderColor : borderColor;
  const currentBackgroundColor =
    isHovered && !disabled ? hoverBgColor : backgroundColor;

  const baseStyles: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: `${paddingVertical}px ${paddingHorizontal}px`,
    fontSize,
    fontWeight,
    borderRadius: `${borderRadius}px`,
    width: fullWidth ? "100%" : "auto",
    color: currentTextColor,
    border: `1px solid ${currentBorderColor}`,
    backgroundColor: currentBackgroundColor,
    boxShadow,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    transition: "all 0.2s ease-in-out",
    gap: "8px",
    ...style, // ✅ Apply user-supplied inline styles last
  };

  return (
    <button
      type={type}
      className={className}
      style={baseStyles}
      onClick={!disabled && !loading ? onClick : undefined}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {loading ? (
        <>
          <span
            style={{
              width: "18px",
              height: "18px",
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
