"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { X, Info, CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";

type AlertType = "success" | "error" | "warning" | "info";

interface Toast {
  id: number;
  title?: string;
  description?: string;
  type?: AlertType;
  duration?: number;
}

interface ToastContextProps {
  addToast: (toast: Omit<Toast, "id">) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { ...toast, id }]);
    if (toast.duration !== 0) {
      setTimeout(() => removeToast(id), toast.duration ?? 4000);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed top-5 right-5 flex flex-col gap-3 z-50">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const typeStyles: Record<AlertType, { bg: string; border: string; icon: ReactNode }> = {
  success: { bg: "bg-green-50", border: "border-green-400", icon: <CheckCircle size={20} className="text-green-600" /> },
  error: { bg: "bg-red-50", border: "border-red-400", icon: <AlertCircle size={20} className="text-red-600" /> },
  warning: { bg: "bg-yellow-50", border: "border-yellow-400", icon: <AlertTriangle size={20} className="text-yellow-600" /> },
  info: { bg: "bg-blue-50", border: "border-blue-400", icon: <Info size={20} className="text-blue-600" /> },
};

const ToastItem: React.FC<{ toast: Toast; onClose: () => void }> = ({ toast, onClose }) => {
  const { title, description, type = "info" } = toast;
  const { bg, border, icon } = typeStyles[type];

  return (
    <div
      className={`flex items-start gap-3 p-4 border-l-4 rounded shadow ${bg} ${border} animate-slide-in-right`}
      role="alert"
    >
      <div>{icon}</div>
      <div className="flex-1 min-w-0">
        {title && <div className="font-semibold text-sm mb-1">{title}</div>}
        {description && <div className="text-sm text-gray-700">{description}</div>}
      </div>
      <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
        <X size={16} />
      </button>
    </div>
  );
};

// Add this animation to your global CSS (Tailwind + @layer utilities)
// @keyframes slide-in-right {
//   0% { transform: translateX(100%); opacity: 0; }
//   100% { transform: translateX(0); opacity: 1; }
// }
// .animate-slide-in-right { animation: slide-in-right 0.3s ease forwards; }