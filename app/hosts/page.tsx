import type { Metadata } from 'next'
import { getHosts, getPools } from '@/lib/cosmic'
import HostCard from '@/components/HostCard'

export const metadata: Metadata = {
  title: 'Our Hosts — Pool Rental Marketplace',
  description: 'Meet the hosts behind our amazing pool listings.',
}

export default async function HostsPage() {
  const [hosts, pools] = await Promise.all([getHosts(), getPools()])

  const hostPoolCounts: Record<string, number> = {}
  for (const pool of pools) {
    const hostId = pool.metadata?.host?.id
    if (hostId) {
      hostPoolCounts[hostId] = (hostPoolCounts[hostId] ?? 0) + 1
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Our Hosts</h1>
        <p className="mt-2 text-gray-500 text-lg">
          Meet the {hosts.length} amazing {hosts.length === 1 ? 'host' : 'hosts'} behind our pool listings
        </p>
      </div>

      {hosts.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-5xl mb-4 block">👤</span>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No hosts yet</h2>
          <p className="text-gray-500">Hosts will appear here once they list their pools.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {hosts.map((host) => (
            <HostCard
              key={host.id}
              host={host}
              poolCount={hostPoolCounts[host.id] ?? 0}
            />
          ))}
        </div>
      )}
    </div>
  )
}