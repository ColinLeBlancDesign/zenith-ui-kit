import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cx } from "../utils";

export interface RadioCardProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "title"> {
  /** Bold title shown in the card header. */
  title: ReactNode;
  /** Supporting description below the header. */
  description?: ReactNode;
  /** Optional element next to the title (e.g. a `<Pill>`). */
  pill?: ReactNode;
  /** Which side the radio control sits on. @default "left" */
  controlSide?: "left" | "right";
}

/** A selectable card backed by a radio input — title, optional pill and description. */
export const RadioCard = forwardRef<HTMLInputElement, RadioCardProps>(
  function RadioCard(
    { title, description, pill, controlSide = "left", className, disabled, ...rest },
    ref
  ) {
    const control = (
      <>
        <input
          ref={ref}
          type="radio"
          className="zen-radiocard__input zen-vh-input"
          disabled={disabled}
          {...rest}
        />
        {/* Shares the master Radio Button atom for visual consistency */}
        <span className="zen-radio__circle" />
      </>
    );

    return (
      <label
        className={cx(
          "zen-radiocard",
          controlSide === "right" && "zen-radiocard--right",
          className
        )}
      >
        <span className="zen-radiocard__row">
          <span className="zen-radiocard__lead">
            {controlSide === "left" ? (
              <>
                {control}
                <span className="zen-radiocard__title">{title}</span>
              </>
            ) : (
              <>
                <span className="zen-radiocard__title">{title}</span>
                {pill}
              </>
            )}
          </span>
          <span className="zen-radiocard__trail">
            {controlSide === "left" ? pill : control}
          </span>
        </span>
        {description != null && (
          <span className="zen-radiocard__desc">{description}</span>
        )}
      </label>
    );
  }
);
