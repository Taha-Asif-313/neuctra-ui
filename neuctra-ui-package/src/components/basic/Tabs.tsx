"use client";
import React, {
  ReactNode,
  CSSProperties,
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  KeyboardEvent,
} from "react";
import clsx from "clsx";

/* ------------------------------------------------------------------ */
/*  Responsive hook                                                     */
/* ------------------------------------------------------------------ */

function useBreakpoint(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

type Position = "top" | "bottom" | "left" | "right";
type Variant = "solid" | "outline" | "underline" | "pill";

/**
 * mobileVariant — how <TabList> behaves on small screens:
 *  "drawer"   → collapses into an animated dropdown (hamburger-style)
 *  "scroll"   → horizontal scrollable strip with snap (default)
 *  "stack"    → forced full-width vertical column
 *  "collapse" → left/right positions collapse to top row
 */
type MobileVariant = "drawer" | "scroll" | "stack" | "collapse";

interface TabsContextValue {
  active: number;
  setActive: (i: number) => void;
  variant: Variant;
  position: Position;
  primaryColor: string;
  activeColor: string;
  textColor: string;
  hoverColor: string;
  borderColor: string;
  disabledColor: string;
  radius: number;
  transitionDuration: number;
  fullWidth: boolean;
  tabCount: number;
  isMobile: boolean;
  mobileVariant: MobileVariant;
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx)
    throw new Error("<Tab>, <TabList>, <TabPanel> must be inside <Tabs>");
  return ctx;
}

/* ------------------------------------------------------------------ */
/*  <Tabs> — root provider                                              */
/* ------------------------------------------------------------------ */

export interface TabsProps {
  children: ReactNode;
  defaultActive?: number;
  position?: Position;
  variant?: Variant;
  fullWidth?: boolean;
  radius?: number;
  transitionDuration?: number;
  bordered?: boolean;

  /** Responsive */
  mobileBreakpoint?: number;
  mobileVariant?: MobileVariant;

  /** Colors */
  primaryColor?: string;
  activeColor?: string;
  textColor?: string;
  hoverColor?: string;
  borderColor?: string;
  disabledColor?: string;
  backgroundColor?: string;

  onTabChange?: (index: number) => void;
  tabCount?: number;
  style?: CSSProperties;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  children,
  defaultActive = 0,
  position = "top",
  variant = "solid",
  fullWidth = false,
  radius = 8,
  transitionDuration = 200,
  bordered = false,

  mobileBreakpoint = 768,
  mobileVariant = "scroll",

  primaryColor = "var(--primary)",
  activeColor = "#ffffff",
  textColor = "",
  hoverColor = "var(--primary)",
  borderColor = "#e5e7eb",
  disabledColor = "#9ca3af",
  backgroundColor = "transparent",

