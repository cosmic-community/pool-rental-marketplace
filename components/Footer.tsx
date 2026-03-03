import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🏊</span>
              <span className="text-xl font-bold text-white">PoolRental</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Discover and rent beautiful private pools near you. The perfect getaway is just a click away.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Explore</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/pools" className="text-sm hover:text-pool-400 transition-colors">
                  Browse Pools
                </Link>
              </li>
              <li>
                <Link href="/hosts" className="text-sm hover:text-pool-400 transition-colors">
                  Meet Hosts
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm hover:text-pool-400 transition-colors">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/contact" className="text-sm hover:text-pool-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <span className="text-sm text-gray-400">Safety Info</span>
              </li>
              <li>
                <span className="text-sm text-gray-400">Cancellation Policy</span>
              </li>
            </ul>
          </div>

          {/* Hosting */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Hosting</h3>
            <ul className="space-y-2.5">
              <li>
                <span className="text-sm text-gray-400">List Your Pool</span>
              </li>
              <li>
                <span className="text-sm text-gray-400">Host Resources</span>
              </li>
              <li>
                <span className="text-sm text-gray-400">Responsible Hosting</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Pool Rental Marketplace. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Powered by{' '}
            <a
              href="https://www.cosmicjs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pool-400 hover:text-pool-300 transition-colors"
            >
              Cosmic
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}