// components/ProfileCard.tsx
import Link from "next/link";
import Image from "next/image";

export default function ProfileCard() {
  return (
    <div
      className="
      relative overflow-hidden rounded-3xl
      border border-slate-300/80
      bg-white p-6 text-slate-900
      shadow-[0_10px_35px_-5px_rgba(0,0,0,0.08)]
      backdrop-blur transition-all duration-300

      /* 夜间模式：低饱和蓝紫质感 + 轻柔发光 */
      dark:border-[rgba(70,90,130,0.35)]
      dark:bg-[rgba(20,27,45,0.65)]
      dark:shadow-[0_15px_45px_-5px_rgba(0,0,0,0.55)]
      dark:backdrop-blur-xl
      "
    >
      {/* 夜间背景氛围层（增添细微渐变） */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 dark:opacity-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(80,95,140,0.15),rgba(0,0,0,0.2))]" />
      </div>

      <div className="relative flex flex-col items-center gap-4 text-center">
        {/* 头像 */}
        <div className="rounded-full p-[2px] bg-slate-200 dark:bg-slate-700/40">
          <div className="relative h-20 w-20 overflow-hidden rounded-full bg-white shadow-sm dark:bg-slate-900">
            {/* 首屏头像标记为高优先级，避免 LCP 警告 */}
            <Image src="/avatar.jpg" alt="avatar" fill sizes="80px" priority />
          </div>
        </div>

        {/* 名称 */}
        <h2 className="text-lg font-semibold tracking-wide dark:text-white">
          ruichouw
        </h2>

        {/* 签名 */}
        <p className="text-xs text-slate-500 dark:text-slate-300/90">
          欲买桂花同载酒 终不似 少年游
        </p>

        {/* 统计信息 */}
        <dl className="mt-4 grid w-full grid-cols-3 gap-3 text-xs">
          <InfoBox label="文章" value="10" />
          <InfoBox label="标签" value="8" />
          <InfoBox label="归档" value="3695" />
        </dl>

        {/* 按钮 */}
        <Link
          href="/about"
          className="
          mt-5 inline-flex items-center justify-center
          rounded-full bg-slate-900
          px-6 py-2 text-sm font-medium text-white
          shadow-[0_6px_18px_rgba(0,0,0,0.15)]
          transition-all duration-200
          hover:bg-slate-800 hover:shadow-[0_8px_22px_rgba(0,0,0,0.22)]

          dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200
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
      bg-slate-50 border border-slate-200
      text-slate-800 shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)]

      dark:border-slate-700/60
      dark:bg-[rgba(30,37,55,0.6)]
      dark:text-slate-100
      dark:shadow-[inset_0_1px_4px_rgba(0,0,0,0.35)]
      "
    >
      <dt className="text-[11px] text-slate-500 dark:text-slate-300/90">
        {label}
      </dt>
      <dd className="mt-1 text-lg font-semibold tracking-wide">{value}</dd>
    </div>
  );
}
