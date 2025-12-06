// components/ProfileCard.tsx
import Link from "next/link";
import Image from "next/image";

export default function ProfileCard() {
  return (
    <div
      className="
      relative overflow-hidden rounded-3xl
      border border-slate-200
      bg-white
      p-6 text-slate-900
      shadow-[0_10px_35px_-5px_rgba(0,0,0,0.08)]
      backdrop-blur
      transition-all duration-300

      dark:border-slate-700
      dark:bg-slate-900/70
      dark:text-slate-100
      dark:shadow-[0_18px_45px_-5px_rgba(0,0,0,0.55)]
      "
    >
      {/* 日间：极简白；夜间：轻柔深色 */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 dark:opacity-40">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/20 to-slate-900/40" />
      </div>

      {/* 内容 */}
      <div className="relative flex flex-col items-center gap-4 text-center">
        {/* Avatar */}
        <div className="rounded-full p-[2px] bg-slate-200 dark:bg-slate-700">
          <div className="relative h-20 w-20 overflow-hidden rounded-full bg-white shadow-sm dark:bg-slate-900">
            <Image src="/avatar.jpg" alt="avatar" fill sizes="80px" />
          </div>
        </div>

        {/* Name */}
        <h2 className="text-lg font-semibold tracking-wide">ruichouw</h2>

        {/* Signature */}
        <p className="text-xs text-slate-500 dark:text-slate-300">
          欲买桂花同载酒 终不似 少年游
        </p>

        {/* 统计信息 */}
        <dl className="mt-4 grid w-full grid-cols-3 gap-3 text-xs">
          <InfoBox label="文章" value="10" />
          <InfoBox label="标签" value="8" />
          <InfoBox label="归档" value="3695" />
        </dl>

        {/* 按钮：极简灰 + 柔光 */}
        <Link
          href="/about"
          className="
          mt-5 inline-flex items-center justify-center
          rounded-full bg-slate-900
          px-6 py-2 text-sm font-medium text-white
          shadow-[0_6px_18px_rgba(0,0,0,0.15)]
          transition-all duration-200
          hover:bg-slate-800 hover:shadow-[0_8px_22px_rgba(0,0,0,0.22)]

          dark:bg-white dark:text-slate-900
          dark:hover:bg-slate-200
          "
        >
          About Me
        </Link>
      </div>
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="
      rounded-2xl px-3 py-2
      bg-slate-50
      border border-slate-200
      text-slate-800
      shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)]

      dark:border-slate-700
      dark:bg-slate-800/60
      dark:text-slate-100
      dark:shadow-[inset_0_1px_4px_rgba(0,0,0,0.25)]
      "
    >
      <dt className="text-[11px] text-slate-500 dark:text-slate-300">
        {label}
      </dt>
      <dd className="mt-1 text-lg font-semibold tracking-wide">{value}</dd>
    </div>
  );
}
