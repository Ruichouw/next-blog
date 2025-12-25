// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: "ruichouw's blog",
  description: '个人博客',
  verification: {
    google: 'C8hOsmmQ2EvmPpYgHBQwGECoCjD9Ewp5LiZWpo3eLNo',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {/* 整体背景：日间浅灰、夜间深蓝 */}
          <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
            {/* 星空渐变只在夜间出现 */}
            <div className="pointer-events-none fixed inset-0 -z-10 opacity-0 transition-opacity duration-300 dark:opacity-100">
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900" />
              <div className="absolute inset-0 opacity-40 mix-blend-soft-light bg-[radial-gradient(circle_at_top,_#1e293b,_transparent_60%),radial-gradient(circle_at_bottom,_#020617,_transparent_55%)]" />
            </div>

            {/* 下面交给各个子 layout 决定结构 */}
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
