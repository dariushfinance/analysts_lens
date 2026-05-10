import type { Metadata } from 'next'
import { getAllPosts, getPostsByCategory } from '@/lib/queries'
import ArticleCard from '@/components/news/ArticleCard'

export const metadata: Metadata = {
  title: 'News',
  description: 'Finance news explained with analyst context — markets, macro, equities, M&A, and careers.',
}

const CATEGORIES = [
  { label: 'All', value: '' },
  { label: 'Markets', value: 'markets' },
  { label: 'Macro', value: 'macro' },
  { label: 'Equities', value: 'equities' },
  { label: 'M&A', value: 'ma' },
  { label: 'Careers', value: 'careers' },
]

interface Props {
  searchParams: { category?: string }
}

export default async function NewsPage({ searchParams }: Props) {
  const category = searchParams.category ?? ''
  const posts = category ? await getPostsByCategory(category) : await getAllPosts()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">News</h1>
        <p className="text-gray-500 text-sm">Finance explained with analyst context.</p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <a
            key={cat.value}
            href={cat.value ? `/news?category=${cat.value}` : '/news'}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              category === cat.value
                ? 'bg-brand-dark text-white border-brand-dark'
                : 'border-gray-200 text-gray-600 hover:border-brand-green hover:text-brand-green'
            }`}
          >
            {cat.label}
          </a>
        ))}
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p>No articles in this category yet.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
