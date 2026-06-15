import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cx } from "../utils";
import { CheckIcon, PlusIcon } from "../icons";

export interface TextButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Leading icon. Pass `false` to hide, or a custom node. @default a plus icon */
  icon?: ReactNode | false;
  /** When true, clicking flips the button to a green confirmation state. */
  confirmable?: boolean;
  /** Confirmation label shown after clicking. @default "Added" */
  confirmLabel?: ReactNode;
  /** Confirmation icon. @default a checkmark */
  confirmIcon?: ReactNode;
  /** Auto-revert delay in ms after confirming. Use 0 to stay confirmed. @default 1800 */
  resetAfter?: number;
}

/**
 * TextButton — an inline, accent-coloured action with a leading icon.
 * Set `confirmable` to flip it to a green "Added" state (with an animated
 * checkmark) when clicked.
 */
export const TextButton = forwardRef<HTMLButtonElement, TextButtonProps>(
  function TextButton(
    {
      icon,
      confirmable,
      confirmLabel = "Added",
      confirmIcon,
      resetAfter = 1800,
      className,
      type = "button",
      children,
      onClick,
      ...rest
    },
    ref
  ) {
    const [added, setAdded] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(
      () => () => {
        if (timer.current) clearTimeout(timer.current);
      },
      []
    );

    const leading =
      icon === false ? null : icon ?? <PlusIcon className="zen-textbtn__icon" />;

    if (!confirmable) {
      return (
        <button
          ref={ref}
          type={type}
          className={cx("zen-textbtn", className)}
          onClick={onClick}
          {...rest}
        >
          {leading}
          {children}
        </button>
      );
    }

    function handleClick(e: MouseEvent<HTMLButtonElement>) {
      onClick?.(e);
      if (e.defaultPrevented) return;
      setAdded(true);
      if (timer.current) clearTimeout(timer.current);
      if (resetAfter > 0) {
        timer.current = setTimeout(() => setAdded(false), resetAfter);
      }
    }

    return (
      <button
        ref={ref}
        type={type}
        className={cx(
          "zen-textbtn",
          "zen-textbtn--confirmable",
          added && "zen-textbtn--added",
          className
        )}
        onClick={handleClick}
        aria-live="polite"
        {...rest}
      >
        <span className="zen-textbtn__swap">
          <span
            className="zen-textbtn__state zen-textbtn__state--default"
            aria-hidden={added}
          >
            {leading}
            {children}
          </span>
          <span
            className="zen-textbtn__state zen-textbtn__state--added"
            aria-hidden={!added}
          >
            {confirmIcon ?? <CheckIcon className="zen-textbtn__icon" />}
            {confirmLabel}
          </span>
        </span>
      </button>
    );
  }
);
