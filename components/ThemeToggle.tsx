"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 避免 hydration 报错
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-8 w-16 items-center rounded-full bg-slate-200 px-1 text-xs text-slate-900 shadow-inner transition-colors hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
      aria-label="切换日间/夜间模式"
    >
      {/* 滑块 */}
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full bg-pink-400 text-[10px] font-semibold text-slate-900 transition-transform ${
          isDark ? "translate-x-8" : ""
        }`}
      >
        {isDark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
