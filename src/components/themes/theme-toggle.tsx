"use client";

import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();

    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const customEvent = new CustomEvent("darkModeToggle", {
      detail: { x, y },
    });
    window.dispatchEvent(customEvent);

    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) {
    return (
      <div className="relative rounded-full justify-center items-center border-none focus:outline-none">
        <button
          className="p-2 flex rounded-full bg-gray-400/40 backdrop-blur-sm focus:outline-none hover:bg-gray-400/60 transition-colors"
          onClick={handleThemeToggle}
        >
          <div className="relative w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative rounded-full justify-center items-center border-none focus:outline-none">
      <button
        className="p-2 flex rounded-full bg-gray-400/40 backdrop-blur-sm focus:outline-none hover:bg-gray-400/60 transition-colors"
        onClick={handleThemeToggle}
      >
        <div className="relative w-4 h-4">
          <FaSun
            className={`absolute w-4 h-4 transition-all duration-300 ${
              theme === "dark" ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          />
          <FaMoon
            className={`absolute w-4 h-4 transition-all duration-300 ${
              theme === "light" ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          />
        </div>
      </button>
    </div>
  );
}
