// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="mt-16 w-full pt-8 text-center text-sm text-slate-400">
      {/* 渐变色顶部边框 */}
      <div className="mx-auto mb-6 h-[3px] w-full max-w-5xl bg-gradient-to-r from-teal-300 via-blue-500 to-pink-500 rounded-full" />

      <div className="flex flex-col items-center gap-2">
        <div>Copyright © 2023 - {new Date().getFullYear()} ruichouw</div>

        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-slate-300 underline decoration-pink-400 decoration-2 underline-offset-4 hover:text-white"
        >
          粤ICP备 2024183952号
        </a>
      </div>
    </footer>
  );
}
