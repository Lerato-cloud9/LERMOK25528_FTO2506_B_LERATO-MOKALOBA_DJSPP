import React, { createContext, useContext, useEffect, useState } from "react";
// Created the theme context so other components can use it
export const ThemeContext = createContext();

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

// Custom hook to use the theme context
export function ThemeProvider({ children }) {
// Load saved theme from localStorage or use light as default
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("podcast-theme");
    return saved || "light";
  });

// Update the HTML theme + save theme every time it changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("podcast-theme", theme);
  }, [theme]);

// Switch between light and dark mode
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

// Values we share with the whole app
  const value = {
    theme,
    toggleTheme,
    isDark: theme === "dark",
  };
  
// Wrap the app so everything can access the theme
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}