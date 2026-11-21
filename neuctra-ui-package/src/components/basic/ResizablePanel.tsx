"use client";

import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { GripVertical, GripHorizontal } from "lucide-react";

import { cn } from "../../lib/cn";

type Direction = "horizontal" | "vertical";

export interface ResizablePanelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Initial size as a percentage of the group. Panels without one share what is left. */
  defaultSize?: number;
  /** Minimum size as a percentage. */
  minSize?: number;
  /** Maximum size as a percentage. */
  maxSize?: number;
  /** Lets the panel snap to zero when dragged below half of `minSize`. */
  collapsible?: boolean;
  /** Panel content. */
  children?: React.ReactNode;
  /** Additional classes for the panel. */
  className?: string;
  /** Inline styles for the panel. */
  style?: React.CSSProperties;
}

export interface ResizableHandleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Renders a visible grip in the middle of the handle. */
  withHandle?: boolean;
  /** Percentage moved per arrow key press (Shift multiplies by 4). */
  step?: number;
  /** Disables dragging and keyboard resizing. */
  disabled?: boolean;
  /** Accessible label for the separator. */
  "aria-label"?: string;
  /** Additional classes for the drag handle. */
  className?: string;
  /** Styles the grip shown when `withHandle` is set. */
  gripClassName?: string;
  /** Inline styles for the drag handle. */
  style?: React.CSSProperties;
}

export interface ResizablePanelGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Axis along which panels are laid out and dragged. */
  direction?: Direction;
  /** Alternating ResizablePanel and ResizableHandle children. */
  children: React.ReactNode;
  /** Called with the panel sizes (percentages) after every resize. */
  onLayout?: (sizes: number[]) => void;
  /**
   * Container width in pixels below which a horizontal group stacks its
   * panels vertically (handles switch orientation too). Useful for split views
   * that would otherwise squeeze content into narrow columns on small screens.
   */
  stackBelow?: number;
  /** Additional classes for the group root. */
  className?: string;
  /** Inline styles for the group root. */
  style?: React.CSSProperties;
}

interface PanelConfig {
  minSize: number;
  maxSize: number;
  collapsible: boolean;
}

interface ResizableContextValue {
  direction: Direction;
  groupId: string;
  sizes: number[];
  configs: PanelConfig[];
  draggingIndex: number;
  startDrag: (handleIndex: number, event: React.PointerEvent) => void;
  resizeBy: (handleIndex: number, delta: number) => void;
  resizeTo: (handleIndex: number, leftSize: number) => void;
}

const ResizableContext = createContext<ResizableContextValue | null>(null);
const PanelIndexContext = createContext<number>(-1);
const HandleIndexContext = createContext<number>(-1);

const isPanel = (
  child: React.ReactNode,
): child is React.ReactElement<ResizablePanelProps> =>
  React.isValidElement(child) &&
  (child.type as unknown as { displayName?: string })?.displayName ===
    "ResizablePanel";

const isHandle = (
  child: React.ReactNode,
): child is React.ReactElement<ResizableHandleProps> =>
  React.isValidElement(child) &&
  (child.type as unknown as { displayName?: string })?.displayName ===
    "ResizableHandle";

