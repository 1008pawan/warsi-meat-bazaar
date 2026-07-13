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
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const menus = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { name: "Categories", icon: Boxes, path: "/admin/categories" },
  { name: "Products", icon: Package, path: "/admin/products" },
  { name: "Orders", icon: ShoppingCart, path: "/admin/orders" },
  { name: "Stores", icon: Store, path: "/admin/stores" },
  { name: "Customers", icon: Users, path: "/admin/customers" },
  { name: "Coupons", icon: TicketPercent, path: "/admin/coupons" },
  { name: "Reports", icon: BarChart3, path: "/admin/reports" },
  { name: "Settings", icon: Settings, path: "/admin/settings" },
];

export default function Sidebar({ open, setOpen }) {
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
          fixed lg:static top-0 left-0 z-50
          h-screen w-72 bg-red-600 text-white
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="h-16 border-b border-white flex items-center justify-between px-5">
          <div>
            <h2 className="text-2xl font-bold text-white">Warsi Admin</h2>

            <p className="text-xs font-semibold text-white">ADMIN PANEL</p>
          </div>

          {/* <button className="lg:hidden" onClick={() => setOpen(false)}>
            <X />
          </button> */}
        </div>

        {/* Menu */}
        <div className="p-4 space-y-2 overflow-y-auto scrollbar-thin h-[calc(100vh-130px)]">
          {menus.map((menu) => {
            const Icon = menu.icon;

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
                      : "hover:bg-zinc-900 text-white"
                  }`
                }
              >
                <Icon size={20} className="font-semibold" />
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
          >x`x`
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
