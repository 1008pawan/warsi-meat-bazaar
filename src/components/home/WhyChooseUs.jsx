import { Truck, ShieldCheck, Clock3, BadgeCheck } from "lucide-react";

const features = [
  {
    id: 1,
    icon: <Truck size={40} />,
    title: "Fast Delivery",
    description:
      "Get fresh meat delivered to your doorstep within 45-60 minutes.",
  },
  {
    id: 2,
    icon: <ShieldCheck size={40} />,
    title: "100% Fresh Meat",
    description:
      "Daily sourced and hygienically processed to ensure premium quality.",
  },
  {
    id: 3,
    icon: <Clock3 size={40} />,
    title: "Same Day Processing",
    description: "Freshly cut and packed only after your order is placed.",
  },
  {
    id: 4,
    icon: <BadgeCheck size={40} />,
    title: "Quality Guaranteed",
    description:
      "Strict quality checks and cold-chain maintenance for every order.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-red-50 py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
            Why Choose Us
          </span>

          <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Why Choose Warsi Meat Bazaar?
          </h2>

          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            We bring you the freshest meat, fastest delivery and best quality
            standards so that every meal is delicious and healthy.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-white p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 rounded-3xl bg-red-600 p-8 text-center text-white">
          <h3 className="text-2xl font-bold">Freshness You Can Trust</h3>

          <p className="mt-2 text-red-100">
            Premium quality chicken, mutton and seafood delivered fresh every
            day.
          </p>
        </div>
      </div>
    </section>
  );
}
