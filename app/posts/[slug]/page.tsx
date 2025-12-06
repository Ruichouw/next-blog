// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getPostBySlug, generatePostParams } from '@/lib/posts'

// ⭐ 注意这里：params 是 Promise
type PostPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return generatePostParams()
}

export default async function PostPage({ params }: PostPageProps) {
  // ⭐ 必须先 await params，再解构 slug
  const { slug } = await params

  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const { meta, content } = post

  return (
    <main className="min-h-screen px-4 py-10 md:px-6">
      <article className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className="rounded-3xl border border-black/5 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8 dark:border-white/10 dark:bg-[#050712]/90">
          {meta.cover && (
            <div className="relative mb-6 h-52 w-full overflow-hidden rounded-2xl md:h-64">
              <img src={meta.cover} alt={meta.title} className="h-full w-full object-cover" />
            </div>
          )}

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl dark:text-white">
            {meta.title}
          </h1>

          {meta.excerpt && (
            <p className="mt-3 text-sm text-gray-700 md:text-base dark:text-gray-300">
              {meta.excerpt}
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1 rounded-full bg-black/5 px-3 py-1 text-gray-700 dark:bg-white/10 dark:text-gray-200">
              📅 {meta.date}
            </span>

            {meta.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-xs text-gray-700 dark:bg-white/10 dark:text-gray-200"
                  >
                    🏷 {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        <section className="rounded-3xl border border-black/5 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8 dark:border-white/10 dark:bg-[#050712]/90">
          <div className="text-[15px] leading-relaxed">{content}</div>
        </section>
      </article>
    </main>
  )
}
