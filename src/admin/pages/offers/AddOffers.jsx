import React, { useState } from "react";
import { useCreateOffer } from "../../../hooks/useAdminOffers";
import { ArrowLeft, Gift, Package, Save, Upload } from "lucide-react";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const initialState = {
  title: "",
  min_amount: "",
  reward_type: "",
  reward_qty: "",
  is_first_order: "",
  status: "active",
  image: null,
  units: "",
};

const AddOffers = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateOffer();

  const [form, setForm] = useState(initialState);
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setForm((prev) => ({
        ...prev,
        image: files[0],
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

    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        formData.append(key, value);
      }
    });

    mutate(formData);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-11 h-11 rounded-xl bg-white shadow flex items-center justify-center hover:bg-red-50 cursor-pointer"
          >
            <ArrowLeft />
          </button>
          <Gift className="text-red-600" size={32} />
          Create Offer
        </h1>

        <p className="text-gray-500 mt-2">
          Create promotional offers for your customers.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8 bg-white rounded-3xl border border-zinc-300 shadow-sm p-6">
          {/* Left */}

          <div className="bg-white">
            <h2 className="font-bold text-xl mb-5">Offer Image</h2>

            <div className="relative">
              <img
                src={preview || "/src/assets/images/product.svg"}
                className="w-full h-72 object-cover rounded-2xl border border-zinc-300"
              />

              <label className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 hover:opacity-100 flex flex-col items-center justify-center transition cursor-pointer">
                <Upload className="text-white" size={35} />

                <p className="text-white mt-3 font-semibold">Upload Image</p>

                <input
                  hidden
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                />
              </label>
            </div>

            <p className="text-gray-400 text-sm mt-4 text-center">
              JPG, PNG (Max 2MB)
            </p>
          </div>

          {/* Right */}

          <div className="lg:col-span-2 bg-white">
            <h2 className="font-bold text-2xl mb-8">Offer Details</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Title */}

              <div className="md:col-span-2">
                <label className="font-semibold mb-2 block">Offer Title</label>

                <div className="relative">
                  <Gift
                    className="absolute left-4 top-4 text-gray-400"
                    size={20}
                  />

                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Free 6 Eggs On First Order"
                    className="w-full border border-zinc-300 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
              </div>

              {/* Minimum Amount */}

              <div>
                <label className="font-semibold mb-2 block">
                  Minimum Amount
                </label>

                <div className="relative">
                  <FaRupeeSign
                    className="absolute left-4 top-4 text-gray-400"
                    size={18}
                  />

                  <input
                    type="text"
                    name="min_amount"
                    value={form.min_amount}
                    onChange={handleChange}
                    placeholder="250"
                    className="w-full border border-zinc-300 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
              </div>

              {/* Reward Quantity */}

              <div>
                <label className="font-semibold mb-2 block">
                  Reward Quantity
                </label>

                <div className="relative">
                  <Package
                    className="absolute left-4 top-4 text-gray-400"
                    size={20}
                  />

                  <input
                    type="text"
                    name="reward_qty"
                    value={form.reward_qty}
                    onChange={handleChange}
                    placeholder="6"
                    className="w-full border border-zinc-300 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold mb-2 block">Units</label>

                <select
                  name="units"
                  value={form.units}
                  onChange={handleChange}
                  className="w-full border border-zinc-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                >
                  <option value="">Select Unit</option>
                  <option value="piece">Piece</option>
                  <option value="gram">Gram</option>
                  <option value="kg">Kg</option>
                </select>
              </div>

              {/* Reward */}

              <div>
                <label className="font-semibold mb-2 block">Reward Type</label>

                <select
                  name="reward_type"
                  value={form.reward_type}
                  onChange={handleChange}
                  className="w-full border border-zinc-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                >
                  <option value="">Select Type</option>
                  <option value="egg">Egg</option>
                  <option value="chicken">Chicken</option>
                  <option value="fish">Fish</option>
                  <option value="mutton">Mutton</option>
                </select>
              </div>

              {/* First Order */}

              <div>
                <label className="font-semibold mb-2 block">
                  First Order Offer
                </label>

                <select
                  name="is_first_order"
                  value={form.is_first_order}
                  onChange={handleChange}
                  className="w-full border border-zinc-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                >
                  <option value="">Select Order</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>

              {/* Status */}

              <div>
                <label className="font-semibold mb-2 block">Status</label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full border border-zinc-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Bottom */}

            <div className="flex justify-end gap-4 mt-10">
              <button
                type="button"
                className="px-8 py-3 rounded-xl border border-zinc-300 hover:bg-gray-100 font-semibold cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-50 cursor-pointer"
              >
                <Save size={18} />

                {isPending ? "Creating..." : "Create Offer"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddOffers;
