import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../../assets/logo/warsi_logo.png";
import { Mail, MapPin, Phone } from "lucide-react";
import Apple from "../../assets/images/appimg/app-store-homepage.avif";
import PlayStore from "../../assets/images/appimg/playstore-homepage.avif";
import { SiSwiggy } from "react-icons/si";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div>
            <Link to="/">
              <div className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="Warsi Meat Bazaar"
                  className="h-19 w-19 rounded-full bg-white p-1"
                />

                <div>
                  <h2 className="text-xl font-bold text-red-500">
                    Warsi Meat Bazaar
                  </h2>

                  <p className="text-sm text-gray-400">Fresh Meat Delivered</p>
                </div>
              </div>
            </Link>

            <p className="mt-5 text-sm leading-7 text-gray-400">
              Premium quality chicken, mutton, fish and seafood delivered fresh
              to your doorstep with hygiene and quality guaranteed.
            </p>

            <div className="grid grid-cols-2 mt-3 gap-2">
              <Link to="/app">
                <img src={Apple} alt="Apple Store" />
              </Link>
              <Link to="/app">
                <img
                  src={PlayStore}
                  alt="Play Store"
                  className="border border-white rounded-md"
                />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-yellow-400">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <Link to="/" className="hover:text-red-500">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/about" className="hover:text-red-500">
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/stores" className="hover:text-red-500">
                  Shop
                </Link>
              </li>

              <li>
                <Link to="/offers" className="hover:text-red-500">
                  Offers
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-red-500">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-yellow-400">
              Categories
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <Link to="/" className="hover:text-red-500">
                  Fresh Chicken
                </Link>
              </li>

              <li>
                <Link to="/" className="hover:text-red-500">
                  Fresh Mutton
                </Link>
              </li>

              <li>
                <Link to="/" className="hover:text-red-500">
                  Fish
                </Link>
              </li>

              <li>
                <Link to="/" className="hover:text-red-500">
                  Sea Food
                </Link>
              </li>

              <li>
                <Link to="/" className="hover:text-red-500">
                  Combo Packs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-yellow-400">
              Contact Us
            </h3>

            <div className="space-y-4 text-gray-400">
              <div className="flex gap-3">
                <div>
                  <MapPin size={18} className="mt-1 text-red-500" />
                </div>
                <span>
                  Warsi Road, Ujariyaon, Vijay Khand 2, Gomti Nagar, Lucknow,
                  Uttar Pradesh 226010
                </span>
              </div>

              <a href="tel:+918400222227">
                <div className="flex gap-3">
                  <Phone size={18} className="text-red-500" />
                  <span>+91 84002 22227</span>
                </div>
              </a>

              <div className="flex gap-3">
                <Mail size={18} className="text-red-500" />
                <span>info@warsimeatbazaar.com</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href="https://www.facebook.com/p/Warsi-Meat-Bazaar-100065394196417/"
                className="rounded-full bg-gray-800 p-3 transition hover:bg-red-600"
              >
                <FaFacebook size={18} />
              </a>

              <a
                href="https://www.instagram.com/warsimeatbazaar/"
                className="rounded-full bg-gray-800 p-3 transition hover:bg-red-600"
              >
                <FaInstagram size={18} />
              </a>

              {/* <a
                href="#"
                className="rounded-full bg-gray-800 p-3 transition hover:bg-red-600"
              >
                <FaTwitter size={18} />
              </a> */}

              <a
                href="https://www.swiggy.com/city/lucknow/warsi-meat-bazaar-vijay-khand-2-gomti-nagar-rest388542"
                className="rounded-full bg-gray-800 p-3 transition hover:bg-red-600"
              >
                <SiSwiggy size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-5 text-sm text-gray-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} Warsi Meat Bazaar. All Rights Reserved.
          </p>

          <div className="grid grid-cols-3 grid-cols-1">
            <Link to="/policy">
              <div className="hover:text-red-500 md:text-right">
                Privacy Policy
              </div>
            </Link>

            <Link to="/conditions">
              <div className="hover:text-red-500 md:text-center">
                Terms & Conditions
              </div>
            </Link>

            <Link to="/shipping-refund">
              <div className="hover:text-red-500">Shipping & Refund Policy</div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
