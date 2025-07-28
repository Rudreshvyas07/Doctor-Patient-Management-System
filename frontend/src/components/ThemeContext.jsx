// ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

// 🧠 Apply theme before render
const applyInitialTheme = () => {
  const stored = localStorage.getItem("theme") || "system";
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = stored === "dark" || (stored === "system" && prefersDark);
  document.documentElement.classList.toggle("dark", isDark);
  return stored;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(applyInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const isDark = theme === "dark" || (theme === "system" && darkQuery.matches);
      root.classList.toggle("dark", isDark);
      localStorage.setItem("theme", theme);
    };

    applyTheme();

    if (theme === "system") {
      darkQuery.addEventListener("change", applyTheme);
      return () => darkQuery.removeEventListener("change", applyTheme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