  onTabChange,
  tabCount = 0,
  style,
  className,
}) => {
  const [active, setActive] = useState(defaultActive);
  const [resolvedCount, setResolvedCount] = useState(tabCount);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useBreakpoint(mobileBreakpoint);

  useEffect(() => {
    if (!tabCount && containerRef.current) {
      setResolvedCount(
        containerRef.current.querySelectorAll("[data-tab-button]").length,
      );
    }
  });

  useEffect(() => {
    if (!isMobile) setDrawerOpen(false);
  }, [isMobile]);

  const handleSetActive = (i: number) => {
    setActive(i);
    onTabChange?.(i);
    if (isMobile && mobileVariant === "drawer") setDrawerOpen(false);
  };

  const effectivePosition: Position =
    isMobile && (position === "left" || position === "right")
      ? "top"
      : position;

  const isVertical =
    effectivePosition === "left" || effectivePosition === "right";

  return (
    <TabsContext.Provider
      value={{
        active,
        setActive: handleSetActive,
        variant,
        position: effectivePosition,
        primaryColor,
        activeColor,
        textColor,
        hoverColor,
        borderColor,
        disabledColor,
        radius,
        transitionDuration,
        fullWidth,
        tabCount: resolvedCount,
        isMobile,
        mobileVariant,
        drawerOpen,
        setDrawerOpen,
      }}
    >
      <div
        ref={containerRef}
        className={clsx(
          "modern-tabs",
          "text-foreground",
          isVertical ? "flex flex-row" : "flex flex-col",
          effectivePosition === "right" && "flex-row-reverse",
          effectivePosition === "bottom" && "flex-col-reverse",
          bordered && "border border-border",
          className,
        )}
        style={{
          background: "bg-background",
          borderRadius: radius,
          overflow: "hidden",
          ...style,
        }}
      >
        <style>{`
          @keyframes tab-fade-in {
            from { opacity: 0; transform: translateY(4px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes tab-drawer-open {
            from { opacity: 0; transform: translateY(-6px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .tab-panel-active {
            animation: tab-fade-in ${transitionDuration}ms ease;
          }
          .tab-drawer-menu {
            animation: tab-drawer-open ${transitionDuration}ms ease;
          }
          .tab-scroll-strip {
            overflow-x: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
          }
          .tab-scroll-strip::-webkit-scrollbar { display: none; }
          .tab-scroll-strip [data-tab-button] {
            scroll-snap-align: start;
            flex-shrink: 0;
          }
        `}</style>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

/* ------------------------------------------------------------------ */
/*  <TabList>                                                           */
/* ------------------------------------------------------------------ */

export interface TabListProps {
  children: ReactNode;
  gap?: number;
  /** Label shown in drawer trigger when no tab is active (fallback) */
  drawerLabel?: ReactNode;
  /** Icon for the drawer chevron area */
  drawerIcon?: ReactNode;
  style?: CSSProperties;
  className?: string;
}

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 200ms ease",
      display: "flex",
      flexShrink: 0,
    }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const TabList: React.FC<TabListProps> = ({
  children,
  gap = 8,
  drawerLabel = "Select tab",
  style,
  className,
}) => {
  const {
    position,
    isMobile,
    mobileVariant,
    drawerOpen,
    setDrawerOpen,
    primaryColor,
    activeColor,
    radius,
    active,
  } = useTabsContext();

  const isVertical = position === "left" || position === "right";

  /* ---- MOBILE: Drawer ---- */
  if (isMobile && mobileVariant === "drawer") {
    const tabArray = React.Children.toArray(children);
    const activeTabEl = tabArray[active] as
      | React.ReactElement<TabProps>
      | undefined;
    const activeLabel = activeTabEl?.props?.children ?? drawerLabel;

    return (
      <div
        className={clsx(
          "relative w-full bg-background text-foreground",
          className,
        )}
        style={{ padding: 8, ...style }}
      >
        {/* Trigger */}
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          className="flex items-center justify-between w-full font-medium border border-border bg-background text-foreground hover:bg-accent transition-colors"
          style={{
            padding: "10px 16px",
            borderRadius: radius,
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          <span>{activeLabel}</span>
          <ChevronIcon open={drawerOpen} />
        </button>

        {/* Dropdown */}
        {drawerOpen && (
          <div
            className="tab-drawer-menu absolute left-0 right-0 z-50 flex flex-col bg-background text-foreground border border-border"
            style={{
              top: "calc(100% + 4px)",
              borderRadius: radius,
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              gap: 4,
              padding: 6,
            }}
          >
            {children}
          </div>
        )}
      </div>
    );
  }

  /* ---- MOBILE: Horizontal scroll strip ---- */
  if (isMobile && mobileVariant === "scroll") {
    return (
      <div
        role="tablist"
        className={clsx(
          "tab-scroll-strip flex flex-row w-full bg-background text-foreground",
          className,
        )}
        style={{ gap, padding: 8, ...style }}
      >
        {children}
      </div>
    );
  }

  /* ---- MOBILE: Stacked vertical ---- */
  if (isMobile && mobileVariant === "stack") {
    return (
      <div
        role="tablist"
        className={clsx(
          "flex flex-col w-full bg-background text-foreground",
          className,
        )}
        style={{ gap, padding: 8, ...style }}
      >
        {children}
      </div>
    );
  }

  /* ---- MOBILE: Collapse (fix) ---- */
  if (isMobile && mobileVariant === "collapse") {
    return (
      <div
        role="tablist"
        className={clsx(
          "flex flex-row flex-wrap w-full bg-background text-foreground",
          className,
        )}
        style={{
          gap,
          padding: 8,
          ...style,
        }}
      >
        {children}
      </div>
    );
  }

  /* ---- Default: desktop / collapse ---- */
  return (
    <div
      role="tablist"
      className={clsx(
        "flex text-foreground",
        isVertical ? "flex-col" : "flex-row",
        isVertical ? "min-w-40" : "w-full",
        className,
      )}
      style={{ gap, padding: 8, ...style }}
    >
      {children}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  <Tab>                                                               */
/* ------------------------------------------------------------------ */

export interface TabProps {
  children: ReactNode;
  index?: number;
  icon?: ReactNode;
  disabled?: boolean;
  ariaLabel?: string;
  style?: CSSProperties;
  className?: string;
  activeStyle?: CSSProperties;
  inactiveStyle?: CSSProperties;
}

export const Tab: React.FC<TabProps> = ({
  children,
  index,
  icon,
  disabled = false,
  ariaLabel,
  style,
  className,
  activeStyle,
  inactiveStyle,
}) => {
  const {
    active,
    setActive,
    variant,
    primaryColor,
    activeColor,
    textColor,
    hoverColor,
    borderColor,
    disabledColor,
    radius,
    transitionDuration,
    fullWidth,
    tabCount,
    isMobile,
    mobileVariant,
  } = useTabsContext();

  const selfIndexRef = useRef<number | undefined>(index);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const resolvedIndex = (): number => {
    if (selfIndexRef.current !== undefined) return selfIndexRef.current;
    if (!buttonRef.current) return 0;
    const list = buttonRef.current
      .closest("[role=tablist], .tab-drawer-menu")
      ?.querySelectorAll("[data-tab-button]");
    if (!list) return 0;
    return Array.from(list).indexOf(buttonRef.current);
  };

  const [hovered, setHovered] = useState(false);
  const isActive = resolvedIndex() === active;

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const count = tabCount || 1;
    const idx = resolvedIndex();
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setActive((idx + 1) % count);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setActive((idx - 1 + count) % count);
    }
  };

  const variantBase: CSSProperties =
    variant === "outline"
      ? { border: "1px solid var(--border)" }
      : variant === "underline"
        ? { borderBottom: "2px solid transparent", borderRadius: 0 }
        : variant === "pill"
          ? { borderRadius: 999 }
          : { border: "none" };

  const variantActive: CSSProperties =
    variant === "solid" || variant === "pill"
      ? {
          background: "var(--primary)",
          color: "var(--primary-foreground)",
          boxShadow: "0 2px 8px var(--primary) / 0.25",
        }
      : variant === "outline"
        ? {
            borderColor: "var(--primary)",
            color: "var(--primary)",
            background: "var(--accent)",
          }
        : variant === "underline"
          ? {
              borderBottomColor: "var(--primary)",
              color: "var(--primary)",
            }
          : {};

  const variantHover: CSSProperties =
    variant === "underline"
      ? { color: "var(--foreground)" }
      : {
          background: "var(--accent)",
          color: "var(--foreground)",
        };

  const forceFullWidth =
    isMobile &&
    (mobileVariant === "stack" ||
      mobileVariant === "drawer" ||
      mobileVariant === "collapse");

  return (
    <button
      ref={buttonRef}
      data-tab-button
      role="tab"
      aria-selected={isActive}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => !disabled && setActive(resolvedIndex())}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={clsx(
        "flex items-center justify-center gap-2 font-medium select-none transition-all",
        (fullWidth || forceFullWidth) && "w-full",
        "text-muted-foreground",
        isActive && "text-foreground",
        disabled && "opacity-60 cursor-not-allowed",
        !disabled && "cursor-pointer",
        className,
      )}
      style={{
        padding: "10px 16px",
        borderRadius: radius,
        transitionDuration: `${transitionDuration}ms`,
        fontSize: 14,
        whiteSpace: "nowrap",
        ...variantBase,
        ...(isActive ? variantActive : {}),
        ...(isActive ? activeStyle : inactiveStyle),
        ...(hovered && !isActive && !disabled ? variantHover : {}),
        ...(disabled ? { color: "var(--muted-foreground)" } : {}),
        ...style,
      }}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};

/* ------------------------------------------------------------------ */
/*  <TabPanels>                                                         */
/* ------------------------------------------------------------------ */

export interface TabPanelsProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export const TabPanels: React.FC<TabPanelsProps> = ({
  children,
  style,
  className,
}) => {
  return (
    <div
      className={clsx(
        "flex-1 min-w-0 text-foreground",
        className,
      )}
      style={{
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  <TabPanel>                                                          */
/* ------------------------------------------------------------------ */

export interface TabPanelProps {
  children: ReactNode;
  index: number;
  keepMounted?: boolean;
  style?: CSSProperties;
  className?: string;
}

export const TabPanel: React.FC<TabPanelProps> = ({
  children,
  index,
  keepMounted = false,
  style,
  className,
}) => {
  const { active } = useTabsContext();
  const isActive = index === active;

  if (!keepMounted && !isActive) return null;

  return (
    <div
      role="tabpanel"
      hidden={!isActive}
      className={clsx(
        isActive && "tab-panel-active",
        "text-foreground",
        className,
      )}
      style={{ display: isActive ? undefined : "none", ...style }}
    >
      {children}
    </div>
  );
};
