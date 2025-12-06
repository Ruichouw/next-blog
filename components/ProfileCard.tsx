// components/ProfileCard.tsx
import Link from "next/link";
import Image from "next/image";

export default function ProfileCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-4 shadow-xl backdrop-blur">
      {/* 背景图层，自行换图 */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-[url('/images/sidebar-bg.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/70 to-slate-950" />
      </div>

      <div className="relative flex flex-col items-center gap-3 text-center">
        <div className="relative h-20 w-20 overflow-hidden rounded-full border border-white/40 shadow-md">
          <Image
            src="/avatar.jpg" // 换成你的头像路径
            alt="avatar"
            fill
            sizes="80px"
          />
        </div>

        <div>
          <div className="text-lg font-semibold tracking-wide">ruichouw</div>
          <div className="mt-1 text-xs text-slate-200/90">
            欲买桂花同载酒 终不似 少年游
          </div>
        </div>

        <dl className="mt-4 grid w-full grid-cols-3 gap-3 text-xs">
          <InfoBox label="文章" value="10" />
          <InfoBox label="标签" value="8" />
          <InfoBox label="归档" value="3695" />
        </dl>

        <Link
          href="/about"
          className="mt-5 inline-flex items-center justify-center rounded-full bg-pink-300 px-6 py-2 text-sm font-medium text-slate-900 shadow hover:bg-pink-200"
        >
          About Me
        </Link>
      </div>
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-900/70 px-3 py-2">
      <dt className="text-slate-300/80">{label}</dt>
      <dd className="mt-1 text-lg font-semibold">{value}</dd>
    </div>
  );
}
