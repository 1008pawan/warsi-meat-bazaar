import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Search, Activity, ArrowLeft } from "lucide-react";
import { useActivityLogs } from "../../hooks/useActivityLogs";
import { useNavigate } from "react-router-dom";

const ActivityLogs = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const { data, isLoading } = useActivityLogs();

  const logs = data?.data || [];

  const filteredLogs = logs.filter((item) => {
    return (
      item.action.toLowerCase().includes(search.toLowerCase()) ||
      (item.user_name || "").toLowerCase().includes(search.toLowerCase()) ||
      item.module.toLowerCase().includes(search.toLowerCase()) ||
      item.ip_address.toLowerCase().includes(search.toLowerCase())
    );
  });

  const columns = [
    {
      name: "#",
      width: "70px",
      center: true,
      cell: (_, index) => (
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-700">
          {index + 1}
        </div>
      ),
    },

    {
      name: "User",
      sortable: true,
      grow: 1.2,
      cell: (row) => (
        <div className="flex items-center gap-3 py-2">
          <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold uppercase">
            {row.user_name ? row.user_name.charAt(0) : "U"}
          </div>

          <div>
            <p className="font-semibold text-gray-800">
              {row.user_name || "Unknown User"}
            </p>

            <p className="text-xs text-gray-500">#{row.id}</p>
          </div>
        </div>
      ),
    },

    {
      name: "Module",
      sortable: true,
      center: true,
      cell: (row) => {
        const colors = {
          LOGIN: "bg-green-100 text-green-700",
          LOGOUT: "bg-orange-100 text-orange-700",
          ORDER: "bg-blue-100 text-blue-700",
          PRODUCT: "bg-purple-100 text-purple-700",
        };

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs text-nowrap font-semibold ${
              colors[row.module] || "bg-gray-100 text-gray-700"
            }`}
          >
            {row.module}
          </span>
        );
      },
    },

    {
      name: "Activity",
      grow: 3,
      wrap: true,
      cell: (row) => (
        <div className="py-3">
          <p className="font-medium text-gray-800 leading-6">{row.action}</p>
        </div>
      ),
    },

    {
      name: "IP Address",
      cell: (row) => (
        <span className="font-mono text-xs text-gray-700">
          {row.ip_address}
        </span>
      ),
    },

    {
      name: "Date & Time",
      sortable: true,
      grow: 1.5,
      cell: (row) => (
        <div>
          <p className="font-medium">
            {new Date(row.date).toLocaleDateString()}
          </p>

          <p className="text-xs text-gray-500">
            {new Date(row.date).toLocaleTimeString()}
          </p>
        </div>
      ),
    },

    {
      name: "Status",
      center: true,
      sortable: true,
      cell: (row) => (
        <span
          className={`px-4 py-1 rounded-full text-xs text-nowrap font-bold ${
            row.status === "Success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          ● {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-6">
        {/* Left */}

        <div>
          <h1 className="flex items-center gap-3 text-3xl">
            <div
              onClick={() => navigate(-1)}
              className="w-12 h-12 rounded-xl bg-white flex items-center justify-center hover:text-red-600 cursor-pointer"
            >
              <ArrowLeft size={24} />
            </div>

            <div>
              <h2 className="text-3xl font-bold">Activity Logs</h2>

              <p className="text-gray-500 text-sm mt-1">
                Monitor all user activities and system logs.
              </p>
            </div>
          </h1>
        </div>

        {/* Right */}

        <div className="relative w-full lg:w-96">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by user, action, module..."
            className="w-full rounded-xl border border-zinc-300 bg-white py-3 pl-11 pr-4 shadow-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-4 rounded-2xl border border-zinc-200 overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredLogs}
          progressPending={isLoading}
          pagination
          highlightOnHover
          striped
          responsive
          persistTableHead
        />
      </div>
    </div>
  );
};

export default ActivityLogs;
