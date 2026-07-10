import React from "react";

const AboutHero = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold md:text-6xl">
            About Warsi Meat Bazaar
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-red-100">
            Delivering fresh, hygienic and premium quality meat to families with
            trust, quality and convenience.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutHero;
