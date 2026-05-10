import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/lib/queries'
import { urlFor, hasAsset } from '@/lib/sanity'

const CATEGORY_LABELS: Record<string, string> = {
  markets: 'Markets',
  macro: 'Macro',
  equities: 'Equities',
  ma: 'M&A',
  careers: 'Careers',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

interface Props {
  post: Post
  featured?: boolean
}

export default function ArticleCard({ post, featured = false }: Props) {
  const imageUrl = post.coverImage && hasAsset(post.coverImage)
    ? urlFor(post.coverImage).width(featured ? 1200 : 600).height(featured ? 630 : 315).url()
    : null

  return (
    <Link
      href={`/news/${post.slug.current}`}
      className={`group block rounded-lg overflow-hidden border border-gray-100 hover:border-brand-green transition-colors ${
        featured ? 'sm:flex' : ''
      }`}
    >
      {imageUrl && (
        <div className={`relative overflow-hidden bg-gray-50 ${featured ? 'sm:w-1/2 h-52 sm:h-auto' : 'h-44'}`}>
          <Image
            src={imageUrl}
            alt={post.coverImage?.alt ?? post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className={`p-5 flex flex-col gap-2 ${featured ? 'sm:w-1/2 sm:p-8 justify-center' : ''}`}>
        <div className="flex items-center gap-2">
          {post.category && (
            <span className="text-xs font-semibold text-brand-green uppercase tracking-wide">
              {CATEGORY_LABELS[post.category] ?? post.category}
            </span>
          )}
          {post.publishedAt && (
            <span className="text-xs text-gray-400">{formatDate(post.publishedAt)}</span>
          )}
        </div>
        <h2 className={`font-bold leading-snug group-hover:text-brand-green transition-colors ${featured ? 'text-2xl sm:text-3xl' : 'text-base'}`}>
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
        )}
        {post.author && (
          <p className="text-xs text-gray-400 mt-1">{post.author}</p>
        )}
      </div>
    </Link>
  )
}
