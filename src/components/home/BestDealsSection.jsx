import chickenCurryCut from "../../assets/images/home/bestDeals/chicken_curry_cut.jpeg";
import chickenBreast from "../../assets/images/home/bestDeals/chicken_breast.png";
import mutton from "../../assets/images/home/bestDeals/mutton.jpeg";
import seafoods from "../../assets/images/home/bestDeals/seafoods.jpeg";
import { Link } from "react-router-dom";

const deals = [
  {
    id: 1,
    name: "Chicken Curry Cut",
    image: chickenCurryCut,
    price: 249,
    oldPrice: 299,
    off: "17% OFF",
    weight: "500g",
  },
  {
    id: 2,
    name: "Chicken Breast",
    image: chickenBreast,
    price: 299,
    oldPrice: 359,
    off: "20% OFF",
    weight: "500g",
  },
  {
    id: 3,
    name: "Fresh Mutton",
    image: mutton,
    price: 599,
    oldPrice: 699,
    off: "15% OFF",
    weight: "500g",
  },
  {
    id: 4,
    name: "Sea Food Mix",
    image: seafoods,
    price: 399,
    oldPrice: 499,
    off: "20% OFF",
    weight: "500g",
  },
];

export default function BestDealsSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-12 text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            🔥 Limited Time Offers
          </span>

          <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Today's Best Deals
          </h2>

          <p className="mt-3 text-gray-600">
            Grab fresh meat at the best prices before the offer ends.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {deals.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-3xl bg-white shadow-md transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-56 w-full object-cover"
                />

                <span className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
                  {item.off}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>

                <p className="mt-1 text-sm text-gray-500">
                  Pack Size: {item.weight}
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xl font-bold text-red-600">
                    ₹{item.price}
                  </span>

                  <span className="text-sm text-gray-400 line-through">
                    ₹{item.oldPrice}
                  </span>
                </div>

                <Link to="/app">
                  <button className="mt-5 w-full cursor-pointer rounded-full bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700">
                    Shop Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        {/* <div className="mt-10 text-center">
          <button className="rounded-full border-2 border-red-600 px-8 py-3 font-semibold text-red-600 transition hover:bg-red-600 hover:text-white">
            View All Deals
          </button>
        </div> */}
      </div>
    </section>
  );
}
