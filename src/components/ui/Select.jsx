import { useEffect, useId, useRef, useState } from "react";
import clsx from "clsx";

/**
 * A styled dropdown, the same look as the admin panel's selects: a rounded
 * menu with a hairline border, roomy options, and the active option tinted
 * blue. Built as an ARIA combobox + listbox, so it works fully by keyboard:
 * arrows, Home/End, Enter/Space to choose, Escape to close, and typing a
 * letter jumps to the next option starting with it.
 *
 * `onChange` receives `{ target: { name, value } }`, like a native select, so
 * it drops into existing form handlers unchanged.
 */
export function Select({ id, name, value, options, onChange, labelledBy, className }) {
  const listId = useId();
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const [open, setOpen] = useState(false);
  const selectedIndex = Math.max(0, options.findIndex((o) => o.value === value));
  const [active, setActive] = useState(selectedIndex);

  // Close when clicking anywhere else.
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // Keep the highlighted option in view inside the menu.
  useEffect(() => {
    if (!open) return;
    listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const openMenu = () => {
    setActive(selectedIndex);
    setOpen(true);
  };
  const choose = (i) => {
    onChange?.({ target: { name, value: options[i].value } });
    setOpen(false);
  };

  const onKeyDown = (event) => {
    const last = options.length - 1;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!open) openMenu();
        else setActive((i) => Math.min(last, i + 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!open) openMenu();
        else setActive((i) => Math.max(0, i - 1));
        break;
      case "Home":
        if (open) {
          event.preventDefault();
          setActive(0);
        }
        break;
      case "End":
        if (open) {
          event.preventDefault();
          setActive(last);
        }
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (open) choose(active);
        else openMenu();
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        // Type-ahead: jump to the next option starting with that letter.
        if (event.key.length === 1 && /\S/.test(event.key)) {
          const key = event.key.toLowerCase();
          const from = open ? active : selectedIndex;
          for (let step = 1; step <= options.length; step++) {
            const i = (from + step) % options.length;
            if (options[i].label.toLowerCase().startsWith(key)) {
              if (open) setActive(i);
              else onChange?.({ target: { name, value: options[i].value } });
              break;
            }
          }
        }
    }
  };

  const current = options[selectedIndex];

  return (
    <div ref={rootRef} className={clsx("relative", className)}>
      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={labelledBy ? `${labelledBy} ${id}` : undefined}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
        className={clsx(
          "flex w-full items-center justify-between gap-3 rounded-xl border bg-white px-4 py-3 text-left text-base text-jet sm:text-[0.95rem] outline-none transition-[border-color,box-shadow] duration-200",
          open
            ? "border-brand-blue shadow-[0_0_0_3px_rgba(2,150,217,.15)]"
            : "border-hairline hover:border-[#cfd4da] focus-visible:border-brand-blue focus-visible:shadow-[0_0_0_3px_rgba(2,150,217,.15)]"
        )}
      >
        <span className="truncate">{current?.label}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          aria-hidden
          className={clsx("shrink-0 text-ink-faint transition-transform duration-300", open && "rotate-180 text-brand-blue")}
        >
          <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {name ? <input type="hidden" name={name} value={value} /> : null}

      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={clsx(
          "absolute left-0 right-0 top-[calc(100%+6px)] z-40 max-h-64 origin-top overflow-y-auto rounded-xl border border-hairline bg-white py-1.5 shadow-[0_18px_40px_-18px_rgba(5,36,57,.35)] transition-[opacity,transform] duration-200 ease-out",
          open ? "visible scale-100 opacity-100" : "invisible -translate-y-1 scale-[0.98] opacity-0"
        )}
      >
        {options.map((option, i) => {
          const selected = i === selectedIndex;
          return (
            <li
              key={option.value}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={selected}
              onPointerEnter={() => setActive(i)}
              // pointerdown, not click, so the choice lands before focus moves.
              onPointerDown={(event) => {
                event.preventDefault();
                choose(i);
              }}
              className={clsx(
                "mx-1.5 flex cursor-pointer items-center justify-between gap-3 rounded-lg px-4 py-3 text-[0.92rem] transition-colors duration-150",
                i === active ? "bg-viking text-brand-blue-deep" : "text-ink-soft",
                selected && "font-semibold"
              )}
            >
              {option.label}
              {selected ? (
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className="shrink-0 text-brand-blue">
                  <path d="m3 7.5 2.5 2.5L11 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
