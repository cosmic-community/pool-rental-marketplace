import Link from 'next/link'
import type { Host } from '@/types'

interface HostCardProps {
  host: Host
  poolCount?: number
}

export default function HostCard({ host, poolCount }: HostCardProps) {
  const photoUrl = host.metadata?.profile_photo?.imgix_url
  const bio = host.metadata?.bio
  const name = host.metadata?.name || host.title

  return (
    <Link
      href={`/hosts/${host.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 text-center"
    >
      {/* Avatar */}
      <div className="relative w-24 h-24 mx-auto mb-4">
        {photoUrl ? (
          <img
            src={`${photoUrl}?w=200&h=200&fit=crop&auto=format,compress`}
            alt={name}
            width={96}
            height={96}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-pool-100 group-hover:ring-pool-200 transition-all"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-pool-100 flex items-center justify-center ring-4 ring-pool-50 group-hover:ring-pool-200 transition-all">
            <span className="text-3xl text-pool-500">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <h3 className="text-lg font-bold text-gray-900 group-hover:text-pool-600 transition-colors">
        {name}
      </h3>

      {bio && (
        <p className="mt-2 text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {bio}
        </p>
      )}

      {poolCount != null && poolCount > 0 && (
        <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-pool-50 text-pool-700 text-xs font-semibold rounded-full">
          <span>🏊</span>
          {poolCount} {poolCount === 1 ? 'pool' : 'pools'}
        </div>
      )}
    </Link>
  )
}