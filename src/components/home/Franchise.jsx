import { Store, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function FranchiseSection() {
  return (
    <section className="pt-16 bg-gradient-to-r from-red-600 to-red-700">
      <div className="container mx-auto px-4">
        <div className="rounded-3xl bg-white p-8 md:p-12 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="inline-block rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
                🚀 Business Opportunity
              </span>

              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
                Own a Warsi Meat Bazaar Franchise
              </h2>

              <p className="mt-4 text-gray-600 max-w-2xl">
                Join India's growing fresh meat retail network. Start your own
                Warsi Meat Bazaar franchise and build a profitable business with
                our trusted brand and operational support.
              </p>
            </div>

            <Link
              to="/franchise"
              className="flex items-center gap-2 rounded-full bg-red-600 px-8 py-4 font-semibold text-white hover:bg-red-700 transition"
            >
              Apply Now
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
