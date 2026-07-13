import { Mail, Smartphone } from "lucide-react";

export default function NewsletterSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-red-600 to-red-700">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left Content */}
          <div className="text-white">
            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              🎉 Exclusive Offers
            </span>

            <h2 className="mt-5 text-4xl font-bold leading-tight">
              Get Special Discounts <br />
              Directly In Your Inbox
            </h2>

            <p className="mt-4 text-red-100">
              Subscribe to receive fresh meat offers, combo deals and
              exclusive discounts before everyone else.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Mail size={20} />
                <span>Weekly Offers</span>
              </div>

              <div className="flex items-center gap-2">
                <Smartphone size={20} />
                <span>Instant Updates</span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="rounded-3xl bg-white p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900">
              Subscribe Now
            </h3>

            <p className="mt-2 text-gray-500">
              Join thousands of customers receiving special deals.
            </p>

            <form className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Enter Your Name"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500"
              />

              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500"
              />

              <button
                type="submit"
                className="w-full cursor-pointer rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                Subscribe & Get Offers
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-gray-500">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}