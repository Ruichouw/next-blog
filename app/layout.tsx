// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

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
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {/* 整体背景：日间浅灰、夜间深蓝 */}
          <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
            {/* 星空渐变只在夜间出现 */}
            <div className="pointer-events-none fixed inset-0 -z-10 opacity-0 transition-opacity duration-300 dark:opacity-100">
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900" />
              <div className="absolute inset-0 opacity-40 mix-blend-soft-light bg-[radial-gradient(circle_at_top,_#1e293b,_transparent_60%),radial-gradient(circle_at_bottom,_#020617,_transparent_55%)]" />
            </div>

            <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-10 pt-4">
              <Navbar />

              <main className="mt-6 flex flex-1 gap-6">
                <section className="flex-1 space-y-6">{children}</section>

                <aside className="hidden w-72 shrink-0 md:block">
                  <ProfileCard />
                </aside>
              </main>

              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
