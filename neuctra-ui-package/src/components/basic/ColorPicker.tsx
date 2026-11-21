"use client";

import React, {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "../../lib/cn";
import { useControllableState } from "../../lib/useControllableState";
import { Slider } from "./Slider";
import { Input } from "./Input";
import { ToggleGroup } from "./ToggleGroup";

/** Output formats offered by the ColorPicker. */
export type ColorFormat = "hex" | "rgb";

export interface ColorPickerProps {
  /** Controlled color string (hex or rgb). */
  value?: string;
  /** Initial color when uncontrolled. */
  defaultValue?: string;
  /** Called with the newly committed color string. */
  onChange?: (value: string) => void;
  /** Formats exposed by the toggle. Defaults to hex and rgb. */
  formats?: ColorFormat[];
  /** Enables an alpha channel and RGBA / 8-digit HEX output. */
  alpha?: boolean;
  /** Preset color strings shown as clickable swatches. */
  swatches?: string[];
  /** Accessible label for the color text field. Defaults to `label`, then "Color value". */
  ariaLabel?: string;
  /** Label rendered above the panel. */
  label?: string;
  /** Helper text rendered below the panel. */
  helperText?: string;
  /** Error message rendered below the panel (replaces helperText). */
  error?: string;
  /** Disables every control in the picker. */
  disabled?: boolean;
  /** Shows the R, G and B channel inputs. */
  showChannels?: boolean;
  /** Additional classes for the root element. */
  className?: string;
  /** Inline styles for the root element. */
  style?: React.CSSProperties;
  /** Additional classes for the label. */
  labelClassName?: string;
  /** Additional classes for the bordered panel. */
  panelClassName?: string;
  /** Additional classes for the color preview swatch (opens the native color dialog). */
  previewClassName?: string;
  /** Additional classes for the text and channel inputs (the inner Input elements). */
  inputClassName?: string;
  /** Additional classes for each preset swatch button. */
  swatchClassName?: string;
  /** Additional classes for the helper/error text. */
  helperClassName?: string;
}

interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const toHexPart = (value: number) =>
  clamp(Math.round(value), 0, 255).toString(16).padStart(2, "0");

function parseColor(input: string): RGBA | null {
  const raw = input.trim().toLowerCase();
  const hex = raw.match(/^#?([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/);
  if (hex) {
    const digits = hex[1];
    if (digits.length <= 4) {
      const expand = (character: string) =>
        parseInt(character + character, 16);
      return {
        r: expand(digits[0]),
        g: expand(digits[1]),
        b: expand(digits[2]),
        a: digits.length === 4 ? expand(digits[3]) / 255 : 1,
      };
    }
    return {
      r: parseInt(digits.slice(0, 2), 16),
      g: parseInt(digits.slice(2, 4), 16),
      b: parseInt(digits.slice(4, 6), 16),
      a: digits.length === 8 ? parseInt(digits.slice(6, 8), 16) / 255 : 1,
    };
  }

  const rgb = raw.match(
    /^rgba?\(\s*(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})(?:\s*[,/]\s*([\d.]+)(%?))?\s*\)$/,
  );
  if (rgb) {
    const alpha = rgb[4]
      ? rgb[5] === "%"
        ? clamp(parseFloat(rgb[4]) / 100, 0, 1)
        : clamp(parseFloat(rgb[4]), 0, 1)
      : 1;
    return {
      r: clamp(Number(rgb[1]), 0, 255),
      g: clamp(Number(rgb[2]), 0, 255),
      b: clamp(Number(rgb[3]), 0, 255),
      a: alpha,
    };
  }
  return null;
}

function formatColor(color: RGBA, format: ColorFormat, alpha: boolean) {
  if (format === "rgb") {
    const base = `${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)}`;
    return alpha && color.a < 1
      ? `rgba(${base}, ${Number(color.a.toFixed(2))})`
      : `rgb(${base})`;
  }
  const base = `#${toHexPart(color.r)}${toHexPart(color.g)}${toHexPart(color.b)}`;
  return alpha && color.a < 1
    ? `${base}${toHexPart(color.a * 255)}`
    : base;
}

export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  function ColorPicker(
    {
      value,
      defaultValue = "#000000",
      onChange,
      formats = ["hex", "rgb"],
      alpha = false,
      swatches = [],
      ariaLabel,
      label,
      helperText,
      error,
      disabled = false,
      showChannels = true,
      className,
      style,
      labelClassName,
      panelClassName,
      previewClassName,
      inputClassName,
      swatchClassName,
      helperClassName,
    },
    ref,
  ) {
    const id = useId();
    const inputId = `${id}-value`;
    const labelId = `${id}-label`;
    const messageId = `${id}-message`;

    const [colorValue, setColorValue] = useControllableState<string>({
      value,
      defaultValue,
      onChange,
    });
    const [format, setFormat] = useState<ColorFormat>(() => {
      const detected: ColorFormat = colorValue.trim().startsWith("rgb") ? "rgb" : "hex";
      return formats.includes(detected) ? detected : (formats[0] ?? "hex");
    });
    const [draft, setDraft] = useState(colorValue);
    const [invalid, setInvalid] = useState(false);

    const parsed = useMemo(
      () => parseColor(colorValue) ?? { r: 0, g: 0, b: 0, a: 1 },
      [colorValue],
    );

    useEffect(() => {
      setDraft(colorValue);
      setInvalid(false);
    }, [colorValue]);

    const commit = (next: RGBA, nextFormat: ColorFormat = format) => {
      const formatted = formatColor(
        {
          r: clamp(Number.isFinite(next.r) ? next.r : 0, 0, 255),
          g: clamp(Number.isFinite(next.g) ? next.g : 0, 0, 255),
          b: clamp(Number.isFinite(next.b) ? next.b : 0, 0, 255),
          a: clamp(Number.isFinite(next.a) ? next.a : 1, 0, 1),
        },
        nextFormat,
        alpha,
      );
      setColorValue(formatted);
      setDraft(formatted);
      setInvalid(false);
    };

    const commitText = () => {
      if (draft === colorValue) return;
      const next = parseColor(draft);
      if (!next) {
        setInvalid(true);
        return;
      }
      commit(alpha ? next : { ...next, a: 1 });
    };

    const updateChannel = (channel: keyof RGBA, next: number) => {
      commit({ ...parsed, [channel]: channel === "a" ? next / 100 : next });
    };

    const hex6 = `#${toHexPart(parsed.r)}${toHexPart(parsed.g)}${toHexPart(parsed.b)}`;
    const isActiveSwatch = (swatch: string) => {
      const candidate = parseColor(swatch);
      return Boolean(
        candidate &&
          Math.round(candidate.r) === Math.round(parsed.r) &&
          Math.round(candidate.g) === Math.round(parsed.g) &&
          Math.round(candidate.b) === Math.round(parsed.b) &&
          Math.abs(candidate.a - parsed.a) < 0.01,
      );
    };
    const message = invalid
      ? "Enter a valid hex or rgb color."
      : (error ?? helperText);
    const hasError = invalid || Boolean(error);

    // Input does not take arbitrary aria/DOM attributes, so the ones the hex
    // field needs (its message lives below the whole panel) are set directly.
    const hexInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
    useEffect(() => {
      const element = hexInputRef.current;
      if (!element) return;
      element.setAttribute("spellcheck", "false");
      element.setAttribute("autocomplete", "off");
      if (hasError) element.setAttribute("aria-invalid", "true");
      else element.removeAttribute("aria-invalid");
      if (message) element.setAttribute("aria-describedby", messageId);
      else element.removeAttribute("aria-describedby");
    }, [hasError, message, messageId]);

    // Checkerboard drawn from theme tokens, so transparency stays visible.
    const checkerboard: React.CSSProperties = alpha
      ? {
          backgroundImage:
            "repeating-conic-gradient(var(--muted) 0% 25%, transparent 0% 50%)",
          backgroundSize: "8px 8px",
        }
      : {};

    return (
      <div
        ref={ref}
        style={style}
        className={cn("w-full max-w-72 space-y-1.5", className)}
      >
        {label && (
          <label
            id={labelId}
            htmlFor={inputId}
            className={cn(
              "flex items-center gap-1.5 text-[13px] font-medium leading-none text-foreground",
              labelClassName,
            )}
          >
            {label}
          </label>
        )}

        <div
          role="group"
          aria-labelledby={label ? labelId : undefined}
          aria-label={label ? undefined : "Color picker"}
          className={cn(
            "space-y-3 rounded-xl border border-border bg-card p-3 text-card-foreground",
            hasError && "border-destructive",
            disabled && "pointer-events-none opacity-50",
            panelClassName,
          )}
        >
          <div className="flex items-stretch gap-2">
            <div
              className={cn(
                "relative w-10 shrink-0 overflow-hidden rounded-lg border border-border",
                "focus-within:ring-2 focus-within:ring-ring",
                previewClassName,
              )}
              style={checkerboard}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0"
                style={{ backgroundColor: colorValue }}
              />
              <input
                type="color"
                value={hex6}
                disabled={disabled}
                aria-label="Open color dialog"
                onChange={(event) => {
                  const next = parseColor(event.target.value);
                  if (next) commit({ ...next, a: parsed.a });
                }}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
              />
            </div>
            <div
              className="min-w-0 flex-1"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  commitText();
                }
                if (event.key === "Escape") {
                  setDraft(colorValue);
                  setInvalid(false);
                }
              }}
            >
              {!label && (
                <label htmlFor={inputId} className="sr-only">
                  {ariaLabel ?? "Color value"}
                </label>
              )}
              <Input
                ref={hexInputRef}
                id={inputId}
                value={draft}
                disabled={disabled}
                onChange={(event) => setDraft(event.target.value)}
                onBlur={commitText}
                inputClassName={cn(
                  "px-3 font-mono tracking-tight",
                  invalid && "border-destructive focus-visible:ring-destructive/50",
                  inputClassName,
                )}
              />
            </div>
          </div>

          {formats.length > 1 && (
            <ToggleGroup
              aria-label="Color format"
              size="sm"
              fullWidth
              disabled={disabled}
              value={format}
              options={formats.map((option) => ({
                value: option,
                label: option.toUpperCase(),
              }))}
              onChange={(next) => {
                const option = next as ColorFormat;
                // Clicking the active segment reports "", which is a no-op here.
                if (!option || option === format) return;
                setFormat(option);
                commit(parsed, option);
              }}
            />
          )}

          {showChannels && (
            <div className="grid grid-cols-3 gap-2">
              {(["r", "g", "b"] as const).map((channel) => (
                <div key={channel} className="min-w-0 space-y-1">
                  <span
                    aria-hidden="true"
                    className="block text-[11px] font-medium uppercase leading-none text-muted-foreground"
                  >
                    {channel}
                  </span>
                  <Input
                    type="number"
                    size="sm"
                    min={0}
                    max={255}
                    disabled={disabled}
                    label={`${{ r: "Red", g: "Green", b: "Blue" }[channel]} channel`}
                    labelClassName="sr-only"
                    wrapperClassName="space-y-0"
                    value={String(Math.round(parsed[channel]))}
                    onChange={(event) => {
                      if (event.target.value === "") return;
                      updateChannel(channel, Number(event.target.value));
                    }}
                    inputClassName={cn("px-2 tabular-nums", inputClassName)}
                  />
                </div>
              ))}
            </div>
          )}

          {alpha && (
            <Slider
              label="Alpha"
              size="sm"
              min={0}
              max={100}
              disabled={disabled}
              value={Math.round(parsed.a * 100)}
              onChange={(next) => updateChannel("a", next)}
              showValue
              formatValue={(next) => `${next}%`}
              aria-label="Alpha channel"
              labelClassName="text-[11px] uppercase text-muted-foreground"
            />
          )}

          {swatches.length > 0 && (
            <div>
              <p className="mb-2 text-[11px] font-medium uppercase text-muted-foreground">
                Swatches
              </p>
              <div className="flex flex-wrap gap-2">
                {swatches.map((swatch, index) => {
                  const active = isActiveSwatch(swatch);
                  return (
                    <button
                      key={`${swatch}-${index}`}
                      type="button"
                      title={swatch}
                      disabled={disabled}
                      aria-label={`Use color ${swatch}`}
                      aria-pressed={active}
                      onClick={() => {
                        const next = parseColor(swatch);
                        if (next) commit(alpha ? next : { ...next, a: 1 });
                      }}
                      className={cn(
                        "h-7 w-7 rounded-md border border-border transition-transform hover:scale-105 motion-reduce:transition-none",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
                        active && "ring-2 ring-ring ring-offset-2 ring-offset-card",
                        swatchClassName,
                      )}
                      style={{ backgroundColor: swatch }}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {message && (
          <p
            id={messageId}
            role={invalid ? "alert" : undefined}
            className={cn(
              "text-xs",
              hasError ? "text-destructive" : "text-muted-foreground",
              helperClassName,
            )}
          >
            {message}
          </p>
        )}
      </div>
    );
  },
);

ColorPicker.displayName = "ColorPicker";
