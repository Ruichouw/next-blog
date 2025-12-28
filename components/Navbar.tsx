// components/Navbar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import ThemeToggle from '@/components/ThemeToggle' // PC 端日夜切换

const navItems = [
  { href: '/', label: '首页' },
  { href: '/tags', label: '标签' },
  { href: '/archives', label: '归档' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="border-b border-slate-200/20 bg-slate-100/10 pb-2 pt-3 backdrop-blur-md transition-colors duration-300 dark:border-white/10 dark:bg-slate-950/40">
        {/* 外层：一行，左右两块，右侧只在桌面端显示主题切换 */}
        <div className="flex items-center justify-between">
          {/* 左侧整块：移动端 & 桌面端的 标题 + 菜单 + 搜索 + 导航 */}
          <div className="flex flex-1 items-center justify-between md:justify-start md:gap-10">
            {/* 移动端汉堡菜单 */}
            <button
              className="
                flex h-9 w-9 items-center justify-center
                text-slate-300 dark:text-slate-200 md:hidden
              "
              aria-label="打开菜单"
              onClick={() => setOpen(true)}
            >
              <div className="space-y-1">
                <span className="block h-0.5 w-5 rounded bg-current" />
                <span className="block h-0.5 w-5 rounded bg-current" />
                <span className="block h-0.5 w-5 rounded bg-current" />
              </div>
            </button>

            {/* 标题（移动端居中，桌面端靠左） */}
            <div className="flex-1 text-center md:flex-initial md:text-left">
              <Link
                href="/"
                className="font-serif text-2xl tracking-wide text-slate-900 dark:text-slate-50"
              >
                ruichouw&apos;s blog
              </Link>
            </div>

            {/* 移动端搜索图标 */}
            <button
              className="
                flex h-9 w-9 items-center justify-center
                text-slate-300 dark:text-slate-200 md:hidden
              "
              aria-label="搜索"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m1.65-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* 桌面端导航菜单 */}
            <nav className="hidden gap-6 text-sm md:flex">
              {navItems.map((item) => (
                <NavItem key={item.href} href={item.href} label={item.label} pathname={pathname} />
              ))}
            </nav>
          </div>

          {/* 桌面端右侧：搜索 + 日夜切换 */}
          <div className="hidden md:flex items-center gap-6">
            <button
              aria-label="搜索"
              className="text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
            >
              {/* 复用移动端的搜索 SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m1.65-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/*  移动端侧边导航 & 遮罩 */}
      {/* 背景遮罩 */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />

      {/* 抽屉面板 */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 max-w-[80%]
          bg-slate-950/95 text-slate-100 shadow-xl
          transition-transform duration-300 md:hidden
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* 抽屉顶部：标题 + 关闭按钮 */}
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          {/* 标题 */}
          <span className="font-serif text-xl leading-none">ruichouw&apos;s blog</span>

          {/* 关闭按钮 */}
          <button
            aria-label="关闭菜单"
            onClick={() => setOpen(false)}
            className="
      flex items-center justify-center
      rounded-full p-2
      text-slate-400 hover:bg-slate-800 hover:text-slate-100
    "
          >
            {/* X 图标（SVG） */}
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* 抽屉中的导航项 */}
        <nav className="space-y-1 px-4 py-4 text-sm">
          {navItems.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center justify-between rounded-lg px-3 py-2
                  transition-colors
                  ${
                    active
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }
                `}
              >
                <span>{item.label}</span>
                {active && <span className="h-1 w-1 rounded-full bg-pink-400" />}
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}

interface NavItemProps {
  href: string
  label: string
  pathname: string
}

function NavItem({ href, label, pathname }: NavItemProps) {
  const active = href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <Link
      href={href}
      className={`relative px-1 text-sm font-medium transition-colors ${
        active
          ? 'text-slate-900 dark:text-white'
          : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
      }`}
    >
      <span className="relative z-10">{label}</span>
      <span
        className={`absolute inset-x-0 -bottom-2 h-0.5 rounded-full bg-pink-500/80 transition-transform duration-200 ${
          active ? 'scale-x-100' : 'scale-x-0'
        }`}
      />
    </Link>
  )
}
