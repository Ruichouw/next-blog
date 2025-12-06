"use client";

import Image from "next/image";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import clsx from "clsx";

export function PostCard({ post }: { post: PostMeta }) {
  const hasCover = Boolean(post.cover);

  return (
    <Link href={`/posts/${post.slug}`} className="block">
      <article
        className={clsx(
          "rounded-3xl p-[1px] transition-all duration-300",
          // 夜间模式渐变
          "dark:bg-gradient-to-r dark:from-purple-600/70 dark:via-pink-600/70 dark:to-blue-600/70",
          // 日间模式渐变
          "bg-gradient-to-r from-pink-400/50 via-orange-400/50 to-blue-400/50",
          // hover 光效
          "hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.08)]",
          "mb-8", // 卡片间距拉大
        )}
      >
        <div
          className={clsx(
            "rounded-3xl p-5 md:p-7 flex gap-6",
            // 夜间内部背景
            "dark:bg-[#0a0c14]/95",
            // 日间内部背景
            "bg-white/80 backdrop-blur-lg shadow-sm",
            hasCover ? "flex-col md:flex-row" : "flex-col",
          )}
        >
          {/* 封面 */}
          {hasCover && (
            <div className="relative w-full md:w-64 h-40 md:h-44 rounded-2xl overflow-hidden shrink-0">
              <Image
                src={post.cover!}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
          )}

          {/* 内容 */}
          <div className="flex flex-col">
            <h2 className="text-xl md:text-2xl font-bold dark:text-white text-gray-900">
              {post.title}
            </h2>

            {post.excerpt && (
              <p className="mt-2 text-sm md:text-base dark:text-gray-300 text-gray-700">
                {post.excerpt}
              </p>
            )}

            {/* 日期与 Tags */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1 dark:text-gray-300 text-gray-700">
                📅 {post.date}
              </div>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className={clsx(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",

                      // 夜间 tag
                      "dark:bg-white/10 dark:text-gray-200 dark:border dark:border-white/10",

                      // 白天 tag
                      "bg-black/5 text-gray-700",
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
  );
}
