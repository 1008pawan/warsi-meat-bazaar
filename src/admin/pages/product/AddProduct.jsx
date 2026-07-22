import { useState } from "react";
import api from "../../../components/config/privetApi";
import { toast } from "react-hot-toast";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useCreateProduct } from "../../../hooks/useAdminProducts";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../../hooks/useCategories";

export default function AddProduct() {
  const navigate = useNavigate();

  const { mutate, isPending } = useCreateProduct();
  const { data: category } = useCategories();

  const [form, setForm] = useState({
    category_id: 1,
    name: "",
    description: "",
    price: "",
    has_variants: true,
    status: "active",
    variant_attributes: ["quantity"],
    variants: [
      {
        sku: "",
        attributes: {
          quantity: "",
        },
        price: "",
        sale_price: "",
        stock: "",
        is_default: 1,
      },
    ],
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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

  const makeDefault = (index) => {
    const updated = form.variants.map((item, i) => ({
      ...item,
      is_default: i === index ? 1 : 0,
    }));

    setForm({
      ...form,
      variants: updated,
    });
  };

  const submit = (e) => {
    e.preventDefault();

    const fd = new FormData();

    fd.append("category_id", form.category_id);
    fd.append("name", form.name);
    fd.append("description", form.description);
    fd.append("price", form.price);
    fd.append("has_variants", form.has_variants ? 1 : 0);
    fd.append("status", form.status);

    form.variant_attributes.forEach((attr, index) => {
      fd.append(`variant_attributes[${index}]`, attr);
    });

    form.variants.forEach((variant, index) => {
      fd.append(`variants[${index}][sku]`, variant.sku);

      fd.append(
        `variants[${index}][attributes][quantity]`,
        variant.attributes.quantity,
      );

      fd.append(`variants[${index}][price]`, variant.price);

      fd.append(`variants[${index}][sale_price]`, variant.sale_price);

      fd.append(`variants[${index}][stock]`, variant.stock);

      fd.append(`variants[${index}][is_default]`, variant.is_default);
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
        <h2 className="text-3xl font-bold">Add Product</h2>
      </div>

      <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
        <form onSubmit={submit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <input
                type="text"
                name="category_id"
                placeholder="Category Name"
                value={form.category_id}
                onChange={handleChange}
                className="w-full border border-zinc-300 rounded-lg p-3"
              />
            </div>

            <div>
              <label className="">Status</label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border border-zinc-300 rounded-lg p-3"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <input
            className="w-full border border-zinc-300 rounded-lg p-3"
            placeholder="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <textarea
            className="w-full border border-zinc-300 rounded-lg p-3"
            rows={4}
            placeholder="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          <input
            className="w-full border border-zinc-300 rounded-lg p-3"
            placeholder="Base Price"
            name="price"
            value={form.price}
            onChange={handleChange}
          />

          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Product Variants</h3>

            <button
              type="button"
              onClick={addVariant}
              className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
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
              <div className="grid md:grid-cols-5 gap-4">
                <input
                  placeholder="SKU"
                  value={variant.sku}
                  onChange={(e) =>
                    handleVariantChange(index, "sku", e.target.value)
                  }
                  className="border border-zinc-300 p-3 rounded-lg"
                />

                <input
                  placeholder="Quantity"
                  value={variant.attributes.quantity}
                  onChange={(e) =>
                    handleVariantChange(index, "quantity", e.target.value)
                  }
                  className="border border-zinc-300 p-3 rounded-lg"
                />

                <input
                  placeholder="Price"
                  value={variant.price}
                  onChange={(e) =>
                    handleVariantChange(index, "price", e.target.value)
                  }
                  className="border border-zinc-300 p-3 rounded-lg"
                />

                <input
                  placeholder="Sale Price"
                  value={variant.sale_price}
                  onChange={(e) =>
                    handleVariantChange(index, "sale_price", e.target.value)
                  }
                  className="border border-zinc-300 p-3 rounded-lg"
                />

                <input
                  placeholder="Stock"
                  value={variant.stock}
                  onChange={(e) =>
                    handleVariantChange(index, "stock", e.target.value)
                  }
                  className="border border-zinc-300 p-3 rounded-lg"
                />
              </div>

              <div className="flex justify-between">
                <label className="flex gap-2">
                  <input
                    type="radio"
                    checked={variant.is_default === 1}
                    onChange={() => makeDefault(index)}
                  />
                  Default Variant
                </label>

                {form.variants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="text-red-600"
                  >
                    <Trash2 />
                  </button>
                )}
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-semibold"
          >
            {isPending ? "Saving..." : "Create Product"}
          </button>
        </form>
      </div>
    </>
  );
}
