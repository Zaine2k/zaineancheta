"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<
  ThemeContextValue | undefined
>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({
  children,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("light");
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const savedTheme =
      window.localStorage.getItem("portfolio-theme");

    const preferredTheme: Theme =
      savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : window.matchMedia("(prefers-color-scheme: dark)")
              .matches
          ? "dark"
          : "light";

    setTheme(preferredTheme);
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;

    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;

    window.localStorage.setItem(
      "portfolio-theme",
      theme
    );
  }, [theme, hasLoaded]);

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}