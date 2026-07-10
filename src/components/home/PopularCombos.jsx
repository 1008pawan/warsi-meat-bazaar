import { ShoppingCart } from "lucide-react";

import familyPack from "../../assets/images/home/popularCombos/familypack.png";
import weekendPack from "../../assets/images/home/popularCombos/weekend.png";
import seafoodPack from "../../assets/images/home/popularCombos/seafoods.jpeg";
import { Link } from "react-router-dom";

const combos = [
  {
    id: 1,
    title: "Family Chicken Pack",
    image: familyPack,
    items: ["1kg Chicken Curry Cut", "12 Farm Fresh Eggs", "Free Masala Pack"],
    price: 799,
    oldPrice: 999,
  },
  {
    id: 2,
    title: "Weekend BBQ Pack",
    image: weekendPack,
    items: ["1kg Chicken Wings", "500g Boneless Chicken", "BBQ Marinade"],
    price: 999,
    oldPrice: 1199,
  },
  {
    id: 3,
    title: "Sea Food Special",
    image: seafoodPack,
    items: ["500g Prawns", "500g Fish Fillet", "Seafood Seasoning"],
    price: 1199,
    oldPrice: 1399,
  },
];

export default function PopularCombos() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-12 text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            🔥 Special Combo Offers
          </span>

          <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Popular Combo Packs
          </h2>

          <p className="mt-3 text-gray-600">
            Save more with our specially curated combo packs.
          </p>
        </div>

        {/* Combo Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {combos.map((combo) => (
            <div
              key={combo.id}
              className="overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <img
                src={combo.image}
                alt={combo.title}
                className="h-64 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {combo.title}
                </h3>

                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  {combo.items.map((item, index) => (
                    <li key={index}>✓ {item}</li>
                  ))}
                </ul>

                <div className="mt-5 flex items-center gap-3">
                  <span className="text-2xl font-bold text-red-600">
                    ₹{combo.price}
                  </span>

                  <span className="text-gray-400 line-through">
                    ₹{combo.oldPrice}
                  </span>
                </div>

                <Link to="/app">
                  <button className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700">
                    {/* <ShoppingCart size={18} /> */}
                    Shop Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Offer Banner */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-red-600 to-red-700 p-8 text-center text-white">
          <h3 className="text-2xl font-bold">
            🎉 Get Up To 25% OFF On Combo Packs
          </h3>

          <p className="mt-2 text-red-100">
            Perfect for families, parties and weekend gatherings.
          </p>
        </div>
      </div>
    </section>
  );
}
