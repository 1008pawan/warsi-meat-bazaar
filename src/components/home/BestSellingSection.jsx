import { ShoppingCart, Star } from "lucide-react";
import chickenCurryCut from "../../assets/images/home/bestSelling/chickenCurryCut.jpg";
import chickenBreast from "../../assets/images/home/bestSelling/breast.jpg";
import mutton from "../../assets/images/home/bestSelling/mutton.jpeg";
import seafoodMix from "../../assets/images/home/bestSelling/seafoods.jpeg";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Chicken Curry Cut",
    image: chickenCurryCut,
    weight: "500g",
    price: 249,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Chicken Breast Boneless",
    image: chickenBreast,
    weight: "500g",
    price: 299,
    rating: 4.9,
  },
  {
    id: 3,
    name: "Fresh Mutton",
    image: mutton,
    weight: "500g",
    price: 599,
    rating: 4.7,
  },
  {
    id: 4,
    name: "Sea Food Mix",
    image: seafoodMix,
    weight: "500g",
    price: 399,
    rating: 4.8,
  },
];

export default function BestSellingSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold">
            ⭐ Customer Favorites
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
            Best Selling Products
          </h2>

          <p className="mt-3 text-gray-600">
            Most loved products by our customers.
          </p>
        </div>

        {/* Products */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-60 w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-700 flex items-center gap-1">
                    <Star size={12} fill="currentColor" />
                    {product.rating}
                  </span>

                  <span className="text-sm text-gray-500">
                    {product.weight}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-bold text-gray-900">
                  {product.name}
                </h3>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-bold text-red-600">
                    ₹{product.price}
                  </span>

                  <Link to="/app">
                    <button className="flex items-center gap-2 cursor-pointer rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700">
                      {/* <ShoppingCart size={16} /> */}
                      Shop Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        {/* <div className="mt-10 text-center">
          <button className="rounded-full border-2 border-red-600 px-8 py-3 font-semibold text-red-600 transition hover:bg-red-600 hover:text-white">
            View All Products
          </button>
        </div> */}
      </div>
    </section>
  );
}
