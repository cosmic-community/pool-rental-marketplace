import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-3xl">🏊</span>
            <span className="text-xl sm:text-2xl font-bold text-pool-700 group-hover:text-pool-600 transition-colors">
              PoolRental
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/pools"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-pool-600 hover:bg-pool-50 rounded-lg transition-all"
            >
              Pools
            </Link>
            <Link
              href="/hosts"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-pool-600 hover:bg-pool-50 rounded-lg transition-all"
            >
              Hosts
            </Link>
            <Link
              href="/categories"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-pool-600 hover:bg-pool-50 rounded-lg transition-all"
            >
              Categories
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-pool-600 hover:bg-pool-50 rounded-lg transition-all"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/pools"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-pool-600 hover:bg-pool-700 text-white text-sm font-semibold rounded-full transition-colors shadow-lg shadow-pool-600/25"
            >
              Browse Pools
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            {/* Mobile menu */}
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function MobileMenu() {
  return (
    <details className="relative group">
      <summary className="list-none cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </summary>
      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
        <Link href="/pools" className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-pool-50 hover:text-pool-600 transition-colors">
          🏊 Pools
        </Link>
        <Link href="/hosts" className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-pool-50 hover:text-pool-600 transition-colors">
          👤 Hosts
        </Link>
        <Link href="/categories" className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-pool-50 hover:text-pool-600 transition-colors">
          🏷️ Categories
        </Link>
        <Link href="/contact" className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-pool-50 hover:text-pool-600 transition-colors">
          ✉️ Contact
        </Link>
      </div>
    </details>
  )
}