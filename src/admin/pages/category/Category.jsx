import React, { useState } from "react";
import { Search, FolderTree, Trash2, Edit } from "lucide-react";
import { STORAGE_URL } from "../../../components/config/publicApi";
import {
  useCategories,
  useDeleteCategory,
} from "../../../hooks/useAdminCategories";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const CategoryPage = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useCategories();
  const { mutate: deleteCategoryMutation } = useDeleteCategory();
  const [search, setSearch] = useState("");

  const categories =
    data?.data?.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    ) || [];

  const handleDelete = (e, id) => {
    e.stopPropagation();

    Swal.fire({
      title: "Delete Category?",
      text: "You won't be able to recover this category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategoryMutation(id);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 rounded-2xl bg-gray-100 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-gray-500">
            Manage all parent and child categories
          </p>
        </div>

        <div className="md:flex items-center gap-3">
          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2"
              size={18}
            />

            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-zinc-600 rounded-xl py-2 pl-10 pr-4 outline-none focus:border-red-500"
            />
          </div>

          <div>
            <button
              onClick={() => navigate("/admin/add-categories")}
              className="w-full rounded-xl bg-red-600 px-5 py-2 md:mt-0 mt-2 text-white font-medium hover:bg-red-700 transition cursor-pointer"
            >
              Add Categories
            </button>
          </div>
        </div>
      </div>

      {/* Cards */}

      <div className="grid lg:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() =>
              navigate(`/admin/categories/${category.id}/subcategories`, {
                state: {
                  category,
                },
              })
            }
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition cursor-pointer"
          >
            {/* Image */}

            <div className="relative h-52">
              <img
                src={`${STORAGE_URL}/${category.image}`}
                alt={category.name}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-4 right-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    category.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {category.status}
                </span>
              </div>
            </div>

            {/* Body */}

            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">{category.name}</h2>

                  <p className="text-gray-500 text-sm mt-1">
                    {category.children.length} Sub Categories
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/category/edit/${category.id}`);
                    }}
                    className="cursor-pointer z-10"
                  >
                    <Edit className="text-green-600" size={22} />
                  </button>

                  <button
                    onClick={(e) => handleDelete(e, category.id)}
                    className="cursor-pointer z-10"
                  >
                    <Trash2 className="text-red-600" size={22} />
                  </button>
                </div>
              </div>

              {/* Children */}

              <div className="mt-3">
                <h4 className="font-semibold mb-3">Sub Categories</h4>

                {category.children.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {category.children.map((child) => (
                      <span
                        key={child.id}
                        className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-sm font-medium"
                      >
                        {child.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">No Sub Categories</p>
                )}
              </div>

              {/* Footer */}

              <div className="flex justify-between pt-2">
                <div>
                  <p className="text-xs text-gray-500">Created</p>

                  <p className="font-medium">
                    {new Date(category.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Updated</p>

                  <p className="font-medium">
                    {new Date(category.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center shadow">
          <FolderTree className="mx-auto text-gray-400" size={70} />

          <h3 className="text-xl font-semibold mt-5">No Categories Found</h3>

          <p className="text-gray-500 mt-2">Try another search keyword.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
