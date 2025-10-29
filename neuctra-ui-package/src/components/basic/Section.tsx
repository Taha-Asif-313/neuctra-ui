import React, { useState, useEffect, useMemo } from "react";
import { Container } from "./Container";

type ScreenSize = "sm" | "md" | "lg";
type ResponsiveProp<T> = T | Partial<Record<ScreenSize, T>>;

interface SectionProps {
  /** Headings */
  title?: string;
  subtitle?: string;

  /** Responsive variant styles */
  variant?: ResponsiveProp<
    "light" | "dark" | "gradient" | "transparent" | "primary"
  >;

  /** Custom backgrounds */
  background?: ResponsiveProp<string>;
  overlay?: ResponsiveProp<string>;
  color?: ResponsiveProp<string>;

  /** Spacing */
  paddingY?: ResponsiveProp<number | string>;
  paddingX?: ResponsiveProp<number | string>;

  /** Container size */
  size?: ResponsiveProp<"sm" | "md" | "lg" | "xl" | "2xl" | "full">;

  /** Section height */
  height?: ResponsiveProp<string>;

  /** Text alignment */
  align?: ResponsiveProp<"left" | "center" | "right">;

  /** Border radius */
  borderRadius?: ResponsiveProp<number | string>;

  /** Optional styling */
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/** 🎨 Preset Variants */
const variantStyles = {
  light: { background: "#ffffff", color: "#111827" },
  dark: { background: "#0f172a", color: "#f9fafb" },
  gradient: {
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    color: "#ffffff",
  },
  transparent: { background: "transparent", color: "#111827" },
  primary: { background: "#3b82f6", color: "#ffffff" },
};

/** 🧩 Utility: Resolve responsive props safely */
function resolveResponsive<T>(
  prop: ResponsiveProp<T> | undefined,
  screen: ScreenSize,
  fallback?: T
): T | undefined {
  if (prop == null) return fallback;
  if (typeof prop !== "object") return prop as T;
  return (prop as Partial<Record<ScreenSize, T>>)[screen] ?? fallback;
}

/** 📱 Determine current breakpoint */
function getScreenSize(width: number): ScreenSize {
  if (width < 768) return "sm";
  if (width < 1024) return "md";
  return "lg";
}

/**
 * 🧱 Section Component
 * A flexible layout wrapper that supports responsive backgrounds,
 * adaptive padding, and variant-based theming.
 */
export const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  variant = "light",
  background,
  overlay,
  color,
  paddingY = 60,
  paddingX = 20,
  size = "xl",
  height = "auto",
  align = "center",
  borderRadius = 0,
  className = "",
  style,
  children,
}) => {
  const [screenSize, setScreenSize] = useState<ScreenSize>("lg");

  useEffect(() => {
    const updateSize = () => setScreenSize(getScreenSize(window.innerWidth));
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const resolvedVariant = resolveResponsive(variant, screenSize, "light")!;
  const theme = variantStyles[resolvedVariant];

  const resolvedStyles: React.CSSProperties = useMemo(() => {
    const bg = resolveResponsive(background, screenSize, theme.background);
    const textColor = resolveResponsive(color, screenSize, theme.color);
    const overlayColor = resolveResponsive(overlay, screenSize);
    const py = resolveResponsive(paddingY, screenSize, 60);
    const px = resolveResponsive(paddingX, screenSize, 20);
    const alignText = resolveResponsive(align, screenSize, "center");
    const h = resolveResponsive(height, screenSize, "auto");
    const radius = resolveResponsive(borderRadius, screenSize, 0);

    return {
      position: "relative",
      background: bg,
      color: textColor,
      paddingTop: typeof py === "number" ? `${py}px` : py,
      paddingBottom: typeof py === "number" ? `${py}px` : py,
      paddingLeft: typeof px === "number" ? `${px}px` : px,
      paddingRight: typeof px === "number" ? `${px}px` : px,
      textAlign: alignText,
      height: h,
      borderRadius: typeof radius === "number" ? `${radius}px` : radius,
      boxSizing: "border-box",
      overflow: "hidden",
      ...style,
    };
  }, [
    background,
    color,
    overlay,
    paddingY,
    paddingX,
    align,
    height,
    borderRadius,
    theme,
    screenSize,
    style,
  ]);

  const resolvedOverlay = resolveResponsive(overlay, screenSize);

  return (
    <section style={resolvedStyles} className={className}>
      {/* Overlay */}
      {resolvedOverlay && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: resolvedOverlay,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Inner Container */}
      <Container
        size={resolveResponsive(size, screenSize, "xl")}
        className="relative z-10"
      >
        {(title || subtitle) && (
          <header style={{ marginBottom: 32 }}>
            {title && (
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  marginBottom: subtitle ? 8 : 0,
                }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                style={{
                  fontSize: "1.125rem",
                  color:
                    resolvedVariant === "dark"
                      ? "rgba(255,255,255,0.7)"
                      : "rgba(0,0,0,0.6)",
                }}
              >
                {subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
};

export default Section;
