import { createBucketClient } from '@cosmicjs/sdk'
import type { Pool, Host, Category, Review } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging',
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

// ---- Pools ----

export async function getPools(): Promise<Pool[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'pools' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    return (response.objects || []) as Pool[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch pools')
  }
}

export async function getPoolBySlug(slug: string): Promise<Pool | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'pools', slug })
      .props(['id', 'title', 'slug', 'metadata', 'content', 'created_at'])
      .depth(1)

    return (response.object || null) as Pool | null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch pool')
  }
}

// ---- Hosts ----

export async function getHosts(): Promise<Host[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'hosts' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    return (response.objects || []) as Host[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch hosts')
  }
}

export async function getHostBySlug(slug: string): Promise<Host | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'hosts', slug })
      .props(['id', 'title', 'slug', 'metadata', 'content', 'created_at'])
      .depth(1)

    return (response.object || null) as Host | null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch host')
  }
}

export async function getPoolsByHost(hostId: string): Promise<Pool[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'pools', 'metadata.host': hostId })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    return (response.objects || []) as Pool[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch pools by host')
  }
}

// ---- Categories ----

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    return (response.objects || []) as Category[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch categories')
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categories', slug })
      .props(['id', 'title', 'slug', 'metadata', 'content', 'created_at'])
      .depth(1)

    return (response.object || null) as Category | null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch category')
  }
}

export async function getPoolsByCategory(categoryId: string): Promise<Pool[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'pools', 'metadata.category': categoryId })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    return (response.objects || []) as Pool[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch pools by category')
  }
}

// ---- Reviews ----

export async function getReviews(): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'reviews' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    return (response.objects || []) as Review[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch reviews')
  }
}

export async function getReviewsByPool(poolId: string): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'reviews', 'metadata.pool': poolId })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    return (response.objects || []) as Review[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch reviews by pool')
  }
}