import chickenImg from "../../assets/images/home/category/chicken.jpeg";
import muttonImg from "../../assets/images/home/category/mutton.jpeg";
import fishImg from "../../assets/images/home/category/fish.jpeg";
import seafoodImg from "../../assets/images/home/category/seafoods.jpeg";
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Chicken",
    image: chickenImg,
    starting: "₹149/kg",
  },
  {
    id: 2,
    name: "Mutton",
    image: muttonImg,
    starting: "₹599/kg",
  },
  {
    id: 3,
    name: "Fish",
    image: fishImg,
    starting: "₹249/kg",
  },
  {
    id: 4,
    name: "Sea Food",
    image: seafoodImg,
    starting: "₹399/kg",
  },
];

export default function CategorySection() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-12 text-center">
          <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
            Shop By Category
          </span>

          <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Fresh Meat Categories
          </h2>

          <p className="mt-3 text-gray-600">
            Choose from our wide range of fresh and hygienically processed
            products.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((item) => (
            <div
              key={item.id}
              className="group cursor-pointer overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-48 w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-5 text-center">
                <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>

                <p className="mt-2 text-sm text-gray-500">Starting From</p>

                <p className="mt-1 font-semibold text-red-600">
                  {item.starting}
                </p>

                <Link to="/app">
                  <button className="mt-4 cursor-pointer rounded-full bg-red-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-700">
                    Shop Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
