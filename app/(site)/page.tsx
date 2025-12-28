// app/page.tsx
import { getAllPostsMeta } from '@/lib/posts'
import { PostCard } from '@/components/PostCard'
import ProfileCard from '@/components/ProfileCard'

export default function HomePage() {
  const posts = getAllPostsMeta()

  return (
    <main className="min-h-screen  py-10 text-white ">
      <div className="mx-auto flex max-w-6xl gap-8">
        {/* 左侧：文章列表 */}
        <section className="flex-1 space-y-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </section>
        {/* 个人卡片：md 以上才显示 */}
        <aside className="hidden w-65  shrink-0 md:block">
          <ProfileCard />
        </aside>
      </div>
    </main>
  )
}
