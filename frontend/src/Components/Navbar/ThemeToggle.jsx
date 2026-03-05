
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="w-8.5 h-8.5 rounded-full
                 flex items-center justify-center
                 bg-gray-100 dark:bg-zinc-800
                 hover:bg-gray-200 dark:hover:bg-zinc-700
                 transition focus:outline-none
                 focus-visible:ring-2 focus-visible:ring-black
                 dark:focus-visible:ring-white"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
