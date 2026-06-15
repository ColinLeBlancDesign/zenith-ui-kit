import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cx } from "../utils";

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Text shown next to the control. */
  label?: ReactNode;
}

/** Radio button with an accessible native input behind a styled circle. */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, className, disabled, ...rest },
  ref
) {
  return (
    <label className={cx("zen-radio", disabled && "zen-radio--disabled", className)}>
      <input
        ref={ref}
        type="radio"
        className="zen-vh-input"
        disabled={disabled}
        {...rest}
      />
      <span className="zen-radio__circle" />
      {label != null && <span>{label}</span>}
    </label>
  );
});
