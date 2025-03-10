"use client"
import { useState } from "react";
import { useTheme } from "@/components/theme-provider"

export function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 p-3 rounded-full bg-gray-200 dark:bg-gray-800 shadow-lg"
    >
      {theme === "light" ? "🌞" : "🌜"}
    </button>
  );
}
