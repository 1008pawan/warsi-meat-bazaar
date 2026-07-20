import React, { useState } from "react";
import {
  Upload,
  Image as ImageIcon,
  FolderTree,
  Save,
  ArrowLeft,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSubCreateCategory } from "../../../hooks/useAdminCategories";

const AddSubCategories = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [preview, setPreview] = useState("/src/assets/images/product.svg");

  const [form, setForm] = useState({
    parent_id: id,
    name: "",
    image: null,
  });

  const { mutate, isPending } = useSubCreateCategory(id);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setForm((prev) => ({
        ...prev,
        [name]: files[0],
      }));

      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("parent_id", id);
    formData.append("name", form.name);

    if (form.image) {
      formData.append("image", form.image);
    }

    mutate(formData);
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-11 h-11 rounded-xl bg-white shadow flex items-center justify-center hover:bg-red-50"
          >
            <ArrowLeft />
          </button>

          <div>
            <h1 className="text-3xl font-bold">Add Sub Category</h1>

            <p className="text-gray-500">Create a new product sub category</p>
          </div>
        </div>
      </div>

      {/* Body */}

      <div className="grid lg:grid-cols-3 gap-4 bg-white p-5 rounded-3xl border border-zinc-300">
        {/* Left */}
        <div className="bg-white rounded-3xl">
          <h2 className="font-bold text-xl mb-5">Sub Category Image</h2>

          <div className="relative">
            <img
              src={preview}
              alt=""
              className="rounded-2xl w-full h-40 object-cover border border-zinc-300"
            />

            <label className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition rounded-2xl flex flex-col items-center justify-center cursor-pointer">
              <Upload className="text-white" size={35} />

              <p className="text-white mt-3 font-semibold">Upload Image</p>

              <input
                type="file"
                name="image"
                hidden
                accept="image/*"
                onChange={handleChange}
              />
            </label>
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-2 bg-white rounded-3xl">
          <h2 className="text-xl font-bold mb-8">Sub Category Information</h2>

          <div className="grid md:grid-cols-1 gap-6">
            <div>
              <label className="font-medium mb-2 block">
                Sub Category Name
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter sub category"
                className="w-full  border border-zinc-300 rounded-xl p-3 focus:border-none focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button className="px-6 py-3 rounded-xl border border-zinc-300 hover:bg-gray-100 cursor-pointer">
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              onClick={handleSubmit}
              className="flex items-center gap-2 cursor-pointer bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-semibold"
            >
              <Save size={18} />
              {isPending ? "Creating..." : "Create Sub Category"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubCategories;
