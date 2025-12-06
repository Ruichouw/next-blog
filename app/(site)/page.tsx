// app/page.tsx
import { getAllPostsMeta } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export default function HomePage() {
  const posts = getAllPostsMeta();

  return (
    <main className="min-h-screen px-4 py-10 text-white md:px-8">
      <div className="mx-auto flex max-w-6xl gap-8">
        {/* 左侧：文章列表 */}
        <section className="flex-1 space-y-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </section>

        {/* 右侧：你原来的个人信息卡片，可以保留/以后再搬过来 */}
        {/* <aside className="w-80">
          ...你的个人卡片组件...
        </aside> */}
      </div>
    </main>
  );
}
