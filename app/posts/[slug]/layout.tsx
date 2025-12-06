// app/posts/layout.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-10 pt-4">
      <Navbar />

      {/* 主区域与首页一致 */}
      <main className="mt-6 flex-1">
        {/* 内层内容区域稍微收窄，居中（阅读区域） */}
        <div className="mx-auto w-full max-w-6xl space-y-6 xxxx">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
