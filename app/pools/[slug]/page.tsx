// app/pools/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPoolBySlug, getReviewsByPool } from '@/lib/cosmic'
import StarRating from '@/components/StarRating'
import ReviewCard from '@/components/ReviewCard'

interface PoolDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PoolDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const pool = await getPoolBySlug(slug)
  if (!pool) return { title: 'Pool Not Found' }

  return {
    title: `${pool.title} — Pool Rental Marketplace`,
    description: pool.metadata?.description?.slice(0, 160) || `Rent ${pool.title} on Pool Rental Marketplace`,
  }
}

// Changed: Helper to extract numeric rating from select-dropdown object or number
function getRatingNumber(rating: unknown): number {
  if (typeof rating === 'number') return rating
  if (typeof rating === 'object' && rating !== null && 'key' in rating) {
    return Number((rating as { key: string }).key) || 0
  }
  return 0
}

export default async function PoolDetailPage({ params }: PoolDetailPageProps) {
  const { slug } = await params
  const pool = await getPoolBySlug(slug)

  if (!pool) {
    notFound()
  }

  const reviews = await getReviewsByPool(pool.id)

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + getRatingNumber(r.metadata?.rating), 0) / reviews.length
      : 0

  const imageUrl = pool.metadata?.featured_image?.imgix_url
  const gallery = pool.metadata?.gallery || []
  const host = pool.metadata?.host
  const category = pool.metadata?.category
  // Changed: amenities is a check-boxes array, not a comma-separated string
  const amenities = pool.metadata?.amenities
  const amenityList: string[] = Array.isArray(amenities)
    ? (amenities as string[]).filter(Boolean)
    : typeof amenities === 'string' && amenities
    ? amenities.split(',').map((a: string) => a.trim()).filter(Boolean)
    : []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-pool-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/pools" className="hover:text-pool-600 transition-colors">Pools</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate">{pool.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Image & Gallery */}
        <div className="lg:col-span-2">
          {/* Main Image */}
          <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-[16/10]">
            {imageUrl ? (
              <img
                src={`${imageUrl}?w=1200&h=750&fit=crop&auto=format,compress`}
                alt={pool.title}
                width={1200}
                height={750}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-pool-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>

          {/* Gallery */}
          {gallery.length > 0 && (
            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
              {gallery.map((img, index) => (
                <div key={index} className="rounded-xl overflow-hidden bg-gray-100 aspect-square">
                  <img
                    src={`${img.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                    alt={`${pool.title} gallery ${index + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About this Pool</h2>
            {pool.metadata?.description ? (
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {pool.metadata.description}
              </p>
            ) : (
              <p className="text-gray-400 italic">No description available.</p>
            )}
          </div>

          {/* Amenities */}
          {amenityList.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {amenityList.map((amenity: string, index: number) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-pool-50 text-pool-700 text-sm font-medium rounded-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-pool-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          <div className="mt-10">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Reviews ({reviews.length})
              </h2>
              {avgRating > 0 && (
                <div className="flex items-center gap-2">
                  <StarRating rating={avgRating} size="md" />
                  <span className="text-sm font-semibold text-gray-700">{avgRating.toFixed(1)}</span>
                </div>
              )}
            </div>

            {reviews.length === 0 ? (
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <span className="text-3xl mb-2 block">💬</span>
                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column - Booking sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Pricing Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
              <div className="flex items-baseline gap-1 mb-4">
                {pool.metadata?.price_per_hour != null ? (
                  <>
                    <span className="text-3xl font-black text-gray-900">
                      ${pool.metadata.price_per_hour}
                    </span>
                    <span className="text-gray-500 font-medium">/hour</span>
                  </>
                ) : (
                  <span className="text-xl font-bold text-gray-500">Contact for pricing</span>
                )}
              </div>

              {avgRating > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <StarRating rating={avgRating} size="sm" />
                  <span className="text-sm text-gray-600">
                    {avgRating.toFixed(1)} · {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                  </span>
                </div>
              )}

              <div className="space-y-3 mb-6">
                <h1 className="text-2xl font-bold text-gray-900">{pool.title}</h1>

                {pool.metadata?.location && (
                  <div className="flex items-start gap-2 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-pool-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">{pool.metadata.location}</span>
                  </div>
                )}

                {pool.metadata?.max_guests != null && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-pool-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-sm">Up to {pool.metadata.max_guests} guests</span>
                  </div>
                )}

                {category && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-pool-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <Link
                      href={`/categories/${category.slug}`}
                      className="text-sm text-pool-600 hover:text-pool-700 font-medium transition-colors"
                    >
                      {category.metadata?.name || category.title}
                    </Link>
                  </div>
                )}
              </div>

              <button className="w-full py-3.5 bg-pool-600 hover:bg-pool-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-pool-600/25">
                Book This Pool
              </button>
            </div>

            {/* Host Card */}
            {host && (
              <Link
                href={`/hosts/${host.slug}`}
                className="block bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Hosted by</p>
                <div className="flex items-center gap-4">
                  {host.metadata?.profile_photo?.imgix_url ? (
                    <img
                      src={`${host.metadata.profile_photo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
                      alt={host.metadata?.name || host.title}
                      width={56}
                      height={56}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-pool-100"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-pool-100 flex items-center justify-center ring-2 ring-pool-50">
                      <span className="text-xl font-bold text-pool-600">
                        {(host.metadata?.name || host.title).charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-gray-900">{host.metadata?.name || host.title}</p>
                    <p className="text-sm text-pool-600 font-medium mt-0.5">View profile →</p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}