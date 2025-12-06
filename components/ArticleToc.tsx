'use client'

import { useEffect, useState } from 'react'

type TocItem = {
  id: string
  text: string
  level: 2 | 3
}

export function ArticleToc() {
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const articleEl = document.querySelector('article')
    if (!articleEl) return

    // 找出正文里的所有 h2 / h3
    const headings = Array.from(articleEl.querySelectorAll('h2, h3')) as HTMLElement[]

    const mapped: TocItem[] = headings
      .filter((el) => !!el.id)
      .map((el) => ({
        id: el.id,
        text: el.innerText,
        level: el.tagName === 'H2' ? 2 : 3,
      }))

    setItems(mapped)
    if (!mapped.length) return

    // 滚动时更新 activeId
    const handleScroll = () => {
      const scrollY = window.scrollY
      const offset = 120 // 预留一点顶部空间（Navbar 高度）

      let currentId = mapped[0]?.id

      for (const h of headings) {
        const top = h.getBoundingClientRect().top + scrollY

        // 标题顶部往上滚过 offset 之后，就认为是“当前标题”
        if (top - offset <= scrollY) {
          currentId = h.id
        } else {
          break
        }
      }

      if (currentId) {
        setActiveId(currentId)
      }
    }

    // 初次和滚动时都执行一次
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!items.length) return null

  // 点击目录项：平滑滚动 + 立即高亮
  const handleClick = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (!target) return

    const rect = target.getBoundingClientRect()
    const offset = 100 // 保证滚动后标题不会顶到浏览器顶部
    const targetY = window.scrollY + rect.top - offset

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    })

    setActiveId(id)
  }

  return (
    <aside
      className="
        sticky top-58
        h-[calc(50vh-8rem)]
        overflow-auto
        rounded-3xl
        bg-white/80 dark:bg-[#050712]/90
        backdrop-blur
        shadow-lg
        border border-white/60 dark:border-white/10
        px-4 py-4
      "
    >
      {/* 标题区 */}
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">🧾</span>
          <h3 className="text-sm font-semibold tracking-wide text-slate-800 dark:text-slate-100">
            文章目录
          </h3>
        </div>
        <div className="mt-2 h-0.5 w-16 rounded-full bg-gradient-to-r from-sky-400 via-pink-400 to-purple-500" />
      </div>

      {/* 列表 */}
      <nav className="space-y-1 text-[13px] leading-relaxed">
        {items.map((item) => {
          const isActive = item.id === activeId

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={handleClick(item.id)}
              className={[
                'block rounded-full px-3 py-1 transition-colors',
                item.level === 3 ? 'ml-4' : '',
                isActive
                  ? 'bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-100 font-semibold'
                  : 'text-slate-700 hover:bg-slate-100/80 dark:text-slate-300 dark:hover:bg-white/5',
              ].join(' ')}
            >
              {item.text}
            </a>
          )
        })}
      </nav>
    </aside>
  )
}
