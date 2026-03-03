import type { Metadata } from 'next'
import { getPools, getReviews } from '@/lib/cosmic'
import PoolCard from '@/components/PoolCard'

export const metadata: Metadata = {
  title: 'Browse Pools — Pool Rental Marketplace',
  description: 'Explore all available private pools for rent. Find the perfect pool for your next getaway.',
}

export default async function PoolsPage() {
  const [pools, reviews] = await Promise.all([getPools(), getReviews()])

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Browse Pools</h1>
        <p className="mt-2 text-gray-500 text-lg">
          Discover {pools.length} {pools.length === 1 ? 'pool' : 'pools'} available for rent
        </p>
      </div>

      {pools.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-5xl mb-4 block">🏊</span>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No pools available yet</h2>
          <p className="text-gray-500">Check back soon for new listings!</p>
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