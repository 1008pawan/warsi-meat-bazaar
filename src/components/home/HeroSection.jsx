import heroimg from "../../assets/images/home/heroimg/hero_img.jpeg";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-red-50 to-yellow-50">
      <div className="container mx-auto px-4 py-10">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <span className="inline-flex rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
              🔥 Fresh Meat Delivered Daily
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-6xl">
              Fresh Meat <br />
              <span className="text-red-600">Delivered To Your Door</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600">
              Premium quality chicken, mutton, fish and eggs delivered fresh
              from Warsi Meat Bazaar.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/app">
                <button className="rounded-full bg-red-600 px-8 py-3 font-semibold text-white transition hover:bg-red-700 cursor-pointer">
                  Order Now
                </button>
              </Link>

              <Link to="/offers">
                <button className="rounded-full border-2 border-red-600 px-8 py-3 font-semibold text-red-600 transition hover:bg-red-50 cursor-pointer">
                  View Offers
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-10 flex gap-8">
              <div>
                <h3 className="text-2xl font-bold text-red-600">5000+</h3>
                <p className="text-sm text-gray-500">Happy Customers</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-red-600">100%</h3>
                <p className="text-sm text-gray-500">Fresh Meat</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-red-600">45-60 Min</h3>
                <p className="text-sm text-gray-500">Fast Delivery</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="absolute -top-4 right-4 rounded-full bg-yellow-400 px-5 py-2 font-bold text-black shadow-lg">
              Fresh
            </div>

            <img
              src={heroimg}
              alt="Fresh Chicken"
              className="h-[500px] w-full rounded-3xl object-cover shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
