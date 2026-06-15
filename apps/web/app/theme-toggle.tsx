"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as
        | "dark"
        | "light"
        | null) ?? "light";
    setTheme(current);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("zenith-theme", next);
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      className="theme-btn"
      onClick={toggle}
      aria-label="Toggle colour theme"
      title="Toggle theme"
    >
      {theme === "dark" ? (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3V2m0 20v-1m6.3598-15.36.71-.71M4.9302 19.07l.71-.71M21 12h1M2 12h1m15.3598 6.36.71.71M4.9302 4.93l.71.71m9.8953 2.8245c1.9527 1.9526 1.9527 5.1184 0 7.071-1.9526 1.9527-5.1184 1.9527-7.071 0-1.9526-1.9526-1.9526-5.1184 0-7.071s5.1184-1.9526 7.071 0"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20.9638 12.7674c-1.1277.7773-2.4945 1.2324-3.9677 1.2324-3.866 0-7-3.1341-7-7 0-1.4731.455-2.84 1.2322-3.9676C6.6191 3.4228 3 7.2877 3 11.998c0 4.9695 4.0286 8.9981 8.9981 8.9981 4.7103 0 8.5753-3.6193 8.9657-8.2286"
          />
        </svg>
      )}
    </button>
  );
}
