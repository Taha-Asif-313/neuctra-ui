"use client";

import React, {
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
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
  /** Whether the drawer is mounted and visible. */
  isOpen: boolean;
  /** Called on Escape or overlay click — drive `isOpen` from it. */
  onClose: () => void;
  /** Static drawer content, ignored when `renderContent` is provided. */
  children?: ReactNode;
  /** Render prop for the panel content, given a `close` callback; takes priority over `children`. */
  renderContent?: (close: () => void) => ReactNode;
  /** Screen edge the panel slides in from. */
  position?: "left" | "right" | "top" | "bottom";
  /** Panel width (left/right) or height (top/bottom); any valid CSS length. */
  size?: string;
  /** Prevents closing on overlay click; also blocks Escape unless `disableEscapeClose` overrides it. */
  disableOverlayClose?: boolean;
  /** Also block Escape. Defaults to `disableOverlayClose`. */
  disableEscapeClose?: boolean;
  /** Accessible name for the dialog when no DrawerHeader is used. */
  ariaLabel?: string;
  /** Styles the fixed, full-screen overlay behind the panel. */
  overlayClassName?: string;
  /** Inline styles for the overlay. */
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
  const onCloseRef = useRef(onClose);

  onCloseRef.current = onClose;

  const escapeDisabled =
    disableEscapeClose ?? disableOverlayClose;

  useEffect(() => {
    if (!isOpen || escapeDisabled) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, escapeDisabled]);

  useScrollLock(isOpen);
  useFocusTrap(panelRef, isOpen);

  const motionProps = useMemo(() => {
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
  }, [position]);

  const sizeStyle = useMemo<CSSProperties>(() => {
    if (position === "left" || position === "right") {
      return {
        width: `min(${size}, 100vw)`,
        height: "100%",
      };
    }

    return {
      height: `min(${size}, 100vh)`,
      width: "100%",
    };
  }, [position, size]);

  const handleOverlayClick = useCallback(() => {
    if (!disableOverlayClose) {
      onCloseRef.current();
    }
  }, [disableOverlayClose]);

  const content = renderContent
    ? renderContent(onCloseRef.current)
    : children;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          key="drawer-root"
          className="fixed inset-0 z-50"
        >
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleOverlayClick}
            className={cn(
              "absolute inset-0 bg-background/80",
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
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            className={cn(
              "absolute flex flex-col bg-background border border-border shadow-2xl outline-none",
              position === "right" && "right-0 top-0",
              position === "left" && "left-0 top-0",
              position === "top" && "top-0 left-0 right-0",
              position === "bottom" && "bottom-0 left-0 right-0",
              panelClassName,
            )}
            style={sizeStyle}
          >
            {content}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export interface DrawerContentProps {
  /** Full drawer layout, typically DrawerHeader/DrawerBody/DrawerFooter. */
  children: ReactNode;
  /** Styles the full-height flex column wrapper. */
  className?: string;
  /** Inline styles for the wrapper. */
  style?: CSSProperties;
}

export function DrawerContent({
  children,
  className,
  style,
}: DrawerContentProps) {
  return (
    <div
      className={cn("flex flex-col h-full", className)}
      style={style}
    >
      {children}
    </div>
  );
}

export interface DrawerBodyProps {
  /** Scrollable main content of the drawer. */
  children: ReactNode;
  /** Styles the scrollable body wrapper. */
  className?: string;
  /** Inline styles for the body wrapper. */
  style?: CSSProperties;
}

export function DrawerBody({
  children,
  className,
  style,
}: DrawerBodyProps) {
  return (
    <div
      className={cn(
        "flex-1 p-6 overflow-auto",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}

export interface DrawerHeaderProps {
  /** Heading text shown next to the optional icon. */
  title?: string;
  /** Optional leading icon rendered before the title. */
  icon?: ReactNode;
  /** Renders a close button in the header when provided. */
  onClose?: () => void;
  /** Styles the header row. */
  className?: string;
  /** Inline styles for the header row. */
  style?: CSSProperties;
  /** Wrapper around `icon` + `title`. */
  titleWrapperClassName?: string;
  /** Styles the title heading element. */
  titleClassName?: string;
  /** Styles the close button. */
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
      <div
        className={cn(
          "flex items-center gap-2 font-semibold",
          titleWrapperClassName,
        )}
      >
        {icon}

        {title && (
          <h3
            className={cn(
              "text-sm",
              titleClassName,
            )}
          >
            {title}
          </h3>
        )}
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
          <X
            size={18}
            aria-hidden="true"
          />
        </button>
      )}
    </div>
  );
}

export interface DrawerFooterProps {
  /** Footer actions, typically `Button` elements. */
  children: ReactNode;
  /** Styles the footer wrapper. */
  className?: string;
  /** Inline styles for the footer wrapper. */
  style?: CSSProperties;
}

export function DrawerFooter({
  children,
  className,
  style,
}: DrawerFooterProps) {
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

export interface DrawerTriggerProps
  extends ButtonProps {
  /** Label/content rendered inside the trigger `Button`. */
  children: React.ReactNode;
  /** Render function for the drawer's content, given a `close` callback. */
  drawerContent: (props: {
    close: () => void;
  }) => React.ReactNode;
  /** Forwarded to the underlying <Drawer />. */
  drawerProps?: Omit<
    DrawerProps,
    "isOpen" | "onClose" | "children"
  >;
}

export function DrawerTriggerButton({
  children,
  drawerContent,
  drawerProps,
  onClick,
  ...props
}: DrawerTriggerProps) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      setOpen(true);
    },
    [onClick],
  );

  return (
    <>
      <Button
        {...props}
        onClick={handleClick}
      >
        {children}
      </Button>

      <Drawer
        {...drawerProps}
        isOpen={open}
        onClose={close}
      >
        {drawerContent({ close })}
      </Drawer>
    </>
  );
}

export interface DrawerButtonProps {
  /** Button text content. */
  label?: string;
  /** Optional icon rendered next to the label. */
  icon?: ReactNode;
  /** Side of the label the icon renders on. */
  iconPosition?: "left" | "right";
  /** Click handler; this is a plain button, not wired to any Drawer state. */
  onClick?: () => void;
  /** Styles the root button. */
  className?: string;
  /** Inline styles for the root button. */
  style?: React.CSSProperties;
  /** Styles the label span. */
  labelClassName?: string;
  /** Styles the icon wrapper span. */
  iconClassName?: string;
}

export const DrawerButton: React.FC<
  DrawerButtonProps
> = ({
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
      "inline-flex items-center justify-center transition-all",
      className,
    )}
  >
    {icon && iconPosition === "left" && (
      <span className={iconClassName}>
        {icon}
      </span>
    )}

    <span className={labelClassName}>
      {label}
    </span>

    {icon && iconPosition === "right" && (
      <span className={iconClassName}>
        {icon}
      </span>
    )}
  </button>
);