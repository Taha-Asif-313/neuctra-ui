import React from "react";
import { Sun, Moon } from "lucide-react";

export type ThemeToggleContext = {
  isDark: boolean;
  toggleTheme: () => void;
};

export type ThemeToggleProps = {
  context: ThemeToggleContext;
  className?: string;
};

export const ThemeToggleButton: React.FC<ThemeToggleProps> = ({
  context,
  className = "",
}) => {
  const { isDark, toggleTheme } = context;

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-12 h-6 flex items-center rounded-full p-0.5 transition-colors duration-300 ${
        isDark ? "bg-zinc-800" : "bg-yellow-500"
      } ${className}`}
      aria-label="Toggle Theme"
      type="button"
    >
      {/* Sun Icon */}
      <Sun
        size={10}
        className={`absolute left-1 transition-all duration-300 ${
          isDark ? "opacity-0 scale-0" : "opacity-100 scale-100 text-black"
        }`}
      />

      {/* Moon Icon */}
      <Moon
        size={10}
        className={`absolute right-1 transition-all duration-300 ${
          isDark ? "opacity-100 scale-100 text-blue-300" : "opacity-0 scale-0"
        }`}
      />

      {/* Thumb */}
      <div
        className={`w-5 h-5 rounded-full shadow-md transform transition-all duration-300 flex items-center justify-center ${
          isDark ? "translate-x-6 bg-zinc-900" : "translate-x-0 bg-white"
        }`}
      >
        {isDark ? (
          <Moon size={9} className="text-blue-300" />
        ) : (
          <Sun size={9} className="text-yellow-600" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggleButton;