'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'
import clsx from 'clsx'

export function PostCard({ post }: { post: PostMeta }) {
  const hasCover = Boolean(post.cover)

  return (
    <Link href={`/posts/${post.slug}`} className="block">
      <article
        className={clsx(
          'mb-6 rounded-3xl p-[1px] transition-all duration-300',
          // ☀️ 日间：浅灰描边
          'bg-gray-200/70',
          // 🌙 夜间：渐变边框
          'dark:bg-gradient-to-r dark:from-purple-600/70 dark:via-pink-600/70 dark:to-blue-600/70',
          // hover
          'hover:shadow-lg dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.08)]'
        )}
      >
        <div
          className={clsx(
            'flex items-stretch gap-4 md:gap-6 rounded-3xl px-4 py-3 md:px-6 md:py-5',
            'bg-white',
            'shadow-md hover:shadow-lg transition-shadow',
            'dark:bg-[#0a0c14]/95 dark:shadow-none'
          )}
        >
          {/* 封面图：固定宽高比，保证卡片宽>高 */}
          {hasCover && (
            <div
              className="
                relative shrink-0 
                w-28 xs:w-32 sm:w-40 md:w-64 
                aspect-[4/3] 
                overflow-hidden rounded-2xl
              "
            >
              <Image
                src={post.cover!}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}

          {/* 内容区 */}
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <h2 className="text-base font-bold md:text-xl dark:text-white text-gray-900 line-clamp-2">
              {post.title}
            </h2>

            {post.excerpt && (
              <p className="mt-2 text-xs md:text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                {post.excerpt}
              </p>
            )}

            {/* 日期 + 标签 */}
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs md:text-sm">
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                📅 {post.date}
              </div>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className={clsx(
                      'inline-flex items-center rounded-full px-2 py-0.5 text-[11px] md:text-xs font-medium',
                      'bg-black/5 text-gray-700 dark:bg-white/10 dark:text-gray-200 dark:border dark:border-white/10'
                    )}
                  >
                    🏷 {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
