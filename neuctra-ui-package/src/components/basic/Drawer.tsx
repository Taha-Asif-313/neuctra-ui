"use client";

import React, {
  ReactNode,
  CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { X } from "lucide-react";
import { Button, ButtonProps } from "./Button";
import { cn } from "../../lib/cn";
import { useScrollLock } from "../../lib/useScrollLock";
import { useFocusTrap } from "../../lib/useFocusTrap";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  renderContent?: (close: () => void) => ReactNode;

  position?: "left" | "right" | "top" | "bottom";
  size?: string;

  disableOverlayClose?: boolean;
  /** Also block Escape. Defaults to `disableOverlayClose`. */
  disableEscapeClose?: boolean;
  /** Accessible name for the dialog when no DrawerHeader is used. */
  ariaLabel?: string;

  overlayClassName?: string;
  overlayStyle?: CSSProperties;
  /** Applied to the sliding panel that hosts the drawer content. */
  panelClassName?: string;
}

export function Drawer({
  isOpen,
  onClose,
  children,
  renderContent,
  position = "right",
  size = "320px",
  disableOverlayClose = false,
  disableEscapeClose,
  ariaLabel,
  overlayClassName,
  overlayStyle,
  panelClassName,
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const escapeDisabled = disableEscapeClose ?? disableOverlayClose;

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen || escapeDisabled) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, escapeDisabled]);

  // Drawer previously had no scroll lock at all, so the page scrolled behind it.
  useScrollLock(isOpen);
  useFocusTrap(panelRef, isOpen);

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
        // Clamp to the viewport: an unclamped size="400px" overflowed a 320px
        // phone and created a horizontal scrollbar.
        return { width: `min(${size}, 100vw)`, height: "100%" };
      case "top":
      case "bottom":
        return { height: `min(${size}, 100vh)`, width: "100%" };
      default:
        return { width: `min(${size}, 100vw)`, height: "100%" };
    }
  };

  const handleOverlayClick = () => {
    if (!disableOverlayClose) onClose();
  };

  const motionProps = getMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <div key="drawer-root" className="fixed inset-0 z-50">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOverlayClick}
            className={cn(
              "absolute inset-0 bg-background/80 backdrop-blur-sm",
              overlayClassName,
            )}
            style={overlayStyle}
          />

          {/* Panel */}
          <motion.div
            {...motionProps}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            tabIndex={-1}
            transition={{ duration: 0.25 }}
            className={cn(
              // `absolute`, not `fixed`: the parent is already a fixed,
              // full-viewport layer, and a nested fixed element competed with
              // its own parent's z-50.
              "absolute flex flex-col bg-background border-border shadow-2xl outline-none",
              "border",
              position === "right" && "right-0 top-0",
              position === "left" && "left-0 top-0",
              position === "top" && "top-0 left-0 right-0",
              position === "bottom" && "bottom-0 left-0 right-0",
              panelClassName,
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

export function DrawerBody({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={cn("flex-1 p-6 overflow-auto", className)} style={style}>
      {children}
    </div>
  );
}

export interface DrawerHeaderProps {
  title?: string;
  icon?: ReactNode;
  onClose?: () => void;
  className?: string;
  style?: CSSProperties;
  titleWrapperClassName?: string;
  titleClassName?: string;
  closeButtonClassName?: string;
}

export function DrawerHeader({
  title,
  icon,
  onClose,
  className,
  style,
  titleWrapperClassName,
  titleClassName,
  closeButtonClassName,
}: DrawerHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 py-4 border-b border-border",
        className,
      )}
      style={style}
    >
      <div className={cn("flex items-center gap-2 font-semibold", titleWrapperClassName)}>
        {icon}
        {title && <h3 className={cn("text-sm", titleClassName)}>{title}</h3>}
      </div>

      {onClose && (
        <button
          type="button"
          aria-label="Close drawer"
          onClick={onClose}
          className={cn(
            "p-2 rounded-lg hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            closeButtonClassName,
          )}
        >
          <X size={18} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

export function DrawerFooter({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn(
        "flex justify-end gap-3 px-6 py-3 border-t border-border bg-accent/60",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}

export interface DrawerTriggerProps extends ButtonProps {
  children: React.ReactNode;
  drawerContent: (props: { close: () => void }) => React.ReactNode;
  /** Forwarded to the underlying <Drawer />. */
  drawerProps?: Omit<DrawerProps, "isOpen" | "onClose" | "children">;
}

export function DrawerTriggerButton({
  children,
  drawerContent,
  drawerProps,
  onClick,
  ...props
}: DrawerTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        {...props}
        // Chain rather than replace — this used to drop a consumer's onClick.
        onClick={(e) => {
          onClick?.(e);
          setOpen(true);
        }}
      >
        {children}
      </Button>

      <Drawer {...drawerProps} isOpen={open} onClose={() => setOpen(false)}>
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
      // Missing space here fused these into "justify-centertransition-all",
      // a class that doesn't exist — both utilities were silently lost.
      "inline-flex items-center justify-center transition-all",
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
