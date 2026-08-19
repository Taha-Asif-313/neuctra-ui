"use client";

import React, {
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  X,
  Info,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { cn } from "../../lib/cn";

export type AlertType = "success" | "error" | "warning" | "info" | "loading";
export type ToastVariant = "soft" | "light" | "dark";
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  type?: AlertType;
  variant?: ToastVariant;
  duration?: number;
  /** Overrides the default type icon (success/error/etc). Pass any node, or `null` to render no icon at all. */
  icon?: ReactNode;

  className?: string;
  style?: React.CSSProperties;

  titleClassName?: string;
  descriptionClassName?: string;
  iconClassName?: string;
  contentClassName?: string;
  closeButtonClassName?: string;
}

export interface ToastContextProps {
  toast: ToastFunction;
  dismiss: (id?: string) => void;
}

export type ToastFunction = {
  /** Returns the toast's id, so it can be updated (pass the same `id` back in) or dismissed later. */
  (input: Omit<Toast, "id"> | string): string;
  success: (message: string, options?: Partial<Toast>) => string;
  error: (message: string, options?: Partial<Toast>) => string;
  warning: (message: string, options?: Partial<Toast>) => string;
  info: (message: string, options?: Partial<Toast>) => string;
  /** Persists until dismissed or replaced — pair with `.promise()` or dismiss it manually once the async work finishes. */
  loading: (message: string, options?: Partial<Toast>) => string;
  /**
   * Shows a loading toast, then morphs it in place into a success or error
   * toast once `promise` settles — the react-hot-toast async pattern.
   */
  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: unknown) => string);
    },
    options?: Partial<Toast>,
  ) => Promise<T>;
  dismiss: (id?: string) => void;
};

/* -------------------------------------------------------------------------- */
/* 🌍 Global toast store                                                     */
/*                                                                            */
/* Toasts are NOT React context state — they live in a module-level store,   */
/* the same architecture react-hot-toast uses. That's what makes `toast()`   */
/* callable from anywhere (event handlers, API clients, utils outside any    */
/* component) instead of only from inside a component that called a hook.   */
/* `<ToastProvider>` just subscribes to this store and renders what's in it. */
/* -------------------------------------------------------------------------- */

type Listener = (toasts: Toast[]) => void;

class ToastStore {
  private toasts: Toast[] = [];
  private listeners = new Set<Listener>();
  private timers = new Map<string, ReturnType<typeof setTimeout>>();
  private counter = 0;
  private maxToasts = 5;

  subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    listener(this.toasts);
    return () => {
      this.listeners.delete(listener);
    };
  };

  setMaxToasts(max: number) {
    this.maxToasts = max;
  }

  private emit() {
    this.listeners.forEach((listener) => listener(this.toasts));
  }

  private clearTimer(id: string) {
    const handle = this.timers.get(id);
    if (handle) {
      clearTimeout(handle);
      this.timers.delete(id);
    }
  }

  dismiss = (id?: string) => {
    if (id) {
      this.clearTimer(id);
      this.toasts = this.toasts.filter((t) => t.id !== id);
    } else {
      this.timers.forEach((handle) => clearTimeout(handle));
      this.timers.clear();
      this.toasts = [];
    }
    this.emit();
  };

  create(options: Omit<Toast, "id"> & { id?: string }) {
    // A supplied id lets a caller update a toast in place (e.g. loading -> success),
    // matching the same toast's position in the stack instead of appending a new one.
    const id = options.id ?? `toast-${++this.counter}`;
    this.clearTimer(id);

    const toastData: Toast = {
      ...options,
      id,
      type: options.type ?? "info",
      variant: options.variant ?? "light",
      duration: options.duration ?? 4000,
    };

    const existingIndex = this.toasts.findIndex((t) => t.id === id);
    if (existingIndex >= 0) {
      const next = [...this.toasts];
      next[existingIndex] = toastData;
      this.toasts = next;
    } else {
      const next = [...this.toasts, toastData];
      // Cap the stack so a loop or a repeated click can't push toasts off-screen indefinitely.
      this.toasts =
        next.length > this.maxToasts ? next.slice(next.length - this.maxToasts) : next;
    }

    if (toastData.duration && toastData.duration > 0) {
      this.timers.set(id, setTimeout(() => this.dismiss(id), toastData.duration));
    }

    this.emit();
    return id;
  }
}

const store = new ToastStore();

const base = ((input: Omit<Toast, "id"> | string) => {
  if (typeof input === "string") {
    return store.create({ description: input });
  }
  return store.create(input);
}) as ToastFunction;

