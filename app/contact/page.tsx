import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us — Pool Rental Marketplace',
  description: 'Get in touch with the Pool Rental Marketplace team. We\'d love to hear from you.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-pool-900 via-pool-800 to-teal-900 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-pool-200 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <span>✉️</span>
            <span>We&apos;d love to hear from you</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-pool-100/80 max-w-xl mx-auto">
            Have a question, suggestion, or just want to say hello? Send us a message and we&apos;ll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info Cards */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Get in Touch</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Whether you have a question about our pools, need help with a booking, or want to list your own pool — we&apos;re here to help.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-10 h-10 bg-pool-100 rounded-xl flex items-center justify-center flex-shrink-0 text-xl">
                📧
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                <p className="text-sm text-gray-500">We typically reply within 24 hours.</p>
                <a href="mailto:my@email.com" className="text-sm text-pool-600 hover:text-pool-700 font-medium mt-1 block transition-colors">
                  my@email.com
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-10 h-10 bg-pool-100 rounded-xl flex items-center justify-center flex-shrink-0 text-xl">
                🏊
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Browse Pools</h3>
                <p className="text-sm text-gray-500">Explore our curated collection of private pools.</p>
                <a href="/pools" className="text-sm text-pool-600 hover:text-pool-700 font-medium mt-1 block transition-colors">
                  View all pools →
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-10 h-10 bg-pool-100 rounded-xl flex items-center justify-center flex-shrink-0 text-xl">
                👤
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">List Your Pool</h3>
                <p className="text-sm text-gray-500">Become a host and start earning today.</p>
                <a href="/hosts" className="text-sm text-pool-600 hover:text-pool-700 font-medium mt-1 block transition-colors">
                  Meet our hosts →
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Send a Message</h2>
              <p className="text-gray-500 text-sm mb-8">
                Fill out the form below and we&apos;ll get back to you shortly.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}