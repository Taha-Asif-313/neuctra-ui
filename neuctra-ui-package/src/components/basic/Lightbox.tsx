"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import { cn } from "../../lib/cn";
import { useControllableState } from "../../lib/useControllableState";
import { useScrollLock } from "../../lib/useScrollLock";
import { useFocusTrap } from "../../lib/useFocusTrap";
import { IconButton } from "./IconButton";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface LightboxImage {
  /** Full-resolution image source URL. */
  src: string;
  /** Alternative text announced for the image; defaults to a generated label. */
  alt?: string;
  /** Smaller source used in the thumbnail strip; falls back to `src`. */
  thumbnail?: string;
  /** Optional caption shown under the image. */
  caption?: React.ReactNode;
}

export interface LightboxProps {
  /** Ordered list of images to browse. */
  images: LightboxImage[];
  /** Controlled index of the active image. */
  index?: number;
  /** Initial active index when uncontrolled. */
  defaultIndex?: number;
  /** Called with the next index whenever navigation occurs. */
  onIndexChange?: (index: number) => void;
  /** Controlled visibility of the overlay. */
  open?: boolean;
  /** Initial visibility when uncontrolled. */
  defaultOpen?: boolean;
  /** Called whenever the overlay should open or close. */
  onOpenChange?: (open: boolean) => void;
  /** Lets users toggle a magnified view by clicking the image. */
  zoomable?: boolean;
  /** Wraps from the last image to the first (and back). */
  loop?: boolean;
  /** Shows the thumbnail strip when there is more than one image. */
  showThumbnails?: boolean;
  /** Accessible name for the modal dialog. */
  ariaLabel?: string;
  /** Additional classes for the fixed overlay root. */
  className?: string;
  /** Inline styles for the fixed overlay root. */
  style?: React.CSSProperties;
  /** Styles the dimmed backdrop. */
  backdropClassName?: string;
  /** Styles the active image. */
  imageClassName?: string;
  /** Applied to the close, previous, next and zoom buttons. */
  controlClassName?: string;
  /** Applied to every thumbnail button in the strip. */
  thumbnailClassName?: string;
  /** Styles the caption under the image. */
  captionClassName?: string;
}

/** Overrides IconButton's outline surface so controls read as floating chrome over the image. */
const controlBase = "bg-popover text-popover-foreground hover:bg-accent disabled:pointer-events-none";

const SWIPE_THRESHOLD = 60;

/* -------------------------------------------------------------------------- */
/* Lightbox                                                                   */
/* -------------------------------------------------------------------------- */

