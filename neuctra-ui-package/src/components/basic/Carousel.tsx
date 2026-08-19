"use client";

import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/cn";

export interface CarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  children: React.ReactNode;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  /** Auto-advance interval in ms; 0 disables. Pauses on hover/focus. */
  autoPlay?: number;
  /** Wrap from the last slide back to the first. */
  loop?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
  /** Accessible name for the carousel region. */
  label?: string;

  /** 🔥 Full Customization */
  trackClassName?: string;
  slidesClassName?: string;
  slideClassName?: string;
  arrowClassName?: string;
  prevArrowClassName?: string;
  nextArrowClassName?: string;
  arrowIconClassName?: string;
  dotsClassName?: string;
  dotClassName?: string;
}

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  function Carousel(
    {
      children,
      defaultIndex = 0,
      onIndexChange,
      autoPlay = 0,
      loop = true,
      showArrows = true,
      showDots = true,
      label = "Carousel",
      className,
      trackClassName,
      slidesClassName,
      slideClassName,
      arrowClassName,
      prevArrowClassName,
      nextArrowClassName,
      arrowIconClassName,
      dotsClassName,
      dotClassName,
      ...rest
    },
    ref,
  ) {
    const slides = React.Children.toArray(children);
    const count = slides.length;

    const [index, setIndex] = useState(() =>
      Math.min(Math.max(defaultIndex, 0), Math.max(count - 1, 0)),
    );
    const [paused, setPaused] = useState(false);
    const touchStartX = useRef<number | null>(null);

    const goTo = (next: number) => {
      let target = next;
      if (loop) {
        target = (next + count) % count;
      } else {
        target = Math.min(Math.max(next, 0), count - 1);
      }
      setIndex(target);
      onIndexChange?.(target);
    };

    // Auto-play with cleanup; paused on hover/focus for readability and a11y.
    useEffect(() => {
      if (!autoPlay || paused || count <= 1) return;
      const handle = setInterval(() => {
        setIndex((prev) => {
          const next = loop ? (prev + 1) % count : Math.min(prev + 1, count - 1);
          onIndexChange?.(next);
          return next;
        });
      }, autoPlay);
      return () => clearInterval(handle);
      // onIndexChange intentionally omitted — consumers pass inline arrows.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoPlay, paused, count, loop]);

    if (count === 0) return null;

    const arrowClasses = cn(
      "absolute top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-background/80 p-2",
      "text-foreground backdrop-blur transition-colors hover:bg-accent",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      "disabled:pointer-events-none disabled:opacity-40",
      arrowClassName,
    );

    return (
      <div
        ref={ref}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            goTo(index - 1);
          } else if (e.key === "ArrowRight") {
            e.preventDefault();
            goTo(index + 1);
          }
        }}
        className={cn("relative w-full", className)}
        {...rest}
      >
        {/* Track */}
        <div
          className={cn("overflow-hidden rounded-xl", trackClassName)}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const delta = e.changedTouches[0].clientX - touchStartX.current;
            touchStartX.current = null;
            if (Math.abs(delta) > 40) goTo(delta < 0 ? index + 1 : index - 1);
          }}
        >
          <div
            className={cn(
              "flex transition-transform duration-300 ease-out motion-reduce:transition-none",
              slidesClassName,
            )}
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${i + 1} of ${count}`}
                aria-hidden={i !== index}
                // Hidden slides shouldn't be tabbable.
                inert={i !== index ? true : undefined}
                className={cn("w-full shrink-0", slideClassName)}
              >
                {slide}
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        {showArrows && count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              disabled={!loop && index === 0}
              onClick={() => goTo(index - 1)}
              className={cn(arrowClasses, "left-3", prevArrowClassName)}
            >
              <ChevronLeft
                aria-hidden="true"
                className={cn("h-4 w-4", arrowIconClassName)}
              />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              disabled={!loop && index === count - 1}
              onClick={() => goTo(index + 1)}
              className={cn(arrowClasses, "right-3", nextArrowClassName)}
            >
              <ChevronRight
                aria-hidden="true"
                className={cn("h-4 w-4", arrowIconClassName)}
              />
            </button>
          </>
        )}

        {/* Dots */}
        {showDots && count > 1 && (
          <div className={cn("mt-3 flex justify-center gap-1.5", dotsClassName)}>
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                onClick={() => goTo(i)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  i === index
                    ? "w-5 bg-primary"
                    : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground/70",
                  dotClassName,
                )}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
);

Carousel.displayName = "Carousel";
