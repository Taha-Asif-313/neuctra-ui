import React, { useState, CSSProperties, useEffect } from "react";

interface TabItem {
  label: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  ariaLabel?: string;
}

interface TabsBaseProps {
  tabs: TabItem[];
  defaultActive?: number;
  activeTabClassName?: string;
  inactiveTabClassName?: string;
  tabContainerClassName?: string;
  contentContainerClassName?: string;
  className?: string;
  activeTabStyle?: CSSProperties;
  inactiveTabStyle?: CSSProperties;
  tabContainerStyle?: CSSProperties;
  contentContainerStyle?: CSSProperties;
  style?: CSSProperties;
  tabsWidth?: string | number;
  tabGap?: number;
  tabPadding?: string;
  tabBorderRadius?: number;
  primaryColor?: string;
  textColor?: string;
  backgroundColor?: string;
  hoverTextColor?: string;
  disabledColor?: string;
  responsiveBreakpoint?: number;
  showDrawerLabel?: string;
  drawerIcon?: React.ReactNode;
  transitionDuration?: number;
  onTabChange?: (index: number) => void;
  role?: string;
  ariaOrientation?: "horizontal" | "vertical";
}

const BaseTabs: React.FC<
  TabsBaseProps & { tabPosition: "left" | "top" | "right" }
