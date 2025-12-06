// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/categories", label: "分类" },
  { href: "/archives", label: "归档" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between border-b border-slate-200/80 bg-slate-100/80 pb-3 backdrop-blur-md transition-colors duration-300 dark:border-white/10 dark:bg-slate-950/70">
      {/* 左边博客名 */}
      <div className="flex items-baseline gap-3">
        <Link
          href="/"
          className="font-serif text-2xl tracking-wide text-slate-900 dark:text-slate-50"
        >
          ruichouw&apos;s blog
        </Link>
      </div>

      {/* 中间导航 */}
      <nav className="group flex gap-6 text-sm">
        {navItems.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname?.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-1 text-sm font-medium transition-colors ${
                active
                  ? "text-slate-900 dark:text-white"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              }`}
            >
              <span className="relative z-10">{item.label}</span>
              <span
                className={`absolute inset-x-0 -bottom-2 h-0.5 rounded-full bg-pink-500/80 transition-transform duration-200 ${
                  active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </Link>
          );
        })}
      </nav>

      {/* 右侧主题切换按钮 */}
      <ThemeToggle />
    </header>
  );
}
