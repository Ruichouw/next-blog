import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllTags, getPostsByTagSlug } from '@/lib/tags'

export function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: t.slug }))
}
export default async function TagDetailPage({
  params,
}: {
  params: { tag: string } | Promise<{ tag: string }>
}) {
  const { tag: tagSlug } = await Promise.resolve(params)

  const { tag, posts } = getPostsByTagSlug(tagSlug)
  if (!tag) notFound()

  return (
    <main className="px-4 py-10">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold">#{tag}</h1>
        <Link href="/tags" className="text-sm text-zinc-500 hover:underline">
          ← 返回标签
        </Link>
      </div>

      <p className="mt-2 text-sm text-zinc-500">共 {posts.length} 篇文章</p>

      <ul className="mt-6 space-y-4">
        {posts.map((p) => (
          <li key={p.slug} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
            <Link href={`/posts/${p.slug}`} className="text-lg hover:underline">
              {p.title}
            </Link>
            <div className="mt-1 text-xs text-zinc-500">{p.date}</div>
            {p.excerpt ? (
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{p.excerpt}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </main>
  )
}
