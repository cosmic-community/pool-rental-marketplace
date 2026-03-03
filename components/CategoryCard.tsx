import Link from 'next/link'
import type { Category } from '@/types'

const CATEGORY_ICONS: Record<string, string> = {
  luxury: '✨',
  family: '👨‍👩‍👧‍👦',
  party: '🎉',
  heated: '♨️',
  indoor: '🏠',
  outdoor: '☀️',
  infinity: '🌊',
  rooftop: '🏙️',
}

const CATEGORY_COLORS: string[] = [
  'from-teal-400 to-cyan-500',
  'from-blue-400 to-indigo-500',
  'from-emerald-400 to-teal-500',
  'from-amber-400 to-orange-500',
  'from-purple-400 to-pink-500',
  'from-rose-400 to-red-500',
]

interface CategoryCardProps {
  category: Category
  poolCount?: number
  index?: number
}

export default function CategoryCard({ category, poolCount, index = 0 }: CategoryCardProps) {
  const name = category.metadata?.name || category.title
  const description = category.metadata?.description
  const gradientColor = CATEGORY_COLORS[index % CATEGORY_COLORS.length] ?? CATEGORY_COLORS[0]

  const slug = category.slug.toLowerCase()
  let icon = '🏊'
  for (const [key, emoji] of Object.entries(CATEGORY_ICONS)) {
    if (slug.includes(key) || name.toLowerCase().includes(key)) {
      icon = emoji
      break
    }
  }

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative block rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className={`bg-gradient-to-br ${gradientColor} p-6 sm:p-8 min-h-[180px] flex flex-col justify-between`}>
        <div>
          <span className="text-4xl mb-3 block">{icon}</span>
          <h3 className="text-xl font-bold text-white group-hover:translate-x-1 transition-transform">
            {name}
          </h3>
          {description && (
            <p className="mt-2 text-sm text-white/80 line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          {poolCount != null && (
            <span className="text-xs font-semibold text-white/90 bg-white/20 px-3 py-1 rounded-full">
              {poolCount} {poolCount === 1 ? 'pool' : 'pools'}
            </span>
          )}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>
    </Link>
  )
}