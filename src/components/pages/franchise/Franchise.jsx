import {
  Building2,
  TrendingUp,
  ShieldCheck,
  Users,
  Store,
  IndianRupee,
  CheckCircle,
  Phone,
  Rocket,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function FranchisePage() {
  const supports = [
    "Store Design & Setup Assistance",
    "Staff Recruitment & Training",
    "Business Operations Training",
    "Procurement & Supply Support",
    "Marketing & Advertising Assistance",
    "Social Media & Digital Marketing Support",
    "Sales Growth Strategies",
    "Ongoing Business Development Support",
    "Expansion Planning for Multiple Outlets",
  ];

  const products = [
    "Fresh Chicken",
    "Premium Mutton",
    "Fresh Fish",
    "Prawns & Seafood",
    "Turkey",
    "Quail",
    "Kadaknath Chicken",
    "Exotic Meat Products",
    "Ready-to-Cook Products",
    "Value-Added Premium Meat Products",
  ];

  const Financial = [
    "Strong Repeat Customer Base",
    "Daily Revenue Generation",
    "Premium Product Margins",
    "Brand Recognition Advantage",
    "Structured Business Model",
    "High Local Market Demand",
    "Scalable Multi-Store Opportunity",
    "Long-Term Business Sustainability",
  ];

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
            FRANCHISE OPPORTUNITY
          </span>

          <h1 className="mt-6 text-4xl font-bold md:text-6xl">
            Join India's Fastest Growing Premium Meat Retail Brand
          </h1>

          <p className="mx-auto mt-6 max-w-4xl text-lg text-red-100 md:text-center text-justify">
            Build Your Own Profitable Business with Warsi Meat Bazaar and turn
            your entrepreneurial dream into reality with a trusted brand.
          </p>

          <div className="flex justify-center items-center md:gap-6 gap-3">
            <a
              href="tel:+918400222227"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white md:px-8 px-4 md:py-4 py-2 font-semibold text-red-600 transition hover:scale-105"
            >
              <div>
                <Phone size={18} />
              </div>
              Contact Us
            </a>

            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white md:px-8 px-4 md:py-4 py-2 font-semibold text-red-600 transition hover:scale-105"
            >
              <div>
                <Phone size={18} />
              </div>
              Apply For Franchise
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Intro */}
        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <h2 className="text-3xl font-bold">
            Build Your Own Profitable Business
          </h2>

          <p className="mt-4 text-gray-600 leading-8 md:text-center text-justify">
            Warsi Meat Bazaar is one of India's emerging premium meat retail
            brands, known for delivering freshness, quality, hygiene and
            customer satisfaction. With a rapidly growing customer base and
            increasing demand for premium meat products, we are expanding
            through franchise partnerships across India. This is your
            opportunity to own and operate a profitable business backed by a
            strong brand, proven business model, and complete operational
            support.
          </p>
        </div>

        {/* Why Choose */}
        <div className="mt-14">
          <h2 className="mb-8 text-center text-4xl font-bold">
            Why Investors Choose Warsi Meat Bazaar
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-8 hover:shadow-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]">
              <ShieldCheck className="text-red-600" size={45} />
              <h3 className="mt-4 text-xl font-bold">Proven & Trusted Brand</h3>
              <p className="mt-3 text-gray-600 md:text-center text-justify">
                Customers trust us for premium quality products, hygienic
                processing and exceptional service.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 hover:shadow-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]">
              <Users className="text-red-600" size={45} />
              <h3 className="mt-4 text-xl font-bold">High Demand Industry</h3>
              <p className="mt-3 text-gray-600 md:text-center text-justify">
                Fresh meat is a daily consumption product with repeat purchases
                throughout the year, creating consistent revenue opportunities
                and long-term business stability.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 hover:shadow-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]">
              <TrendingUp className="text-red-600" size={45} />
              <h3 className="mt-4 text-xl font-bold">Fast Growing Market</h3>
              <p className="mt-3 text-gray-600 md:text-center text-justify">
                India's premium meat retail sector is growing rapidly with
                increasing consumer demand.
              </p>
            </div>
          </div>
        </div>

        {/* Product Range */}
        <div className="mt-16 rounded-3xl bg-white p-8 shadow-lg">
          <h2 className="mb-8 text-3xl font-bold text-center">
            Premium Product Range
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-2xl border border-zinc-300 p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]"
              >
                <CheckCircle className="text-green-600" size={20} />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Support */}
        <div className="mt-16">
          <h2 className="mb-3 text-center text-4xl font-bold">
            Complete Franchise Support
          </h2>
          <p className="text-zinc-600 text-center mb-5">
            Starting a business becomes easier when you have an experienced team
            supporting you.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {supports.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-red-200 hover:shadow-2xl"
              >
                <CheckCircle className="text-green-600" size={20} />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Investment */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-red-600 to-red-700 p-10 text-white">
          <h2 className="text-center text-4xl font-bold">Investment Details</h2>

          <p className="mt-3 text-center text-red-100">
            Affordable Entry into a High-Potential Industry
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur">
              <IndianRupee size={40} className="mx-auto" />
              <h3 className="mt-3 text-3xl font-bold">₹7,00,000</h3>
              <p className="text-red-100">Franchise Fee</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur">
              <Store size={40} className="mx-auto" />
              <h3 className="mt-3 text-3xl font-bold">150–200</h3>
              <p className="text-red-100">Sq. Ft. Store Area Required</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur">
              <Building2 size={40} className="mx-auto" />
              <h3 className="mt-3 text-3xl font-bold">Retail</h3>
              <p className="text-red-100">Meat Store Business Model</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur">
              <TrendingUp size={40} className="mx-auto" />
              <h3 className="mt-3 text-3xl font-bold">Low</h3>
              <p className="text-red-100">Operational Complexity</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur">
              <Users size={40} className="mx-auto" />
              <h3 className="mt-3 text-3xl font-bold">High</h3>
              <p className="text-red-100">Customer Retention Potential</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur">
              <Rocket size={40} className="mx-auto" />
              <h3 className="mt-3 text-3xl font-bold">Excellent</h3>
              <p className="text-red-100">Growth Opportunity</p>
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-3xl bg-white p-8 shadow-lg">
          <h2 className="mb-8 text-center text-4xl font-bold text-gray-900">
            Why This Franchise Makes Financial Sense
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {Financial.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-5 transition hover:border-red-200 hover:bg-red-50"
              >
                <CheckCircle size={24} className="shrink-0 text-green-600" />

                <span className="font-medium text-gray-800">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-16 rounded-3xl bg-white p-8 shadow-lg">
          <h2 className="mb-8 text-center text-4xl font-bold">
            Our Core Values
          </h2>

          <div className="grid gap-6 md:grid-cols-4">
            <div className="text-center">
              <h3 className="font-bold text-red-600 text-xl">Quality</h3>
              <p className="mt-2 text-gray-600">
                Only the freshest and highest-quality products reach our
                customers.
              </p>
            </div>

            <div className="text-center">
              <h3 className="font-bold text-red-600 text-xl">Trust</h3>
              <p className="mt-2 text-gray-600">
                We build long-term relationships through honesty, transparency,
                and consistency.
              </p>
            </div>

            <div className="text-center">
              <h3 className="font-bold text-red-600 text-xl">Service</h3>
              <p className="mt-2 text-gray-600">
                Customer satisfaction remains our highest priority.
              </p>
            </div>

            <div className="text-center">
              <h3 className="font-bold text-red-600 text-xl">Innovation</h3>
              <p className="mt-2 text-gray-600">
                We continuously improve our products, systems, and customer
                experience.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-3xl bg-white shadow-xl p-10 text-center text-white">
          <h2 className="text-4xl text-black font-bold">
            Start Your Business Journey Today
          </h2>

          <p className="mt-6 text-xl font-semibold text-zinc-500">
            Join a brand that is redefining the meat retail industry in India.
          </p>

          <p className="mx-auto mt-4 max-w-3xl text-gray-600">
            Become a Warsi Meat Bazaar Franchise Partner and build a successful,
            profitable, and sustainable business backed by a trusted brand and
            complete support system.
          </p>

          <div className="border-t border-white/20 pt-8">
            <h3 className="text-3xl font-bold text-red-500">
              Warsi Meat Bazaar
            </h3>

            <p className="mt-2 text-xl italic text-gray-300">
              "Freshness • Quality • Trust"
            </p>

            <p className="mt-4 text-2xl font-semibold text-yellow-400">
              Your Success Is Our Commitment.
            </p>
          </div>

          <div className="mt-8 rounded-2xl bg-red-600/5 p-5">
            <p className="text-lg font-semibold text-red-600">
              Limited Franchise Opportunities Available.
            </p>

            <p className="mt-2 text-gray-600">
              Apply Today Before Your Area Gets Reserved.
            </p>
          </div>

          <Link
            to="/contact"
            className="mt-8 inline-block rounded-full bg-red-600 px-10 py-4 font-semibold text-white hover:bg-red-700"
          >
            Apply Today
          </Link>
        </div>
      </div>
    </section>
  );
}
