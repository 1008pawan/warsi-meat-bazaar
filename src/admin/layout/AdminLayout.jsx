import { useState } from "react";
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminHeader from "./Header";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile Floating Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-xl bg-red-600 p-3 text-white shadow lg:hidden"
      >
        <Menu size={22} />
      </button>

      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1">
        <div>
          <AdminHeader setOpen={setSidebarOpen} />
        </div>

        <main className="px-4 pb-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
