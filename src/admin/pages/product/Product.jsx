import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { Search, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { STORAGE_URL } from "../../../components/config/publicApi";
import { useProducts } from "../../../hooks/useAdminProducts";
import Pagination from "../../ui/Pagination";
import ProductDetailsModal from "../../ui/ProductDetailsModal";

const Products = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const { data: updateStatus, isLoading } = useProducts(page);

  const products = updateStatus?.data || [];
  const meta = updateStatus?.meta;

  const filtered = useMemo(() => {
    return products.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  const columns = [
    {
      name: "Product",
      grow: 3,
      cell: (row) => (
        <div className="flex items-center gap-4 py-3">
          <img
            src={
              row.images?.length
                ? `${STORAGE_URL}/${row.images[0]}`
                : "/src/assets/images/image.png"
            }
            className="w-16 h-16 rounded-xl object-cover border border-zinc-300"
          />

          <div>
            <h3 className="font-bold">{row.name}</h3>

            <p className="text-sm text-gray-500 line-clamp-2">
              {row.description}
            </p>

            <div className="flex gap-2 mt-2">
              <span className="bg-red-50 text-red-600 text-xs px-2 py-1 rounded-lg text-nowrap flex justify-center items-center">
                #{row.id}
              </span>

              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-lg">
                {row.slug}
              </span>
            </div>
          </div>
        </div>
      ),
    },

    {
      name: "Variants",
      center: true,
      cell: (row) => (
        <div className="space-y-2">
          <div className="font-semibold text-center">{row.variants.length}</div>

          <div className="flex flex-wrap justify-center gap-1">
            {row.variants.map((item) => (
              <span
                key={item.id}
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  item.is_default
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {item.weight} Kg
              </span>
            ))}
          </div>
        </div>
      ),
    },

    {
      name: "Price",
      center: true,
      cell: (row) => (
        <div>
          <h3 className="text-green-600 font-bold">₹{row.sale_price}</h3>

          <p className="line-through text-gray-400 text-sm">₹{row.price}</p>
        </div>
      ),
    },

    {
      name: "Stock",
      center: true,
      cell: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            row.total_stock > 0
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.total_stock}
        </span>
      ),
    },

    {
      name: "Status",
      center: true,
      cell: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            row.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.status}
        </span>
      ),
    },

    {
      name: "Actions",
      center: true,
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedId(row.id);
              setOpenModal(true);
            }}
            className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 flex justify-center items-center cursor-pointer"
          >
            <Eye size={18} />
          </button>

          <button
            onClick={() => navigate(`/admin/update-product/${row.id}`)}
            className="w-9 h-9 rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-200 flex justify-center items-center cursor-pointer"
          >
            <Pencil size={18} />
          </button>

          <button className="w-9 h-9 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 flex justify-center items-center cursor-pointer">
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="md:flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>

          <p className="text-gray-500 mt-1">Manage all store products</p>
        </div>

        <div className="md:flex items-center gap-4">
          <div className="relative max-w-md bg-white shadow-md rounded-xl md:mt-0 mt-3">
            <Search className="absolute left-4 top-4 text-gray-400" size={18} />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Product..."
              className="w-full border border-zinc-300 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            onClick={() => navigate("/admin/add-product")}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white md:mt-0 mt-3 md:px-5 px-3 py-3 rounded-xl shadow-md cursor-pointer md:w-fit w-full justify-center"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden p-4">
        <DataTable
          columns={columns}
          data={filtered}
          highlightOnHover
          striped
          responsive
          progressPending={isLoading}
          pagination={false}
        />
      </div>

      <Pagination
        currentPage={meta?.current_page || 1}
        totalPages={meta?.last_page || 1}
        totalItems={meta?.total || 0}
        perPage={meta?.per_page || 15}
        onPageChange={setPage}
      />

      <ProductDetailsModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        id={selectedId}
      />
    </div>
  );
};

export default Products;
