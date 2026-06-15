import { forwardRef, useRef, type InputHTMLAttributes } from "react";
import { cx, useControllableState } from "../utils";
import { CloseIcon, SearchIcon } from "../icons";

export interface SearchFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
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

/** Search input with a leading magnifier icon and a clear button. */
export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  function SearchField(
    {
      onClear,
      onValueChange,
      className,
      disabled,
      placeholder = "Search",
      value,
      defaultValue,
      onChange,
      ...rest
    },
    forwardedRef
  ) {
    const innerRef = useRef<HTMLInputElement | null>(null);
    const [current, setCurrent] = useControllableState<string>({
      value: value === undefined ? undefined : String(value),
      defaultValue: defaultValue !== undefined ? String(defaultValue) : "",
      onChange: onValueChange,
    });

    const showClear = !disabled && current.length > 0;

    function handleClear() {
      setCurrent("");
      onClear?.();
      const el = innerRef.current;
      if (el) {
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
      <div className="zen-search">
        <div
          className={cx(
            "zen-search__box",
            disabled && "zen-search--disabled",
            className
          )}
        >
          {!showClear && <SearchIcon className="zen-field__icon" />}
          <input
            ref={(node) => {
              innerRef.current = node;
              setRef(forwardedRef, node);
            }}
            type="search"
            className="zen-input__el"
            placeholder={placeholder}
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
              aria-label="Clear search"
              onClick={handleClear}
              tabIndex={-1}
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </div>
    );
  }
);
