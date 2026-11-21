"use client";

import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "../../lib/cn";

// useLayoutEffect warns during SSR; fall back to useEffect on the server.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Values handed to `renderItem` for each visible row. */
export interface VirtualListRenderProps<T> {
  /** The item at `index`. */
  item: T;
  /** Index of the item in the source array. */
  index: number;
  /** Positioning styles. Spread these onto the row's root element. */
  style: React.CSSProperties;
}

export interface VirtualListProps<T> {
  /** Full data set; only the visible window is rendered. */
  items: T[];
  /** Height of the scroll viewport. Numbers are pixels; strings (e.g. `"100%"`) are measured at runtime. */
  height: number | string;
  /** Row height in pixels, or a function returning it per index. */
  estimateSize?: number | ((index: number, item: T) => number);
  /** Extra rows rendered above and below the viewport. */
  overscan?: number;
  /** Renders a single visible row; spread `style` onto its root element. */
  renderItem: (props: VirtualListRenderProps<T>) => React.ReactNode;
  /** Stable key for each row. Defaults to the item index. */
  getKey?: (item: T, index: number) => React.Key;
  /** Accessible label for the scroll container. */
  ariaLabel?: string;
  /** Content shown in place of the rows when `items` is empty. */
  emptyState?: React.ReactNode;
  /** Fired once each time the user scrolls within `endReachedThreshold` of the bottom, e.g. to load the next page. */
  onEndReached?: () => void;
  /** Distance from the bottom, in pixels, that triggers `onEndReached`. */
  endReachedThreshold?: number;
  /** Draws the bordered card surface around the viewport. */
  bordered?: boolean;
  /** Additional classes for the scroll container. */
  className?: string;
  /** Inline styles for the scroll container. */
  style?: React.CSSProperties;
  /** Additional classes for the inner sizing element that holds the rows. */
  innerClassName?: string;
  /** Additional classes for the empty-state wrapper. */
  emptyClassName?: string;
}

function VirtualListInner<T>(
  {
    items,
    height,
    estimateSize = 48,
    overscan = 4,
    renderItem,
    getKey,
    ariaLabel = "Virtualized list",
    emptyState,
    onEndReached,
    endReachedThreshold = 200,
    bordered = true,
    className,
    style,
    innerClassName,
    emptyClassName,
  }: VirtualListProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [measuredHeight, setMeasuredHeight] = useState<number | null>(
    typeof height === "number" ? height : null,
  );
  const frame = useRef<number | null>(null);
  const endFiredFor = useRef<number>(-1);
  const onEndReachedRef = useRef(onEndReached);
  onEndReachedRef.current = onEndReached;

  const viewport = measuredHeight ?? (typeof height === "number" ? height : 0);

  // Prefix offsets let us support both fixed and per-index estimated sizes
  // with the same binary-search window calculation.
  const offsets = useMemo(() => {
    const result = new Array<number>(items.length + 1);
    result[0] = 0;
    for (let i = 0; i < items.length; i += 1) {
      const size =
        typeof estimateSize === "function"
          ? estimateSize(i, items[i])
          : estimateSize;
      result[i + 1] = result[i] + Math.max(0, size);
    }
    return result;
  }, [items, estimateSize]);

  const totalHeight = offsets[items.length] ?? 0;

  const findIndex = (offset: number) => {
    let low = 0;
    let high = items.length;
    while (low < high) {
      const mid = (low + high) >>> 1;
      if (offsets[mid + 1] <= offset) low = mid + 1;
      else high = mid;
    }
    return Math.min(low, Math.max(0, items.length - 1));
  };

  const start = items.length ? Math.max(0, findIndex(scrollTop) - overscan) : 0;
  const end = items.length
    ? Math.min(items.length, findIndex(scrollTop + viewport) + 1 + overscan)
    : 0;

  // Measure the real viewport so string heights and resizes keep the
  // rendered window correct.
  useIsomorphicLayoutEffect(() => {
    const node = innerRef.current;
    if (!node) return;
    setMeasuredHeight(node.clientHeight || (typeof height === "number" ? height : 0));
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => setMeasuredHeight(node.clientHeight));
    observer.observe(node);
    return () => observer.disconnect();
  }, [height]);

  // If the data shrinks while scrolled down, bring the viewport back into range.
  useEffect(() => {
    const node = innerRef.current;
    if (!node || scrollTop <= Math.max(0, totalHeight - viewport)) return;
    node.scrollTop = Math.max(0, totalHeight - viewport);
  }, [viewport, scrollTop, totalHeight]);

  // Fire onEndReached once per data length, so appending a page re-arms it.
  useEffect(() => {
    if (!onEndReachedRef.current || !items.length || viewport === 0) return;
    if (endFiredFor.current === items.length) return;
    if (scrollTop + viewport >= totalHeight - endReachedThreshold) {
      endFiredFor.current = items.length;
      onEndReachedRef.current();
    }
  }, [scrollTop, viewport, totalHeight, endReachedThreshold, items.length]);

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const next = event.currentTarget.scrollTop;
    // Coalesce scroll events into one render per animation frame.
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      setScrollTop(next);
    });
  };

  const visible: React.ReactNode[] = [];
  for (let index = start; index < end; index += 1) {
    const item = items[index];
    const top = offsets[index];
    const rowHeight = offsets[index + 1] - top;
    visible.push(
      <React.Fragment key={getKey ? getKey(item, index) : index}>
        {renderItem({
          item,
          index,
          style: {
            position: "absolute",
            top,
            left: 0,
            right: 0,
            height: rowHeight,
          },
        })}
      </React.Fragment>,
    );
  }

  return (
    <div
      ref={(node) => {
        innerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      onScroll={handleScroll}
      style={{ height, ...style }}
      className={cn(
        "relative w-full overflow-y-auto overscroll-contain text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        bordered && "rounded-xl border border-border bg-card text-card-foreground",
        className,
      )}
    >
      {items.length === 0 && emptyState !== undefined ? (
        <div
          className={cn(
            "flex h-full items-center justify-center p-6 text-center text-sm text-muted-foreground",
            emptyClassName,
          )}
        >
          {emptyState}
        </div>
      ) : (
        <div
          style={{ height: totalHeight }}
          className={cn("relative w-full", innerClassName)}
        >
          {visible}
        </div>
      )}
    </div>
  );
}

const VirtualListBase = forwardRef(VirtualListInner) as unknown as (<T>(
  props: VirtualListProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement | null) & { displayName?: string };

/** Virtualizes long lists by rendering only rows near the scroll viewport. */
export const VirtualList = VirtualListBase;
VirtualListBase.displayName = "VirtualList";
