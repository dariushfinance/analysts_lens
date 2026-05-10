import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-bold text-sm">
          Analysts<span className="text-brand-green"> Lens</span>
        </span>
        <p className="text-xs text-gray-400">
          Free finance education. Not financial advice.
        </p>
        <nav className="flex gap-4 text-xs text-gray-500">
          <Link href="/news" className="hover:text-brand-dark">News</Link>
          <Link href="/courses" className="hover:text-brand-dark">Courses</Link>
        </nav>
      </div>
    </footer>
  )
}
