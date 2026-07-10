import React from 'react'

const AboutStats = () => {
  return (
    <div>
      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-4 grid-cols-2">
            <div className="rounded-3xl bg-white p-8 text-center shadow-md hover:shadow-lg border border-zinc-100">
              <h3 className="text-4xl font-bold text-red-600">5000+</h3>
              <p className="mt-2 text-gray-600">Happy Customers</p>
            </div>

            <div className="rounded-3xl bg-white p-8 text-center shadow-md hover:shadow-lg border border-zinc-100">
              <h3 className="text-4xl font-bold text-red-600">10K+</h3>
              <p className="mt-2 text-gray-600">Orders Delivered</p>
            </div>

            <div className="rounded-3xl bg-white p-8 text-center shadow-md hover:shadow-lg border border-zinc-100">
              <h3 className="text-4xl font-bold text-red-600">100%</h3>
              <p className="mt-2 text-gray-600">Fresh Quality</p>
            </div>

            <div className="rounded-3xl bg-white p-8 text-center shadow-md hover:shadow-lg border border-zinc-100">
              <h3 className="text-4xl font-bold text-red-600">4.9★</h3>
              <p className="mt-2 text-gray-600">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutStats
