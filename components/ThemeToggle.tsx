"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={`navbar__theme-toggle ${
        isDark ? "navbar__theme-toggle--dark" : ""
      }`}
      onClick={toggleTheme}
      aria-label={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      aria-pressed={isDark}
      title={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
    >
      <span
        className="navbar__theme-track"
        aria-hidden="true"
      >
        <span className="navbar__theme-icon navbar__theme-icon--sun">
          ☀
        </span>

        <span className="navbar__theme-icon navbar__theme-icon--moon">
          ☾
        </span>

        <span className="navbar__theme-thumb">
          {isDark ? "☾" : "☀"}
        </span>
      </span>
    </button>
  );
}