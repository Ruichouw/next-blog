// app/(site)/layout.tsx
import Navbar from '@/components/Navbar'

import Footer from '@/components/Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-10 pt-4">
      <Navbar />
      <main className="mt-6 flex flex-1 gap-6">
        <section className="flex-1 space-y-6 ">{children}</section>
      </main>
      <Footer />
    </div>
  )
}
