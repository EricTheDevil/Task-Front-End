import React, { useState } from "react";

type Theme = "light" | "dark";
type ThemeContext = { theme: Theme; toggleTheme: () => void };

export const ThemeContext = React.createContext<ThemeContext>(
  {} as ThemeContext
);

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const backgroundColor = theme === "light" ? "#7393B3	" : "#A9A9A9";
  const color = theme === "light" ? "black" : "black";

  document.body.style.backgroundColor = backgroundColor;
  document.body.style.color = color;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
