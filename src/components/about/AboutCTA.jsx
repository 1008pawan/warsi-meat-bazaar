import React from "react";
import { Link } from "react-router-dom";

const AboutCTA = () => {
  return (
    <div>
      {/* CTA */}
      <section className="bg-red-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold">Ready To Order Fresh Meat?</h2>

          <p className="mt-4 text-red-100">
            Experience premium quality meat delivered fresh to your doorstep.
          </p>

          <Link to="/app">
            <button className="mt-8 cursor-pointer rounded-full bg-yellow-400 px-8 py-3 font-semibold text-black transition hover:bg-yellow-300">
              Shop Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutCTA;
