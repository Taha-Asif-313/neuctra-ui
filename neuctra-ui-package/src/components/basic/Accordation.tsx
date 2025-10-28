import React, { useState, useRef, useEffect } from "react";

interface AccordationItem {
  title: string;
  content: React.ReactNode;
}

interface AccordationProps {
  items: AccordationItem[];
  allowMultiple?: boolean;
  defaultOpenIndex?: number[];
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  hoverTextColor?: string;
  paddingVertical?: string;
  paddingHorizontal?: string;
  margin?: string;
  iconOpen?: React.ReactNode;
  iconClose?: React.ReactNode;
  transitionDuration?: string;
  borderRadius?: string;
  shadow?: string;
  contentPadding?: string;
  fontSize?: string;
  fontWeight?: string;
  iconSize?: string;
  contentFontSize?: string;
  contentFontWeight?: string;
  contentBackgroundColor?: string;
  contentTextColor?: string;
  className?: string; // ✅ NEW
  style?: React.CSSProperties; // ✅ NEW
}

export const Accordation: React.FC<AccordationProps> = ({
  items,
  allowMultiple = false,
  defaultOpenIndex = [],
  borderColor = "#d1d5db",
  backgroundColor = "#ffffff",
  textColor = "#111827",
  hoverBgColor = "#f3f4f6",
  hoverTextColor = "#111827",
  paddingVertical = "16px",
  paddingHorizontal = "16px",
  margin = "12px 0",
  iconOpen = "−",
  iconClose = "+",
  transitionDuration = "300ms",
  borderRadius = "8px",
  shadow = "0 2px 8px rgba(0, 0, 0, 0.05)",
  contentPadding = "16px",
  fontSize = "16px",
  fontWeight = "600",
  iconSize = "18px",
  contentFontSize = "14px",
  contentFontWeight = "400",
  contentBackgroundColor = "#ffffff",
  contentTextColor = "#111827",
  className,
  style,
}) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>(defaultOpenIndex);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    contentRefs.current.forEach((el, index) => {
      if (el) {
        el.style.maxHeight = openIndexes.includes(index)
          ? `${el.scrollHeight}px`
          : "0px";
      }
    });
  }, [openIndexes]);

  const handleToggle = (index: number) => {
    setOpenIndexes((prev) =>
      allowMultiple
        ? prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
        : prev.includes(index)
        ? []
        : [index]
    );
  };

  return (
    <div className={className} style={{ width: "100%", ...style }}>
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            border: `1px solid ${borderColor}`,
            borderRadius,
            margin,
            boxShadow: shadow,
            overflow: "hidden",
            transition: `all ${transitionDuration} ease`,
          }}
        >
          <button
            ref={(el) => {
              buttonRefs.current[index] = el;
            }}
            onClick={() => handleToggle(index)}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor,
              color: textColor,
              padding: `${paddingVertical} ${paddingHorizontal}`,
              fontWeight,
              fontSize,
              cursor: "pointer",
              outline: "none",
              border: "none",
              transition: `all ${transitionDuration}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = hoverBgColor;
              e.currentTarget.style.color = hoverTextColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = backgroundColor;
              e.currentTarget.style.color = textColor;
            }}
          >
            <span>{item.title}</span>
            <span style={{ fontSize: iconSize }}>
              {openIndexes.includes(index) ? iconOpen : iconClose}
            </span>
          </button>

          <div
            ref={(el) => {
              contentRefs.current[index] = el;
            }}
            style={{
              overflow: "hidden",
              maxHeight: openIndexes.includes(index)
                ? `${contentRefs.current[index]?.scrollHeight}px`
                : "0px",
              transition: `max-height ${transitionDuration} ease-in-out`,
            }}
          >
            <div
              style={{
                borderTop: `1px solid ${borderColor}`,
                backgroundColor: contentBackgroundColor,
                color: contentTextColor,
                padding: contentPadding,
                fontSize: contentFontSize,
                fontWeight: contentFontWeight,
              }}
            >
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};