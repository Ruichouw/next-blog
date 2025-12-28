// components/Footer.tsx
export default function Footer() {
  return (
    <footer className=" w-full pt-8 pb-8 text-center text-sm  text-slate-500">
      {/* 渐变色顶部边框 */}
      <div className="mx-auto mb-6 h-[3px] w-full  bg-gradient-to-r from-teal-300 via-blue-500 to-pink-500 rounded-full" />

      <div className="flex flex-col items-center gap-2">
        <div>Copyright © 2025 - {new Date().getFullYear()} ruichouw</div>

        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium  underline decoration-pink-400 decoration-2 underline-offset-4 hover:text-blue-600"
        >
          粤ICP备2025511917号-1
        </a>
      </div>
    </footer>
  )
}
