// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/categories", label: "分类" },
  { href: "/archives", label: "归档" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between border-b border-white/10 pb-3">
      <div className="flex items-baseline gap-3">
        <Link href="/" className="font-serif text-2xl tracking-wide">
          ruichouw&apos;s blog
        </Link>
      </div>

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
              className={`relative px-1 text-sm transition ${
                active ? "text-white" : "text-slate-200 hover:text-white"
              }`}
            >
              <span className="relative z-10">{item.label}</span>
              <span
                className={`absolute inset-x-0 -bottom-2 h-0.5 rounded-full bg-pink-300 transition-transform duration-200 ${
                  active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </Link>
          );
        })}
      </nav>

      {/* 右侧占位（不放登录） */}
      <div className="w-[80px]" />
    </header>
  );
}
