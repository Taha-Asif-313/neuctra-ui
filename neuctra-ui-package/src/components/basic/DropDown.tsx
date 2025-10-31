"use client";
import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  forwardRef,
  ForwardRefRenderFunction,
} from "react";

/* ----------------------
 * Types
 * ---------------------*/
export interface Option {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  description?: string;
}

export interface DropdownProps {
  options: Option[];

  value?: string;
  values?: string[];
  defaultValue?: string;
  defaultValues?: string[];

  onChange?: (value: string | string[]) => void;

  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  multiSelect?: boolean;
  clearable?: boolean;
  virtualized?: boolean;

  width?: string | number;
  dropdownMaxHeight?: string;
  borderRadius?: string;
  boxShadow?: string;
  borderColor?: string;
  accentColor?: string; // ✅ accent color (focus ring + selected)
  theme?: "light" | "dark" | "custom"; // ✅ global theme
  menuBg?: string; // ✅ background override
  controlBg?: string; // ✅ control background
  textColor?: string;
  hoverBg?: string;
  selectedBg?: string;
  disabledBg?: string;
  disabledTextColor?: string;
  placeholderColor?: string;

  // animation & transitions
  transitionDuration?: string;

  // class/style hooks
  className?: string;
  controlClassName?: string;
  menuClassName?: string;
  optionClassName?: string;
  style?: React.CSSProperties;
  controlStyle?: React.CSSProperties;
  menuStyle?: React.CSSProperties;
  optionStyle?: React.CSSProperties;

  // icons
  iconPrefix?: React.ReactNode;
  iconSuffix?: React.ReactNode;
  clearIcon?: React.ReactNode;
  dropdownIcon?: React.ReactNode;
  checkIcon?: React.ReactNode;
}

/* ----------------------
 * Default theme tokens
 * ---------------------*/
const THEMES = {
  light: {
    controlBg: "#ffffff",
    menuBg: "#ffffff",
    textColor: "#111827",
    placeholderColor: "#6b7280",
    hoverBg: "#f9fafb",
    selectedBg: "#eff6ff",
    disabledBg: "#f3f4f6",
    disabledTextColor: "#9ca3af",
    borderColor: "#e5e7eb",
    accentColor: "#3b82f6",
  },
  dark: {
    controlBg: "#1f2937",
    menuBg: "#111827",
    textColor: "#f9fafb",
    placeholderColor: "#9ca3af",
    hoverBg: "#374151",
    selectedBg: "#2563eb33",
    disabledBg: "#374151",
    disabledTextColor: "#6b7280",
    borderColor: "#374151",
    accentColor: "#60a5fa",
  },
  custom: {} as any,
};

/* ----------------------
 * Component
 * ---------------------*/