> = ({
  tabs,
  defaultActive = 0,
  tabPosition,
  activeTabClassName = "",
  inactiveTabClassName = "",
  tabContainerClassName = "",
  contentContainerClassName = "",
  className = "",
  activeTabStyle,
  inactiveTabStyle,
  tabContainerStyle,
  contentContainerStyle,
  style,
  tabsWidth = "240px",
  tabGap = 8,
  tabPadding = "12px 16px",
  tabBorderRadius = 8,
  primaryColor = "#2563eb",
  textColor = "#374151",
  backgroundColor = "#ffffff",
  hoverTextColor = "#1e40af",
  disabledColor = "#d1d5db",
  responsiveBreakpoint = 768,
  showDrawerLabel = "Select Tab",
  drawerIcon = "☰",
  transitionDuration = 200,
  onTabChange,
  role = "tablist",
  ariaOrientation = "horizontal",
}) => {
  const [activeTab, setActiveTab] = useState(defaultActive);
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

 useEffect(() => {
  if (typeof window === "undefined") return; // skip on server

  const checkViewport = () => {
    setIsMobile(window.innerWidth <= responsiveBreakpoint);
  };

  checkViewport(); // set initial value on client
  window.addEventListener("resize", checkViewport);
  return () => window.removeEventListener("resize", checkViewport);
}, [responsiveBreakpoint]);

  useEffect(() => {
    if (defaultActive >= 0 && defaultActive < tabs.length) {
      setActiveTab(defaultActive);
    }
  }, [defaultActive, tabs.length]);

  const handleTabChange = (index: number) => {
    if (tabs[index].disabled) return;
    setActiveTab(index);
    onTabChange?.(index);
  };

  const isVertical = tabPosition === "left" || tabPosition === "right";
  
  // Mobile layout always uses vertical tabs in a drawer
  const containerDirection = isMobile 
    ? "column" 
    : isVertical
      ? tabPosition === "left"
        ? "row"
        : "row-reverse"
      : "column";

  const containerStyles: CSSProperties = {
    display: "flex",
    flexDirection: containerDirection,
    width: "100%",
    height: "100%",
    backgroundColor,
    ...style,
  };

  // Mobile tabs container is full width
  const tabsContainerStyles: CSSProperties = {
    width: isMobile ? "100%" : (isVertical ? tabsWidth : "100%"),
    display: "flex",
    flexDirection: isMobile ? "column" : (isVertical ? "column" : "row"),
    gap: tabGap,
    padding: isMobile ? "0" : "8px",
    boxSizing: "border-box",
    overflowX: isMobile ? "hidden" : "visible",
    ...tabContainerStyle,
  };

  const contentStyles: CSSProperties = {
    flexGrow: 1,
    padding: isMobile ? "16px" : "24px",
    background: "#f9fafb",
    boxSizing: "border-box",
    minWidth: 0,
    width: isMobile ? "100%" : (isVertical ? `calc(100% - ${tabsWidth})` : "100%"),
    ...contentContainerStyle,
  };

  const baseTabStyles: CSSProperties = {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: tabPadding,
    borderRadius: tabBorderRadius,
    border: "none",
    backgroundColor: "transparent",
    fontWeight: 500,
    transition: `all ${transitionDuration}ms ease`,
    width: isMobile || isVertical ? "100%" : "auto",
    marginBottom: isMobile || isVertical ? tabGap : 0,
    marginRight: !isVertical && !isMobile ? tabGap : 0,
    justifyContent: "flex-start",
    textAlign: "left",
    fontSize: isMobile ? "14px" : "inherit",
  };

  const activeStyles: CSSProperties = {
    backgroundColor: primaryColor,
    color: "#fff",
    fontWeight: 600,
    boxShadow: `0 2px 10px ${primaryColor}33`,
    ...activeTabStyle,
  };

  const inactiveStyles: CSSProperties = {
    backgroundColor: "transparent",
    color: textColor,
    ...inactiveTabStyle,
  };

  const hoverStyles: CSSProperties = {
    backgroundColor: `${primaryColor}11`,
    color: hoverTextColor,
  };

  const disabledStyles: CSSProperties = {
    cursor: "not-allowed",
    color: disabledColor,
    opacity: 0.7,
  };

  // Mobile drawer button styles
  const drawerButtonStyles: CSSProperties = {
    ...baseTabStyles,
    ...activeStyles,
    justifyContent: "space-between",
    width: "100%",
    marginBottom: tabGap,
    fontSize: "16px",
  };

  return (
    <div 
      className={`react-tabs ${className}`} 
      style={containerStyles}
      role={role}
      aria-orientation={isMobile ? "vertical" : (isVertical ? "vertical" : ariaOrientation)}
    >
      {/* Inlined CSS for better performance and scoping */}
      <style>
        {`
        .react-tabs {
          --primary-color: ${primaryColor};
          --text-color: ${textColor};
          --bg-color: ${backgroundColor};
          --hover-color: ${hoverTextColor};
          --disabled-color: ${disabledColor};
          --transition-duration: ${transitionDuration}ms;
        }
        
        .react-tabs__mobile-drawer {
          display: flex;
          flex-direction: column;
          gap: ${tabGap}px;
          width: 100%;
          animation: react-tabs-slideDown ${transitionDuration}ms ease-out;
        }
        
        @keyframes react-tabs-slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .react-tabs [role="tab"][aria-selected="true"] {
          background-color: var(--primary-color);
          color: white;
        }
        
        .react-tabs [role="tabpanel"] {
          outline: none;
        }
        
        @media (max-width: ${responsiveBreakpoint}px) {
          .react-tabs__drawer-button {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: ${tabPadding};
            border-radius: ${tabBorderRadius}px;
            margin-bottom: ${tabGap}px;
          }
          
          .react-tabs__nav {
            padding: 0;
          }
          
          .react-tabs__content {
            padding: 16px;
          }
        }
        `}
      </style>

      {/* Mobile Drawer Implementation */}
      {isMobile ? (
        <>
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            style={drawerButtonStyles}
            className="react-tabs__drawer-button"
            aria-expanded={drawerOpen}
            aria-controls="mobile-tabs-drawer"
            aria-haspopup="true"
          >
            <span>{showDrawerLabel}</span>
            <span>{drawerIcon}</span>
          </button>
          
          {drawerOpen && (
            <div 
              id="mobile-tabs-drawer"
              className="react-tabs__mobile-drawer"
              role="menu"
            >
              {tabs.map((tab, idx) => {
                const isActive = idx === activeTab;
                const isHovered = hoveredTab === idx;
                const isDisabled = tab.disabled;
                
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      handleTabChange(idx);
                      setDrawerOpen(false);
                    }}
                    onMouseEnter={() => !isDisabled && setHoveredTab(idx)}
                    onMouseLeave={() => setHoveredTab(null)}
                    className={
                      isActive ? activeTabClassName : inactiveTabClassName
                    }
                    style={{
                      ...baseTabStyles,
                      ...(isActive ? activeStyles : inactiveStyles),
                      ...(isHovered && !isActive && !isDisabled ? hoverStyles : {}),
                      ...(isDisabled ? disabledStyles : {}),
                    }}
                    role="menuitemradio"
                    aria-checked={isActive}
                    aria-disabled={isDisabled}
                    aria-label={tab.ariaLabel || (typeof tab.label === 'string' ? tab.label : `Tab ${idx + 1}`)}
                    disabled={isDisabled}
                  >
                    {tab.icon && <span aria-hidden="true">{tab.icon}</span>}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <nav
          className={`react-tabs__nav ${tabContainerClassName}`}
          style={tabsContainerStyles}
          role={role}
          aria-label="Tabs Navigation"
        >
          {tabs.map((tab, idx) => {
            const isActive = idx === activeTab;
            const isHovered = hoveredTab === idx;
            const isDisabled = tab.disabled;
            
            return (
              <button
                key={idx}
                onClick={() => handleTabChange(idx)}
                onMouseEnter={() => !isDisabled && setHoveredTab(idx)}
                onMouseLeave={() => setHoveredTab(null)}
                className={
                  isActive ? activeTabClassName : inactiveTabClassName
                }
                style={{
                  ...baseTabStyles,
                  ...(isActive ? activeStyles : inactiveStyles),
                  ...(isHovered && !isActive && !isDisabled ? hoverStyles : {}),
                  ...(isDisabled ? disabledStyles : {}),
                }}
                role="tab"
                aria-selected={isActive}
                aria-disabled={isDisabled}
                aria-controls={`tabpanel-${idx}`}
                id={`tab-${idx}`}
                tabIndex={isActive ? 0 : -1}
                disabled={isDisabled}
              >
                {tab.icon && <span aria-hidden="true">{tab.icon}</span>}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      )}

      {/* Tab Content */}
      <section
        className={`react-tabs__content ${contentContainerClassName}`}
        style={contentStyles}
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        tabIndex={0}
      >
        {tabs[activeTab]?.content}
      </section>
    </div>
  );
};

// Exported Components with TypeScript
export const LeftTabs: React.FC<TabsBaseProps> = (props) => (
  <BaseTabs {...props} tabPosition="left" ariaOrientation="vertical" />
);

export const TopTabs: React.FC<TabsBaseProps> = (props) => (
  <BaseTabs {...props} tabPosition="top" />
);

export const RightTabs: React.FC<TabsBaseProps> = (props) => (
  <BaseTabs {...props} tabPosition="right" ariaOrientation="vertical" />
);

// Default export
export const Tabs = {
  Left: LeftTabs,
  Top: TopTabs,
  Right: RightTabs,
};