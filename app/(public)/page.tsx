import Link from 'next/link'
import { getLatestPosts, getFeaturedPost } from '@/lib/queries'
import ArticleCard from '@/components/news/ArticleCard'

export default async function HomePage() {
  const [featured, posts] = await Promise.all([
    getFeaturedPost(),
    getLatestPosts(7),
  ])

  const restPosts = featured
    ? posts.filter((p) => p._id !== featured._id).slice(0, 6)
    : posts.slice(0, 6)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Hero */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          See markets <span className="text-brand-green">differently.</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Finance news and education for ambitious students — explained like an analyst.
        </p>
        <div className="mt-6 flex gap-3 justify-center">
          <Link
            href="/news"
            className="px-5 py-2.5 bg-brand-dark text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            Latest News
          </Link>
          <Link
            href="/courses"
            className="px-5 py-2.5 border border-gray-200 text-sm font-medium rounded-lg hover:border-brand-green hover:text-brand-green transition-colors"
          >
            Analyst School
          </Link>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Featured</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>
          <ArticleCard post={featured} featured />
        </section>
      )}

      {/* Latest Articles */}
      {restPosts.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Latest</span>
            <div className="flex-1 h-px bg-gray-100" />
            <Link href="/news" className="text-xs text-brand-green font-medium hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {restPosts.map((post) => (
              <ArticleCard key={post._id} post={post} />
            ))}
          </div>
        </section>
      )}

      {posts.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg font-medium">No articles yet.</p>
          <p className="text-sm mt-1">Hugo — go publish the first one at <code className="bg-gray-100 px-1 rounded">/studio</code></p>
        </div>
      )}
    </div>
  )
}
