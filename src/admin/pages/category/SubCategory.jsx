import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { STORAGE_URL } from "../../../components/config/publicApi";

const SubCategory = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const category = state?.category;

  if (!category) {
    return <div className="p-8 text-center">Category not found.</div>;
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-red-600 cursor-pointer"
      >
        <ArrowLeft size={26} className="hover:bg-red-50 p-1 rounded-full" />
        Back
      </button>

      <div className="rounded-2xl p-6 shadow bg-red-600 flex justify-between gap-4 items-center">
        <div className="flex gap-4 items-center">
          <div className="h-30 w-30 rounded-2xl border-2 border-white">
            <img
              src={category.image ? `${STORAGE_URL}/${category.image}` : ``}
              alt={category.name}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">{category.name}</h1>

            <p className="text-white mt-2">
              {category.children.length} Sub Categories
            </p>
          </div>
        </div>

        <div>
          <button
            onClick={() => navigate(`/admin/add-subcategories/${category.id}`)}
            className="w-full rounded-xl bg-white px-5 py-2.5 text-red-600 font-medium hover:text-red-700 transition cursor-pointer"
          >
            Add Sub Categories
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {category.children.map((sub) => (
          <div
            key={sub.id}
            className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-48">
              <img
                src={
                  sub.image
                    ? `${STORAGE_URL}/${sub.image}`
                    : `${STORAGE_URL}/${category.image}`
                }
                alt={sub.name}
                className="w-full h-full object-cover"
              />

              <span
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                  sub.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {sub.status}
              </span>
            </div>

            {/* Content */}
            <div className="p-5">
              <h2 className="text-lg font-bold text-gray-900 line-clamp-1">
                {sub.name}
              </h2>

              <p className="text-sm text-gray-500">Parent Category</p>

              <p className="font-medium text-red-600">{category.name}</p>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-400">Created</p>
                  <p className="text-sm font-medium">
                    {new Date(sub.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Updated</p>
                  <p className="text-sm font-medium">
                    {new Date(sub.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCategory;