base.success = (message, options) =>
  store.create({ title: message, type: "success", ...options });

base.error = (message, options) =>
  store.create({ title: message, type: "error", ...options });

base.warning = (message, options) =>
  store.create({ title: message, type: "warning", ...options });

base.info = (message, options) =>
  store.create({ title: message, type: "info", ...options });

base.loading = (message, options) =>
  store.create({ title: message, type: "loading", duration: 0, ...options });

base.dismiss = (id) => store.dismiss(id);

base.promise = (promise, messages, options) => {
  const id = store.create({
    title: messages.loading,
    type: "loading",
    duration: 0,
    ...options,
  });

  return promise.then(
    (data) => {
      const resolved =
        typeof messages.success === "function" ? messages.success(data) : messages.success;
      store.create({ id, title: resolved, type: "success", duration: 4000, ...options });
      return data;
    },
    (error) => {
      const resolved =
        typeof messages.error === "function" ? messages.error(error) : messages.error;
      store.create({ id, title: resolved, type: "error", duration: 4000, ...options });
      throw error;
    },
  );
};

/** Standalone toast trigger — import and call from anywhere, no hook or provider lookup required. */
export const toast: ToastFunction = base;

/**
 * Kept for consumers who prefer a hook — returns the exact same global
 * `toast`/`dismiss`, so mixing `useToast()` and the standalone `toast` import
 * in the same app is always in sync. No longer throws if called without a
 * mounted `<ToastProvider>` (matches react-hot-toast: toasts just won't be
 * visible until a provider is rendered somewhere in the tree).
 */
export const useToast = (): ToastContextProps =>
  useMemo(() => ({ toast, dismiss: store.dismiss }), []);

export interface ToastProviderProps {
  children: ReactNode;
  /** Maximum toasts kept on screen at once. Oldest are dropped first. */
  maxToasts?: number;
  /** Customize the fixed toast viewport that hosts all toasts. */
  containerClassName?: string;
  /** Corner (or edge-center) the toast stack anchors to. */
  position?: ToastPosition;
}

const POSITION_CLASSES: Record<ToastPosition, string> = {
  "top-left": "top-4 left-4 sm:top-6 sm:left-6 items-start",
  "top-center": "top-4 left-1/2 -translate-x-1/2 sm:top-6 items-center",
  "top-right": "top-4 right-4 sm:top-6 sm:right-6 items-end",
  "bottom-left": "bottom-4 left-4 sm:bottom-6 sm:left-6 items-start",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 sm:bottom-6 items-center",
  "bottom-right": "bottom-4 right-4 sm:bottom-6 sm:right-6 items-end",
};

/**
 * Renders the toast viewport for the whole app. Mount this ONCE near your
 * root — every `toast()` call (standalone import or `useToast()`) renders
 * into whichever `<ToastProvider>` is mounted, the same way there should
 * only be one `<Toaster />` in a react-hot-toast app.
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  maxToasts = 5,
  containerClassName,
  position = "bottom-right",
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    store.setMaxToasts(maxToasts);
  }, [maxToasts]);

  useEffect(() => store.subscribe(setToasts), []);

  return (
    <>
      {children}
      <div
        // The container is the live region, established up-front — role="alert"
        // on a node inserted at the same moment is frequently missed by
        // screen readers.
        role="region"
        aria-label="Notifications"
        aria-live="polite"
        className={cn(
          "fixed z-60 flex flex-col gap-2",
          POSITION_CLASSES[position],
          containerClassName,
        )}
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => store.dismiss(t.id)} />
        ))}
      </div>
    </>
  );
};

/*
 * All colors come from the theme's status tokens (--success / --destructive /
 * --warning / --info + their foregrounds), so toasts follow whatever palette
 * the consumer defines — in BOTH modes, with no dark: overrides needed: the
 * token values themselves change when .dark is active.
 *
 *   light → the default: a clean neutral card (like react-hot-toast) — only
 *           the icon carries the status color, title/description stay neutral
 *   soft  → tinted translucent surface, for when the whole toast should read
 *           as "this status" at a glance
 *   dark  → solid status surface, for high-emphasis alerts
 */