/** Panels with a defaultSize keep it; the rest split the remaining space evenly. */
const initialSizes = (panels: React.ReactElement<ResizablePanelProps>[]) => {
  const defined = panels
    .map((p) => p.props.defaultSize)
    .filter((v): v is number => typeof v === "number");
  const remaining = Math.max(0, 100 - defined.reduce((a, b) => a + b, 0));
  const undefinedCount = panels.length - defined.length;
  return panels.map((p) =>
    typeof p.props.defaultSize === "number"
      ? p.props.defaultSize
      : undefinedCount > 0
        ? remaining / undefinedCount
        : 0,
  );
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const ResizablePanelGroup = forwardRef<
  HTMLDivElement,
  ResizablePanelGroupProps
>(function ResizablePanelGroup(
  {
    direction: directionProp = "horizontal",
    children,
    onLayout,
    stackBelow,
    className,
    style,
    ...rest
  },
  ref,
) {
  const groupId = useId();
  const [stacked, setStacked] = useState(false);
  const direction: Direction =
    directionProp === "horizontal" && stacked ? "vertical" : directionProp;
  const childArray = React.Children.toArray(children);
  const panelChildren = childArray.filter(isPanel);

  const [sizes, setSizes] = useState<number[]>(() =>
    initialSizes(panelChildren),
  );
  const [draggingIndex, setDraggingIndex] = useState(-1);

  // Panels added or removed after mount: re-derive sizes for the new count.
  if (sizes.length !== panelChildren.length) {
    setSizes(initialSizes(panelChildren));
  }

  const sizesRef = useRef(sizes);
  sizesRef.current = sizes;
  const onLayoutRef = useRef(onLayout);
  onLayoutRef.current = onLayout;

  const configs: PanelConfig[] = panelChildren.map((child) => ({
    minSize: child.props.minSize ?? 0,
    maxSize: child.props.maxSize ?? 100,
    collapsible: child.props.collapsible ?? false,
  }));
  const configsRef = useRef(configs);
  configsRef.current = configs;

  const containerRef = useRef<HTMLDivElement>(null);
  const dragCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => () => dragCleanupRef.current?.(), []);

  // Responsive stacking: watch the group's own width (not the viewport), so it
  // also works inside narrow columns and previews.
  useEffect(() => {
    const node = containerRef.current;
    if (!stackBelow || directionProp !== "horizontal" || !node) {
      setStacked(false);
      return;
    }
    const measure = () => setStacked(node.clientWidth < stackBelow);
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [stackBelow, directionProp]);

  /** Clamp the left panel of a pair, honouring both panels' min/max/collapse rules. */
  const resolveLeft = useCallback(
    (handleIndex: number, proposedLeft: number, pairTotal: number) => {
      const left = configsRef.current[handleIndex];
      const right = configsRef.current[handleIndex + 1];
      if (!left || !right) return proposedLeft;

      const minLeft = Math.max(left.minSize, pairTotal - right.maxSize);
      const maxLeft = Math.min(left.maxSize, pairTotal - right.minSize);
      let next = proposedLeft;

      if (left.collapsible && next < left.minSize) {
        next = next < left.minSize / 2 ? 0 : left.minSize;
        return clamp(next, 0, Math.max(0, maxLeft));
      }
      const proposedRight = pairTotal - next;
      if (right.collapsible && proposedRight < right.minSize) {
        return proposedRight < right.minSize / 2
          ? pairTotal
          : pairTotal - right.minSize;
      }
      return clamp(next, Math.min(minLeft, maxLeft), maxLeft);
    },
    [],
  );

  const commit = useCallback((next: number[]) => {
    setSizes(next);
    onLayoutRef.current?.(next);
  }, []);

  const resizeTo = useCallback(
    (handleIndex: number, leftSize: number) => {
      const current = sizesRef.current;
      const pairTotal =
        (current[handleIndex] ?? 0) + (current[handleIndex + 1] ?? 0);
      const nextLeft = resolveLeft(handleIndex, leftSize, pairTotal);
      if (nextLeft === current[handleIndex]) return;
      const next = [...current];
      next[handleIndex] = nextLeft;
      next[handleIndex + 1] = pairTotal - nextLeft;
      commit(next);
    },
    [commit, resolveLeft],
  );

  const resizeBy = useCallback(
    (handleIndex: number, delta: number) => {
      resizeTo(handleIndex, (sizesRef.current[handleIndex] ?? 0) + delta);
    },
    [resizeTo],
  );

  const startDrag = useCallback(
    (handleIndex: number, event: React.PointerEvent) => {
      if (event.button !== 0) return;
      event.preventDefault();
      const container = containerRef.current;
      if (!container) return;

      // Panels share the space left after handles, so measure only that.
      const horizontal = direction === "horizontal";
      const rect = container.getBoundingClientRect();
      let handlePixels = 0;
      container
        .querySelectorAll<HTMLElement>(`[data-resizable-handle="${groupId}"]`)
        .forEach((node) => {
          const r = node.getBoundingClientRect();
          handlePixels += horizontal ? r.width : r.height;
        });
      const totalPixels = (horizontal ? rect.width : rect.height) - handlePixels;
      if (totalPixels <= 0) return;

      const axis = horizontal ? "clientX" : "clientY";
      const startPosition = event[axis];
      const startSizes = sizesRef.current;
      const startLeft = startSizes[handleIndex] ?? 0;
      const pairTotal = startLeft + (startSizes[handleIndex + 1] ?? 0);

      (event.currentTarget as HTMLElement).focus?.();
      setDraggingIndex(handleIndex);

      const { body } = document;
      const previousCursor = body.style.cursor;
      const previousSelect = body.style.userSelect;
      body.style.cursor = horizontal ? "col-resize" : "row-resize";
      body.style.userSelect = "none";

      const onMove = (moveEvent: PointerEvent) => {
        const deltaPercent =
          ((moveEvent[axis] - startPosition) / totalPixels) * 100;
        const nextLeft = resolveLeft(
          handleIndex,
          startLeft + deltaPercent,
          pairTotal,
        );
        const current = sizesRef.current;
        if (nextLeft === current[handleIndex]) return;
        const next = [...current];
        next[handleIndex] = nextLeft;
        next[handleIndex + 1] = pairTotal - nextLeft;
        commit(next);
      };

      const cleanup = () => {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup", cleanup);
        document.removeEventListener("pointercancel", cleanup);
        body.style.cursor = previousCursor;
        body.style.userSelect = previousSelect;
        dragCleanupRef.current = null;
        setDraggingIndex(-1);
      };

      dragCleanupRef.current?.();
      dragCleanupRef.current = cleanup;
      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", cleanup);
      document.addEventListener("pointercancel", cleanup);
    },
    [commit, direction, groupId, resolveLeft],
  );

  const assignRef = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [ref],
  );

  let panelIndex = -1;
  let handleIndex = -1;

  return (
    <ResizableContext.Provider
      value={{
        direction,
        groupId,
        sizes,
        configs,
        draggingIndex,
        startDrag,
        resizeBy,
        resizeTo,
      }}
    >
      <div
        ref={assignRef}
        data-direction={direction}
        className={cn(
          "flex h-full w-full overflow-hidden",
          direction === "horizontal" ? "flex-row" : "flex-col",
          className,
        )}
        style={style}
        {...rest}
      >
        {childArray.map((child, index) => {
          if (isPanel(child)) {
            panelIndex += 1;
            return (
              <PanelIndexContext.Provider
                key={child.key ?? `panel-${index}`}
                value={panelIndex}
              >
                {child}
              </PanelIndexContext.Provider>
            );
          }
          if (isHandle(child)) {
            handleIndex += 1;
            return (
              <HandleIndexContext.Provider
                key={child.key ?? `handle-${index}`}
                value={handleIndex}
              >
                {child}
              </HandleIndexContext.Provider>
            );
          }
          return child;
        })}
      </div>
    </ResizableContext.Provider>
  );
});
ResizablePanelGroup.displayName = "ResizablePanelGroup";

