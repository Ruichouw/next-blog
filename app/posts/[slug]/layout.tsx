// app/posts/layout.tsx
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ArticleToc } from '@/components/ArticleToc'

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-10 pt-4 sm:px-6 lg:px-8">
      <Navbar />

      {/* 小屏竖排，md+ 才变成左右布局 */}
      <main className="mt-6 flex flex-1 flex-col gap-6 md:flex-row">
        {/* 左侧：文章内容 */}
        <section className="flex-1">{children}</section>

        {/* 右侧：目录，仅 md+ 显示 */}
        <aside className="hidden fixed right-1 top-1/2 -translate-y-1/2 w-70 shrink-0 md:block">
          <ArticleToc />
        </aside>
      </main>

      <Footer />
    </div>
  )
}
