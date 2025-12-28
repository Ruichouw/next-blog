// app/(site)/layout.tsx
import Navbar from '@/components/Navbar'

import Footer from '@/components/Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-6xl flex-col px-4 pt-4">
      <Navbar />
      <main className="mt-6 flex flex-1">
        <section className="flex-1">{children}</section>
      </main>
      <Footer />
    </div>
  )
}

