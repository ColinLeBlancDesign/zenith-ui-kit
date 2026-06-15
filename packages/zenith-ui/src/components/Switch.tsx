import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cx } from "../utils";

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Optional text shown next to the switch. */
  label?: ReactNode;
}

/** Toggle switch backed by an accessible native checkbox input. */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, className, disabled, ...rest },
  ref
) {
  return (
    <label className={cx("zen-switch", disabled && "zen-switch--disabled", className)}>
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        className="zen-vh-input"
        disabled={disabled}
        {...rest}
      />
      <span className="zen-switch__track">
        <span className="zen-switch__knob" />
      </span>
      {label != null && <span>{label}</span>}
    </label>
  );
});
