"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { X, Info, CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";

type AlertType = "success" | "error" | "warning" | "info";
type ToastVariant = "soft" | "light" | "dark";

interface Toast {
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
}

interface ToastContextProps {
  toast: ToastFunction;
  dismiss: (id?: string) => void;
}

type ToastFunction = {
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

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id?: string) => {
    if (id) {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    } else {
      setToasts([]);
    }
  }, []);

  const createToast = useCallback(
    (options: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);

      const toastData: Toast = {
        id,
        type: "info",
        variant: "soft",
        duration: 4000,
        ...options,
      };

      setToasts((prev) => [...prev, toastData]);

      if (toastData.duration !== 0) {
        setTimeout(() => dismiss(id), toastData.duration);
      }
    },
    [dismiss],
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
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 sm:bottom-6 sm:right-6">
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

const variantStyles = {
  soft: {
    success: {
      bg: "bg-green-500/10 dark:bg-green-500/15",
      border: "border-green-500/30",
      text: "text-green-600 dark:text-green-400",
      icon: "text-green-500",
    },
    error: {
      bg: "bg-red-500/10 dark:bg-red-500/15",
      border: "border-red-500/30",
      text: "text-red-600 dark:text-red-400",
      icon: "text-red-500",
    },
    warning: {
      bg: "bg-yellow-500/10 dark:bg-yellow-500/15",
      border: "border-yellow-500/30",
      text: "text-yellow-600 dark:text-yellow-400",
      icon: "text-yellow-500",
    },
    info: {
      bg: "bg-blue-500/10 dark:bg-blue-500/15",
      border: "border-blue-500/30",
      text: "text-blue-600 dark:text-blue-400",
      icon: "text-blue-500",
    },
  },

  light: {
    success: {
      bg: "bg-white dark:bg-green-950/70",
      border: "border-green-500/40",
      text: "text-green-600 dark:text-green-400",
      icon: "text-green-500",
    },
    error: {
      bg: "bg-white dark:bg-red-950/80",
      border: "border-red-500/40",
      text: "text-red-600 dark:text-red-400",
      icon: "text-red-500",
    },
    warning: {
      bg: "bg-white dark:bg-yellow-950/80",
      border: "border-yellow-500/40",
      text: "text-yellow-600 dark:text-yellow-400",
      icon: "text-yellow-500",
    },
    info: {
      bg: "bg-white dark:bg-blue-950/80",
      border: "border-blue-500/40",
      text: "text-blue-600 dark:text-blue-400",
      icon: "text-blue-500",
    },
  },

  dark: {
    success: {
      bg: "bg-green-600 text-white",
      border: "border-green-700",
      text: "text-white",
      icon: "text-white",
    },
    error: {
      bg: "bg-red-600 text-white",
      border: "border-red-700",
      text: "text-white",
      icon: "text-white",
    },
    warning: {
      bg: "bg-yellow-500 text-black",
      border: "border-yellow-600",
      text: "text-black",
      icon: "text-black",
    },
    info: {
      bg: "bg-blue-600 text-white",
      border: "border-blue-700",
      text: "text-white",
      icon: "text-white",
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
  } = toast;

  const config = variantStyles[variant][type];

  const IconMap = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const Icon = IconMap[type];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className={`
        ${className || ""}
        group relative flex w-full sm:min-w-[200px] sm:max-w-sm md:max-w-md lg:max-w-lg items-start gap-2 rounded-xl
        border ${config.border} ${config.bg}
        p-4 pr-10
        shadow-md dark:shadow-black/40
        transition-all duration-300 ease-out
        animate-in slide-in-from-right-full fade-in
        hover:scale-[1.03] hover:shadow-lg
      `}
      style={style}
      role="alert"
    >
      <Icon
        className={` ${iconClassName || ""} h-5 w-5 shrink-0 ${config.icon}`}
      />

      <div className="flex-1">
        {title && (
          <div
            className={`${titleClassName || ""} text-sm font-medium ${config.text}`}
          >
            {title}
          </div>
        )}

        {description && (
          <div
            className={`${descriptionClassName || ""} text-sm text-zinc-500 dark:text-zinc-300 `}
          >
            {description}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToastItem;
