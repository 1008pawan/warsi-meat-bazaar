import React from "react";
import aboutHero from "../../assets/images/about/about.jfif"

const AboutStory = () => {
  return (
    <div>
      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <img
                src={aboutHero}
                alt="Fresh Meat"
                className="rounded-3xl shadow-xl"
              />
            </div>

            <div>
              <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
                Our Story
              </span>

              <h2 className="mt-5 text-4xl font-bold text-gray-900">
                Bringing Freshness To Every Home
              </h2>

              <p className="mt-6 text-gray-600">
                Warsi Meat Bazaar was founded with a simple vision: provide
                customers with fresh, hygienically processed meat delivered
                directly to their homes.
              </p>

              <p className="mt-4 text-gray-600">
                We carefully select our products, maintain strict quality
                standards, and ensure every order reaches you fresh and ready to
                cook.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutStory;
