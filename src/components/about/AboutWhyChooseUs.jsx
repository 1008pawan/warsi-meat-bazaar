import { Award, ShieldCheck, Truck, Users } from "lucide-react";
import React from "react";
const features = [
  {
    icon: <ShieldCheck size={32} />,
    title: "100% Fresh Meat",
    desc: "We source premium quality meat and ensure hygienic processing before delivery.",
  },
  {
    icon: <Truck size={32} />,
    title: "Fast Delivery",
    desc: "Fresh meat delivered to your doorstep within the shortest possible time.",
  },
  {
    icon: <Award size={32} />,
    title: "Quality Assured",
    desc: "Every order is carefully inspected to maintain our quality standards.",
  },
  {
    icon: <Users size={32} />,
    title: "Trusted By Families",
    desc: "Thousands of customers trust Warsi Meat Bazaar for their daily meat needs.",
  },
];

const AboutWhyChooseUs = () => {
  return (
    <div>
      {/* Why Choose Us */}
      <section className="bg-red-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-14 text-center">
            <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
              Why Choose Us
            </span>

            <h2 className="mt-4 text-4xl font-bold">Freshness You Can Trust</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((item, index) => (
              <div
                key={index}
                className="rounded-3xl bg-white p-8 text-center shadow-sm hover:shadow-xl"
              >
                <div className="mb-4 flex justify-center text-red-600">
                  {item.icon}
                </div>

                <h3 className="mb-3 text-xl font-bold">{item.title}</h3>

                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutWhyChooseUs;
