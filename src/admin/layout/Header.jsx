import { Menu, Bell, Search, ChevronDown, User, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAdmin } from "../../utils/auth";
import { useQueryClient } from "@tanstack/react-query";

export default function AdminHeader({ setOpen }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const user = getAdmin();

  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    queryClient.clear();

    navigate("/admin/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-white px-8 shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setOpen(true)}
          className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

          <p className="text-sm text-gray-500">Welcome back Admin panel 👋</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Profile */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-1 transition hover:bg-gray-50 cursor-pointer"
          >
            <img
              src={
                user?.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user?.name || "Admin",
                )}&background=e7000b&color=fff`
              }
              alt="Admin"
              className="h-10 w-10 rounded-full object-cover"
            />

            <div className="hidden text-left md:block">
              <h4 className="font-semibold text-gray-900">{user?.name}</h4>

              <p className="text-xs capitalize text-gray-500">
                {user?.roles?.[0]?.name}
              </p>
            </div>

            <ChevronDown
              size={18}
              className={`transition-transform ${
                openDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {openDropdown && (
            <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
              {/* Profile */}
              <button
                onClick={() => {
                  setOpenDropdown(false);
                  navigate("/admin/adminprofile");
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-gray-100 cursor-pointer"
              >
                <User size={18} />
                Profile
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-red-600 transition hover:bg-red-50 cursor-pointer"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
