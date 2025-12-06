// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ruichouw's blog",
  description: "个人博客",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        {/* 背景层 */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900" />
        <div className="fixed inset-0 -z-10 opacity-40 mix-blend-soft-light bg-[radial-gradient(circle_at_top,_#1e293b,_transparent_60%),radial-gradient(circle_at_bottom,_#020617,_transparent_55%)]" />

        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-10 pt-4">
          <Navbar />
          <main className="mt-6 flex flex-1 gap-6">
            <section className="flex-1 space-y-6">{children}</section>

            <aside className="hidden w-72 shrink-0 md:block">
              <ProfileCard />
            </aside>
          </main>
          <Footer /> {/* ← 底部组件 */}
        </div>
      </body>
    </html>
  );
}
