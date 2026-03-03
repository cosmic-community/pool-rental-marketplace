import Link from 'next/link'
import type { Pool } from '@/types'
import StarRating from '@/components/StarRating'

interface PoolCardProps {
  pool: Pool
  averageRating?: number
  reviewCount?: number
}

export default function PoolCard({ pool, averageRating, reviewCount }: PoolCardProps) {
  const imageUrl = pool.metadata?.featured_image?.imgix_url
  const price = pool.metadata?.price_per_hour
  const location = pool.metadata?.location
  const maxGuests = pool.metadata?.max_guests
  const categoryTitle = pool.metadata?.category?.title

  return (
    <Link
      href={`/pools/${pool.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {imageUrl ? (
          <img
            src={`${imageUrl}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={pool.title}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-pool-50 text-pool-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Category Badge */}
        {categoryTitle && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold text-pool-700 px-3 py-1 rounded-full">
            {categoryTitle}
          </span>
        )}

        {/* Price Badge */}
        {price != null && (
          <span className="absolute top-3 right-3 bg-pool-600 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
            ${price}/hr
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-pool-600 transition-colors line-clamp-1">
          {pool.title}
        </h3>

        {location && (
          <div className="flex items-center gap-1.5 mt-1.5 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-pool-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm truncate">{location}</span>
          </div>
        )}

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            {averageRating != null && averageRating > 0 ? (
              <>
                <StarRating rating={averageRating} size="sm" />
                <span className="text-xs text-gray-500 ml-1">
                  ({reviewCount ?? 0})
                </span>
              </>
            ) : (
              <span className="text-xs text-gray-400">No reviews yet</span>
            )}
          </div>

          {maxGuests != null && (
            <div className="flex items-center gap-1 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-xs font-medium">{maxGuests} guests</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}