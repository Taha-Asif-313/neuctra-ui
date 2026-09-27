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
import { cn } from "../../lib/cn";

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
  /** `TabList` + `TabPanels` composition. */
  children: ReactNode;
  /** Initial active tab index (uncontrolled — Tabs owns the active-tab state internally). */
  defaultActive?: number;
  /** Where the tab list sits relative to the panels; collapses to `"top"` on mobile for `"left"`/`"right"`. */
  position?: Position;
  /** Visual style applied to each `Tab`. */
  variant?: Variant;
  /** Stretches tabs to fill the available width. */
  fullWidth?: boolean;
  /** Border radius (px) of the root container. */
  radius?: number;
  /** Duration (ms) of the panel fade-in / drawer-open animations. */
  transitionDuration?: number;
  /** Adds an outer border around the whole root container. */
  bordered?: boolean;

  // Responsive
  /** Max-width (px) below which mobile behavior (`mobileVariant`) kicks in. */
  mobileBreakpoint?: number;
  /** How `TabList` behaves on small screens — see `MobileVariant`. */
  mobileVariant?: MobileVariant;

  // Colors
  /** Exposed via context for custom tab extensions; not applied directly by `Tab`/`TabList` styling. */
  primaryColor?: string;
  /** Exposed via context for custom tab extensions; not applied directly by `Tab`/`TabList` styling. */
  activeColor?: string;
  /** Exposed via context for custom tab extensions; not applied directly by `Tab`/`TabList` styling. */
  textColor?: string;
  /** Exposed via context for custom tab extensions; not applied directly by `Tab`/`TabList` styling. */
  hoverColor?: string;
  /** Exposed via context for custom tab extensions; not applied directly by `Tab`/`TabList` styling. */
  borderColor?: string;
  /** Exposed via context for custom tab extensions; not applied directly by `Tab`/`TabList` styling. */
  disabledColor?: string;
  /** Root container background color; falls back to `var(--background)`. */
  backgroundColor?: string;

  /** Fired with the new index whenever the active tab changes. */
  onTabChange?: (index: number) => void;
  /** Overrides the auto-detected number of rendered tabs (used for keyboard wraparound); 0 or omitted auto-detects. */
  tabCount?: number;
  /** Inline styles for the root container. */
  style?: CSSProperties;
  /** Styles the root container. */
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

  backgroundColor,

  primaryColor = "var(--primary)",
  activeColor = "var(--foreground)",
  textColor = "",
  hoverColor = "var(--primary)",
  borderColor = "var(--border)",
  disabledColor = "var(--muted-foreground)",

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
    // Previously had NO dependency array while calling setState, so it re-ran
    // and re-queried the DOM after every render of the whole subtree.
  }, [tabCount, children]);

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
          // This was `background: "bg-background"` — a Tailwind class name in a
          // CSS property, which the browser silently drops, so the root had no
          // background at all. The `backgroundColor` prop belongs here.
          background: backgroundColor ?? "var(--background)",
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
  /** `Tab` elements (or the drawer menu's tabs on mobile). */
  children: ReactNode;
  /** Spacing (px) between tabs. */
  gap?: number;
  /** Label shown in drawer trigger when no tab is active (fallback) */
  drawerLabel?: ReactNode;
  /** Accepted for a custom drawer chevron icon, but not yet rendered by TabList (the built-in chevron is always used). */
  drawerIcon?: ReactNode;
  /** Inline styles for the tab list container. */
  style?: CSSProperties;
  /** Styles the tab list container. */
  className?: string;
  /** The drawer trigger `<button>` (mobileVariant="drawer" only). */
  triggerClassName?: string;
  /** The dropdown menu panel (mobileVariant="drawer" only). */
  menuClassName?: string;
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
  triggerClassName,
  menuClassName,
}) => {
  const {
    position,
    isMobile,
    mobileVariant,
    drawerOpen,
    setDrawerOpen,
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
          className={cn(
            "flex items-center justify-between w-full font-medium border border-border bg-background text-foreground hover:bg-accent transition-colors",
            triggerClassName,
          )}
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
            className={cn(
              "tab-drawer-menu absolute left-0 right-0 z-50 flex flex-col bg-background text-foreground border border-border",
              menuClassName,
            )}
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
  /** Tab label content. */
  children: ReactNode;
  /** Explicit tab index; omit to let it resolve automatically from DOM position among sibling tabs. */
  index?: number;
  /** Optional leading icon. */
  icon?: ReactNode;
  /** Disables interaction; a disabled tab never calls `setActive`. */
  disabled?: boolean;
  /** Accessible label for the tab button. */
  ariaLabel?: string;
  /** Accepted by the type, but not currently applied by the component. */
  style?: CSSProperties;
  /** Styles the tab button. */
  className?: string;
  /** Accepted by the type, but not currently applied by the component. */
  activeStyle?: CSSProperties;
  /** Accepted by the type, but not currently applied by the component. */
  inactiveStyle?: CSSProperties;
  /** Wraps the `icon` node. */
  iconClassName?: string;
}

export const Tab: React.FC<TabProps> = ({
  children,
  index,
  icon,
  disabled = false,
  ariaLabel,
  className,
  iconClassName,
}) => {
  const { active, setActive, variant, tabCount, isMobile, mobileVariant } =
    useTabsContext();

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

  const isActive = resolvedIndex() === active;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
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

  const forceFullWidth =
    isMobile &&
    (mobileVariant === "stack" ||
      mobileVariant === "drawer" ||
      mobileVariant === "collapse");

  // -----------------------------
  // VARIANT CLASSES (TAILWIND ONLY)
  // -----------------------------

  const baseVariant =
    variant === "outline"
      ? "border border-border bg-transparent"
      : variant === "underline"
        ? "!border-b-2 border-transparent rounded-none"
        : variant === "pill"
          ? "!rounded-full"
          : "border-none";

  const activeVariant =
    variant === "solid" || variant === "pill"
      ? "bg-primary text-primary-foreground"
      : variant === "outline"
        ? "border-primary text-primary !bg-primary/5"
        : variant === "underline"
          ? "!border-primary !text-primary"
          : "";

  const hoverVariant =
    variant === "underline"
      ? "hover:text-foreground"
      : "hover:bg-accent hover:text-foreground";

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
      className={clsx(
        "flex items-center rounded-lg justify-center gap-2 font-medium select-none transition-all",
        "text-muted-foreground text-sm whitespace-nowrap",
        !disabled && "cursor-pointer",
        disabled && "opacity-60 cursor-not-allowed",
        forceFullWidth && "w-full",

        baseVariant,
        !disabled && hoverVariant,
        isActive && "text-foreground",
        isActive && activeVariant,

        className,
      )}
      style={{
        padding: "10px 16px", // kept minimal inline (safe, not theme-related)
      }}
    >
      {icon && <span className={cn("shrink-0", iconClassName)}>{icon}</span>}
      {children}
    </button>
  );
};

/* ------------------------------------------------------------------ */
/*  <TabPanels>                                                         */
/* ------------------------------------------------------------------ */

export interface TabPanelsProps {
  /** `TabPanel` elements, one per `Tab`. */
  children: ReactNode;
  /** Inline styles for the panels wrapper. */
  style?: CSSProperties;
  /** Styles the panels wrapper. */
  className?: string;
}

export const TabPanels: React.FC<TabPanelsProps> = ({
  children,
  style,
  className,
}) => {
  return (
    <div
      className={clsx("flex-1 min-w-0 text-foreground", className)}
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
  /** Panel content. */
  children: ReactNode;
  /** The tab index this panel is shown for. */
  index: number;
  /** Keep the panel mounted (hidden via CSS) instead of unmounting it while inactive. */
  keepMounted?: boolean;
  /** Inline styles for the panel wrapper. */
  style?: CSSProperties;
  /** Styles the panel wrapper. */
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
