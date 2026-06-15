import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cx } from "../utils";
import { CheckIcon } from "../icons";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Text shown next to the box. */
  label?: ReactNode;
}

/** Checkbox with an accessible native input behind a styled box. */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, className, disabled, ...rest }, ref) {
    return (
      <label
        className={cx("zen-checkbox", disabled && "zen-checkbox--disabled", className)}
      >
        <input
          ref={ref}
          type="checkbox"
          className="zen-vh-input"
          disabled={disabled}
          {...rest}
        />
        <span className="zen-checkbox__box">
          <CheckIcon className="zen-checkbox__check" />
        </span>
        {label != null && <span>{label}</span>}
      </label>
    );
  }
);