export const ResizablePanel = forwardRef<HTMLDivElement, ResizablePanelProps>(
  function ResizablePanel(
    {
      defaultSize,
      minSize: _minSize,
      maxSize: _maxSize,
      collapsible: _collapsible,
      children,
      className,
      style,
      id,
      ...rest
    },
    ref,
  ) {
    const context = useContext(ResizableContext);
    const index = useContext(PanelIndexContext);
    const size =
      context && index >= 0
        ? (context.sizes[index] ?? defaultSize ?? 100)
        : (defaultSize ?? 100);
    const collapsed = size === 0;

    return (
      <div
        ref={ref}
        id={id ?? (context ? `${context.groupId}-panel-${index}` : undefined)}
        data-collapsed={collapsed || undefined}
        aria-hidden={collapsed || undefined}
        // Collapsed content must not stay reachable by Tab.
        inert={collapsed ? true : undefined}
        className={cn("min-h-0 min-w-0 overflow-auto", className)}
        style={{
          // Grow factor = percentage, basis 0: panels split whatever space the
          // handles leave, so the sum never overflows the group.
          flex: `${size} 1 0px`,
          ...(collapsed ? { overflow: "hidden" } : null),
          ...style,
        }}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
ResizablePanel.displayName = "ResizablePanel";

export const ResizableHandle = forwardRef<
  HTMLDivElement,
  ResizableHandleProps
>(function ResizableHandle(
  {
    withHandle = false,
    step = 5,
    disabled = false,
    className,
    gripClassName,
    style,
    onKeyDown,
    onPointerDown,
    "aria-label": ariaLabel,
    ...rest
  },
  ref,
) {
  const context = useContext(ResizableContext);
  const index = useContext(HandleIndexContext);
  const vertical = context?.direction === "vertical";
  const leftSize = context?.sizes[index] ?? 0;
  const leftConfig = context?.configs[index];
  const dragging = context?.draggingIndex === index;
  const Grip = vertical ? GripHorizontal : GripVertical;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || disabled || !context) return;
    const amount = event.shiftKey ? step * 4 : step;
    const decrease = vertical ? "ArrowUp" : "ArrowLeft";
    const increase = vertical ? "ArrowDown" : "ArrowRight";
    if (event.key === decrease) context.resizeBy(index, -amount);
    else if (event.key === increase) context.resizeBy(index, amount);
    else if (event.key === "Home") context.resizeTo(index, 0);
    else if (event.key === "End") context.resizeTo(index, 100);
    else if (event.key === "Enter" && leftConfig?.collapsible) {
      context.resizeTo(index, leftSize === 0 ? leftConfig.minSize || step : 0);
    } else return;
    event.preventDefault();
  };

  return (
    <div
      ref={ref}
      role="separator"
      tabIndex={disabled ? -1 : 0}
      aria-label={ariaLabel ?? "Resize panels"}
      aria-orientation={vertical ? "horizontal" : "vertical"}
      aria-controls={context ? `${context.groupId}-panel-${index}` : undefined}
      aria-valuenow={Math.round(leftSize)}
      aria-valuemin={Math.round(leftConfig?.collapsible ? 0 : (leftConfig?.minSize ?? 0))}
      aria-valuemax={Math.round(leftConfig?.maxSize ?? 100)}
      aria-disabled={disabled || undefined}
      data-resizable-handle={context?.groupId}
      data-dragging={dragging || undefined}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        if (!disabled && !event.defaultPrevented) context?.startDrag(index, event);
      }}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative flex shrink-0 touch-none items-center justify-center bg-border transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        // Wider invisible hit area around the 1px line.
        "after:absolute",
        vertical
          ? "h-px w-full cursor-row-resize after:inset-x-0 after:-inset-y-1.5"
          : "h-full w-px cursor-col-resize after:inset-y-0 after:-inset-x-1.5",
        !disabled && "hover:bg-primary/60 data-[dragging=true]:bg-primary",
        disabled && "cursor-default opacity-50",
        className,
      )}
      style={style}
      {...rest}
    >
      {withHandle && (
        <span
          aria-hidden="true"
          className={cn(
            "z-10 flex items-center justify-center rounded-md border border-border bg-background text-muted-foreground",
            vertical ? "h-3 w-5" : "h-5 w-3",
            gripClassName,
          )}
        >
          <Grip className="h-3 w-3" />
        </span>
      )}
    </div>
  );
});
ResizableHandle.displayName = "ResizableHandle";
