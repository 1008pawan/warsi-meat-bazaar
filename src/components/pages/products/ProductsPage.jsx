import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import api, { API_URL, STORAGE_URL } from "../../config/publicApi";
import NoImage from "/src/assets/images/product.svg";

export default function ProductsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/get_product/${id}`)
      .then((res) => res.json())
      .then((res) => {
        const productData = res.data.product;

        setProduct(productData);

        if (productData.images?.length) {
          setSelectedImage(productData.images[0]);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-screen items-center justify-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero */}
      <div className="bg-red-600 py-10 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">{product.category.name}</h1>
          <p className="mt-2">Premium Quality Fresh Meat Delivered</p>
        </div>
      </div>

      <div className="container mx-auto py-10 px-4">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Images */}
          <div>
            <img
              src={selectedImage ? `${STORAGE_URL}${selectedImage}` : NoImage}
              alt={product?.name}
              className="h-[450px] w-full rounded-2xl object-cover shadow-lg"
            />

            <div className="mt-4 flex gap-3">
              {product?.images?.map((img, index) => (
                <img
                  key={index}
                  src={`${STORAGE_URL}${img}`}
                  alt={`thumb-${index}`}
                  onClick={() => setSelectedImage(img)}
                  className={`h-24 w-24 cursor-pointer rounded-xl border-2 object-cover transition ${
                    selectedImage === img
                      ? "border-red-600"
                      : "border-gray-300 hover:border-red-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-600">
              {product.category.name}
            </span>

            <h2 className="mt-4 text-4xl font-bold">{product.name}</h2>

            <div className="mt-3 flex items-center gap-3">
              ⭐ {product.rating}
              <span className="text-gray-500">
                ({product.total_reviews} Reviews)
              </span>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <span className="text-4xl font-bold text-red-600">
                ₹{product.sale_price}
              </span>

              {product.sale_price !== product.price && (
                <span className="text-2xl text-gray-400 line-through">
                  ₹{product.price}
                </span>
              )}
            </div>

            <p className="mt-6 text-gray-600">{product.description}</p>

            <div className="mt-6">
              <h3 className="font-bold">Product Details</h3>

              <ul className="mt-3 space-y-2 text-gray-600">
                <li>
                  <strong>Name:</strong> {product.sku}
                </li>

                <li>
                  <strong>Weight:</strong> {product.weight} Kg
                </li>

                <li>
                  <strong>Total Stock:</strong> {product.stock}
                </li>

                <li>
                  <strong>Status:</strong> {product.status}
                </li>
              </ul>
            </div>

            {product.tags?.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-3 font-bold">Tags</h3>

                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-gray-200 px-4 py-2 text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <Link to={"/app"}>
              <button className="mt-8 cursor-pointer rounded-xl bg-red-600 px-8 py-4 font-semibold text-white hover:bg-red-700">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
