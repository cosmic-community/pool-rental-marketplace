// app/categories/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getPoolsByCategory, getReviews } from '@/lib/cosmic'
import PoolCard from '@/components/PoolCard'

interface CategoryDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) return { title: 'Category Not Found' }
  const name = category.metadata?.name || category.title

  return {
    title: `${name} Pools — Pool Rental Marketplace`,
    description: category.metadata?.description || `Browse ${name} pools for rent`,
  }
}

export default async function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const [pools, reviews] = await Promise.all([
    getPoolsByCategory(category.id),
    getReviews(),
  ])

  // Build rating map
  const ratingMap: Record<string, { total: number; count: number }> = {}
  for (const review of reviews) {
    const poolId = review.metadata?.pool?.id
    if (!poolId) continue
    const existing = ratingMap[poolId]
    if (existing) {
      existing.total += review.metadata?.rating ?? 0
      existing.count += 1
    } else {
      ratingMap[poolId] = {
        total: review.metadata?.rating ?? 0,
        count: 1,
      }
    }
  }

  const name = category.metadata?.name || category.title
  const description = category.metadata?.description

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-pool-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-pool-600 transition-colors">Categories</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate">{name}</span>
      </nav>

      {/* Category Header */}
      <div className="bg-gradient-to-br from-pool-600 to-teal-600 rounded-2xl p-8 sm:p-10 mb-10 text-white">
        <h1 className="text-3xl sm:text-4xl font-bold">{name}</h1>
        {description && (
          <p className="mt-3 text-pool-100/90 text-lg leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
        <p className="mt-4 text-sm font-medium text-pool-200/80">
          {pools.length} {pools.length === 1 ? 'pool' : 'pools'} in this category
        </p>
      </div>

      {/* Pools Grid */}
      {pools.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-5xl mb-4 block">🏊</span>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No pools in this category</h2>
          <p className="text-gray-500">Check back later for new listings!</p>
          <Link
            href="/pools"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-pool-600 text-white font-semibold rounded-full hover:bg-pool-700 transition-colors"
          >
            Browse All Pools
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pools.map((pool) => {
            const poolRating = ratingMap[pool.id]
            const avg = poolRating ? poolRating.total / poolRating.count : 0
            return (
              <PoolCard
                key={pool.id}
                pool={pool}
                averageRating={avg}
                reviewCount={poolRating?.count ?? 0}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}