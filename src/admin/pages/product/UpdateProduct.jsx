import { useEffect, useState } from "react";
import api from "../../../components/config/privetApi";
import { toast } from "react-hot-toast";
import { ArrowLeft, Camera, Plus, Trash2, X } from "lucide-react";
import {
  useProductDetails,
  useUpdateProduct,
} from "../../../hooks/useAdminProducts";
import { useNavigate, useParams } from "react-router-dom";
import { useCategories } from "../../../hooks/useCategories";
import { STORAGE_URL } from "../../../components/config/publicApi";
import { useLocation } from "react-router-dom";

export default function UpdateProduct() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const { data } = useProductDetails(id);
  const product = data?.data;
  const groupId = location.state?.group_id;

  const { mutate, isPending } = useUpdateProduct(id, setErrors);
  const { data: category = [], isLoading } = useCategories();

  const [form, setForm] = useState({
    category_id: "",
    sub_category_id: "",
    type: "",
    name: "",
    description: "",
    price: "",
    sale_price: "",
    has_variants: true,
    is_live: false,
    status: "active",
    images: [],
    variant_attributes: ["quantity"],
    variants: [
      {
        sku: "",
        attributes: {
          quantity: "",
        },
        weight: "",
        unit: "",
        stock: "",
        price: "",
        sale_price: "",
        is_default: 0,
      },
    ],
  });

  const selectedCategory = Array.isArray(category)
    ? category.find((item) => String(item.id) === String(form.category_id))
    : null;

  const subCategories = selectedCategory?.products ?? [];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category_id") {
      setForm((prev) => ({
        ...prev,
        category_id: value,
        sub_category_id: value,
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const newImages = Array.from(e.target.files);

    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));

    e.target.value = "";
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...form.variants];

    if (field === "quantity") {
      updated[index].attributes.quantity = value;
    } else {
      updated[index][field] = value;
    }

    setForm({
      ...form,
      variants: updated,
    });
  };

  const addVariant = () => {
    setForm({
      ...form,
      variants: [
        ...form.variants,
        {
          sku: "",
          attributes: {
            quantity: "",
          },
          price: "",
          sale_price: "",
          stock: "",
          weight: "",
          unit: "",
          is_default: 0,
        },
      ],
    });
  };

  const removeVariant = (index) => {
    const updated = form.variants.filter((_, i) => i !== index);

    setForm({
      ...form,
      variants: updated,
    });
  };

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const makeDefault = (index) => {
    setForm((prev) => ({
      ...prev,
      variants: prev.variants.map((v, i) => ({
        ...v,
        is_default: i === index,
      })),
    }));
  };

  useEffect(() => {
    if (!product) return;

    setForm({
      category_id: product.category_id || "",
      sub_category_id: product.sub_category_id || "",
      type: product.type || "",
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      sale_price: product.sale_price || "",
      has_variants: !!product.has_variants,
      is_live: !!product.is_live,
      status: product.status || "active",

      // old images
      images: product.images || [],

      variant_attributes: product.variant_attributes?.length
        ? product.variant_attributes
        : ["quantity"],

      variants:
        product.variants?.length > 0
          ? product.variants.map((v) => ({
              id: v.id,
              sku: v.sku,
              attributes: {
                quantity: v.attributes?.quantity || "",
              },
              weight: v.weight || "",
              unit: v.unit || "",
              stock: v.stock || "",
              price: v.price || "",
              sale_price: v.sale_price || "",
              is_default: v.is_default,
            }))
          : [
              {
                sku: "",
                attributes: {
                  quantity: "",
                },
                weight: "",
                unit: "",
                stock: "",
                price: "",
                sale_price: "",
                is_default: true,
              },
            ],
    });
  }, [product]);

  const submit = (e) => {
    e.preventDefault();
    
    const fd = new FormData();

    fd.append("_method", "POST");

    fd.append("group_id", groupId);
    fd.append("category_id", form.category_id);
    fd.append("sub_category_id", form.category_id);
    fd.append("type", form.type);
    fd.append("name", form.name);
    fd.append("description", form.description);
    fd.append("price", form.price);
    fd.append("sale_price", form.sale_price);
    fd.append("has_variants", form.has_variants ? 1 : 0);
    fd.append("is_live", form.is_live ? 1 : 0);
    fd.append("status", form.status);

    form.variant_attributes.forEach((item, i) => {
      fd.append(`variant_attributes[${i}]`, item);
    });

    form.variants.forEach((variant, i) => {
      if (variant.id) {
        fd.append(`variants[${i}][id]`, variant.id);
      }

      fd.append(`variants[${i}][sku]`, variant.sku);
      fd.append(
        `variants[${i}][attributes][quantity]`,
        variant.attributes.quantity,
      );
      fd.append(`variants[${i}][weight]`, variant.weight);
      fd.append(`variants[${i}][unit]`, variant.unit);
      fd.append(`variants[${i}][price]`, variant.price);
      fd.append(`variants[${i}][sale_price]`, variant.sale_price);
      fd.append(`variants[${i}][stock]`, variant.stock);
      fd.append(`variants[${i}][is_default]`, variant.is_default ? 1 : 0);
    });

    form.images.forEach((image) => {
      if (image instanceof File) {
        fd.append("images[]", image);
      }
    });

    mutate(fd);
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-5">
        <span
          onClick={() => navigate(-1)}
          className="hover:text-red-500 cursor-pointer"
        >
          <ArrowLeft />
        </span>
        <h2 className="text-3xl font-bold">Update Product</h2>
      </div>

      <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
        <form onSubmit={submit} className="space-y-6">
          <div>
            <input
              className="w-full border border-zinc-300 rounded-lg p-3"
              placeholder="Product Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
            )}
          </div>

          <div>
            <textarea
              className="w-full border border-zinc-300 rounded-lg p-3"
              rows={4}
              placeholder="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 font-medium">Category</label>

              <select
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
                className="w-full border border-zinc-300 rounded-lg p-3"
              >
                <option value="">Select Category</option>

                {category?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.category_id && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category_id[0]}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium">Sub Category</label>

              <select
                name="sub_category_id"
                value={form.sub_category_id}
                onChange={handleChange}
                disabled={!form.category_id}
                className="w-full border border-zinc-300 rounded-lg p-3"
              >
                <option value="">Select Sub Category</option>

                {subCategories.length > 0 ? (
                  subCategories.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))
                ) : (
                  <option value={form.category_id}>No Sub Categories</option>
                )}
              </select>
              {errors.sub_category_id && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.sub_category_id[0]}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium">Type</label>

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full border border-zinc-300 rounded-lg p-3"
              >
                <option value="">Select Type</option>
                <option value="weight">Weight</option>
                <option value="pieces">Pieces</option>
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">{errors.type[0]}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              {/* Has Variants */}
              <div className="flex items-center justify-between border border-zinc-300 rounded-xl p-3">
                <div>
                  <h4 className="font-semibold">Has Variants</h4>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      has_variants: !prev.has_variants,
                    }))
                  }
                  className={`relative inline-flex h-7 w-14 items-center rounded-full transition cursor-pointer ${
                    form.has_variants ? "bg-red-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                      form.has_variants ? "translate-x-8" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Is Live */}
              <div className="flex items-center justify-between border border-zinc-300 rounded-xl p-3">
                <div>
                  <h4 className="font-semibold">Is Live</h4>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      is_live: !prev.is_live,
                    }))
                  }
                  className={`relative inline-flex h-7 w-14 items-center rounded-full transition cursor-pointer ${
                    form.is_live ? "bg-red-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                      form.is_live ? "translate-x-8" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <input
              className="w-full border border-zinc-300 rounded-lg p-3"
              placeholder="Price"
              name="price"
              value={form.price}
              onChange={handleChange}
            />

            <input
              className="w-full border border-zinc-300 rounded-lg p-3"
              placeholder="Sale Price"
              name="sale_price"
              value={form.sale_price}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Product Variants</h3>

            <button
              type="button"
              onClick={addVariant}
              className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
            >
              <Plus size={18} />
              Add Variant
            </button>
          </div>

          {form.variants.map((variant, index) => (
            <div
              key={index}
              className="border border-zinc-300 rounded-xl p-5 space-y-4 bg-gray-50"
            >
              <h3 className="text-xl font-semibold">Variant {index + 1}</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <input
                    placeholder="SKU"
                    value={variant.sku}
                    onChange={(e) =>
                      handleVariantChange(index, "sku", e.target.value)
                    }
                    className="border border-zinc-300 p-3 rounded-lg w-full"
                  />
                  {errors[`variants.${index}.sku`] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[`variants.${index}.sku`][0]}
                    </p>
                  )}
                </div>

                <input
                  placeholder="Weight"
                  value={variant.attributes.weight}
                  onChange={(e) =>
                    handleVariantChange(index, "weight", e.target.value)
                  }
                  className="border border-zinc-300 p-3 rounded-lg w-full"
                />

                <div>
                  <select
                    name="unit"
                    value={variant.unit}
                    onChange={(e) =>
                      handleVariantChange(index, "unit", e.target.value)
                    }
                    className="w-full border border-zinc-300 rounded-lg p-3"
                  >
                    <option value="">Select Units</option>
                    <option value="gram">Gram</option>
                    <option value="kg">Kilogram</option>
                    <option value="pieces">Pieces</option>
                  </select>
                </div>

                <div>
                  <input
                    placeholder="Price"
                    value={variant.price}
                    onChange={(e) =>
                      handleVariantChange(index, "price", e.target.value)
                    }
                    className="border border-zinc-300 p-3 rounded-lg w-full"
                  />
                  {errors[`variants.${index}.price`] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[`variants.${index}.price`][0]}
                    </p>
                  )}
                </div>

                <input
                  placeholder="Sale Price"
                  value={variant.sale_price}
                  onChange={(e) =>
                    handleVariantChange(index, "sale_price", e.target.value)
                  }
                  className="border border-zinc-300 p-3 rounded-lg w-full"
                />

                <div>
                  <input
                    placeholder="Enter Stock"
                    value={variant.stock}
                    onChange={(e) =>
                      handleVariantChange(index, "stock", e.target.value)
                    }
                    className="border border-zinc-300 p-3 rounded-lg w-full"
                  />
                  {errors[`variants.${index}.stock`] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[`variants.${index}.stock`][0]}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <label className="flex gap-2">
                  <input
                    type="radio"
                    checked={Boolean(variant.is_default)}
                    onChange={() => makeDefault(index)}
                  />
                  Default Variant
                </label>

                {form.variants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="text-red-600 cursor-pointer"
                  >
                    <Trash2 />
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="space-y-3">
            <h3 className="text-xl font-semibold">Product Images</h3>

            <label className="flex flex-col items-center justify-center h-44 border-2 border-dashed border-zinc-300 rounded-xl cursor-pointer hover:border-red-500 transition">
              <span className="text-5xl text-zinc-500">
                <Camera />
              </span>
              <span className="mt-2 text-zinc-500">Click to Upload Images</span>

              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            {form.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {form.images.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={
                        file instanceof File
                          ? URL.createObjectURL(file)
                          : `${STORAGE_URL}/${file}`
                      }
                      alt={`Preview ${index}`}
                      className="h-28 w-full object-cover rounded-lg border border-zinc-300"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-md cursor-pointer"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end items-center">
            <button
              type="submit"
              disabled={isPending}
              className="bg-red-600 hover:bg-red-700 cursor-pointer disabled:opacity-50 text-white px-8 py-3 rounded-xl font-semibold"
            >
              {isPending ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
