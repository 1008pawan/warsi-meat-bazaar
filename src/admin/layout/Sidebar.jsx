import {
  LayoutDashboard,
  Boxes,
  Package,
  ShoppingCart,
  Store,
  Users,
  TicketPercent,
  BarChart3,
  Settings,
  LogOut,
  X,
  ChevronDown,
  ChevronRight,
  Bike,
  Layers,
  ListPlus,
  Activity,
  Package2,
} from "lucide-react";

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const menus = [
  // {
  //   name: "Dashboard",
  //   icon: LayoutDashboard,
  //   children: [
  //     {
  //       name: "Overview",
  //       path: "/admin",
  //     },
  //     {
  //       name: "Revenue",
  //       path: "/admin/revenue",
  //     },
  //   ],
  // },

  { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { name: "Stores", icon: Store, path: "/admin/stores" },
  { name: "Category", icon: Layers, path: "/admin/category" },
  { name: "Product", icon: Package2, path: "/admin/product" },
  { name: "All Orders", icon: ListPlus, path: "/admin/allorders" },
  { name: "Offers", icon: TicketPercent, path: "/admin/offers" },
  { name: "Customers", icon: Users, path: "/admin/customers" },
  { name: "Delivery Agent", icon: Bike, path: "/admin/manege-delivery-agent" },
  { name: "Reports", icon: BarChart3, path: "/admin/analytics" },
  { name: "Activity Log", icon: Activity, path: "/admin/activity-log" },
];

export default function Sidebar({ open, setOpen }) {
  const [openMenu, setOpenMenu] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    queryClient.clear();

    navigate("/admin/login", { replace: true });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
           fixed left-0 top-0 z-50
            h-screen w-72
            bg-red-600
            transition-transform duration-300
            ${open ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="h-16 border-b border-white flex items-center justify-between px-5">
          <div>
            <h2 className="text-2xl font-bold text-white">Warsi Meat Bazaar</h2>

            <p className="text-xs font-semibold text-white">ADMIN PANEL</p>
          </div>
        </div>

        {/* Menu */}
        <div className="p-4 space-y-2 overflow-y-auto scrollbar-thin h-[calc(100vh-130px)]">
          {menus.map((menu) => {
            const Icon = menu.icon;

            if (menu.children) {
              return (
                <div key={menu.name}>
                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === menu.name ? "" : menu.name)
                    }
                    className="w-full flex items-center justify-between rounded-xl px-4 py-3 text-white hover:bg-zinc-900 transition cursor-pointer"
                  >
                    <div className="flex items-center font-semibold gap-3">
                      <Icon size={20} />
                      <span>{menu.name}</span>
                    </div>

                    {openMenu === menu.name ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronRight size={18} />
                    )}
                  </button>

                  {openMenu === menu.name && (
                    <div className="ml-8 mt-2 space-y-2">
                      {menu.children.map((child) => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          end={child.path === "/admin"}
                          onClick={() => setOpen(false)}
                          className={({ isActive }) =>
                            `block rounded-lg px-4 py-2 text-sm transition ${
                              isActive
                                ? "bg-white text-red-600 font-semibold"
                                : "text-white hover:bg-zinc-900"
                            }`
                          }
                        >
                          {child.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={menu.path}
                to={menu.path}
                end={menu.path === "/admin"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition ${
                    isActive
                      ? "bg-white text-black"
                      : "text-white hover:bg-zinc-900"
                  }`
                }
              >
                <Icon size={20} />
                {menu.name}
              </NavLink>
            );
          })}
        </div>

        {/* Logout */}
        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 cursor-pointer bg-yellow-400 text-black rounded-xl py-3 font-semibold hover:bg-yellow-300"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
