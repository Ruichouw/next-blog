// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getPostBySlug, generatePostParams } from '@/lib/posts'

type PostPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return generatePostParams()
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  const { meta, content } = post

  return (
    <main className="min-h-screen px-4 py-6 sm:px-5 md:px-6">
      <article className="mx-auto flex max-w-5xl flex-col gap-6 md:gap-8">
        {/* ⭐ 顶部标题卡片 — 无封面图的专业文章信息区 */}
        <header
          className="
            rounded-3xl border border-black/5 bg-white/80 p-6 shadow-sm backdrop-blur
            sm:p-7 md:p-8
            dark:border-white/10 dark:bg-[#0a0c14]/95
          "
        >
          {/* 标题 */}
          <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl md:text-3xl dark:text-white">
            {meta.title}
          </h1>

          {/* 摘要 */}
          {meta.excerpt && (
            <p className="mt-3 text-sm text-gray-700 sm:text-[15px] md:text-base dark:text-gray-300">
              {meta.excerpt}
            </p>
          )}

          {/* 元信息 — 日期、标签等 */}
          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
            {/* 日期 */}
            <span className="inline-flex items-center gap-1 rounded-full bg-black/5 px-3 py-1 text-gray-700 dark:bg-white/10 dark:text-gray-200">
              📅 {meta.date}
            </span>

            {/* 标签 */}
            {meta.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="
                      inline-flex items-center rounded-full bg-black/5 px-3 py-1 
                      text-[11px] sm:text-xs text-gray-700 
                      dark:bg-white/10 dark:text-gray-200
                    "
                  >
                    🏷 {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* 正文内容 */}
        <section
          className="
            rounded-3xl border border-black/5 bg-white/80 p-5 shadow-sm backdrop-blur
            sm:p-6 md:p-8 
            dark:border-white/10 dark:bg-[#0a0c14]/95
          "
        >
          <div className="text-[15px] leading-relaxed">{content}</div>
        </section>
      </article>
    </main>
  )
}
