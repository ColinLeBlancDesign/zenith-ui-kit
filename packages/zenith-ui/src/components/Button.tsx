import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cx } from "../utils";

export type ButtonVariant = "primary" | "secondary" | "tertiary";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default "primary" */
  variant?: ButtonVariant;
  /** Smaller padding/typography. */
  size?: "sm" | "md";
  /** Stretch to fill the container width. */
  block?: boolean;
}

/**
 * Button — primary (filled), secondary (outlined) and tertiary (bare) styles.
 * Hover / focus / disabled states are handled via CSS to match the Figma kit.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", block, className, type = "button", ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx(
        "zen-btn",
        `zen-btn--${variant}`,
        size === "sm" && "zen-btn--sm",
        block && "zen-btn--block",
        className
      )}
      {...rest}
    />
  );
});
