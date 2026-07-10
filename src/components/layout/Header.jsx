import {
  MapPin,
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Smartphone,
} from "lucide-react";
import logo from "../../assets/logo/warsi_logo.png";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import api, { API_URL, STORAGE_URL } from "../config/publicApi";

export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch(`${`${API_URL}/get_category`}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setMenuItems(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Main Header */}
      <div className="container mx-auto px-3 lg:px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="h-18 w-18 object-contain" />

              <div>
                <h2 className="text-lg lg:text-2xl font-bold text-red-600">
                  Warsi Meat Bazaar
                </h2>
                <p className="text-xs text-gray-500">Fresh Meat Delivered</p>
              </div>
            </div>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-3 lg:gap-5">
            <Link
              to="/stores"
              className="hidden xl:flex items-center gap-2 cursor-pointer"
            >
              <div className="hidden xl:flex items-center gap-2 cursor-pointer">
                <MapPin size={20} className="text-red-600" />
                <span className="text-sm font-medium">Near by Stores</span>
              </div>
            </Link>

            <Link
              to="/app"
              className="hidden lg:flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-white font-semibold"
            >
              <Smartphone size={18} />
              Download App
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden cursor-pointer"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block bg-red-600">
        <div className="container mx-auto flex items-center justify-center gap-10 py-3">
          {/* Home */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-white font-bold" : "text-white font-semibold"
            }
          >
            Home
          </NavLink>

          {/* About */}
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-white font-bold" : "text-white font-semibold"
            }
          >
            About Us
          </NavLink>

          {/* Categories Dropdown */}
          <div className="group relative">
            <button className="flex items-center gap-1 font-semibold text-white">
              Categories
              <ChevronDown
                size={16}
                className="transition-transform group-hover:rotate-180"
              />
            </button>

            <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-80 max-h-[380px] -translate-x-1/2 overflow-y-auto rounded-2xl border border-gray-200 bg-white p-3 shadow-2xl opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 scrollbar-thin scrollbar-thumb-red-500">
              <div className="space-y-2">
                {menuItems.map((category) => (
                  <NavLink
                    key={category.name}
                    onClick={() => setShowCategories(false)}
                    to={`/category/${encodeURIComponent(category.name)}`}
                    className="flex items-center gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-red-100 hover:shadow-md"
                  >
                    <img
                      src={
                        category.image
                          ? `${STORAGE_URL}/${category.image}`
                          : "https://placehold.co/80x80?text=C"
                      }
                      alt={category.name}
                      className="h-12 w-12 rounded-xl border border-gray-200 object-cover"
                    />

                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">
                        {category.name}
                      </h4>

                      <p className="text-xs text-gray-500">
                        {category.products?.length || 0} Products
                      </p>
                    </div>

                    <ChevronRight
                      size={18}
                      className="text-gray-400 group-hover:text-red-600"
                    />
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          {/* Stores */}
          <NavLink
            to="/stores"
            className={({ isActive }) =>
              isActive ? "text-white font-bold" : "text-white font-semibold"
            }
          >
            Stores
          </NavLink>

          <NavLink
            to="/offers"
            className={({ isActive }) =>
              isActive ? "text-white font-bold" : "text-white font-semibold"
            }
          >
            Offers
          </NavLink>

          <NavLink
            to="/franchise"
            className={({ isActive }) =>
              isActive ? "text-white font-bold" : "text-white font-semibold"
            }
          >
            Franchise
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-white font-bold" : "text-white font-semibold"
            }
          >
            Contact Us
          </NavLink>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden border-t bg-white shadow-lg">
          <div className="p-4">
            {/* Home */}
            <NavLink
              to="/"
              onClick={() => setMobileMenu(false)}
              className="block border-b border-gray-200 py-3 font-medium"
            >
              Home
            </NavLink>

            {/* Categories */}
            <div className="border-b border-gray-200 py-3">
              <button
                onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                className="flex w-full items-center justify-between font-medium"
              >
                Categories
                <ChevronRight
                  size={18}
                  className={`transition-transform ${
                    mobileCategoriesOpen ? "rotate-90" : ""
                  }`}
                />
              </button>

              {mobileCategoriesOpen && (
                <div className="mt-3 space-y-2">
                  {menuItems.map((item) => (
                    <NavLink
                      key={item.name}
                      to={`/category/${encodeURIComponent(item.name)}`}
                      onClick={() => {
                        setMobileMenu(false);
                        setMobileCategoriesOpen(false);
                      }}
                      className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 hover:bg-red-50"
                    >
                      <img
                        src={
                          item.image
                            ? `${STORAGE_URL}/${item.image}`
                            : "https://placehold.co/60x60?text=C"
                        }
                        alt={item.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>

                        <p className="text-xs text-gray-500">
                          {item.products?.length || 0} Products
                        </p>
                      </div>

                      <ChevronRight size={18} />
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* Stores */}
            <NavLink
              to="/stores"
              onClick={() => setMobileMenu(false)}
              className="block border-b border-gray-200 py-3 font-medium"
            >
              Stores
            </NavLink>

            {/* About */}
            <NavLink
              to="/about"
              onClick={() => setMobileMenu(false)}
              className="block border-b border-gray-200 py-3 font-medium"
            >
              About Us
            </NavLink>

            {/* About */}
            <NavLink
              to="/offers"
              onClick={() => setMobileMenu(false)}
              className="block border-b border-gray-200 py-3 font-medium"
            >
              Offers
            </NavLink>

            <NavLink
              to="/franchise"
              onClick={() => setMobileMenu(false)}
              className="block border-b border-gray-200 py-3 font-medium"
            >
              Franchise
            </NavLink>

            {/* About */}
            <NavLink
              to="/contact"
              onClick={() => setMobileMenu(false)}
              className="block border-b border-gray-200 py-3 font-medium"
            >
              Contact Us
            </NavLink>

            {/* Location */}
            <Link
              to="/stores"
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="mt-4 flex items-center gap-2 text-red-600">
                <MapPin size={20} className="text-red-600" />
                <span className="text-sm font-medium">Near by Stores</span>
              </div>
            </Link>

            <Link
              to="/download-app"
              className="flex items-center gap-2 mt-3 bg-red-600 px-4 py-2 text-white font-semibold"
            >
              <Smartphone size={18} />
              Download App
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
