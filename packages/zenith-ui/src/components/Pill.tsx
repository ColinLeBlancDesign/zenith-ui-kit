import { forwardRef, type HTMLAttributes } from "react";
import { cx } from "../utils";

export type PillColor = "info" | "promo" | "success" | "alert" | "warning";

export interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  /** Semantic colour. @default "info" */
  color?: PillColor;
  /** Inverted (solid) fill — swaps the text and surface colours. */
  inverted?: boolean;
}

/** Small rounded label / badge in one of five semantic colours. */
export const Pill = forwardRef<HTMLSpanElement, PillProps>(function Pill(
  { color = "info", inverted, className, ...rest },
  ref
) {
  return (
    <span
      ref={ref}
      className={cx(
        "zen-pill",
        `zen-pill--${color}`,
        inverted && "zen-pill--inverted",
        className
      )}
      {...rest}
    />
  );
});
