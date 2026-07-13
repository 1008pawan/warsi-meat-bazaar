import { Percent, Gift, Ticket, Clock, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { API_URL, STORAGE_URL } from "../../config/publicApi";

export default function OffersPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/offer_list`)
      .then((res) => res.json())
      .then((data) => {
        setOffers(data?.data || []);
      })
      .catch((err) => {
        console.error("Offer Fetch Error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading Offers...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm">
            <Gift size={16} />
            Special Deals
          </span>

          <h1 className="mt-5 text-5xl font-bold">
            Exclusive Offers & Discounts
          </h1>

          <p className="mt-4 text-lg text-red-100">
            Save more on fresh chicken, mutton, fish and eggs.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Offer */}
        {offers.length > 0 && (
          <div className="rounded-3xl bg-gradient-to-r from-red-600 to-red-700 p-10 text-white shadow-xl">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div>
                <h2 className="text-4xl font-bold">🎉 {offers[0].title}</h2>

                <p className="mt-3 text-lg text-red-100">
                  Shop Above ₹{offers[0].min_amount} & {offers[0].reward_qty}{" "}
                  {offers[0].reward_type} FREE
                </p>

                <div className="mt-5 flex items-center gap-2">
                  <Clock size={18} />
                  Active Offer
                </div>
              </div>

              <Link to="/app">
                <button className="rounded-full cursor-pointer bg-white px-8 py-4 font-semibold text-red-600">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Offers Grid */}
        <div className="mt-12">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            Available Offers
          </h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {offers.map((offer, index) => (
              <div
                key={offer.id}
                className="overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className="relative overflow-hidden p-6 text-white"
                  className="relative overflow-hidden p-6 text-white"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.45)),
                    url(${`${STORAGE_URL}${offer.image}`})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <Percent size={40} />

                  <h3 className="mt-4 text-2xl font-bold">{offer.title}</h3>

                  <p className="mt-2 text-white/90">
                    Minimum Order ₹{offer.min_amount}
                  </p>
                </div>

                <div className="p-6">
                  <div className="rounded-2xl border-2 border-dashed border-gray-300 p-4 text-center">
                    <p className="text-sm text-gray-500">Reward</p>

                    <h4 className="mt-1 text-xl font-bold text-red-600">
                      {offer.reward_qty} {offer.units} {offer.reward_type}
                    </h4>
                  </div>

                  {offer.is_first_order === 1 && (
                    <div className="mt-3 rounded-xl bg-green-100 px-3 py-2 text-center text-sm font-semibold text-green-700">
                      First Order Offer 🎉
                    </div>
                  )}

                  <Link to="/app">
                    <button className="mt-5 w-full cursor-pointer rounded-full bg-red-600 py-3 font-semibold text-white hover:bg-red-700">
                      Apply Now
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {!loading && offers.length === 0 && (
            <div className="mt-10 text-center text-gray-500">
              No offers available.
            </div>
          )}
        </div>

        {/* Benefits */}
        <div className="mt-16 rounded-3xl bg-white p-8 shadow-lg">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Why Shop With Us?
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <ShoppingBag size={40} className="mx-auto text-red-600" />
              <h3 className="mt-4 text-xl font-semibold">Fresh Products</h3>
              <p className="mt-2 text-gray-600">
                Freshly cut meat delivered daily.
              </p>
            </div>

            <div className="text-center">
              <Ticket size={40} className="mx-auto text-red-600" />
              <h3 className="mt-4 text-xl font-semibold">Best Discounts</h3>
              <p className="mt-2 text-gray-600">
                Regular offers and festival deals.
              </p>
            </div>

            <div className="text-center">
              <Gift size={40} className="mx-auto text-red-600" />
              <h3 className="mt-4 text-xl font-semibold">Free Gifts</h3>
              <p className="mt-2 text-gray-600">
                Exciting free products on large orders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
