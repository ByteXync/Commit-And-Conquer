"use client"
import { useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-800">
      {theme === "light" ? "🌞" : "🌜"}
    </button>
  );
}
