"use client";
import React, { useState, CSSProperties, useEffect, useRef } from "react";

/** 🧩 Types */
interface TabItem {
  label: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  ariaLabel?: string;
}

interface TabsProps {
  tabs: TabItem[];
  defaultActive?: number;
  position?: "top" | "left" | "right";
  variant?: "solid" | "outline" | "underline";
  fullWidth?: boolean;
  gap?: number;
  radius?: number;
  padding?: string;
  transitionDuration?: number;
  elevation?: number;
  bordered?: boolean;

  /** 🎨 Colors */
  primaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  hoverColor?: string;
  activeColor?: string;
  borderColor?: string;
  disabledColor?: string;

  /** 📱 Responsive */
  responsiveBreakpoint?: number;
  showDrawerLabel?: string;
  drawerIcon?: React.ReactNode;

  /** ⚙️ Callbacks */
  onTabChange?: (index: number) => void;

  /** 🧱 Classes and Styles */
  className?: string;
  style?: CSSProperties;
  tabClassName?: string;
  contentClassName?: string;
  activeTabStyle?: CSSProperties;
  inactiveTabStyle?: CSSProperties;
  contentStyle?: CSSProperties;
}

/** 💎 Modern, Fully Customizable Tabs */
export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultActive = 0,
  position = "top",
  variant = "solid",
  fullWidth = false,
  gap = 8,
  radius = 8,
  padding = "12px 18px",
  transitionDuration = 200,
  elevation = 1,
  bordered = false,

  primaryColor = "#2563eb",
  backgroundColor = "transparent",
  textColor = "#374151",
  hoverColor = "#1d4ed8",
  activeColor = "#ffffff",
  borderColor = "#e5e7eb",
  disabledColor = "#9ca3af",

  responsiveBreakpoint = 768,
  showDrawerLabel = "Select Tab",
  drawerIcon = "☰",

  onTabChange,
  className = "",
  style,
  tabClassName = "",
  contentClassName = "",
  activeTabStyle,
  inactiveTabStyle,
  contentStyle,
}) => {
  const [active, setActive] = useState(defaultActive);
  const [hovered, setHovered] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /** 📱 Responsive detection */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= responsiveBreakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [responsiveBreakpoint]);

  /** 🎛 Handle tab change */
  const handleChange = (i: number) => {
    if (tabs[i].disabled) return;
    setActive(i);
    onTabChange?.(i);
    if (isMobile) setDrawerOpen(false);
  };

  /** ⚡ Keyboard navigation */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      handleChange((i + 1) % tabs.length);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      handleChange((i - 1 + tabs.length) % tabs.length);
    }
  };

  /** 🎨 Base styles */
  const baseTab: CSSProperties = {
    padding,
    borderRadius: radius,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
    fontWeight: 500,
    transition: `all ${transitionDuration}ms ease`,
    background: "transparent",
    border: variant === "outline" ? `1px solid ${borderColor}` : "none",
    borderBottom: variant === "underline" ? `2px solid transparent` : undefined,
    color: textColor,
    width: fullWidth ? "100%" : "auto",
    userSelect: "none",
  };

  const activeTab: CSSProperties = {
    background: variant === "solid" ? primaryColor : "transparent",
    color: activeColor,
    borderBottom: variant === "underline" ? `2px solid ${primaryColor}` : undefined,
    boxShadow:
      elevation > 0 ? `0 ${elevation}px ${elevation * 4}px ${primaryColor}33` : undefined,
    ...activeTabStyle,
  };

  const inactiveTab: CSSProperties = {
    ...(variant === "outline" ? { borderColor } : {}),
    ...(variant === "underline" ? { borderBottomColor: "transparent" } : {}),
    ...inactiveTabStyle,
  };

  const hoverTab: CSSProperties = {
    color: hoverColor,
    background:
      variant === "solid"
        ? `${primaryColor}11`
        : variant === "outline"
        ? `${primaryColor}11`
        : "transparent",
  };

  const disabledTab: CSSProperties = {
    color: disabledColor,
    cursor: "not-allowed",
    opacity: 0.6,
  };

  const contentBox: CSSProperties = {
    flexGrow: 1,
    borderTop: bordered && position === "top" ? `1px solid ${borderColor}` : undefined,
    borderLeft: bordered && position === "left" ? `1px solid ${borderColor}` : undefined,
    borderRight: bordered && position === "right" ? `1px solid ${borderColor}` : undefined,
    borderRadius: radius,
    ...contentStyle,
  };

  /** 🧱 Layout */
  const isVertical = position === "left" || position === "right";

  return (
    <div
      ref={containerRef}
      className={`modern-tabs ${className}`}
      style={{
        display: "flex",
        flexDirection: isVertical ? (position === "right" ? "row-reverse" : "row") : "column",
        background: backgroundColor,
        border: bordered ? `1px solid ${borderColor}` : undefined,
        borderRadius: radius,
        overflow: "hidden",
        ...style,
      }}
    >
      <style>
        {`
          @keyframes tab-fade {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .modern-tabs__content {
            animation: tab-fade ${transitionDuration}ms ease;
          }
        `}
      </style>

      {/* 📱 Mobile Drawer */}
      {isMobile ? (
        <div style={{ width: "100%", padding: 8 }}>
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            style={{
              ...baseTab,
              ...activeTab,
              justifyContent: "space-between",
              width: "100%",
              fontSize: 16,
            }}
          >
            {showDrawerLabel}
            <span>{drawerIcon}</span>
          </button>
          {drawerOpen && (
            <div style={{ display: "flex", flexDirection: "column", marginTop: 8, gap }}>
              {tabs.map((tab, i) => {
                const isActive = i === active;
                const isHovered = hovered === i;
                const isDisabled = tab.disabled;
                return (
                  <button
                    key={i}
                    disabled={isDisabled}
                    onClick={() => handleChange(i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    className={tabClassName}
                    style={{
                      ...baseTab,
                      ...(isActive ? activeTab : inactiveTab),
                      ...(isHovered && !isActive && !isDisabled ? hoverTab : {}),
                      ...(isDisabled ? disabledTab : {}),
                    }}
                  >
                    {tab.icon && <span>{tab.icon}</span>}
                    {tab.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: isVertical ? "column" : "row",
            gap,
            padding: 8,
            minWidth: isVertical ? 200 : undefined,
          }}
        >
          {tabs.map((tab, i) => {
            const isActive = i === active;
            const isHovered = hovered === i;
            const isDisabled = tab.disabled;
            return (
              <button
                key={i}
                disabled={isDisabled}
                onClick={() => handleChange(i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={tabClassName}
                style={{
                  ...baseTab,
                  ...(isActive ? activeTab : inactiveTab),
                  ...(isHovered && !isActive && !isDisabled ? hoverTab : {}),
                  ...(isDisabled ? disabledTab : {}),
                }}
                role="tab"
                aria-selected={isActive}
              >
                {tab.icon && <span>{tab.icon}</span>}
                {tab.label}
              </button>
            );
          })}
        </div>
      )}

      {/* 🧠 Tab Content */}
      <div
        className={`modern-tabs__content ${contentClassName}`}
        style={contentBox}
        role="tabpanel"
      >
        {tabs[active]?.content}
      </div>
    </div>
  );
};