const DropdownInner: ForwardRefRenderFunction<HTMLDivElement, DropdownProps> = (
  props,
  ref
) => {
  const id = useId();
  const {
    options,
    value,
    values,
    defaultValue,
    defaultValues,
    onChange,

    placeholder = "Select...",
    disabled = false,
    searchable = false,
    multiSelect = false,
    clearable = false,
    virtualized = false,

    width = "100%",
    dropdownMaxHeight = "320px",
    borderRadius = "8px",
    boxShadow = "0 8px 28px rgba(0,0,0,0.1)",
    borderColor,
    accentColor,
    theme = "light",
    menuBg,
    controlBg,
    textColor,
    hoverBg,
    selectedBg,
    disabledBg,
    disabledTextColor,
    placeholderColor,
    transitionDuration = "180ms",

    className,
    controlClassName,
    menuClassName,
    optionClassName,
    style,
    controlStyle,
    menuStyle,
    optionStyle,

    iconPrefix,
    iconSuffix,
    clearIcon = "×",
    dropdownIcon = "▾",
    checkIcon = "✓",
  } = props;

  // merge theme colors
  const themeVars = {
    ...THEMES[theme],
    ...(theme === "custom" ? {} : {}),
  };
  const colors = {
    borderColor: borderColor ?? themeVars.borderColor,
    accentColor: accentColor ?? themeVars.accentColor,
    controlBg: controlBg ?? themeVars.controlBg,
    menuBg: menuBg ?? themeVars.menuBg,
    textColor: textColor ?? themeVars.textColor,
    hoverBg: hoverBg ?? themeVars.hoverBg,
    selectedBg: selectedBg ?? themeVars.selectedBg,
    disabledBg: disabledBg ?? themeVars.disabledBg,
    disabledTextColor: disabledTextColor ?? themeVars.disabledTextColor,
    placeholderColor: placeholderColor ?? themeVars.placeholderColor,
  };

  /* ----------------- State ----------------- */
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(
    defaultValues ?? (defaultValue ? [defaultValue] : [])
  );

  useEffect(() => {
    if (value) setSelected([value]);
    if (values) setSelected(values);
  }, [value, values]);

  const selectedOptions = useMemo(
    () => options.filter((o) => selected.includes(o.value)),
    [options, selected]
  );

  const toggle = () => !disabled && setIsOpen((s) => !s);

  const selectValue = (val: string) => {
    if (multiSelect) {
      const exists = selected.includes(val);
      const next = exists
        ? selected.filter((v) => v !== val)
        : [...selected, val];
      setSelected(next);
      onChange?.(next);
    } else {
      setSelected([val]);
      onChange?.(val);
      setIsOpen(false);
    }
  };

  const clearSelection = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelected([]);
    onChange?.(multiSelect ? [] : "");
  };

  /* ----------------- Render ----------------- */
  return (
    <div
      ref={ref}
      className={className}
      style={{
        position: "relative",
        width,
        fontFamily:
          "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
        ...style,
      }}
    >
      {/* Control */}
      <div
        className={controlClassName}
        role="button"
        tabIndex={0}
        onClick={toggle}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: colors.controlBg,
          color: colors.textColor,
          padding: "0.5rem 0.75rem",
          border: `1px solid ${
            isOpen ? colors.accentColor : colors.borderColor
          }`,
          borderRadius,
          cursor: disabled ? "not-allowed" : "pointer",
          boxShadow: isOpen ? `0 0 0 3px ${colors.accentColor}33` : undefined,
          transition: `all ${transitionDuration} ease`,
          ...controlStyle,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {iconPrefix}
          {selectedOptions.length ? (
            <span>{selectedOptions.map((s) => s.label).join(", ")}</span>
          ) : (
            <span style={{ color: colors.placeholderColor }}>
              {placeholder}
            </span>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {clearable && selected.length > 0 && (
            <button
              onClick={clearSelection}
              style={{
                background: "transparent",
                border: "none",
                color: colors.textColor,
                cursor: "pointer",
              }}
            >
              {clearIcon}
            </button>
          )}
          {iconSuffix}
          <div
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: `transform ${transitionDuration}`,
            }}
          >
            {dropdownIcon}
          </div>
        </div>
      </div>

      {/* Menu */}
      {isOpen && (
        <ul
          className={menuClassName}
          style={{
            position: "absolute",
            zIndex: 100,
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            background: colors.menuBg,
            border: `1px solid ${colors.borderColor}`,
            borderRadius,
            boxShadow,
            maxHeight: dropdownMaxHeight,
            overflowY: "auto",
            transition: `opacity ${transitionDuration} ease`,
            ...menuStyle,
          }}
        >
          {options.map((opt) => {
            const isSelected = selected.includes(opt.value);
            return (
              <li
                key={opt.value}
                onClick={() => !opt.disabled && selectValue(opt.value)}
                className={optionClassName}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "0.5rem 0.75rem",
                  background: opt.disabled
                    ? colors.disabledBg
                    : isSelected
                    ? colors.selectedBg
                    : "transparent",
                  color: opt.disabled
                    ? colors.disabledTextColor
                    : colors.textColor,
                  cursor: opt.disabled ? "not-allowed" : "pointer",
                  borderRadius: 6,
                  userSelect: "none",
                  ...optionStyle,
                }}
                onMouseEnter={(e) => {
                  if (!opt.disabled && !isSelected)
                    e.currentTarget.style.backgroundColor = colors.hoverBg;
                }}
                onMouseLeave={(e) => {
                  if (!opt.disabled && !isSelected)
                    e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {multiSelect && (
                  <span style={{ width: 18, textAlign: "center" }}>
                    {isSelected ? checkIcon : "○"}
                  </span>
                )}
                {opt.icon && <span>{opt.icon}</span>}
                <div style={{ flex: 1 }}>
                  {opt.label}
                  {opt.description && (
                    <div
                      style={{
                        fontSize: 12,
                        color: colors.placeholderColor,
                        marginTop: 2,
                      }}
                    >
                      {opt.description}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export const Dropdown = forwardRef(DropdownInner);
export default Dropdown;
