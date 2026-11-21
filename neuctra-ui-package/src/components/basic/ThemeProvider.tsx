"use client";

import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "../../lib/cn";

/** Theme mode supported by `ThemeProvider`. */
export type ThemeMode = "light" | "dark" | "system";

/** Minimal storage adapter used to persist the selected theme mode. */
export interface ThemeStorage {
  /** Returns the stored value for `key`, or `null` when it is absent. */
  getItem: (key: string) => string | null;
  /** Stores `value` under `key`. */
  setItem: (key: string, value: string) => void;
}

/** Value returned by `useTheme()`. */
export interface ThemeContextValue {
  /** Currently selected mode, which may be `"system"`. */
  mode: ThemeMode;
  /** Concrete theme after resolving `"system"` against the OS preference. */
  resolvedMode: Exclude<ThemeMode, "system">;
  /** Updates the selected mode and persists it. */
  setMode: (mode: ThemeMode) => void;
  /** Switches between light and dark based on the currently resolved theme. */
  toggle: () => void;
}

export interface ThemeProviderProps {
  /** Controlled theme mode; omit to let the provider own the mode. */
  mode?: ThemeMode;
  /** Initial mode in uncontrolled mode. */
  defaultMode?: ThemeMode;
  /** Called whenever the mode should change, in controlled or uncontrolled mode. */
  onModeChange?: (mode: ThemeMode) => void;
  /** Storage key used to persist the mode. */
  storageKey?: string;
  /** Storage adapter for persistence; defaults to `window.localStorage`. */
  storage?: ThemeStorage;
  /** Where the theme is applied: the `<html>` element, or only this provider's wrapper (for scoped previews). */
  applyTo?: "document" | "wrapper";
  /** How the dark theme is marked on the target: a `dark` class, a `data-theme` attribute, or both. */
  attribute?: "class" | "data-theme" | "both";
  /** Briefly disables CSS transitions while switching so colors change in one frame. */
  disableTransitionOnChange?: boolean;
  /** Content that can call `useTheme()`. */
  children: React.ReactNode;
  /** Styles the wrapper element; defaults to `contents` so layout is unchanged. */
  className?: string;
  /** Inline styles for the wrapper element. */
  style?: React.CSSProperties;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const DEFAULT_STORAGE_KEY = "neuctra-theme";

function getStorage(storage: ThemeStorage | undefined): ThemeStorage | undefined {
  if (storage) return storage;
  try {
    return typeof window === "undefined" ? undefined : window.localStorage;
  } catch {
    // Storage can be disabled entirely (private mode, sandboxed iframes).
    return undefined;
  }
}

/** Reads the current theme and control helpers from the nearest provider. */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside <ThemeProvider>");
  }
  return context;
}

