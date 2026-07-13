import {
  Truck,
  Clock,
  RefreshCcw,
  ShieldCheck,
  Package,
  AlertCircle,
} from "lucide-react";

export default function ShippingRefundPage() {
  return (
    <section className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold">Shipping & Refund Policy</h1>

          <p className="mt-4 text-lg text-red-100">
            Learn about our delivery process, shipping timelines, and refund
            policy.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <p className="mb-8 text-gray-600">Last Updated: June 2026</p>

          {/* Shipping Policy */}
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <Truck className="text-red-600" />
              <h2 className="text-2xl font-bold">Shipping Policy</h2>
            </div>

            <p className="leading-7 text-gray-600">
              Warsi Meat Bazaar delivers fresh chicken, mutton, fish, eggs, and
              related products across selected service areas. Delivery
              availability depends on your location.
            </p>
          </div>

          {/* Delivery Time */}
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <Clock className="text-red-600" />
              <h2 className="text-2xl font-bold">Delivery Timeline</h2>
            </div>

            <ul className="space-y-3 text-gray-600">
              <li>• Standard delivery time: 30-60 minutes.</li>
              <li>• Delivery time may vary based on location and traffic.</li>
              <li>• Peak hours and festivals may cause delays.</li>
              <li>• Customers will receive updates regarding their orders.</li>
            </ul>
          </div>

          {/* Shipping Charges */}
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <Package className="text-red-600" />
              <h2 className="text-2xl font-bold">Shipping Charges</h2>
            </div>

            <ul className="space-y-3 text-gray-600">
              <li>• Free delivery on eligible orders.</li>
              <li>• Delivery charges may apply based on distance.</li>
              <li>• Applicable charges will be shown during checkout.</li>
            </ul>
          </div>

          {/* Refund Policy */}
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <RefreshCcw className="text-red-600" />
              <h2 className="text-2xl font-bold">Refund Policy</h2>
            </div>

            <p className="leading-7 text-gray-600">
              Due to the perishable nature of fresh meat and food products,
              refunds are only available in specific circumstances.
            </p>

            <ul className="mt-4 space-y-3 text-gray-600">
              <li>• Wrong item delivered.</li>
              <li>• Damaged or spoiled product received.</li>
              <li>• Missing items from the order.</li>
              <li>• Order cancelled by Warsi Meat Bazaar.</li>
            </ul>
          </div>

          {/* Non Refundable */}
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <AlertCircle className="text-red-600" />
              <h2 className="text-2xl font-bold">Non-Refundable Cases</h2>
            </div>

            <ul className="space-y-3 text-gray-600">
              <li>• Customer provides incorrect address.</li>
              <li>• Customer unavailable during delivery.</li>
              <li>• Product already consumed or partially used.</li>
              <li>• Change of mind after successful delivery.</li>
            </ul>
          </div>

          {/* Quality Assurance */}
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <ShieldCheck className="text-red-600" />
              <h2 className="text-2xl font-bold">Quality Assurance</h2>
            </div>

            <p className="leading-7 text-gray-600">
              We follow strict hygiene and cold-chain processes to ensure
              freshness and product quality. If you experience any issue, please
              contact our support team immediately.
            </p>
          </div>

          {/* Contact */}
          <div className="rounded-2xl bg-red-50 p-6">
            <h2 className="mb-3 text-2xl font-bold text-red-600">Need Help?</h2>

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
