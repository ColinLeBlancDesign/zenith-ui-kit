import {
  forwardRef,
  useRef,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cx, useControllableState, useId } from "../utils";
import { CloseIcon } from "../icons";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Field label rendered above the input. */
  label?: ReactNode;
  /** Show a clear (✕) button when the field has a value. @default true */
  clearable?: boolean;
  /** Called after the field is cleared. */
  onClear?: () => void;
  /** Convenience change handler that receives the string value. */
  onValueChange?: (value: string) => void;
}

function setRef<T>(ref: React.Ref<T> | undefined, value: T) {
  if (typeof ref === "function") ref(value);
  else if (ref && typeof ref === "object")
    (ref as React.MutableRefObject<T | null>).current = value;
}

/** Text input with a label and an optional clear button. */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    clearable = true,
    onClear,
    onValueChange,
    className,
    disabled,
    id,
    value,
    defaultValue,
    onChange,
    ...rest
  },
  forwardedRef
) {
  const innerRef = useRef<HTMLInputElement | null>(null);
  const autoId = useId("input");
  const fieldId = id ?? autoId;

  const [current, setCurrent] = useControllableState<string>({
    value: value === undefined ? undefined : String(value),
    defaultValue: defaultValue !== undefined ? String(defaultValue) : "",
    onChange: onValueChange,
  });

  const showClear = clearable && !disabled && current.length > 0;

  function handleClear() {
    setCurrent("");
    onClear?.();
    const el = innerRef.current;
    if (el) {
      // keep native uncontrolled inputs in sync
      const setter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value"
      )?.set;
      setter?.call(el, "");
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.focus();
    }
  }

  return (
    <div className="zen-field">
      {label != null && (
        <label className="zen-field__label" htmlFor={fieldId}>
          {label}
        </label>
      )}
      <div className={cx("zen-input", disabled && "zen-input--disabled", className)}>
        <input
          id={fieldId}
          ref={(node) => {
            innerRef.current = node;
            setRef(forwardedRef, node);
          }}
          className="zen-input__el"
          disabled={disabled}
          value={value === undefined ? undefined : current}
          defaultValue={defaultValue}
          onChange={(e) => {
            setCurrent(e.target.value);
            onChange?.(e);
          }}
          {...rest}
        />
        {showClear && (
          <button
            type="button"
            className="zen-field__clear"
            aria-label="Clear"
            onClick={handleClear}
            tabIndex={-1}
          >
            <CloseIcon />
          </button>
        )}
      </div>
    </div>
  );
});