const variantStyles = {
  light: {
    success: { bg: "bg-popover", border: "border-border", text: "text-popover-foreground", icon: "text-success" },
    error: { bg: "bg-popover", border: "border-border", text: "text-popover-foreground", icon: "text-destructive" },
    warning: { bg: "bg-popover", border: "border-border", text: "text-popover-foreground", icon: "text-warning" },
    info: { bg: "bg-popover", border: "border-border", text: "text-popover-foreground", icon: "text-info" },
    loading: { bg: "bg-popover", border: "border-border", text: "text-popover-foreground", icon: "text-muted-foreground" },
  },

  soft: {
    success: { bg: "bg-success/10", border: "border-success/30", text: "text-success", icon: "text-success" },
    error: { bg: "bg-destructive/10", border: "border-destructive/30", text: "text-destructive", icon: "text-destructive" },
    warning: { bg: "bg-warning/10", border: "border-warning/30", text: "text-warning", icon: "text-warning" },
    info: { bg: "bg-info/10", border: "border-info/30", text: "text-info", icon: "text-info" },
    loading: { bg: "bg-muted", border: "border-border", text: "text-foreground", icon: "text-muted-foreground" },
  },

  dark: {
    success: { bg: "bg-success text-success-foreground", border: "border-success", text: "text-success-foreground", icon: "text-success-foreground" },
    error: { bg: "bg-destructive text-destructive-foreground", border: "border-destructive", text: "text-destructive-foreground", icon: "text-destructive-foreground" },
    warning: { bg: "bg-warning text-warning-foreground", border: "border-warning", text: "text-warning-foreground", icon: "text-warning-foreground" },
    info: { bg: "bg-info text-info-foreground", border: "border-info", text: "text-info-foreground", icon: "text-info-foreground" },
    loading: { bg: "bg-muted text-foreground", border: "border-border", text: "text-foreground", icon: "text-muted-foreground" },
  },
};

const IconMap = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  loading: Loader2,
};

const ToastItem: React.FC<{ toast: Toast; onClose: () => void }> = ({
  toast: t,
  onClose,
}) => {
  const {
    title,
    description,
    type = "info",
    variant = "light",
    icon,
    className,
    style,
    titleClassName,
    descriptionClassName,
    iconClassName,
    contentClassName,
    closeButtonClassName,
  } = t;

  // Guard the double lookup — an unexpected variant/type used to throw
  // "Cannot read properties of undefined" and take down the provider subtree.
  const config = variantStyles[variant]?.[type] ?? variantStyles.light.info;

  const DefaultIcon = IconMap[type] ?? Info;

  return (
    <div
      className={cn(
        "group relative flex w-full sm:min-w-[200px] sm:max-w-sm md:max-w-md lg:max-w-lg items-start gap-2 rounded-xl",
        "border p-4 pr-10",
        config.border,
        config.bg,
        "shadow-md dark:shadow-black/40",
        "transition-shadow duration-300 ease-out",
        // Only one animation-name class — `fade-in` and
        // `slide-in-from-right-full` have the same specificity, so the later
        // one in the stylesheet won and the slide never played.
        "animate-in slide-in-from-right-full",
        // hover:scale on a stacked flex column made toasts overlap their
        // neighbours; a shadow change reads as interactive without reflowing.
        "hover:shadow-lg",
        className,
      )}
      style={style}
      // Errors interrupt; everything else waits for a pause.
      role={type === "error" ? "alert" : "status"}
    >
      {icon !== undefined ? (
        icon !== null && (
          <span
            aria-hidden="true"
            className={cn("inline-flex h-5 w-5 shrink-0 items-center justify-center", config.icon, iconClassName)}
          >
            {icon}
          </span>
        )
      ) : (
        <DefaultIcon
          aria-hidden="true"
          className={cn("h-5 w-5 shrink-0", config.icon, type === "loading" && "animate-spin", iconClassName)}
        />
      )}

      <div className={cn("flex-1", contentClassName)}>
        {title && (
          <div className={cn("text-sm font-medium", config.text, titleClassName)}>
            {title}
          </div>
        )}

        {description && (
          <div
            className={cn(
              "text-sm text-muted-foreground",
              descriptionClassName,
            )}
          >
            {description}
          </div>
        )}
      </div>

      {/* The container already reserved pr-10 for this button, but it was
          never rendered — leaving a dead gutter and no way to dismiss by
          pointer. */}
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={onClose}
        className={cn(
          // text-current: inherits the toast's own text color, so the button
          // stays readable on soft, card and solid status surfaces alike.
          "absolute right-2 top-2 rounded-md p-1.5 transition-opacity",
          "text-current opacity-60 hover:opacity-100",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          closeButtonClassName,
        )}
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
};

export default ToastItem;
