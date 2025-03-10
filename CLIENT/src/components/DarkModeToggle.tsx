"use client"; // Ensure this is the very first line in the file

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return [isDarkMode, setIsDarkMode];
}

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Button
      onClick={toggleDarkMode}
      className="px-3 py-1 text-sm font-medium rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
    >
      {isDarkMode ? "🌞 Light" : "🌙 Dark"}
    </Button>
  );
}
