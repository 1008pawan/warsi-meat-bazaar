import React, { useState } from "react";
import { Eye, Edit, Trash2, Star, Store } from "lucide-react";
import { useStores } from "../../hooks/useStores";
import Pagination from "../ui/Pagination";

const ManageStore = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [storeStatus, setStoreStatus] = useState("");
  const [search, setSearch] = useState("");

  const {
    data: stores,
    isLoading,
    error,
  } = useStores({
    page,
    status,
    storeStatus,
    search,
    perPage: 15,
  });
  return (
    <div>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Stores</h2>

          <input
            type="text"
            placeholder="Search Store..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border rounded-xl px-4 py-2"
          />

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="border rounded-xl px-4 py-2"
          >
            <option value="">All Approval</option>

            <option value="approved">Approved</option>

            <option value="pending">Pending</option>

            <option value="rejected">Rejected</option>
          </select>

          <select
            value={storeStatus}
            onChange={(e) => {
              setStoreStatus(e.target.value);
              setPage(1);
            }}
            className="border rounded-xl px-4 py-2"
          >
            <option value="">All Store Status</option>

            <option value="open">Open</option>

            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {stores?.data?.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-2xl shadow border overflow-hidden"
            >
              {/* Banner */}
              <div className="relative">
                <img
                  src={store.banner}
                  alt={store.name}
                  className="h-48 w-full object-cover"
                />

                <img
                  src={store.logo}
                  alt={store.name}
                  className="absolute left-6 -bottom-10 h-20 w-20 rounded-xl border-4 border-white object-cover bg-white"
                />
              </div>

              <div className="pt-14 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{store.name}</h3>

                    <p className="text-gray-500">{store.slug}</p>
                  </div>

                  <div className="flex gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        store.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {store.status}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        store.store_status === "open"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {store.store_status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <Info title="Owner" value={store.owner?.name} />

                  <Info title="Email" value={store.email} />

                  <Info title="Phone" value={store.phone} />

                  <Info
                    title="Commission"
                    value={`${store.commission_rate}%`}
                  />

                  <Info title="Rating" value={store.rating} />

                  <Info title="Reviews" value={store.total_reviews} />
                </div>

                <div className="mt-5">
                  <p className="text-sm text-gray-500">Address</p>

                  <p className="font-medium">{store.address}</p>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Created : {new Date(store.created_at).toLocaleDateString()}
                  </div>

                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200">
                      <Eye size={18} />
                    </button>

                    <button className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200">
                      <Edit size={18} />
                    </button>

                    <button className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Pagination
          currentPage={stores?.meta?.current_page}
          totalPages={stores?.meta?.last_page}
          totalItems={stores?.meta?.total}
          perPage={stores?.meta?.per_page}
          onPageChange={setPage}
        />
      </div>
      ;
    </div>
  );
};

const Info = ({ title, value }) => (
  <div className="bg-gray-50 rounded-xl p-3">
    <p className="text-xs text-gray-500">{title}</p>
    <p className="font-semibold">{value || "-"}</p>
  </div>
);
export default ManageStore;
