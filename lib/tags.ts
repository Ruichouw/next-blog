// lib/tags.ts
import { getAllPostsMeta, type PostMeta } from '@/lib/posts'
import { tagToSlug } from '@/lib/slug'

export type TagIndexItem = {
  tag: string // 展示用（原始名字）
  slug: string // 路由用
  count: number
}

export function getAllTags(): TagIndexItem[] {
  const posts = getAllPostsMeta()
  const map = new Map<string, number>()

  for (const p of posts) {
    for (const t of p.tags ?? []) {
      const key = t.trim()
      if (!key) continue
      map.set(key, (map.get(key) ?? 0) + 1)
    }
  }

  return Array.from(map.entries())
    .map(([tag, count]) => ({ tag, slug: tagToSlug(tag), count }))
    .sort((a, b) => b.count - a.count)
}

export function getPostsByTagSlug(tagSlug: string): {
  tag: string | null
  posts: PostMeta[]
} {
  const slug = decodeURIComponent(tagSlug) // ✅ 关键

  const posts = getAllPostsMeta()

  const matched = posts.filter((p) => (p.tags ?? []).some((t) => tagToSlug(t) === slug))

  const displayTag = posts.flatMap((p) => p.tags ?? []).find((t) => tagToSlug(t) === slug) ?? null

  return { tag: displayTag, posts: matched }
}
