import { type HTMLAttributes, type ReactNode } from "react";
import { cx } from "../utils";

export type TooltipSide = "top" | "bottom" | "left" | "right";

export interface TooltipProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "title" | "content"> {
  /** Bold heading inside the tooltip. */
  title: ReactNode;
  /** Body text inside the tooltip. */
  content?: ReactNode;
  /** Which side the bubble points from. @default "top" */
  side?: TooltipSide;
  /** Force the tooltip open (otherwise shows on hover/focus). */
  open?: boolean;
  /** The trigger element. */
  children: ReactNode;
}

/** Tooltip with a directional arrow, shown on hover/focus of its child. */
export function Tooltip({
  title,
  content,
  side = "top",
  open,
  children,
  className,
  ...rest
}: TooltipProps) {
  return (
    <span
      className={cx("zen-tooltip", className)}
      data-open={open ? "true" : undefined}
      {...rest}
    >
      {children}
      <span role="tooltip" className={cx("zen-tooltip__content", `zen-tooltip__content--${side}`)}>
        <span className="zen-tooltip__arrow" aria-hidden="true">
          <svg width="18" height="8" viewBox="0 0 18 8" fill="none">
            <path
              d="M-8.67767 -8.67768H26.6777L12.5355 5.46446C10.5829 7.41708 7.41709 7.41708 5.46447 5.46446L-8.67767 -8.67768Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span className="zen-tooltip__title">{title}</span>
        {content != null && <span className="zen-tooltip__body">{content}</span>}
      </span>
    </span>
  );
}
