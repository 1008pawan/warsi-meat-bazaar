import React from "react";
import { X } from "lucide-react";
import { useProductDetails } from "../../hooks/useAdminProducts";
import { STORAGE_URL } from "../../components/config/publicApi";

const ProductDetailsModal = ({ open, onClose, id }) => {
  const { data, isLoading } = useProductDetails(id, open);

  if (!open) return null;

  const product = data?.data;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center p-5">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-zinc-300">
          <h2 className="text-2xl font-bold">Product Details</h2>

          <button onClick={onClose} className="cursor-pointer">
            <X size={24} />
          </button>
        </div>

        {isLoading ? (
          <div className="p-10 text-center">Loading...</div>
        ) : (
          product && (
            <div className="p-6 space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <img
                  src={`${STORAGE_URL}/${product.images?.[0]}`}
                  className="w-full h-80 object-cover rounded-2xl border border-zinc-300"
                />

                <div>
                  <h1 className="text-3xl font-bold">{product.name}</h1>

                  <p className="text-gray-500 mt-3">{product.description}</p>

                  <div className="grid md:grid-cols-3 grid-cols-2 gap-4 mt-6">

                    <Info title="Price" value={`₹${product.price}`} />

                    <Info title="Sale Price" value={`₹${product.sale_price}`} />

                    <Info title="Stock" value={product.total_stock} />

                    <Info title="Rating" value={product.rating} />

                    <Info title="Status" value={product.status} />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-5">Variants</h3>

                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-red-600 text-white">
                      <tr>
                        <th className="p-3 px-4">SKU</th>
                        <th className="px-4">Weight</th>
                        <th className="px-4">Price</th>
                        <th className="px-4">Sale Price</th>
                        <th className="px-4">Stock</th>
                        <th className="px-4">Default</th>
                      </tr>
                    </thead>

                    <tbody>
                      {product.variants.map((variant) => (
                        <tr key={variant.id} className="border-b border-zinc-300">
                          <td className="p-3 text-center px-4">{variant.sku}</td>
                          <td className="text-center px-4">{variant.weight}</td>
                          <td className="text-center px-4">₹{variant.price}</td>
                          <td className="text-center px-4">₹{variant.sale_price}</td>
                          <td className="text-center px-4">{variant.stock}</td>
                          <td className="text-center px-4">
                            {variant.is_default ? "Yes" : "No"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const Info = ({ title, value }) => (
  <div className="bg-gray-100 rounded-xl p-4">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="font-bold">{value}</p>
  </div>
);

export default ProductDetailsModal;
