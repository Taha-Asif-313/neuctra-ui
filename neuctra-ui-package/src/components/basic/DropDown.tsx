import React, { useState, useRef, useEffect, useCallback } from "react";

interface Option {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface DropdownProps {
  options: Option[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  multiSelect?: boolean;
  clearable?: boolean;
  virtualized?: boolean;
  optionHeight?: number;
  visibleOptions?: number;

  // Styling props
  width?: string;
  height?: string;
  borderColor?: string;
  focusBorderColor?: string;
  errorBorderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  placeholderColor?: string;
  hoverColor?: string;
  selectedColor?: string;
  disabledColor?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  boxShadow?: string;
  optionPadding?: string;
  optionGap?: string;
  transitionDuration?: string;
  dropdownMaxHeight?: string;
  dropdownMinWidth?: string;

  // Custom styles
  className?: string;
  dropdownClassName?: string;
  optionClassName?: string;
  inputClassName?: string;
  style?: React.CSSProperties;
  dropdownStyle?: React.CSSProperties;
  optionStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;

  // Icons
  iconPrefix?: React.ReactNode;
  iconSuffix?: React.ReactNode;
  clearIcon?: React.ReactNode;
  dropdownIcon?: React.ReactNode;
  checkIcon?: React.ReactNode;

  // Accessibility
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;

  // Callbacks
  onFocus?: () => void;
  onBlur?: () => void;
  onOpen?: () => void;
  onClose?: () => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  searchable = false,
  multiSelect = false,
  clearable = false,
  virtualized = false,
  optionHeight = 36,
  visibleOptions = 5,

  // Styling defaults
  width = "100%",
  height = "auto",
  borderColor = "#d1d5db",
  focusBorderColor = "#2563eb",
  errorBorderColor = "#dc2626",
  backgroundColor = "#ffffff",
  textColor = "#111827",
  placeholderColor = "#9ca3af",
  hoverColor = "#f3f4f6",
  selectedColor = "#eff6ff",
  disabledColor = "#f3f4f6",
  padding = "0.5rem 0.75rem",
  margin = "0",
  borderRadius = "0.375rem",
  boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  optionPadding = "0.5rem 0.75rem",
  optionGap = "0.5rem",
  transitionDuration = "200ms",
  dropdownMaxHeight = "300px",
  dropdownMinWidth = "100%",

  // Custom classes
  className = "",
  dropdownClassName = "",
  optionClassName = "",
  inputClassName = "",

  // Custom styles
  style,
  dropdownStyle,
  optionStyle,
  inputStyle,

  // Icons
  iconPrefix,
  iconSuffix,
  clearIcon = "×",
  dropdownIcon = "▼",
  checkIcon = "✓",

  // Accessibility
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,

  // Callbacks
  onFocus,
  onBlur,
  onOpen,
  onClose,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<(HTMLLIElement | null)[]>([]);

  // Initialize selected values
  useEffect(() => {
    if (value) {
      setSelectedValues(multiSelect ? value.split(",") : [value]);
    } else if (defaultValue) {
      setSelectedValues(multiSelect ? defaultValue.split(",") : [defaultValue]);
    } else {
      setSelectedValues([]);
    }
  }, [value, defaultValue, multiSelect]);

  // Filter options based on search term
  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setFocusedIndex((prev) => {
            const nextIndex =
              prev === null
                ? 0
                : Math.min(prev + 1, filteredOptions.length - 1);
            scrollToOption(nextIndex);
            return nextIndex;
          });
          break;
        case "ArrowUp":
          event.preventDefault();
          setFocusedIndex((prev) => {
            const nextIndex = prev === null ? 0 : Math.max(prev - 1, 0);
            scrollToOption(nextIndex);
            return nextIndex;
          });
          break;
        case "Enter":
          event.preventDefault();
          if (focusedIndex !== null) {
            handleSelect(filteredOptions[focusedIndex].value);
          }
          break;
        case "Escape":
          event.preventDefault();
          setIsOpen(false);
          onClose?.();
          break;
        case "Tab":
          setIsOpen(false);
          onClose?.();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, focusedIndex, filteredOptions]);

