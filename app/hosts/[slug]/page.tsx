// app/hosts/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getHostBySlug, getPoolsByHost, getReviews } from '@/lib/cosmic'
import PoolCard from '@/components/PoolCard'

interface HostDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: HostDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const host = await getHostBySlug(slug)
  if (!host) return { title: 'Host Not Found' }
  const name = host.metadata?.name || host.title

  return {
    title: `${name} — Pool Rental Marketplace`,
    description: host.metadata?.bio?.slice(0, 160) || `View ${name}'s pool listings`,
  }
}

export default async function HostDetailPage({ params }: HostDetailPageProps) {
  const { slug } = await params
  const host = await getHostBySlug(slug)

  if (!host) {
    notFound()
  }

  const [pools, reviews] = await Promise.all([
    getPoolsByHost(host.id),
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

  const name = host.metadata?.name || host.title
  const photoUrl = host.metadata?.profile_photo?.imgix_url
  const bio = host.metadata?.bio

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-pool-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/hosts" className="hover:text-pool-600 transition-colors">Hosts</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate">{name}</span>
      </nav>

      {/* Host Profile */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {photoUrl ? (
            <img
              src={`${photoUrl}?w=300&h=300&fit=crop&auto=format,compress`}
              alt={name}
              width={128}
              height={128}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover ring-4 ring-pool-100"
            />
          ) : (
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-pool-100 flex items-center justify-center ring-4 ring-pool-50">
              <span className="text-5xl font-bold text-pool-500">
                {name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{name}</h1>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-pool-50 text-pool-700 text-sm font-semibold rounded-full">
                🏊 {pools.length} {pools.length === 1 ? 'pool' : 'pools'}
              </span>
              {host.metadata?.email && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                  ✉️ {host.metadata.email}
                </span>
              )}
            </div>
            {bio && (
              <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">{bio}</p>
            )}
          </div>
        </div>
      </div>

      {/* Host's Pools */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {name}&apos;s Pools
        </h2>

        {pools.length === 0 ? (
          <div className="bg-gray-50 rounded-xl p-10 text-center">
            <span className="text-4xl mb-3 block">🏊</span>
            <p className="text-gray-500">This host hasn&apos;t listed any pools yet.</p>
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
    </div>
  )
}