/** Applies the `dark` class to `<html>` and shares theme state with `useTheme()`. */
export const ThemeProvider = forwardRef<HTMLDivElement, ThemeProviderProps>(
  function ThemeProvider(
    {
      mode: controlledMode,
      defaultMode = "system",
      onModeChange,
      storageKey = DEFAULT_STORAGE_KEY,
      storage,
      applyTo = "document",
      attribute = "class",
      disableTransitionOnChange = false,
      children,
      className,
      style,
    },
    ref,
  ) {
    const [internalMode, setInternalMode] = useState<ThemeMode>(defaultMode);
    const [systemDark, setSystemDark] = useState(false);
    // Becomes true once storage and the OS preference have been read, so the
    // document is never written with the default theme first (avoids a
    // light/dark flicker on load for returning visitors).
    const [hydrated, setHydrated] = useState(false);

    const mode = controlledMode ?? internalMode;
    const resolvedMode: Exclude<ThemeMode, "system"> =
      mode === "system" ? (systemDark ? "dark" : "light") : mode;

    // Restore a persisted mode (uncontrolled only) and read the OS preference
    // in one pass after mount; storage and matchMedia are client-only.
    useEffect(() => {
      if (controlledMode === undefined) {
        try {
          const saved = getStorage(storage)?.getItem(storageKey);
          if (saved === "light" || saved === "dark" || saved === "system") {
            setInternalMode(saved);
          }
        } catch {
          // Ignore unavailable or corrupted storage.
        }
      }
      if (typeof window !== "undefined" && window.matchMedia) {
        setSystemDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
      }
      setHydrated(true);
      // Only on mount and when the storage source changes.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storage, storageKey]);

    // Follow OS preference changes while in "system" mode.
    useEffect(() => {
      if (typeof window === "undefined" || !window.matchMedia) return;
      const query = window.matchMedia("(prefers-color-scheme: dark)");
      const onChange = (event: MediaQueryListEvent) => setSystemDark(event.matches);
      query.addEventListener?.("change", onChange);
      return () => query.removeEventListener?.("change", onChange);
    }, []);

    // Keep tabs in sync: a change saved in another tab updates this one.
    useEffect(() => {
      if (typeof window === "undefined" || controlledMode !== undefined || storage) return;
      const onStorage = (event: StorageEvent) => {
        if (event.key !== storageKey) return;
        const next = event.newValue;
        if (next === "light" || next === "dark" || next === "system") setInternalMode(next);
      };
      window.addEventListener("storage", onStorage);
      return () => window.removeEventListener("storage", onStorage);
    }, [controlledMode, storage, storageKey]);

    useEffect(() => {
      // Wrapper mode is rendered declaratively below (class / style props), so
      // React never overwrites an imperatively added class.
      if (!hydrated || typeof document === "undefined" || applyTo === "wrapper") return;
      const target = document.documentElement;

      let restoreTransitions: (() => void) | undefined;
      if (disableTransitionOnChange) {
        const css = document.createElement("style");
        css.appendChild(
          document.createTextNode("*,*::before,*::after{transition:none!important}"),
        );
        document.head.appendChild(css);
        restoreTransitions = () => {
          // Force a reflow so the new colors apply before transitions return.
          void window.getComputedStyle(document.body).opacity;
          setTimeout(() => css.remove(), 1);
        };
      }

      if (attribute === "class" || attribute === "both") {
        target.classList.toggle("dark", resolvedMode === "dark");
      }
      if (attribute === "data-theme" || attribute === "both") {
        target.setAttribute("data-theme", resolvedMode);
      }
      target.style.colorScheme = resolvedMode;
      restoreTransitions?.();
    }, [hydrated, resolvedMode, applyTo, attribute, disableTransitionOnChange]);

    const onModeChangeRef = useRef(onModeChange);
    onModeChangeRef.current = onModeChange;

    const setMode = useCallback(
      (next: ThemeMode) => {
        if (controlledMode === undefined) setInternalMode(next);
        onModeChangeRef.current?.(next);
        try {
          getStorage(storage)?.setItem(storageKey, next);
        } catch {
          // Persistence is best effort; the UI still updates.
        }
      },
      [controlledMode, storage, storageKey],
    );

    const toggle = useCallback(() => {
      setMode(resolvedMode === "dark" ? "light" : "dark");
    }, [resolvedMode, setMode]);

    const value = useMemo<ThemeContextValue>(
      () => ({ mode, resolvedMode, setMode, toggle }),
      [mode, resolvedMode, setMode, toggle],
    );

    return (
      <ThemeContext.Provider value={value}>
        <div
          ref={ref}
          data-theme={resolvedMode}
          className={cn(
            "contents",
            applyTo === "wrapper" &&
              attribute !== "data-theme" &&
              resolvedMode === "dark" &&
              "dark",
            className,
          )}
          style={applyTo === "wrapper" ? { colorScheme: resolvedMode, ...style } : style}
        >
          {children}
        </div>
      </ThemeContext.Provider>
    );
  },
);

ThemeProvider.displayName = "ThemeProvider";
