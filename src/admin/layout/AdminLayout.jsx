import { useState } from "react";
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminHeader from "./Header";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-200">
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-xl bg-red-600 p-3 text-white shadow-lg lg:hidden"
      >
        <Menu size={22} />
      </button>

      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="lg:ml-72 flex min-h-screen flex-col">
        <header className="sticky top-0 z-30 bg-white shadow-sm">
          <AdminHeader setOpen={setSidebarOpen} />
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
