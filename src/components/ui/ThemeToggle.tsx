"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle(): React.ReactElement | null {
  const { theme, setTheme } = useTheme();
  // Hydration-safe "mounted" flag: false on the server and during hydration, true on the client.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors
        bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20"
      aria-label={isDark ? "Светлая тема" : "Тёмная тема"}
    >
      {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-600" />}
    </button>
  );
}
