// app/(site)/archives/page.tsx
import Link from 'next/link'
import { getAllPostsMeta } from '@/lib/posts'

function getYearMonth(dateStr: string) {
  // 兼容 frontmatter 常见格式：YYYY-MM-DD
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) {
    // 万一 date 不是标准格式，尽量兜底：取前 7 位 YYYY-MM
    const ym = dateStr.slice(0, 7)
    const [y, m] = ym.split('-')
    return { year: y ?? 'Unknown', month: m ?? '00' }
  }
  const year = String(d.getFullYear())
  const month = String(d.getMonth() + 1).padStart(2, '0')
  return { year, month }
}

export default function ArchivesPage() {
  const posts = getAllPostsMeta() // 已按 date 倒序了（你 posts.ts 里 sort 过）

  // year -> month -> posts
  const grouped = new Map<string, Map<string, typeof posts>>()

  for (const p of posts) {
    const { year, month } = getYearMonth(p.date)
    if (!grouped.has(year)) grouped.set(year, new Map())
    const months = grouped.get(year)!
    if (!months.has(month)) months.set(month, [])
    months.get(month)!.push(p)
  }

  // 排序：年份倒序、月份倒序
  const years = Array.from(grouped.keys()).sort((a, b) => (a < b ? 1 : -1))

  return (
    <main className="w-full px-4 py-8 sm:py-10 ">
      {/* 容器宽度跟随布局容器：默认全宽，内容居中且有最大宽度 */}
      <div className="mx-auto w-full">
        <h1 className="text-2xl font-semibold">归档</h1>
        <p className="mt-2 text-sm text-zinc-500">共 {posts.length} 篇文章</p>

        <div className="mt-8 space-y-10">
          {years.map((year) => {
            const monthsMap = grouped.get(year)!
            const months = Array.from(monthsMap.keys()).sort((a, b) => (a < b ? 1 : -1))

            return (
              <section key={year} className="space-y-4">
                <h2 className="text-xl font-semibold">{year}</h2>

                <div className="space-y-5 sm:space-y-6">
                  {months.map((month) => {
                    const monthPosts = monthsMap.get(month)!

                    return (
                      <div key={`${year}-${month}`}>
                        <div className="flex items-baseline justify-between">
                          <h3 className="text-base font-medium">
                            {month} 月
                            <span className="ml-2 text-sm text-zinc-500">
                              ({monthPosts.length})
                            </span>
                          </h3>
                        </div>

                        <ul className="mt-3 space-y-3">
                          {monthPosts.map((p) => (
                            <li
                              key={p.slug}
                              className="
                                rounded-lg py-1
                                flex flex-col gap-1
                                sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 sm:py-0
                              "
                            >
                              <Link
                                href={`/posts/${p.slug}`}
                                className="
                                  min-w-0
                                  text-base sm:text-sm
                                  leading-relaxed
                                  break-words sm:truncate
                                  hover:underline
                                "
                              >
                                {p.title}
                              </Link>

                              <span className="text-xs text-zinc-400 sm:text-zinc-500 shrink-0">
                                {p.date}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </main>
  )
}
