import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cx, useControllableState, useId } from "../utils";
import { ChevronDownIcon, CheckIcon } from "../icons";

export interface ComboboxOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface ComboboxProps {
  /** Field label rendered above the control. */
  label?: ReactNode;
  /** Options to choose from. */
  options: ComboboxOption[];
  /** Placeholder shown when nothing is selected. */
  placeholder?: string;
  /** Selected value (controlled). */
  value?: string;
  /** Initial selected value (uncontrolled). */
  defaultValue?: string;
  /** Called with the new value when the selection changes. */
  onValueChange?: (value: string) => void;
  /** Disable the whole control. */
  disabled?: boolean;
  /** Form field name — renders a hidden input so the value submits with a form. */
  name?: string;
  /** Open the menu initially (uncontrolled). */
  defaultOpen?: boolean;
  id?: string;
  className?: string;
}

function setRef<T>(ref: React.Ref<T> | undefined, value: T) {
  if (typeof ref === "function") ref(value);
  else if (ref && typeof ref === "object")
    (ref as React.MutableRefObject<T | null>).current = value;
}

/**
 * Combobox — a select-only combobox (WAI-ARIA listbox popup). Keyboard:
 * Up/Down to move, Enter/Space to select, Home/End, Escape to close, type to
 * jump to a matching option.
 */
export const Combobox = forwardRef<HTMLButtonElement, ComboboxProps>(
  function Combobox(
    {
      label,
      options,
      placeholder = "Select…",
      value,
      defaultValue,
      onValueChange,
      disabled,
      name,
      defaultOpen = false,
      id,
      className,
    },
    forwardedRef
  ) {
    const autoId = useId("combobox");
    const baseId = id ?? autoId;
    const listboxId = `${baseId}-listbox`;

    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const listRef = useRef<HTMLUListElement | null>(null);
    const rootRef = useRef<HTMLDivElement | null>(null);
    const typeahead = useRef({ query: "", at: 0 });

    const [current, setCurrent] = useControllableState<string>({
      value,
      defaultValue: defaultValue ?? "",
      onChange: onValueChange,
    });
    const [open, setOpen] = useState(defaultOpen);
    const selectedIndex = options.findIndex((o) => o.value === current);
    const [highlighted, setHighlighted] = useState(
      selectedIndex >= 0 ? selectedIndex : 0
    );

    const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined;

    function openMenu() {
      if (disabled) return;
      setHighlighted(selectedIndex >= 0 ? selectedIndex : firstEnabled());
      setOpen(true);
    }
    function closeMenu(focusTrigger = true) {
      setOpen(false);
      if (focusTrigger) triggerRef.current?.focus();
    }
    function firstEnabled() {
      const i = options.findIndex((o) => !o.disabled);
      return i < 0 ? 0 : i;
    }
    function nextEnabled(from: number, dir: 1 | -1) {
      let i = from;
      for (let step = 0; step < options.length; step++) {
        i = (i + dir + options.length) % options.length;
        if (!options[i]?.disabled) return i;
      }
      return from;
    }
    function selectAt(index: number) {
      const opt = options[index];
      if (!opt || opt.disabled) return;
      setCurrent(opt.value);
      closeMenu();
    }

    // Close when clicking outside.
    useEffect(() => {
      if (!open) return;
      function onDocPointer(e: MouseEvent) {
        if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      }
      document.addEventListener("mousedown", onDocPointer);
      return () => document.removeEventListener("mousedown", onDocPointer);
    }, [open]);

    // Keep the highlighted option scrolled into view.
    useEffect(() => {
      if (!open) return;
      const el = listRef.current?.querySelector<HTMLElement>(
        `#${CSS.escape(`${baseId}-opt-${highlighted}`)}`
      );
      el?.scrollIntoView({ block: "nearest" });
    }, [open, highlighted, baseId]);

    function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
      if (disabled) return;
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (!open) openMenu();
          else setHighlighted((h) => nextEnabled(h, 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          if (!open) openMenu();
          else setHighlighted((h) => nextEnabled(h, -1));
          break;
        case "Home":
          if (open) {
            e.preventDefault();
            setHighlighted(firstEnabled());
          }
          break;
        case "End":
          if (open) {
            e.preventDefault();
            setHighlighted(nextEnabled(0, -1));
          }
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (!open) openMenu();
          else selectAt(highlighted);
          break;
        case "Escape":
          if (open) {
            e.preventDefault();
            closeMenu();
          }
          break;
        case "Tab":
          if (open) setOpen(false);
          break;
        default:
          // Type-ahead: jump to the next option starting with the typed string.
          if (e.key.length === 1 && /\S/.test(e.key)) {
            const now = Date.now();
            const t = typeahead.current;
            t.query = now - t.at > 600 ? e.key : t.query + e.key;
            t.at = now;
            const q = t.query.toLowerCase();
            const start = open ? highlighted : selectedIndex;
            for (let k = 1; k <= options.length; k++) {
              const idx = (start + k + options.length) % options.length;
              const o = options[idx];
              const text = typeof o.label === "string" ? o.label : o.value;
              if (!o.disabled && text.toLowerCase().startsWith(q)) {
                if (open) setHighlighted(idx);
                else setCurrent(o.value);
                break;
              }
            }
          }
          break;
      }
    }

    return (
      <div className={cx("zen-combobox", className)} ref={rootRef}>
        {label != null && (
          <label className="zen-field__label" htmlFor={baseId}>
            {label}
          </label>
        )}
        <button
          ref={(node) => {
            triggerRef.current = node;
            setRef(forwardedRef, node);
          }}
          type="button"
          id={baseId}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-activedescendant={
            open ? `${baseId}-opt-${highlighted}` : undefined
          }
          disabled={disabled}
          className={cx(
            "zen-combobox__trigger",
            open && "zen-combobox__trigger--open",
            disabled && "zen-combobox__trigger--disabled"
          )}
          onClick={() => (open ? closeMenu() : openMenu())}
          onKeyDown={onKeyDown}
        >
          <span
            className={cx(
              "zen-combobox__value",
              !selected && "zen-combobox__value--placeholder"
            )}
          >
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDownIcon className="zen-combobox__chevron" />
        </button>

        {open && (
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            className="zen-combobox__list"
            aria-label={typeof label === "string" ? label : undefined}
          >
            {options.map((opt, i) => (
              <li
                key={opt.value}
                id={`${baseId}-opt-${i}`}
                role="option"
                aria-selected={opt.value === current}
                aria-disabled={opt.disabled || undefined}
                className={cx(
                  "zen-combobox__option",
                  i === highlighted && "zen-combobox__option--highlighted",
                  opt.value === current && "zen-combobox__option--selected",
                  opt.disabled && "zen-combobox__option--disabled"
                )}
                onMouseEnter={() => !opt.disabled && setHighlighted(i)}
                onClick={() => selectAt(i)}
              >
                <span>{opt.label}</span>
                {opt.value === current && (
                  <CheckIcon className="zen-combobox__check" />
                )}
              </li>
            ))}
          </ul>
        )}

        {name && <input type="hidden" name={name} value={current} />}
      </div>
    );
  }
);
