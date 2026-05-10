import { client } from './sanity'

export interface Post {
  _id: string
  title: string
  slug: { current: string }
  author: string
  publishedAt: string
  category: string
  excerpt: string
  coverImage?: { asset: { _ref: string }; alt?: string }
  featured: boolean
  body?: unknown[]
}

export async function getAllPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, author, publishedAt, category, excerpt, coverImage, featured
    }`,
    {},
    { next: { revalidate: 60 } }
  )
}

export async function getFeaturedPost(): Promise<Post | null> {
  const posts = await client.fetch(
    `*[_type == "post" && featured == true] | order(publishedAt desc)[0] {
      _id, title, slug, author, publishedAt, category, excerpt, coverImage
    }`,
    {},
    { next: { revalidate: 60 } }
  )
  return posts ?? null
}

export async function getLatestPosts(limit = 6): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc)[0...$limit] {
      _id, title, slug, author, publishedAt, category, excerpt, coverImage, featured
    }`,
    { limit: limit - 1 },
    { next: { revalidate: 60 } }
  )
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, author, publishedAt, category, excerpt, coverImage, body
    }`,
    { slug },
    { next: { revalidate: 60 } }
  )
  return post ?? null
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post" && category == $category] | order(publishedAt desc) {
      _id, title, slug, author, publishedAt, category, excerpt, coverImage, featured
    }`,
    { category },
    { next: { revalidate: 60 } }
  )
}
