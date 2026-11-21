"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Shared controlled/uncontrolled state helper for Neuctra UI components.
 *
 * Pass `value` to control the component from outside. When `value` is omitted,
 * the component owns its state starting from `defaultValue`, while still firing
 * `onChange` for every update. The setter is stable and always reports the next
 * value through `onChange`.
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  /** Controlled value. When defined, the component never stores its own copy. */
  value?: T;
  /** Initial value used only in uncontrolled mode. */
  defaultValue: T;
  /** Called whenever the value should change, in both controlled and uncontrolled modes. */
  onChange?: (next: T) => void;
}): [T, (next: T | ((current: T) => T)) => void] {
  const [internal, setInternal] = useState<T>(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? (value as T) : internal;

  const currentRef = useRef(current);
  currentRef.current = current;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const setValue = useCallback(
    (next: T | ((currentValue: T) => T)) => {
      const resolved =
        typeof next === "function"
          ? (next as (currentValue: T) => T)(currentRef.current)
          : next;

      if (!isControlled) setInternal(resolved);
      onChangeRef.current?.(resolved);
    },
    [isControlled],
  );

  return [current, setValue];
}
