import type { Metadata } from 'next'
import { getCategories, getPools } from '@/lib/cosmic'
import CategoryCard from '@/components/CategoryCard'

export const metadata: Metadata = {
  title: 'Pool Categories — Pool Rental Marketplace',
  description: 'Browse pools by category. Find luxury, family-friendly, party, and more pool types.',
}

export default async function CategoriesPage() {
  const [categories, pools] = await Promise.all([getCategories(), getPools()])

  const categoryPoolCounts: Record<string, number> = {}
  for (const pool of pools) {
    const catId = pool.metadata?.category?.id
    if (catId) {
      categoryPoolCounts[catId] = (categoryPoolCounts[catId] ?? 0) + 1
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Pool Categories</h1>
        <p className="mt-2 text-gray-500 text-lg">
          Explore {categories.length} {categories.length === 1 ? 'category' : 'categories'} of pools
        </p>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-5xl mb-4 block">🏷️</span>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No categories yet</h2>
          <p className="text-gray-500">Categories will appear here once created.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              poolCount={categoryPoolCounts[category.id] ?? 0}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  )
}