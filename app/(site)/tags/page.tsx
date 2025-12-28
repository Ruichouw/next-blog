import Link from 'next/link'
import { getAllTags } from '@/lib/tags'

export default function TagsPage() {
  const tags = getAllTags()

  return (
    <main className="w-full px-4 py-10 flex flex-col items-center">
      <h1 className="text-2xl font-semibold self-start">标签</h1>
      <p className="mt-2 text-sm text-zinc-500 self-start">共 {tags.length} 个标签</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((t) => (
          <Link
            key={t.slug}
            href={`/tags/${t.slug}`}
            className="rounded-full border border-zinc-200 px-3 py-1 text-sm hover:bg-zinc-50
                       dark:border-zinc-800 dark:hover:bg-zinc-900"
          >
            {t.tag}
            <span className="ml-2 text-zinc-500">{t.count}</span>
          </Link>
        ))}
      </div>
    </main>
  )
}
