import {
  MapPin,
  Clock,
  Truck,
  Star,
  Heart,
  MapIcon,
  Map,
  Bike,
  BikeIcon,
  Gift,
  ArrowBigRight,
  ArrowBigLeft,
} from "lucide-react";
import image from "../../assets/images/home/serviceAreas/image.png";
import { Phone, Eye } from "lucide-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";

const BASE_URL = "https://demo2.techsseract.com/temptest/storage/";

export default function DeliveryAreas() {
  const scrollRef = useRef(null);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://demo2.techsseract.com/temptest/index.php/api/getstore")
      .then((res) => res.json())
      .then((data) => {
        setStores(data?.data || []);
      })
      .catch((err) => {
        console.log("Store Fetch Error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -700,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 700,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading Stores...
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-12 text-center">
          <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
            📍 Delivery Locations
          </span>

          <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
            We Deliver Near You
          </h2>

          <p className="mt-3 text-gray-600">
            Fresh chicken, mutton and seafood delivered across multiple areas.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid gap-8 lg:grid-cols-2 grid-cols-1">
          {/* Left Side */}
          <div className="rounded-3xl bg-white p-5 shadow-sm relative">
            <h3 className="mb-3 text-2xl font-bold text-gray-900">
              Service Areas
            </h3>

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-2"
            >
              {stores.map((store, index) => (
                // <div className="overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100">
                <div
                  key={store.id}
                  className="min-w-[90%] sm:min-w-[48%] lg:min-w-[48%] shrink-0 overflow-hidden rounded-3xl bg-white shadow-lg transition hover:shadow-xl"
                >
                  {/* Banner */}
                  <div className="relative h-52">
                    <img
                      src={
                        store.banner
                          ? `${BASE_URL}${store.banner}`
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
                            ? `${BASE_URL}${store.logo}`
                            : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                store.name,
                              )}&background=dc2626&color=fff`
                        }
                        alt={store.name}
                        className="h-14 w-14 rounded-full border object-cover"
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
                        {store.rating || "0.0"} ({store.total_reviews || 0}{" "}
                        Reviews)
                      </div>
                    </div>

                    <div className="mt-5 flex gap-3">
                      <a
                        href={`tel:${store.phone}`}
                        className="flex-1 rounded-full border border-red-600 py-3 text-center font-semibold text-red-600"
                      >
                        Call
                      </a>

                      {/* <Link
                        to={`/store/${store.slug}`}
                        className="flex items-center justify-center gap-2 rounded-full bg-red-600 py-3 px-5 font-semibold text-white"
                      >
                        <Eye size={18} />
                        View Store
                      </Link> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={scrollLeft}
              className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white shadow-lg cursor-pointer"
            >
              <ArrowBigLeft size={20} />
            </button>

            <button
              onClick={scrollRight}
              className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white shadow-lg cursor-pointer"
            >
              <ArrowBigRight size={20} />
            </button>
          </div>

          {/* Right Side */}
          <div className="rounded-3xl bg-red-600 p-8 text-white">
            <h3 className="text-3xl font-bold">Fast & Fresh Delivery</h3>

            <p className="mt-4 text-red-100">
              We maintain a strict cold-chain process to ensure that your meat
              reaches you fresh and hygienically packed.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-center gap-4">
                <Truck size={28} />
                <span>Free Delivery On Orders Above ₹499</span>
              </div>

              <div className="flex items-center gap-4">
                <Clock size={28} />
                <span>Average Delivery Time: 30-60 Minutes</span>
              </div>

              <div className="flex items-center gap-4">
                <MapPin size={28} />
                <span>Expanding To More Cities Soon</span>
              </div>
            </div>

            <Link to="/stores">
              <button className="mt-8 rounded-full cursor-pointer bg-white px-8 py-3 font-semibold text-red-600 transition hover:scale-105">
                Check Availability
              </button>
            </Link>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 text-center shadow-md">
            <h3 className="text-3xl font-bold text-red-600">10+</h3>
            <p className="mt-2 text-gray-600">Cities Covered</p>
          </div>

          <div className="rounded-3xl bg-white p-6 text-center shadow-md">
            <h3 className="text-3xl font-bold text-red-600">45-60 Min</h3>
            <p className="mt-2 text-gray-600">Fastest Delivery</p>
          </div>

          <div className="rounded-3xl bg-white p-6 text-center shadow-md">
            <h3 className="text-3xl font-bold text-red-600">100%</h3>
            <p className="mt-2 text-gray-600">Fresh Guarantee</p>
          </div>
        </div>
      </div>
    </section>
  );
}
