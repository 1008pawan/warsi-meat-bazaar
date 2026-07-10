import { ShieldCheck, Lock, Eye, User } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <section className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold">Privacy Policy</h1>

          <p className="mt-4 text-lg text-red-100">
            Your privacy is important to us. Learn how we collect, use, and
            protect your information.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <p className="mb-8 text-gray-600">
            Last Updated: June 2026
          </p>

          {/* Section 1 */}
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <User className="text-red-600" />
              <h2 className="text-2xl font-bold">
                Information We Collect
              </h2>
            </div>

            <p className="text-gray-600 leading-7">
              We may collect personal information such as your name, email
              address, phone number, delivery address, and payment-related
              information when you place an order, register an account, or
              contact us.
            </p>
          </div>

          {/* Section 2 */}
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <Eye className="text-red-600" />
              <h2 className="text-2xl font-bold">
                How We Use Your Information
              </h2>
            </div>

            <ul className="space-y-3 text-gray-600">
              <li>• Process and deliver your orders.</li>
              <li>• Improve our products and services.</li>
              <li>• Provide customer support.</li>
              <li>• Send order updates and promotional offers.</li>
              <li>• Ensure website security and fraud prevention.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <Lock className="text-red-600" />
              <h2 className="text-2xl font-bold">
                Data Security
              </h2>
            </div>

            <p className="text-gray-600 leading-7">
              We implement appropriate technical and organizational measures
              to protect your personal data from unauthorized access, misuse,
              loss, or disclosure.
            </p>
          </div>

          {/* Section 4 */}
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <ShieldCheck className="text-red-600" />
              <h2 className="text-2xl font-bold">
                Sharing of Information
              </h2>
            </div>

            <p className="text-gray-600 leading-7">
              We do not sell or rent your personal information to third
              parties. Information may be shared only with trusted service
              providers involved in payment processing, delivery, or legal
              compliance.
            </p>
          </div>

          {/* Section 5 */}
          <div className="mb-10">
            <h2 className="mb-4 text-2xl font-bold">
              Cookies & Tracking
            </h2>

            <p className="text-gray-600 leading-7">
              Our website may use cookies and similar technologies to improve
              user experience, analyze traffic, and personalize content.
            </p>
          </div>

          {/* Section 6 */}
          <div className="mb-10">
            <h2 className="mb-4 text-2xl font-bold">
              Your Rights
            </h2>

            <p className="text-gray-600 leading-7">
              You may request access, correction, or deletion of your personal
              information by contacting us. We will respond in accordance with
              applicable laws.
            </p>
          </div>

          {/* Contact */}
          <div className="rounded-2xl bg-red-50 p-6">
            <h2 className="mb-3 text-2xl font-bold text-red-600">
              Contact Us
            </h2>

            <p className="text-gray-600">
              If you have any questions regarding this Privacy Policy, please
              contact us:
            </p>

            <div className="mt-4 space-y-2 text-gray-700">
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