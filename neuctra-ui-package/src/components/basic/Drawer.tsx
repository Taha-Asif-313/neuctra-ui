"use client";

import React, { ReactNode, CSSProperties, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { X } from "lucide-react";
import { useState } from "react";
import { Button, ButtonProps } from "./Button";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  renderContent?: (close: () => void) => ReactNode;

  position?: "left" | "right" | "top" | "bottom";
  size?: string;

  disableOverlayClose?: boolean;

  overlayClassName?: string;
  overlayStyle?: CSSProperties;
}

export function Drawer({
  isOpen,
  onClose,
  children,
  renderContent,
  position = "right",
  size = "320px",
  disableOverlayClose = false,
  overlayClassName,
  overlayStyle,
}: DrawerProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const getMotion = () => {
    switch (position) {
      case "left":
        return {
          initial: { x: "-100%" },
          animate: { x: 0 },
          exit: { x: "-100%" },
        };
      case "right":
        return {
          initial: { x: "100%" },
          animate: { x: 0 },
          exit: { x: "100%" },
        };
      case "top":
        return {
          initial: { y: "-100%" },
          animate: { y: 0 },
          exit: { y: "-100%" },
        };
      case "bottom":
        return {
          initial: { y: "100%" },
          animate: { y: 0 },
          exit: { y: "100%" },
        };
    }
  };

  const getSizeStyle = (): CSSProperties => {
    switch (position) {
      case "left":
      case "right":
        return { width: size, height: "100%" };
      case "top":
      case "bottom":
        return { height: size, width: "100%" };
    }
  };

  const handleOverlayClick = () => {
    if (!disableOverlayClose) onClose();
  };

  const motionProps = getMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOverlayClick}
            className={clsx(
              "absolute inset-0 bg-background/80 backdrop-blur-sm",
              overlayClassName,
            )}
            style={overlayStyle}
          />

          {/* Panel */}
          <motion.div
            {...motionProps}
            transition={{ duration: 0.25 }}
            className={clsx(
              "fixed z-50 flex flex-col bg-background border-border shadow-2xl",
              "border",
              position === "right" && "right-0 top-0",
              position === "left" && "left-0 top-0",
              position === "top" && "top-0 left-0",
              position === "bottom" && "bottom-0 left-0",
            )}
            style={getSizeStyle()}
          >
            {renderContent ? renderContent(onClose) : children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export interface DrawerContentProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function DrawerContent({
  children,
  className,
  style,
}: DrawerContentProps) {
  return (
    <div className={clsx("flex flex-col h-full", className)} style={style}>
      {children}
    </div>
  );
}

export function DrawerBody({ children }: { children: ReactNode }) {
  return <div className="flex-1 p-6 overflow-auto">{children}</div>;
}

export interface DrawerHeaderProps {
  title?: string;
  icon?: ReactNode;
  onClose?: () => void;
}

export function DrawerHeader({ title, icon, onClose }: DrawerHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-border">
      <div className="flex items-center gap-2 font-semibold">
        {icon}
        {title && <h3 className="text-sm">{title}</h3>}
      </div>

      {onClose && (
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-accent">
          <X size={18} />
        </button>
      )}
    </div>
  );
}

export function DrawerFooter({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-end gap-3 px-6 py-3 border-t border-border bg-accent/60">
      {children}
    </div>
  );
}

export interface DrawerTriggerProps extends ButtonProps {
  children: React.ReactNode;
  drawerContent: (props: { close: () => void }) => React.ReactNode;
}

export function DrawerTriggerButton({
  children,
  drawerContent,
  ...props
}: DrawerTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button {...props} onClick={() => setOpen(true)}>
        {children}
      </Button>

      <Drawer isOpen={open} onClose={() => setOpen(false)}>
        {drawerContent({ close: () => setOpen(false) })}
      </Drawer>
    </>
  );
}

/* ---------------- 🧩 Drawer Button ---------------- */
export interface DrawerButtonProps {
  label?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  labelClassName?: string;
  iconClassName?: string;
}

export const DrawerButton: React.FC<DrawerButtonProps> = ({
  label = "",
  icon,
  iconPosition = "left",
  onClick,
  className,
  style,
  labelClassName,
  iconClassName,
}) => (
  <button
    type="button"
    onClick={onClick}
    style={style}
    className={clsx(
      "inline-flex items-center justify-centertransition-all",
      className,
    )}
  >
    {icon && iconPosition === "left" && (
      <span className={iconClassName}>{icon}</span>
    )}
    <span className={labelClassName}>{label}</span>
    {icon && iconPosition === "right" && (
      <span className={iconClassName}>{icon}</span>
    )}
  </button>
);
