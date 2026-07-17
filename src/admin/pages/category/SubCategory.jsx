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
        className="flex items-center gap-2 text-red-600"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="bg-white rounded-2xl p-6 shadow">
        <h1 className="text-3xl font-bold">{category.name}</h1>

        <p className="text-gray-500 mt-2">
          {category.children.length} Sub Categories
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

              <p className="text-sm text-gray-500 mt-1">Parent Category</p>

              <p className="font-medium text-red-600">{category.name}</p>

              <div className="mt-5 flex justify-between items-center border-t pt-4">
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

              <button className="mt-5 w-full rounded-xl bg-red-600 py-2.5 text-white font-medium hover:bg-red-700 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCategory;
