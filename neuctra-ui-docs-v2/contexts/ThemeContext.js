"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  // ThemeScript (see components/ThemeScript.js) already applied the .dark
  // class before hydration to avoid a flash — this effect just syncs React
  // state to match, and re-checks storage in case it changed between paint
  // and mount (e.g. hydration on a slow connection).
  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved) {
      setIsDark(saved === "dark");
    } else {
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setIsDark(systemDark);
    }
  }, []);

  const applyTheme = (dark) => {
    document.documentElement.classList.toggle("dark", dark);
  };

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    applyTheme(newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  const setTheme = (theme) => {
    const dark = theme === "dark";
    setIsDark(dark);
    applyTheme(dark);
    localStorage.setItem("theme", theme);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
