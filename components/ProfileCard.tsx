// components/ProfileCard.tsx
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'

import { getAllPostsMeta } from '@/lib/posts'
import { getAllTags } from '@/lib/tags'

export default function ProfileCard() {
  // ✅ 真实数据
  const posts = getAllPostsMeta()
  const tags = getAllTags()

  const postCount = posts.length
  const tagCount = tags.length
  const archiveCount = posts.length // 归档 = 文章数

  return (
    <div
      className={clsx(
        'rounded-3xl p-[1px] transition-all duration-300',
        'bg-gray-200/70',
        'dark:bg-gradient-to-r dark:from-purple-600/70 dark:via-pink-600/70 dark:to-blue-600/70',
        'hover:shadow-[0_0_25px_rgba(255,255,255,0.10)] dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.08)]'
      )}
    >
      <div
        className={clsx('rounded-3xl p-6 text-center', 'bg-white shadow-sm', 'dark:bg-[#0a0c14]')}
      >
        <div className="flex flex-col items-center gap-4">
          {/* 头像 */}
          <div
            className={clsx(
              'rounded-full p-[2px]',
              'bg-gray-200',
              'dark:bg-gradient-to-r dark:from-purple-600/70 dark:via-pink-600/70 dark:to-blue-600/70'
            )}
          >
            <div className="relative h-20 w-20 overflow-hidden rounded-full bg-white dark:bg-[#0a0c14]">
              <Image src="/avatar.jpg" alt="avatar" fill sizes="80px" priority />
            </div>
          </div>

          {/* 名称 */}
          <h2 className="text-lg font-semibold tracking-wide text-slate-900 dark:text-white">
            ruichouw
          </h2>

          {/* 签名 */}
          <p className="text-xs text-slate-500 dark:text-slate-300/90">
            欲买桂花同载酒 终不似 少年游
          </p>

          {/* 统计信息 */}
          <dl className="mt-4 grid w-full grid-cols-3 gap-3 text-xs">
            <InfoBox label="文章" value={postCount} />
            <InfoBox label="标签" value={tagCount} />
            <InfoBox label="归档" value={archiveCount} />
          </dl>

          {/* About */}
          <Link
            href="/about"
            className={clsx(
              'mt-5 inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-medium transition-all duration-200',
              'bg-slate-900 text-white hover:bg-slate-800',
              'shadow-[0_6px_18px_rgba(0,0,0,0.18)] hover:shadow-[0_8px_22px_rgba(0,0,0,0.24)]',
              'dark:bg-gradient-to-r dark:from-purple-600/80 dark:via-pink-600/80 dark:to-blue-600/80',
              'dark:hover:brightness-110'
            )}
          >
            About Me
          </Link>
        </div>
      </div>
    </div>
  )
}

function InfoBox({ label, value }: { label: string; value: number }) {
  return (
    <div
      className={clsx(
        'rounded-2xl px-3 py-2',
        'bg-slate-50 border border-slate-200 text-slate-800',
        'shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)]',
        'dark:bg-[#0a0c14]',
        'dark:border-white/10',
        'dark:text-slate-100',
        'dark:shadow-none'
      )}
    >
      <dt className="text-[11px] text-slate-500 dark:text-slate-300/80">{label}</dt>
      <dd className="mt-1 text-lg font-semibold tracking-wide">{value}</dd>
    </div>
  )
}
