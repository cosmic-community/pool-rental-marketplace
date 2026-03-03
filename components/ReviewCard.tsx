import type { Review } from '@/types'
import StarRating from '@/components/StarRating'

interface ReviewCardProps {
  review: Review
  showPoolName?: boolean
}

// Changed: Helper to extract numeric rating from select-dropdown object or number
function getRatingNumber(rating: unknown): number {
  if (typeof rating === 'number') return rating
  if (typeof rating === 'object' && rating !== null && 'key' in rating) {
    return Number((rating as { key: string }).key) || 0
  }
  return 0
}

export default function ReviewCard({ review, showPoolName = false }: ReviewCardProps) {
  const reviewerName = review.metadata?.reviewer_name || 'Anonymous'
  // Changed: rating is a select-dropdown returning {key, value}, extract numeric value
  const rating = getRatingNumber(review.metadata?.rating)
  const comment = review.metadata?.comment
  const date = review.metadata?.date
  const poolTitle = review.metadata?.pool?.title

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-pool-100 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-pool-600">
              {reviewerName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{reviewerName}</p>
            {formattedDate && (
              <p className="text-xs text-gray-400 mt-0.5">{formattedDate}</p>
            )}
          </div>
        </div>
        <StarRating rating={rating} size="sm" />
      </div>

      {/* Pool name */}
      {showPoolName && poolTitle && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-pool-600 font-medium">
          <span>🏊</span>
          <span>{poolTitle}</span>
        </div>
      )}

      {/* Comment */}
      {comment && (
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          {comment}
        </p>
      )}
    </div>
  )
}