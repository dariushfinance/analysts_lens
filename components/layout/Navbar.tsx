'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'News', href: '/news' },
  { label: 'Analyst School', href: '/courses' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-lg tracking-tight">
            Analysts<span className="text-brand-green"> Lens</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-gray-600 hover:text-brand-dark transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="text-sm font-medium px-4 py-1.5 rounded-md border border-gray-200 hover:border-brand-green hover:text-brand-green transition-colors"
          >
            Sign in
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="sm:hidden p-1" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-gray-700"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="text-sm font-medium text-gray-700"
            onClick={() => setOpen(false)}
          >
            Sign in
          </Link>
        </div>
      )}
    </nav>
  )
}
