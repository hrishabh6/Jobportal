import { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext"; // Adjust path if needed
import PropTypes from "prop-types";
import { THEME_NAMES } from "."; 
export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(THEME_NAMES.SYSTEM);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    setMode(currentTheme || THEME_NAMES.SYSTEM);
  }, []);

  useEffect(() => {
    if (
      mode === THEME_NAMES.DARK ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
