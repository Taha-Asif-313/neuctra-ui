"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { X, Info, CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";
import { cn } from "../../lib/cn";

export type AlertType = "success" | "error" | "warning" | "info";
export type ToastVariant = "soft" | "light" | "dark";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  type?: AlertType;
  variant?: ToastVariant;
  duration?: number;

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
  (options: Omit<Toast, "id"> | string): void;
  success: (message: string, options?: Partial<Toast>) => void;
  error: (message: string, options?: Partial<Toast>) => void;
  warning: (message: string, options?: Partial<Toast>) => void;
  info: (message: string, options?: Partial<Toast>) => void;
};

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};

export interface ToastProviderProps {
  children: ReactNode;
  /** Maximum toasts kept on screen at once. Oldest are dropped first. */
  maxToasts?: number;
  /** Customize the fixed toast viewport that hosts all toasts. */
  containerClassName?: string;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  maxToasts = 5,
  containerClassName,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  // Timers were previously fired and forgotten, so they kept running after the
  // provider unmounted (or after the toast was dismissed some other way).
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const counter = useRef(0);

  const clearTimer = useCallback((id: string) => {
    const handle = timers.current.get(id);
    if (handle) {
      clearTimeout(handle);
      timers.current.delete(id);
    }
  }, []);

  const dismiss = useCallback(
    (id?: string) => {
      if (id) {
        clearTimer(id);
        setToasts((prev) => prev.filter((t) => t.id !== id));
      } else {
        timers.current.forEach((handle) => clearTimeout(handle));
        timers.current.clear();
        setToasts([]);
      }
    },
    [clearTimer],
  );

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach((handle) => clearTimeout(handle));
      pending.clear();
    };
  }, []);

  const createToast = useCallback(
    (options: Omit<Toast, "id">) => {
      // A 7-char random string has real collision odds, and a duplicate id
      // means a duplicate React key and dismiss() removing both toasts.
      counter.current += 1;
      const id = `toast-${counter.current}`;

      const toastData: Toast = {
        ...options,
        id,
        // `??` rather than relying on spread order: an explicit
        // `duration: undefined` (trivially produced by forwarding a partial
        // options object) used to overwrite the default, and
        // setTimeout(fn, undefined) fires immediately — the toast flashed and
        // vanished. Same for type/variant, where undefined then crashed the
        // variantStyles lookup.
        type: options.type ?? "info",
        variant: options.variant ?? "soft",
        duration: options.duration ?? 4000,
      };

      setToasts((prev) => {
        const next = [...prev, toastData];
        // Cap the stack so a loop or a repeated click can't push toasts
        // off-screen indefinitely.
        return next.length > maxToasts ? next.slice(next.length - maxToasts) : next;
      });

      if (toastData.duration !== 0) {
        timers.current.set(
          id,
          setTimeout(() => dismiss(id), toastData.duration),
        );
      }
    },
    [dismiss, maxToasts],
  );

  const toast = useMemo(() => {
    const base = ((input: Omit<Toast, "id"> | string) => {
      if (typeof input === "string") {
        createToast({ description: input });
      } else {
        createToast(input);
      }
    }) as ToastFunction;

    base.success = (message, options) =>
      createToast({ title: message, type: "success", ...options });

    base.error = (message, options) =>
      createToast({ title: message, type: "error", ...options });

    base.warning = (message, options) =>
      createToast({ title: message, type: "warning", ...options });

    base.info = (message, options) =>
      createToast({ title: message, type: "info", ...options });

    return base;
  }, [createToast]);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div
        // The container is the live region, established up-front — role="alert"
        // on a node inserted at the same moment is frequently missed by
        // screen readers.
        role="region"
        aria-label="Notifications"
        aria-live="polite"
        className={cn(
          "fixed bottom-4 right-4 z-60 flex flex-col gap-2 sm:bottom-6 sm:right-6",
          containerClassName,
        )}
      >
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => dismiss(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

/*
 * All colors come from the theme's status tokens (--success / --destructive /
 * --warning / --info + their foregrounds), so toasts follow whatever palette
 * the consumer defines — in BOTH modes, with no dark: overrides needed: the
 * token values themselves change when .dark is active.
 *
 *   soft  → tinted translucent surface
 *   light → card surface with a status border
 *   dark  → solid status surface (name kept for API compatibility)
 */
const variantStyles = {
  soft: {
    success: {
      bg: "bg-success/10",
      border: "border-success/30",
      text: "text-success",
      icon: "text-success",
    },
    error: {
      bg: "bg-destructive/10",
      border: "border-destructive/30",
      text: "text-destructive",
      icon: "text-destructive",
    },
    warning: {
      bg: "bg-warning/10",
      border: "border-warning/30",
      text: "text-warning",
      icon: "text-warning",
    },
    info: {
      bg: "bg-info/10",
      border: "border-info/30",
      text: "text-info",
      icon: "text-info",
    },
  },

  light: {
    success: {
      bg: "bg-card",
      border: "border-success/40",
      text: "text-success",
      icon: "text-success",
    },
    error: {
      bg: "bg-card",
      border: "border-destructive/40",
      text: "text-destructive",
      icon: "text-destructive",
    },
    warning: {
      bg: "bg-card",
      border: "border-warning/40",
      text: "text-warning",
      icon: "text-warning",
    },
    info: {
      bg: "bg-card",
      border: "border-info/40",
      text: "text-info",
      icon: "text-info",
    },
  },

  dark: {
    success: {
      bg: "bg-success text-success-foreground",
      border: "border-success",
      text: "text-success-foreground",
      icon: "text-success-foreground",
    },
    error: {
      bg: "bg-destructive text-destructive-foreground",
      border: "border-destructive",
      text: "text-destructive-foreground",
      icon: "text-destructive-foreground",
    },
    warning: {
      bg: "bg-warning text-warning-foreground",
      border: "border-warning",
      text: "text-warning-foreground",
      icon: "text-warning-foreground",
    },
    info: {
      bg: "bg-info text-info-foreground",
      border: "border-info",
      text: "text-info-foreground",
      icon: "text-info-foreground",
    },
  },
};

const ToastItem: React.FC<{ toast: Toast; onClose: () => void }> = ({
  toast,
  onClose,
}) => {
  const {
    title,
    description,
    type = "info",
    variant = "soft",
    className,
    style,
    titleClassName,
    descriptionClassName,
    iconClassName,
    contentClassName,
    closeButtonClassName,
  } = toast;

  // Guard the double lookup — an unexpected variant/type used to throw
  // "Cannot read properties of undefined" and take down the provider subtree.
  const config =
    variantStyles[variant]?.[type] ?? variantStyles.soft.info;

  const IconMap = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const Icon = IconMap[type] ?? Info;

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
      <Icon
        aria-hidden="true"
        className={cn("h-5 w-5 shrink-0", config.icon, iconClassName)}
      />

      <div className={cn("flex-1", contentClassName)}>
        {title && (
          <div
            className={cn("text-sm font-medium", config.text, titleClassName)}
          >
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
