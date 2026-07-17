import { useCreateStore } from "../../../hooks/useCreateStore";
import toast from "react-hot-toast";
import { useState } from "react";
import React from "react";
import { ArrowLeft, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const { mutate, isPending } = useCreateStore();

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm((prev) => ({
          ...prev,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        }));

        toast.success("Location fetched successfully.");
      },
      (error) => {
        let message = "Unable to fetch location.";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = "Location permission denied.";
            break;
          case error.POSITION_UNAVAILABLE:
            message = "Location unavailable.";
            break;
          case error.TIMEOUT:
            message = "Location request timed out.";
            break;
        }

        toast.error(message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    const fieldValue = files ? files[0] : value;

    setForm((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
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
        queryClient.invalidateQueries({
          queryKey: ["stores"],
        });
        setErrors({});
        navigate("/admin/stores");
      },

      onError: (err) => {
        if (err.response?.data?.errors) {
          setErrors(err.response.data.errors);
        }
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
        <h1 className="text-3xl font-bold">Register Store</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Owner */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">Owner Details</h2>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Owner Name"
                className={`border rounded-lg p-3 w-full ${
                  errors.name ? "border-red-500" : "border-zinc-300"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name[0]}</p>
              )}
            </div>

            <div>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Owner Email"
                className={`border rounded-lg p-3 w-full ${
                  errors.email ? "border-red-500" : "border-zinc-300"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email[0]}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className={`border rounded-lg p-3 w-full ${
                  errors.password ? "border-red-500" : "border-zinc-300"
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password[0]}
                </p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password_confirmation"
                value={form.password_confirmation}
                onChange={handleChange}
                placeholder="Confirm Password"
                className={`border rounded-lg p-3 w-full ${
                  errors.password ? "border-red-500" : "border-zinc-300"
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password[0]}
                </p>
              )}
            </div>

            <div>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className={`border rounded-lg p-3 w-full ${
                  errors.phone ? "border-red-500" : "border-zinc-300"
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone[0]}</p>
              )}
            </div>
          </div>
        </div>

        {/* Store */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">Store Details</h2>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <input
                name="store_name"
                value={form.store_name}
                onChange={handleChange}
                placeholder="Store Name"
                className={`border rounded-lg p-3 w-full ${
                  errors.store_name ? "border-red-500" : "border-zinc-300"
                }`}
              />
              {errors.store_name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.store_name[0]}
                </p>
              )}
            </div>

            <div>
              <input
                name="store_phone"
                value={form.store_phone}
                onChange={handleChange}
                placeholder="Store Phone"
                className={`border rounded-lg p-3 w-full ${
                  errors.store_phone ? "border-red-500" : "border-zinc-300"
                }`}
              />
              {errors.store_phone && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.store_phone[0]}
                </p>
              )}
            </div>

            <div>
              <input
                name="store_email"
                value={form.store_email}
                onChange={handleChange}
                placeholder="Store Email"
                className={`border rounded-lg p-3 w-full ${
                  errors.store_email ? "border-red-500" : "border-zinc-300"
                }`}
              />
              {errors.store_email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.store_email[0]}
                </p>
              )}
            </div>

            <div>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                className={`border rounded-lg p-3 w-full ${
                  errors.address ? "border-red-500" : "border-zinc-300"
                }`}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-500">{errors.address[0]}</p>
              )}
            </div>

            <div>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className={`border rounded-lg p-3 w-full ${
                  errors.city ? "border-red-500" : "border-zinc-300"
                }`}
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-500">{errors.city[0]}</p>
              )}
            </div>

            <div>
              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="State"
                className={`border rounded-lg p-3 w-full ${
                  errors.state ? "border-red-500" : "border-zinc-300"
                }`}
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-500">{errors.state[0]}</p>
              )}
            </div>

            <div>
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Country"
                className={`border rounded-lg p-3 w-full ${
                  errors.country ? "border-red-500" : "border-zinc-300"
                }`}
              />
              {errors.country && (
                <p className="mt-1 text-sm text-red-500">{errors.country[0]}</p>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-2">
              <label className="font-medium">Store Location</label>

              <button
                type="button"
                onClick={getCurrentLocation}
                className="px-4 py-2 flex items-center gap-2 cursor-pointer rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                <MapPin size={18} /> Use Current Location
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <input
                  name="latitude"
                  value={form.latitude}
                  onChange={handleChange}
                  placeholder="Latitude"
                  className={`border rounded-lg p-3 w-full ${
                    errors.latitude ? "border-red-500" : "border-zinc-300"
                  }`}
                  readOnly
                />
              </div>

              <div>
                <input
                  name="longitude"
                  value={form.longitude}
                  onChange={handleChange}
                  placeholder="Longitude"
                  className={`border rounded-lg p-3 w-full ${
                    errors.longitude ? "border-red-500" : "border-zinc-300"
                  }`}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">Store Images</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">Logo</label>

              <div>
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleChange}
                  className="border border-zinc-300 rounded-lg p-3 w-full"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">Banner</label>

              <div>
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
        </div>

        <div className="flex justify-end items-center">
          <button
            disabled={isPending}
            className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 disabled:opacity-50 cursor-pointer"
          >
            {isPending ? "Creating..." : "Create Store"}
          </button>
        </div>
      </form>
    </div>
  );
}
