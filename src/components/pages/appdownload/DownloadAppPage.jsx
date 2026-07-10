import { Smartphone, Download, Star, ShieldCheck, Truck } from "lucide-react";
import { FaGooglePlay, FaApple } from "react-icons/fa";
import app from "../../../assets/images/appimg/app.png";
import { Link } from "react-router-dom";

const handleDownload = () => {
  const link = document.createElement("a");
  link.href = "/app/customer/app-release.apk";
  link.download = "app-release.apk";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function DownloadAppPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      <div className="container mx-auto px-4 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
              📱 Mobile App
            </span>

            <h1 className="mt-6 text-5xl font-bold text-gray-900 leading-tight">
              Download The
              <span className="block text-red-600">Warsi Meat Bazaar App</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600">
              Order fresh chicken, mutton, fish and eggs directly from your
              mobile. Enjoy lightning fast delivery, exclusive discounts and
              live order tracking.
            </p>

            {/* Features */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <Truck className="text-red-600" />
                <span>Fast Delivery Within 30-60 Minutes</span>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck className="text-red-600" />
                <span>100% Fresh & Hygienic Packaging</span>
              </div>

              <div className="flex items-center gap-3">
                <Star className="text-red-600" />
                <span>Exclusive App-Only Offers & Rewards</span>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={handleDownload}
                className="flex items-center cursor-pointer gap-3 rounded-2xl bg-black px-4 py-4 text-white transition hover:scale-105"
              >
                <FaGooglePlay size={28} />
                <div>
                  <p className="text-xs">GET IT ON</p>
                  <h4 className="font-semibold">APK</h4>
                </div>
              </button>

              {/* <Link
                to="#"
                className="flex items-center gap-3 rounded-2xl bg-black px-4 py-4 text-white transition hover:scale-105"
              >
                <FaGooglePlay size={28} />
                <div>
                  <p className="text-xs">GET IT ON</p>
                  <h4 className="font-semibold">Google Play</h4>
                </div>
              </Link>

              <Link
                to="#"
                className="flex items-center gap-3 rounded-2xl bg-black px-4 py-4 text-white transition hover:scale-105"
              >
                <FaApple size={28} />
                <div>
                  <p className="text-xs">Download on the</p>
                  <h4 className="font-semibold">App Store</h4>
                </div>
              </Link> */}
            </div>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap gap-8">
              <div>
                <h3 className="text-3xl font-bold text-red-600">10K+</h3>
                <p className="text-gray-600">Downloads</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-red-600">4.8★</h3>
                <p className="text-gray-600">User Rating</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-red-600">50K+</h3>
                <p className="text-gray-600">Orders Delivered</p>
              </div>
            </div>
          </div>

          {/* Right Mobile Mockup */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="h-[650px] w-[320px] rounded-[50px] border-[10px] border-black bg-white shadow-2xl overflow-hidden">
                <img
                  src={app}
                  alt="App Preview"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -left-8 top-20 rounded-2xl bg-white p-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <Download className="text-green-600" />
                  <div>
                    <h4 className="font-bold">10K+</h4>
                    <p className="text-sm text-gray-500">Downloads</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-8 bottom-20 rounded-2xl bg-white p-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <Smartphone className="text-red-600" />
                  <div>
                    <h4 className="font-bold">4.8★</h4>
                    <p className="text-sm text-gray-500">Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Partner App */}
        <div className="container mx-auto px-4 py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left Content */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="h-[650px] w-[320px] rounded-[50px] border-[10px] border-black bg-white shadow-2xl overflow-hidden">
                  <img
                    src={app}
                    alt="App Preview"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Floating Badge */}
                <div className="absolute -left-8 top-20 rounded-2xl bg-white p-4 shadow-xl">
                  <div className="flex items-center gap-2">
                    <Download className="text-green-600" />
                    <div>
                      <h4 className="font-bold">10K+</h4>
                      <p className="text-sm text-gray-500">Downloads</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-8 bottom-20 rounded-2xl bg-white p-4 shadow-xl">
                  <div className="flex items-center gap-2">
                    <Smartphone className="text-red-600" />
                    <div>
                      <h4 className="font-bold">4.8★</h4>
                      <p className="text-sm text-gray-500">Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Mobile Mockup */}
            <div className="text-right">
              <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
                🛵 Delivery Partner App
              </span>

              <h1 className="mt-6 text-5xl font-bold leading-tight text-gray-900">
                Download The
                <span className="block text-red-600">
                  Warsi Delivery Partner App
                </span>
              </h1>

              <p className="mt-6 text-lg text-gray-600">
                Join Warsi Meat Bazaar as a Delivery Partner and earn by
                delivering fresh meat orders. Manage deliveries, track earnings,
                and receive instant order notifications directly from your
                mobile.
              </p>

              {/* Features */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-end gap-3">
                  <Truck className="text-red-600" />
                  <span>Accept & Deliver Orders Easily</span>
                </div>

                <div className="flex items-center justify-end gap-3">
                  <ShieldCheck className="text-red-600" />
                  <span>Secure Login & Real-Time Order Tracking</span>
                </div>

                <div className="flex items-center justify-end gap-3">
                  <Star className="text-red-600" />
                  <span>Track Daily Earnings & Delivery History</span>
                </div>
              </div>

              <div className="mt-10 flex justify-end flex-wrap gap-4">
                <a
                  href="YOUR_PLAYSTORE_LINK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl bg-black px-4 py-4 text-white transition hover:scale-105"
                >
                  <FaGooglePlay size={28} />
                  <div>
                    <p className="text-xs">GET IT ON</p>
                    <h4 className="font-semibold">Google Play</h4>
                  </div>
                </a>

                <a
                  href="YOUR_APPSTORE_LINK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl bg-black px-4 py-4 text-white transition hover:scale-105"
                >
                  <FaApple size={28} />
                  <div>
                    <p className="text-xs">Download on the</p>
                    <h4 className="font-semibold">App Store</h4>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Shop Partner App */}
        <div className="container mx-auto px-4 py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left Content */}
            <div>
              <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
                🏪 Shop Partner App
              </span>

              <h1 className="mt-6 text-5xl font-bold leading-tight text-gray-900">
                Download The
                <span className="block text-red-600">
                  Warsi Shop Partner App
                </span>
              </h1>

              <p className="mt-6 text-lg text-gray-600">
                Manage your Warsi Meat Bazaar store from anywhere. Accept
                customer orders, update inventory, manage products, track sales,
                and grow your business with our easy-to-use Shop Partner App.
              </p>

              {/* Features */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <Truck className="text-red-600" />
                  <span>Receive & Manage Customer Orders</span>
                </div>

                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-red-600" />
                  <span>Manage Products, Inventory & Pricing</span>
                </div>

                <div className="flex items-center gap-3">
                  <Star className="text-red-600" />
                  <span>Track Sales, Earnings & Order Reports</span>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="YOUR_PLAYSTORE_LINK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl bg-black px-4 py-4 text-white transition hover:scale-105"
                >
                  <FaGooglePlay size={28} />
                  <div>
                    <p className="text-xs">GET IT ON</p>
                    <h4 className="font-semibold">Google Play</h4>
                  </div>
                </a>

                <a
                  href="YOUR_APPSTORE_LINK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl bg-black px-4 py-4 text-white transition hover:scale-105"
                >
                  <FaApple size={28} />
                  <div>
                    <p className="text-xs">Download on the</p>
                    <h4 className="font-semibold">App Store</h4>
                  </div>
                </a>
              </div>

              {/* Stats */}
              <div className="mt-10 flex flex-wrap gap-8">
                <div>
                  <h3 className="text-3xl font-bold text-red-600">200+</h3>
                  <p className="text-gray-600">Registered Shops</p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-red-600">4.9★</h3>
                  <p className="text-gray-600">Partner Rating</p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-red-600">50K+</h3>
                  <p className="text-gray-600">Orders Managed</p>
                </div>
              </div>
            </div>

            {/* Right Mobile Mockup */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="h-[650px] w-[320px] rounded-[50px] border-[10px] border-black bg-white shadow-2xl overflow-hidden">
                  <img
                    src={app}
                    alt="App Preview"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Floating Badge */}
                <div className="absolute -left-8 top-20 rounded-2xl bg-white p-4 shadow-xl">
                  <div className="flex items-center gap-2">
                    <Download className="text-green-600" />
                    <div>
                      <h4 className="font-bold">10K+</h4>
                      <p className="text-sm text-gray-500">Downloads</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-8 bottom-20 rounded-2xl bg-white p-4 shadow-xl">
                  <div className="flex items-center gap-2">
                    <Smartphone className="text-red-600" />
                    <div>
                      <h4 className="font-bold">4.8★</h4>
                      <p className="text-sm text-gray-500">Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 rounded-3xl bg-red-600 p-10 text-center text-white">
          <h2 className="text-4xl font-bold">
            Start Ordering Fresh Meat Today
          </h2>

          <p className="mt-4 text-red-100">
            Download the app and get exclusive welcome rewards.
          </p>

          {/* <button className="mt-6 cursor-pointer rounded-full bg-white px-8 py-3 font-semibold text-red-600">
            Download Now
          </button> */}
        </div>
      </div>
    </section>
  );
}
