import { useCreateStore } from "../../../hooks/useCreateStore";
import toast from "react-hot-toast";
import { useState } from "react";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  phone: "",

  store_name: "",
  store_phone: "",
  store_email: "",

  address: "",
  city: "",
  state: "",
  country: "",

  latitude: "",
  longitude: "",

  logo: null,
  banner: null,
};

export default function CreateStore() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);

  const { mutate, isPending } = useCreateStore();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setForm((prev) => ({
        ...prev,
        [name]: files[0],
      }));
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

    Object.keys(form).forEach((key) => {
      if (form[key] !== null) {
        formData.append(key, form[key]);
      }
    });

    mutate(formData, {
      onSuccess: () => {
        toast.success("Store Created Successfully");
        setForm(initialState);
      },

      onError: (err) => {
        console.log(err.response?.data);
        toast.error(err.response?.data?.message || "Something went wrong");
      },
    });
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="hover:bg-red-200 p-1 text-red-600 rounded-full cursor-pointer"
        >
          <ArrowLeft />
        </button>
        <h1 className="text-3xl font-bold">Update Store</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Owner */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">Owner Details</h2>

          <div className="grid md:grid-cols-2 gap-5">
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Owner Name"
              className="border border-zinc-300 rounded-lg p-3"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Owner Email"
              className="border border-zinc-300 rounded-lg p-3"
            />

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="border border-zinc-300 rounded-lg p-3"
            />

            <input
              type="password"
              name="password_confirmation"
              value={form.password_confirmation}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="border border-zinc-300 rounded-lg p-3"
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="border border-zinc-300 rounded-lg p-3"
            />
          </div>
        </div>

        {/* Store */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">Store Details</h2>

          <div className="grid md:grid-cols-2 gap-5">
            <input
              name="store_name"
              value={form.store_name}
              onChange={handleChange}
              placeholder="Store Name"
              className="border border-zinc-300 rounded-lg p-3"
            />

            <input
              name="store_phone"
              value={form.store_phone}
              onChange={handleChange}
              placeholder="Store Phone"
              className="border border-zinc-300 rounded-lg p-3"
            />

            <input
              name="store_email"
              value={form.store_email}
              onChange={handleChange}
              placeholder="Store Email"
              className="border border-zinc-300 rounded-lg p-3"
            />

            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              className="border border-zinc-300 rounded-lg p-3"
            />

            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="border border-zinc-300 rounded-lg p-3"
            />

            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State"
              className="border border-zinc-300 rounded-lg p-3"
            />

            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Country"
              className="border border-zinc-300 rounded-lg p-3"
            />

            <input
              name="latitude"
              value={form.latitude}
              onChange={handleChange}
              placeholder="Latitude"
              className="border border-zinc-300 rounded-lg p-3"
            />

            <input
              name="longitude"
              value={form.longitude}
              onChange={handleChange}
              placeholder="Longitude"
              className="border border-zinc-300 rounded-lg p-3"
            />
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">Store Images</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">Logo</label>

              <input
                type="file"
                name="logo"
                accept="image/*"
                onChange={handleChange}
                className="border border-zinc-300 rounded-lg p-3 w-full"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Banner</label>

              <input
                type="file"
                name="banner"
                accept="image/*"
                onChange={handleChange}
                className="border border-zinc-300 rounded-lg p-3 w-full"
              />
            </div>
          </div>
        </div>

        <button
          disabled={isPending}
          className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 disabled:opacity-50"
        >
          {isPending ? "Creating..." : "Create Store"}
        </button>
      </form>
    </div>
  );
}
