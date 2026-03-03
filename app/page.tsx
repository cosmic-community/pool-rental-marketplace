import Link from 'next/link'
import { getPools, getHosts, getCategories, getReviews } from '@/lib/cosmic'
import PoolCard from '@/components/PoolCard'
import HostCard from '@/components/HostCard'
import CategoryCard from '@/components/CategoryCard'
import ReviewCard from '@/components/ReviewCard'
import type { Review } from '@/types'

export default async function HomePage() {
  const [pools, hosts, categories, reviews] = await Promise.all([
    getPools(),
    getHosts(),
    getCategories(),
    getReviews(),
  ])

  // Build a map of pool ID -> average rating & count
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

  // Count pools per host
  const hostPoolCounts: Record<string, number> = {}
  for (const pool of pools) {
    const hostId = pool.metadata?.host?.id
    if (hostId) {
      hostPoolCounts[hostId] = (hostPoolCounts[hostId] ?? 0) + 1
    }
  }

  // Count pools per category
  const categoryPoolCounts: Record<string, number> = {}
  for (const pool of pools) {
    const catId = pool.metadata?.category?.id
    if (catId) {
      categoryPoolCounts[catId] = (categoryPoolCounts[catId] ?? 0) + 1
    }
  }

  const featuredPools = pools.slice(0, 6)
  const featuredHosts = hosts.slice(0, 4)
  const latestReviews = reviews
    .sort((a: Review, b: Review) => {
      const dateA = new Date(a.metadata?.date || a.created_at).getTime()
      const dateB = new Date(b.metadata?.date || b.created_at).getTime()
      return dateB - dateA
    })
    .slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-pool-900">
        <div className="absolute inset-0 bg-gradient-to-br from-pool-900/95 via-pool-800/90 to-teal-900/95 z-10" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'url(https://imgix.cosmicjs.com/https://imgix.cosmicjs.com/70b33870-1742-11f1-95d6-291bc45ac05c-autopilot-photo-1499793983690-e29da59ef1c2-1772570954890.jpeg?w=1920&h=900&fit=crop&auto=format,compress)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-pool-200 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <span>🏊</span>
              <span>The #1 Pool Rental Marketplace</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
              Find Your Perfect
              <span className="block text-pool-300">Pool Experience</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-pool-100/80 leading-relaxed max-w-2xl">
              Discover and rent stunning private pools near you. From luxury infinity pools to cozy backyard oases — your perfect getaway awaits.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/pools"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-pool-700 text-base font-bold rounded-full hover:bg-pool-50 transition-colors shadow-xl"
              >
                Browse Pools
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/hosts"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-base font-bold rounded-full hover:bg-white/20 transition-colors border border-white/20"
              >
                Meet Our Hosts
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg">
            <div>
              <p className="text-3xl font-black text-white">{pools.length}</p>
              <p className="text-sm text-pool-200/70 mt-1">Pools</p>
            </div>
            <div>
              <p className="text-3xl font-black text-white">{hosts.length}</p>
              <p className="text-sm text-pool-200/70 mt-1">Hosts</p>
            </div>
            <div>
              <p className="text-3xl font-black text-white">{reviews.length}</p>
              <p className="text-sm text-pool-200/70 mt-1">Reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-semibold text-pool-600 uppercase tracking-wider mb-1">Explore</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Pool Categories</h2>
            </div>
            <Link href="/categories" className="text-sm font-semibold text-pool-600 hover:text-pool-700 transition-colors hidden sm:inline-flex items-center gap-1">
              View all
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                poolCount={categoryPoolCounts[category.id] ?? 0}
                index={index}
              />
            ))}
          </div>
        </section>
      )}

      {/* Featured Pools */}
      {featuredPools.length > 0 && (
        <section className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-sm font-semibold text-pool-600 uppercase tracking-wider mb-1">Featured</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Popular Pools</h2>
              </div>
              <Link href="/pools" className="text-sm font-semibold text-pool-600 hover:text-pool-700 transition-colors hidden sm:inline-flex items-center gap-1">
                View all
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPools.map((pool) => {
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
            <div className="mt-8 text-center sm:hidden">
              <Link href="/pools" className="text-sm font-semibold text-pool-600 hover:text-pool-700 transition-colors">
                View all pools →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Hosts */}
      {featuredHosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-semibold text-pool-600 uppercase tracking-wider mb-1">Trusted</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Our Hosts</h2>
            </div>
            <Link href="/hosts" className="text-sm font-semibold text-pool-600 hover:text-pool-700 transition-colors hidden sm:inline-flex items-center gap-1">
              View all
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {featuredHosts.map((host) => (
              <HostCard
                key={host.id}
                host={host}
                poolCount={hostPoolCounts[host.id] ?? 0}
              />
            ))}
          </div>
        </section>
      )}

      {/* Latest Reviews */}
      {latestReviews.length > 0 && (
        <section className="bg-pool-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="mb-8">
              <p className="text-sm font-semibold text-pool-600 uppercase tracking-wider mb-1">Testimonials</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">What Guests Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestReviews.map((review) => (
                <ReviewCard key={review.id} review={review} showPoolName />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="bg-gradient-to-br from-pool-600 to-teal-600 rounded-3xl p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Dive In?
            </h2>
            <p className="text-lg text-pool-100/80 mb-8 max-w-xl mx-auto">
              Explore our collection of beautiful private pools and find the perfect spot for your next getaway.
            </p>
            <Link
              href="/pools"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-pool-700 text-base font-bold rounded-full hover:bg-pool-50 transition-colors shadow-xl"
            >
              Browse All Pools
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}