import { Link, useParams } from "react-router-dom";
import { useCategories } from "../../../hooks/useCategories";
import { STORAGE_URL } from "../../../components/config/publicApi";
import { useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useState } from "react";
import NoImage from "/src/assets/images/product.svg";

export default function CategoryPage() {
  const { categoryName } = useParams();
  const activeCategoryRef = useRef(null);
  const [search, setSearch] = useState("");

  const { data: categories, isLoading, error } = useCategories();

  useEffect(() => {
    if (activeCategoryRef.current) {
      activeCategoryRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [categoryName]);

  if (isLoading)
    return <h2 className="text-3xl font-bold py-20 text-center">Loading...</h2>;

  if (error)
    return <h2 className="py-20 text-center">Error loading category.</h2>;

  const category = categories.find(
    (item) =>
      item.name.toLowerCase() ===
      decodeURIComponent(categoryName).toLowerCase(),
  );

  if (!category) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold">Category Not Found</h2>
      </div>
    );
  }

  const filteredProducts = category.products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section className=" bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1 md:block hidden">
            <div className="sticky top-24">
              <div className="rounded-2xl bg-white shadow">
                <div className="border-b border-zinc-300 p-5">
                  <h2 className="text-xl font-bold">Categories</h2>
                </div>

                <div className="max-h-[calc(100vh-180px)] overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-red-600">
                  <div className="space-y-3">
                    {categories.map((item) => (
                      <Link
                        key={item.name}
                        ref={
                          item.name === category.name ? activeCategoryRef : null
                        }
                        to={`/category/${encodeURIComponent(item.name)}`}
                        className={`flex items-center gap-3 rounded-xl p-3 transition ${
                          item.name === category.name
                            ? "bg-red-600 text-white"
                            : "bg-gray-50 hover:bg-red-50"
                        }`}
                      >
                        <img
                          src={
                            item.image
                              ? `${STORAGE_URL}/${item.image}`
                              : "https://placehold.co/60x60"
                          }
                          alt={item.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />

                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-xs">
                            {item.products.length} Products
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <div className="md:flex justify-between items-center">
              <div className="md:mb-8 mb-4 flex items-center gap-5">
                <img
                  src={
                    category.image
                      ? `${STORAGE_URL}/${category.image}`
                      : "https://placehold.co/200x200"
                  }
                  alt={category.name}
                  className="h-24 w-24 rounded-full border border-zinc-300 object-cover"
                />

                <div>
                  <h1 className="text-4xl font-bold">{category.name}</h1>
                  <p>{category.products.length} Products</p>
                </div>
              </div>

              <div className="relative w-full lg:w-96 md:mb-0 mb-4 bg-white rounded-full">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-full border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-200"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <img
                    src={
                      product.image
                        ? `${STORAGE_URL}/${product.image}`
                        : NoImage
                    }
                    className="h-56 w-full object-cover"
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = NoImage;
                    }}
                  />

                  <div className="p-5">
                    <h3 className="text-xl font-bold">{product.name}</h3>

                    <p className="mt-2 line-clamp-2 text-gray-500">
                      {product.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-2xl font-bold text-red-600">
                        ₹{product.price}
                      </span>

                      <span className="rounded bg-green-100 px-2 py-1 text-sm">
                        ⭐ {product.rating}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-20 text-center text-gray-500">
                No Products Available
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
