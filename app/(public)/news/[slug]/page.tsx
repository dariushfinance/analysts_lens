import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { getAllPosts, getPostBySlug } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'

const CATEGORY_LABELS: Record<string, string> = {
  markets: 'Markets',
  macro: 'Macro',
  equities: 'Equities',
  ma: 'M&A',
  careers: 'Careers',
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((p) => ({ slug: p.slug.current }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      images: post.coverImage
        ? [urlFor(post.coverImage).width(1200).height(630).url()]
        : [],
    },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const imageUrl = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).url()
    : null

  return (
    <article className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      {/* Meta row */}
      <div className="flex items-center gap-3 mb-4">
        {post.category && (
          <span className="text-xs font-semibold text-brand-green uppercase tracking-wide">
            {CATEGORY_LABELS[post.category] ?? post.category}
          </span>
        )}
        {post.publishedAt && (
          <span className="text-xs text-gray-400">
            {new Date(post.publishedAt).toLocaleDateString('en-GB', {
              day: 'numeric', month: 'long', year: 'numeric',
            })}
          </span>
        )}
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">{post.title}</h1>

      {post.excerpt && (
        <p className="text-lg text-gray-500 mb-6 leading-relaxed">{post.excerpt}</p>
      )}

      {post.author && (
        <p className="text-sm text-gray-400 mb-8">By {post.author}</p>
      )}

      {imageUrl && (
        <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden mb-8 bg-gray-50">
          <Image
            src={imageUrl}
            alt={post.coverImage?.alt ?? post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="prose-content">
        {post.body && (
          <PortableText
            value={post.body as Parameters<typeof PortableText>[0]['value']}
            components={{
              types: {
                image: ({ value }) => {
                  const src = urlFor(value).width(900).url()
                  return (
                    <figure className="my-8">
                      <div className="relative h-64 rounded-lg overflow-hidden bg-gray-50">
                        <Image src={src} alt={value.alt ?? ''} fill className="object-cover" />
                      </div>
                      {value.caption && (
                        <figcaption className="text-xs text-gray-400 text-center mt-2">
                          {value.caption}
                        </figcaption>
                      )}
                    </figure>
                  )
                },
              },
              marks: {
                link: ({ children, value }) => (
                  <a
                    href={value.href}
                    target={value.blank ? '_blank' : undefined}
                    rel={value.blank ? 'noreferrer' : undefined}
                  >
                    {children}
                  </a>
                ),
              },
            }}
          />
        )}
      </div>

      <div className="mt-12 pt-6 border-t border-gray-100">
        <a href="/news" className="text-sm text-gray-400 hover:text-brand-green transition-colors">
          ← Back to News
        </a>
      </div>
    </article>
  )
}
