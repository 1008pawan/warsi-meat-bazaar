import {
  FileText,
  ShoppingCart,
  CreditCard,
  Truck,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

export default function TermsConditionsPage() {
  return (
    <section className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold">Terms & Conditions</h1>

          <p className="mt-4 text-lg text-red-100">
            Please read these terms carefully before using Warsi Meat Bazaar.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <p className="mb-8 text-gray-600">Last Updated: June 2026</p>

          {/* Acceptance */}
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <FileText className="text-red-600" />
              <h2 className="text-2xl font-bold">Acceptance of Terms</h2>
            </div>

            <p className="leading-7 text-gray-600">
              By accessing or using Warsi Meat Bazaar, you agree to comply with
              and be bound by these Terms & Conditions. If you do not agree with
              any part of these terms, please do not use our website or
              services.
            </p>
          </div>

          {/* Orders */}
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <ShoppingCart className="text-red-600" />
              <h2 className="text-2xl font-bold">Orders & Purchases</h2>
            </div>

            <ul className="space-y-3 text-gray-600">
              <li>• All orders are subject to product availability.</li>
              <li>• Prices may change without prior notice.</li>
              <li>• We reserve the right to refuse or cancel any order.</li>
              <li>• Customers must provide accurate delivery details.</li>
            </ul>
          </div>

          {/* Payments */}
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <CreditCard className="text-red-600" />
              <h2 className="text-2xl font-bold">Payments & Refunds</h2>
            </div>

            <p className="leading-7 text-gray-600">
              Payments can be made through available online payment methods or
              Cash on Delivery (where applicable). Refunds will be processed
              according to our Refund Policy and only for eligible cases.
            </p>
          </div>

          {/* Delivery */}
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <Truck className="text-red-600" />
              <h2 className="text-2xl font-bold">Delivery Policy</h2>
            </div>

            <ul className="space-y-3 text-gray-600">
              <li>• Delivery times are estimates and may vary.</li>
              <li>
                • Delays due to weather, traffic, or unforeseen events may
                occur.
              </li>
              <li>• Customers should be available at the delivery location.</li>
              <li>• Incorrect addresses may result in delivery failure.</li>
            </ul>
          </div>

          {/* Product Quality */}
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <ShieldCheck className="text-red-600" />
              <h2 className="text-2xl font-bold">Product Quality & Safety</h2>
            </div>

            <p className="leading-7 text-gray-600">
              We maintain strict hygiene and quality standards. Customers should
              inspect products upon delivery and report any issues immediately
              to our support team.
            </p>
          </div>

          {/* Liability */}
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <AlertCircle className="text-red-600" />
              <h2 className="text-2xl font-bold">Limitation of Liability</h2>
            </div>

            <p className="leading-7 text-gray-600">
              Warsi Meat Bazaar shall not be liable for any indirect,
              incidental, or consequential damages arising from the use of our
              services, products, or website.
            </p>
          </div>

          {/* Changes */}
          <div className="mb-10">
            <h2 className="mb-4 text-2xl font-bold">Changes to Terms</h2>

            <p className="leading-7 text-gray-600">
              We reserve the right to update these Terms & Conditions at any
              time. Continued use of our services after changes are posted
              constitutes acceptance of the revised terms.
            </p>
          </div>

          {/* Contact */}
          <div className="rounded-2xl bg-red-50 p-6">
            <h2 className="mb-3 text-2xl font-bold text-red-600">
              Contact Information
            </h2>

            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Warsi Meat Bazaar</strong>
              </p>
              <p>Email: info@warsimeatbazaar.com</p>
              <p>Phone: +91 84002 22227</p>
              <p>
                Address: Warsi Road, Ujariyaon, Vijay Khand 2, Gomti Nagar,
                Lucknow, Uttar Pradesh 226010
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
