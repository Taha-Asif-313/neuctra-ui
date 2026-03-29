"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { X, Info, CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";

type AlertType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  title?: string;
  description?: string;
  type?: AlertType;
  duration?: number;
}

interface ToastContextProps {
  toast: (options: Omit<Toast, "id">) => void;
  dismiss: (id?: string) => void;
}

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

  const toast = useCallback(
    ({
      title,
      description,
      type = "info",
      duration = 4000,
    }: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [
        ...prev,
        { id, title, description, type, duration },
      ]);

      if (duration !== 0) {
        setTimeout(() => dismiss(id), duration);
      }
    },
    [dismiss],
  );

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

const typeConfig: Record<
  AlertType,
  {
    bg: string;
    border: string;
    text: string;
    iconColor: string;
    icon: React.ElementType;
  }
> = {
  success: {
    bg: "bg-white dark:bg-zinc-900",
    border: "border-green-500",
    text: "text-green-600 dark:text-green-500",
    iconColor: "text-green-500",
    icon: CheckCircle,
  },
  error: {
    bg: "bg-white dark:bg-zinc-900",
    border: "border-red-500",
    text: "text-red-600 dark:text-red-500",
    iconColor: "text-red-500",
    icon: AlertCircle,
  },
  warning: {
    bg: "bg-white dark:bg-zinc-900",
    border: "border-yellow-500",
    text: "text-yellow-600 dark:text-yellow-500",
    iconColor: "text-yellow-500",
    icon: AlertTriangle,
  },
  info: {
    bg: "bg-white dark:bg-zinc-900",
    border: "border-blue-500",
    text: "text-blue-600 dark:text-blue-500",
    iconColor: "text-blue-500",
    icon: Info,
  },
};

const ToastItem: React.FC<{ toast: Toast; onClose: () => void }> = ({
  toast,
  onClose,
}) => {
  const { title, description, type = "info" } = toast;
  const config = typeConfig[type];
  const Icon = config.icon;

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
        group relative flex w-full max-w-sm items-start gap-3 rounded-lg border shadow-lg
        ${config.bg} ${config.border}
        p-4 pr-8
        transition-all duration-300 ease-out
        animate-in slide-in-from-right-full fade-in
        hover:shadow-xl hover:scale-105
        dark:border-zinc-800
      `}
      role="alert"
    >
      <Icon className={`h-5 w-5 flex-shrink-0 ${config.iconColor}`} />

      <div className="flex-1 space-y-1">
        {title && (
          <div className={`text-sm font-semibold ${config.text}`}>{title}</div>
        )}
        {description && (
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            {description}
          </div>
        )}
      </div>

      <button
        onClick={onClose}
        className={`
          absolute right-2 top-2 rounded-md p-1
          text-zinc-400 hover:text-zinc-700
          dark:text-zinc-600 dark:hover:text-zinc-300
          transition-colors
          focus:outline-none focus:ring-2 focus:ring-zinc-400
        `}
        aria-label="Close toast"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
