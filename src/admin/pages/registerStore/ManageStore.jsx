import React, { useState, useEffect } from "react";
import { Eye, Edit, Trash2, Star, Store } from "lucide-react";
import { useStores } from "../../../hooks/useStores";
import Pagination from "../../ui/Pagination";
import { STORAGE_URL } from "../../../components/config/publicApi";
import Info from "../../ui/Info";
import StoreDetailsModal from "../../ui/StoreDetailsModal";
import { useNavigate } from "react-router-dom";
import { useDeleteStore } from "../../../hooks/useDeleteStore";
import Swal from "sweetalert2";

const ManageStore = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [storeStatus, setStoreStatus] = useState("");
  const [search, setSearch] = useState("");

  const [viewStore, setViewStore] = useState(null);
  const [openView, setOpenView] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const {
    data: stores,
    isLoading,
    error,
  } = useStores({
    page,
    status,
    storeStatus,
    search: searchQuery,
    perPage: 15,
  });

  const { mutate: deleteStoreMutation, isPending } = useDeleteStore();

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Store?",
      text: "Are you sure you want to delete this store?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      deleteStoreMutation(id);
    }
  };

  if (isLoading) {
    return (
      <div className="grid lg:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-[420px] rounded-2xl bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-10 text-center">
        <h2 className="text-xl font-semibold text-red-600">
          Failed to load stores
        </h2>
      </div>
    );
  }

  {
    stores?.data?.length === 0 && (
      <div className="col-span-full flex flex-col items-center justify-center py-20">
        <Store size={70} className="text-gray-300" />
        <h2 className="mt-4 text-xl font-semibold">No Stores Found</h2>
        <p className="text-gray-500">
          There are no stores matching your filters.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Title */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Stores</h2>
            <p className="text-sm text-gray-500">
              Manage all registered stores
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
            {/* Search */}
            <input
              type="text"
              placeholder="Search Store..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full sm:w-72 rounded-xl border border-zinc-500 px-4 py-2.5 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200"
            />

            {/* Approval Status */}
            <select
              value={status}
              onChange={(e) => {
                if (e.key === "Enter") {
                  setSearchQuery(search);
                  setPage(1);
                }
              }}
              className="w-full sm:w-44 rounded-xl border border-zinc-500 px-4 py-2.5 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200"
            >
              <option value="">All Approval</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>

            {/* Store Status */}
            <select
              value={storeStatus}
              onChange={(e) => {
                setStoreStatus(e.target.value);
                setPage(1);
              }}
              className="w-full sm:w-44 rounded-xl border border-zinc-500 px-4 py-2.5 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200"
            >
              <option value="">All Store Status</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>

            <button
              onClick={() => navigate("/admin/stores-register")}
              className="bg-red-600 hover:bg-red-700 rounded-xl text-white px-4 py-2 cursor-pointer"
            >
              Register Store
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {stores?.data?.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-2xl shadow-2xl border border-zinc-300 overflow-hidden"
            >
              {/* Banner */}
              <div className="relative">
                <img
                  src={`${STORAGE_URL}/${store.banner}`}
                  alt={store.name}
                  className="h-48 w-full object-cover"
                />

                <img
                  src={`${STORAGE_URL}/${store.logo}`}
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

                  <a
                    href={`https://www.google.com/maps?q=${store.latitude},${store.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-red-600 text-sm hover:underline"
                  >
                    <p className="font-medium">{store.address}</p>
                  </a>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Created : {new Date(store.created_at).toLocaleDateString()}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setViewStore(store);
                        setOpenView(true);
                      }}
                      className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 cursor-pointer"
                    >
                      <Eye size={18} />
                    </button>

                    <button  className="p-2 rounded-lg cursor-pointer bg-green-100 text-green-600 hover:bg-green-200">
                      <Edit size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(store.id)}
                      disabled={isPending}
                      className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 cursor-pointer"
                    >
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

        {openView && (
          <StoreDetailsModal
            store={viewStore}
            onClose={() => {
              setOpenView(false);
              setViewStore(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ManageStore;
