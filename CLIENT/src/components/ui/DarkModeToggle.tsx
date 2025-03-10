"use client";
// This is a dark mode toggle component that uses the system's color scheme to determine the theme.
// It uses the localStorage to save the theme preference.
// It uses the window.matchMedia to detect the system's color scheme.
// It uses the document.documentElement.classList to toggle the dark class on the html element.

import React, { useState, useEffect } from "react";

const DarkModeToggle = () => {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "system") {
        const systemPrefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        document.documentElement.classList.toggle("dark", systemPrefersDark);
      } else {
        document.documentElement.classList.toggle(
          "dark",
          savedTheme === "dark"
        );
      }
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.classList.add("dark");
      setTheme("system");
      localStorage.setItem("theme", "system");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme =
      theme === "dark" ? "light" : theme === "light" ? "system" : "dark";
    if (newTheme === "system") {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.classList.toggle("dark", systemPrefersDark);
    } else {
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 p-2 rounded-full bg-transparent border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
    >
      {theme === "dark" ? "🌙" : theme === "light" ? "☀️" : "🖥️"}
    </button>
  );
};

export default DarkModeToggle;