export const Lightbox = forwardRef<HTMLDivElement, LightboxProps>(
  function Lightbox(
    {
      images,
      index: controlledIndex,
      defaultIndex = 0,
      onIndexChange,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      zoomable = false,
      loop = true,
      showThumbnails = true,
      ariaLabel = "Image gallery",
      className,
      style,
      backdropClassName,
      imageClassName,
      controlClassName,
      thumbnailClassName,
      captionClassName,
    },
    ref,
  ) {
    const [open, setOpen] = useControllableState<boolean>({
      value: controlledOpen,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });
    const [index, setIndex] = useControllableState<number>({
      value: controlledIndex,
      defaultValue: defaultIndex,
      onChange: onIndexChange,
    });
    const [zoomed, setZoomed] = useState(false);
    const [mounted, setMounted] = useState(false);

    const dialogRef = useRef<HTMLDivElement>(null);
    const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);
    const reduceMotion = useReducedMotion();

    const count = images.length;
    const safeIndex =
      count === 0 ? 0 : Math.min(Math.max(index, 0), count - 1);
    const current = images[safeIndex];
    const isOpen = open && Boolean(current);
    const canPrev = count > 1 && (loop || safeIndex > 0);
    const canNext = count > 1 && (loop || safeIndex < count - 1);

    const goTo = useCallback(
      (next: number) => {
        if (count === 0) return;
        if (!loop && (next < 0 || next > count - 1)) return;
        setZoomed(false);
        setIndex(((next % count) + count) % count);
      },
      [count, loop, setIndex],
    );

    const close = useCallback(() => {
      setZoomed(false);
      setOpen(false);
    }, [setOpen]);

    useEffect(() => setMounted(true), []);
    useScrollLock(isOpen);
    useFocusTrap(dialogRef, isOpen);

    useEffect(() => {
      if (!isOpen) return;

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          event.preventDefault();
          close();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          goTo(safeIndex + 1);
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          goTo(safeIndex - 1);
        } else if (event.key === "Home") {
          event.preventDefault();
          goTo(0);
        } else if (event.key === "End") {
          event.preventDefault();
          goTo(count - 1);
        }
      };

      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    }, [isOpen, close, goTo, safeIndex, count]);

    // Keep the active thumbnail visible in a long strip.
    useEffect(() => {
      if (isOpen) {
        thumbRefs.current[safeIndex]?.scrollIntoView?.({
          block: "nearest",
          inline: "nearest",
        });
      }
    }, [isOpen, safeIndex]);

    const duration = reduceMotion ? 0 : 0.18;

    if (!mounted) return null;

    return createPortal(
      <AnimatePresence>
        {isOpen && current && (
          <motion.div
            key="lightbox-root"
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
            className={cn("fixed inset-0 z-50 flex flex-col", className)}
            style={style}
          >
            <div
              onClick={close}
              aria-hidden="true"
              className={cn(
                "absolute inset-0 bg-background/90 backdrop-blur-sm",
                backdropClassName,
              )}
            />

            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={ariaLabel}
              tabIndex={-1}
              className="pointer-events-none relative flex h-full w-full flex-col outline-none"
            >
              <div className="pointer-events-auto flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
                <span
                  aria-live="polite"
                  className="text-sm font-medium tabular-nums text-muted-foreground"
                >
                  {safeIndex + 1} / {count}
                </span>
                <div className="flex items-center gap-2">
                  {zoomable && (
                    <IconButton
                      variant="outline"
                      size="md"
                      icon={zoomed ? <ZoomOut /> : <ZoomIn />}
                      iconStyle={{ width: 18, height: 18 }}
                      onClick={() => setZoomed((value) => !value)}
                      aria-label={zoomed ? "Zoom out" : "Zoom in"}
                      aria-pressed={zoomed}
                      className={cn(controlBase, controlClassName)}
                    />
                  )}
                  <IconButton
                    variant="outline"
                    size="md"
                    icon={<X />}
                    iconStyle={{ width: 18, height: 18 }}
                    onClick={close}
                    aria-label="Close image viewer"
                    className={cn(controlBase, controlClassName)}
                  />
                </div>
              </div>

              <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-4 sm:px-20">
                {count > 1 && (
                  <IconButton
                    variant="outline"
                    size="md"
                    icon={<ChevronLeft />}
                    onClick={() => goTo(safeIndex - 1)}
                    disabled={!canPrev}
                    aria-label="Previous image"
                    className={cn(
                      controlBase,
                      "pointer-events-auto absolute left-3 z-10 rounded-full sm:left-6",
                      controlClassName,
                    )}
                  />
                )}

                <motion.img
                  key={current.src}
                  src={current.src}
                  alt={current.alt ?? `Image ${safeIndex + 1} of ${count}`}
                  draggable={false}
                  initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
                  animate={{ opacity: 1, scale: zoomed ? 1.5 : 1 }}
                  transition={{ duration }}
                  // Swipe left/right to navigate on touch screens.
                  drag={count > 1 && !zoomed ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x <= -SWIPE_THRESHOLD) goTo(safeIndex + 1);
                    else if (info.offset.x >= SWIPE_THRESHOLD) goTo(safeIndex - 1);
                  }}
                  onClick={
                    zoomable ? () => setZoomed((value) => !value) : undefined
                  }
                  className={cn(
                    "pointer-events-auto max-h-full max-w-full select-none rounded-lg object-contain",
                    zoomable && (zoomed ? "cursor-zoom-out" : "cursor-zoom-in"),
                    imageClassName,
                  )}
                />

                {count > 1 && (
                  <IconButton
                    variant="outline"
                    size="md"
                    icon={<ChevronRight />}
                    onClick={() => goTo(safeIndex + 1)}
                    disabled={!canNext}
                    aria-label="Next image"
                    className={cn(
                      controlBase,
                      "pointer-events-auto absolute right-3 z-10 rounded-full sm:right-6",
                      controlClassName,
                    )}
                  />
                )}
              </div>

              {(current.caption || (showThumbnails && count > 1)) && (
                <div className="pointer-events-auto flex flex-col items-center gap-3 px-4 py-4">
                  {current.caption && (
                    <p
                      className={cn(
                        "max-w-2xl text-center text-sm text-secondary",
                        captionClassName,
                      )}
                    >
                      {current.caption}
                    </p>
                  )}

                  {showThumbnails && count > 1 && (
                    <div className="flex max-w-full gap-2 overflow-x-auto p-1">
                      {images.map((image, imageIndex) => (
                        <button
                          key={`${image.src}-${imageIndex}`}
                          ref={(element) => {
                            thumbRefs.current[imageIndex] = element;
                          }}
                          type="button"
                          onClick={() => goTo(imageIndex)}
                          aria-label={`View image ${imageIndex + 1}`}
                          aria-current={
                            imageIndex === safeIndex ? "true" : undefined
                          }
                          className={cn(
                            "h-12 w-12 shrink-0 overflow-hidden rounded-md border-2 transition-opacity",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            imageIndex === safeIndex
                              ? "border-primary opacity-100"
                              : "border-transparent opacity-60 hover:opacity-100",
                            thumbnailClassName,
                          )}
                        >
                          <img
                            src={image.thumbnail ?? image.src}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
    );
  },
);
Lightbox.displayName = "Lightbox";

/* -------------------------------------------------------------------------- */
/* ImageGallery                                                               */
/* -------------------------------------------------------------------------- */

export interface ImageGalleryProps extends LightboxProps {
  /** Additional classes for the thumbnail grid that opens the viewer. */
  gridClassName?: string;
  /** Inline styles for the thumbnail grid. */
  gridStyle?: React.CSSProperties;
  /** Applied to every grid tile button. */
  tileClassName?: string;
}

export const ImageGallery = forwardRef<HTMLDivElement, ImageGalleryProps>(
  function ImageGallery(
    {
      gridClassName,
      gridStyle,
      tileClassName,
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      index: indexProp,
      defaultIndex = 0,
      onIndexChange,
      ...rest
    },
    ref,
  ) {
    const [open, setOpen] = useControllableState<boolean>({
      value: openProp,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });
    const [index, setIndex] = useControllableState<number>({
      value: indexProp,
      defaultValue: defaultIndex,
      onChange: onIndexChange,
    });

    return (
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4",
          gridClassName,
        )}
        style={gridStyle}
      >
        {rest.images.map((image, imageIndex) => (
          <button
            key={`${image.src}-${imageIndex}`}
            type="button"
            onClick={() => {
              setIndex(imageIndex);
              setOpen(true);
            }}
            aria-label={`Open image ${imageIndex + 1}`}
            className={cn(
              "group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              tileClassName,
            )}
          >
            <img
              src={image.thumbnail ?? image.src}
              alt={image.alt ?? `Thumbnail ${imageIndex + 1}`}
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none"
            />
          </button>
        ))}
        <Lightbox
          {...rest}
          open={open}
          onOpenChange={setOpen}
          index={index}
          onIndexChange={setIndex}
        />
      </div>
    );
  },
);
ImageGallery.displayName = "ImageGallery";
