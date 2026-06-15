import { useCallback, useState } from "react";

/** Join class names, dropping falsy values. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/**
 * Minimal controllable state hook: supports both controlled (`value` + `onChange`)
 * and uncontrolled (`defaultValue`) usage.
 */
export function useControllableState<T>(options: {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}): [T, (next: T) => void] {
  const { value, defaultValue, onChange } = options;
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<T>(defaultValue);
  const current = isControlled ? (value as T) : internal;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  return [current, setValue];
}

let idCounter = 0;
/** Stable-ish unique id for associating labels/inputs without React 18's useId requirement. */
export function useId(prefix = "zen"): string {
  const [id] = useState(() => `${prefix}-${++idCounter}`);
  return id;
}
