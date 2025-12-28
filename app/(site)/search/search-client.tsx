'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import MiniSearch, { type SearchResult } from 'minisearch'
import { tokenize } from '@/lib/search/tokenizer'

type StoredPost = {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt?: string
}
type IndexPayload = {
  version: number
  builtAt: string
  index: any
}
type SearchHit = SearchResult & StoredPost
function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function highlightText(text: string, terms: string[]) {
  if (!text) return text

  const uniq = Array.from(new Set((terms ?? []).filter((t) => t && t.length >= 2)))
  if (uniq.length === 0) return text

  uniq.sort((a, b) => b.length - a.length)

  const pattern = uniq.map(escapeRegExp).join('|')
  const re = new RegExp(`(${pattern})`, 'gi')

  const parts = text.split(re)

  return parts.map((part, i) => {
    const hit = uniq.some((t) => t.toLowerCase() === part.toLowerCase())
    return hit ? (
      <mark
        key={i}
        className="rounded bg-yellow-200/70 px-1 py-0.5 text-inherit dark:bg-yellow-400/20"
      >
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    )
  })
}

export default function SearchClient() {
  const [q, setQ] = useState('')
  const [mini, setMini] = useState<MiniSearch<StoredPost> | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    async function load() {
      const res = await fetch('/search-index.json')
      const payload = (await res.json()) as IndexPayload

      const ms = MiniSearch.loadJSON(JSON.stringify(payload.index), {
        fields: ['title', 'tags', 'excerpt', 'content'],
        storeFields: ['slug', 'title', 'date', 'tags', 'excerpt'],
        tokenize, // 查询时也用同一个 tokenizer
      })

      setMini(ms)
      setReady(true)
    }
    load()
  }, [])

  const results = useMemo<SearchHit[]>(() => {
    if (!mini || !q.trim()) return []

    return mini.search(q, {
      fuzzy: 0.2,
      prefix: true,
      boost: { title: 4, tags: 2, excerpt: 1.5, content: 1 },
    }) as SearchHit[]
  }, [mini, q])

  return (
    <main className=" w-full  px-4 py-8 sm:py-10">
      <h1 className="text-2xl font-semibold">搜索</h1>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="搜索标题 / 标签 / 正文…"
        className="mt-4 w-full rounded-lg border border-zinc-200 px-4 py-2 outline-none
                   focus:ring dark:border-zinc-800"
      />

      <div className="mt-4 text-sm text-zinc-500">
        {ready ? (
          q.trim() ? (
            <>找到 {results.length} 条结果</>
          ) : (
            <>输入关键词开始搜索</>
          )
        ) : (
          <>索引加载中…</>
        )}
      </div>

      <ul className="mt-6 space-y-4">
        {results.map((r: any) => (
          <li key={r.slug} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
            <Link href={`/posts/${r.slug}`} className="text-lg hover:underline">
              {highlightText(r.title, r.terms)}
            </Link>

            <div className="mt-1 text-xs text-zinc-500">
              {r.date} ·{' '}
              {r.tags?.map((t: string, idx: number) => (
                <span key={t}>
                  {idx ? ' / ' : ''}
                  {highlightText(t, r.terms)}
                </span>
              ))}
            </div>

            {r.excerpt ? (
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                {highlightText(r.excerpt, r.terms)}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </main>
  )
}