  const scrollToOption = useCallback((index: number) => {
    optionsRef.current[index]?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, []);

  const handleSelect = (value: string) => {
    let newSelectedValues: string[];
    if (multiSelect) {
      newSelectedValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
    } else {
      newSelectedValues = [value];
      setIsOpen(false);
      onClose?.();
    }

    setSelectedValues(newSelectedValues);
    onChange?.(multiSelect ? newSelectedValues.join(",") : value);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedValues([]);
    onChange?.("");
    setSearchTerm("");
  };

  const toggleDropdown = () => {
    if (disabled) return;
    const newState = !isOpen;
    setIsOpen(newState);
    if (newState) {
      onOpen?.();
      if (searchable) {
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    } else {
      onClose?.();
    }
  };

  const selectedOption = options.find(
    (option) => option.value === selectedValues[0]
  );
  const selectedOptions = options.filter((option) =>
    selectedValues.includes(option.value)
  );

  // Virtualization setup
  const [startIndex, setStartIndex] = useState(0);
  const visibleOptionCount = Math.min(visibleOptions, filteredOptions.length);
  const endIndex = Math.min(
    startIndex + visibleOptionCount,
    filteredOptions.length
  );
  const visibleOptionsList = virtualized
    ? filteredOptions.slice(startIndex, endIndex)
    : filteredOptions;

  return (
    <div
      ref={dropdownRef}
      className={`dropdown-container ${className}`}
      style={{
        position: "relative",
        width,
        margin,
        fontFamily: "'Inter', sans-serif",
        ...style,
      }}
    >
      {/* Inline CSS for dynamic styles */}
      <style>
        {`
          .dropdown-container {
            --border-color: ${borderColor};
            --focus-border-color: ${focusBorderColor};
            --error-border-color: ${errorBorderColor};
            --bg-color: ${backgroundColor};
            --text-color: ${textColor};
            --placeholder-color: ${placeholderColor};
            --hover-color: ${hoverColor};
            --selected-color: ${selectedColor};
            --disabled-color: ${disabledColor};
            --transition-duration: ${transitionDuration};
          }
        `}
      </style>

      {/* Control button */}
      <div
        role="button"
        onClick={toggleDropdown}
        aria-disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        className={`dropdown-control ${inputClassName}`}
        style={{
          width: "100%",
          minHeight: height,
          padding,
          backgroundColor: disabled ? disabledColor : backgroundColor,
          color: textColor,
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: isOpen ? focusBorderColor : borderColor,
          borderRadius,
          boxShadow,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.7 : 1,
          transition: `all ${transitionDuration} ease-in-out`,
          textAlign: "left",
          ...inputStyle,
          ...(isOpen && {
            boxShadow: `0 0 0 1px ${focusBorderColor}`,
          }),
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: optionGap,
            flex: 1,
            overflow: "hidden",
          }}
        >
          {iconPrefix && (
            <span className="dropdown-icon-prefix" style={{ flexShrink: 0 }}>
              {iconPrefix}
            </span>
          )}

          {multiSelect ? (
            <div
              style={{
                display: "flex",
                gap: "0.25rem",
                flexWrap: "wrap",
                flex: 1,
                overflow: "hidden",
              }}
            >
              {selectedOptions.length > 0 ? (
                selectedOptions.map((option) => (
                  <span
                    key={option.value}
                    style={{
                      backgroundColor: selectedColor,
                      padding: "0.25rem 0.5rem",
                      borderRadius: "0.25rem",
                      fontSize: "0.875rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      flexShrink: 0,
                    }}
                  >
                    {option.icon && (
                      <span style={{ flexShrink: 0 }}>{option.icon}</span>
                    )}
                    <span
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {option.label}
                    </span>
                  </span>
                ))
              ) : (
                <span style={{ color: placeholderColor }}>{placeholder}</span>
              )}
            </div>
          ) : (
            <span
              style={{
                color: selectedOption ? textColor : placeholderColor,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: optionGap,
              }}
            >
              {selectedOption?.icon && (
                <span style={{ flexShrink: 0 }}>{selectedOption.icon}</span>
              )}
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginLeft: "0.5rem",
            flexShrink: 0,
          }}
        >
          {clearable && selectedValues.length > 0 && (
            <span
              onClick={handleClear}
              style={{
                cursor: disabled ? "not-allowed" : "pointer",
                fontSize: "1rem",
                color: textColor,
                opacity: 0.7,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Clear selection"
            >
              {clearIcon}
            </span>
          )}
          <span
            style={{
              transition: `transform ${transitionDuration}`,
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              fontSize: "0.75rem",
              color: textColor,
              opacity: 0.7,
            }}
          >
            {dropdownIcon}
          </span>
        </div>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className={`dropdown-menu ${dropdownClassName}`}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: 1000,
            width: "100%",
            minWidth: dropdownMinWidth,
            maxHeight: dropdownMaxHeight,
            overflowY: "auto",
            backgroundColor,
            border: `1px solid ${borderColor}`,
            borderRadius,
            boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`,
            marginTop: "0.25rem",
            transition: `opacity ${transitionDuration}, transform ${transitionDuration}`,
            opacity: 0,
            transform: "translateY(-0.5rem)",
            animation: `dropdownFadeIn ${transitionDuration} ease-out forwards`,
            ...dropdownStyle,
          }}
          role="listbox"
          aria-multiselectable={multiSelect}
        >
          {/* Search input */}
          {searchable && (
            <div
              style={{
                padding: "0.5rem",
                borderBottom: `1px solid ${borderColor}`,
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  color: textColor,
                  borderColor: isOpen ? focusBorderColor : borderColor,
                  borderRadius: "0.25rem",
                  outline: "none",
                  transition: `border-color ${transitionDuration}`,
                  ...(isOpen && {
                    boxShadow: `0 0 0 1px ${focusBorderColor}`,
                  }),
                }}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>
          )}

          {/* Options list */}
          <ul style={{ margin: 0, padding: "0.25rem 0", listStyle: "none" }}>
            {filteredOptions.length > 0 ? (
              visibleOptionsList.map((option, index) => {
                const isSelected = selectedValues.includes(option.value);
                const isFocused =
                  focusedIndex === (virtualized ? startIndex + index : index);
                const isDisabled = option.disabled;

                return (
                  <li
                    key={option.value}
                    ref={(el) => {
                      if (el) {
                        const refIndex = virtualized
                          ? startIndex + index
                          : index;
                        optionsRef.current[refIndex] = el;
                      }
                    }}
                    onClick={() => !isDisabled && handleSelect(option.value)}
                    onMouseEnter={() =>
                      !isDisabled &&
                      setFocusedIndex(virtualized ? startIndex + index : index)
                    }
                    className={`dropdown-option ${optionClassName} ${
                      isDisabled ? "disabled" : ""
                    }`}
                    style={{
                      padding: optionPadding,
                      cursor: isDisabled ? "not-allowed" : "pointer",
                      backgroundColor: isSelected
                        ? selectedColor
                        : isFocused
                        ? hoverColor
                        : backgroundColor,
                      color: isDisabled ? disabledColor : textColor,
                      display: "flex",
                      alignItems: "center",
                      gap: optionGap,
                      transition: `background-color ${transitionDuration}`,
                      ...optionStyle,
                    }}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={isDisabled}
                  >
                    {multiSelect && (
                      <span style={{ flexShrink: 0 }}>
                        {isSelected ? checkIcon : "○"}
                      </span>
                    )}
                    {option.icon && (
                      <span style={{ flexShrink: 0 }}>{option.icon}</span>
                    )}
                    <span style={{ flex: 1 }}>{option.label}</span>
                  </li>
                );
              })
            ) : (
              <li
                style={{
                  padding: optionPadding,
                  color: placeholderColor,
                  textAlign: "center",
                }}
              >
                No options found
              </li>
            )}
          </ul>

          {/* Virtualization scroll spacer */}
          {virtualized && filteredOptions.length > visibleOptionCount && (
            <div
              style={{
                height: `${
                  (filteredOptions.length - visibleOptionCount) * optionHeight
                }px`,
              }}
            />
          )}
        </div>
      )}

      {/* Inline animation styles */}
      <style>
        {`
          @keyframes dropdownFadeIn {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};
