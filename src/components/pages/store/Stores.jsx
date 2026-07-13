import { useEffect, useState } from "react";
import { MapPin, Phone, Star, Eye, MapPinIcon, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";
import api, { API_URL, STORAGE_URL } from "../../config/publicApi";

export default function StorePage() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStores = async () => {
      try {
        setLoading(true);
        const response = await api.get("/getstore");
        setStores(response.data?.data || []);
      } catch (error) {
        console.error("Store Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    getStores();
  }, []);

  const openDirections = (store) => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const origin = `${position.coords.latitude},${position.coords.longitude}`;
        const destination = `${store.latitude},${store.longitude}`;

        window.open(
          `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`,
          "_blank",
        );
      },
      () => {
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${store.latitude},${store.longitude}`,
          "_blank",
        );
      },
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading Stores...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src="https://demo2.techsseract.com/temptest/storage/banners/Ip8XRI1HYuwg73sClwcw4tQYMeKyg4m03nazcE7Q.png"
          alt="Store Banner"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute bottom-8 left-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold">Warsi Meat Bazaar</h1>

          {/* <p className="mt-2 flex items-center gap-2">
            <MapPin size={18} />
            Aliganj, Lucknow
          </p> */}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Our Stores</h1>

          <p className="mt-2 text-gray-600">
            Choose your nearest Warsi Meat Bazaar store
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stores.map((store) => (
            <div
              key={store.id}
              className="overflow-hidden rounded-3xl bg-white shadow-lg transition hover:shadow-xl"
            >
              {/* Banner */}
              <div className="relative h-52">
                <img
                  src={
                    store.banner
                      ? `${STORAGE_URL}${store.banner}`
                      : "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200"
                  }
                  alt={store.name}
                  className="h-full w-full object-cover"
                />

                <span
                  className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white ${
                    store.store_status === "open"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {store.store_status}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      store.logo
                        ? `${STORAGE_URL}${store.logo}`
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            store.name,
                          )}&background=dc2626&color=fff`
                    }
                    alt={store.name}
                    className="h-14 w-14 rounded-full border border-zinc-400 object-cover"
                  />

                  <div>
                    <h3 className="text-xl font-bold">{store.name}</h3>

                    <p className="text-sm text-gray-500">
                      {store.city}, {store.state}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {store.address}
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    {store.phone}
                  </div>

                  <div className="flex items-center gap-2">
                    <Star
                      size={16}
                      className="text-yellow-500"
                      fill="currentColor"
                    />
                    {store.rating || "0.0"} ({store.total_reviews || 0} Reviews)
                  </div>
                </div>

                <div className="mt-5 flex gap-3">
                  <a
                    href={`tel:${store.phone}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full border border-red-600 py-3 text-center font-semibold text-red-600"
                  >
                    <PhoneCall size={18} />
                    Call
                  </a>

                  <button
                    onClick={() => openDirections(store)}
                    className="flex flex-1 items-center justify-center gap-2 cursor-pointer rounded-full bg-red-600 py-3 font-semibold text-white"
                  >
                    <MapPinIcon size={18} />
                    Directions
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!loading && stores.length === 0 && (
          <div className="mt-10 text-center text-gray-500">
            No stores found.
          </div>
        )}
      </div>
    </section>
  );
}
