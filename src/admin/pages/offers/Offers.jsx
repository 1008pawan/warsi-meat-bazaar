import React, { useState } from "react";
import { useOffers, useUpdateOfferStatus } from "../../../hooks/useAdminOffers";
import { useNavigate } from "react-router-dom";
import { STORAGE_URL } from "../../../components/config/publicApi";
import { Plus } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";

const Offers = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const { data, isLoading } = useOffers();
  const { mutate: updateStatus, isPending } = useUpdateOfferStatus();

  const handleStatusToggle = (offer) => {
    updateStatus({
      offer_id: offer.id,
      status: offer.status === "active" ? "inactive" : "active",
    });
  };

  const offers =
    data?.data?.filter((item) => {
      const searchMatch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const statusMatch = status === "" || item.status === status;

      return searchMatch && statusMatch;
    }) || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Offers</h1>

          <p className="text-gray-500">Manage promotional offers</p>
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search offer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-gray-300 bg-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-52 border border-gray-300 bg-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button
            onClick={() => navigate("/admin/add-offer")}
            className="bg-red-600 hover:bg-red-700 hover:shadow-lg text-white px-5 py-3 rounded-xl flex items-center cursor-pointer"
          >
            <Plus size={22} /> Add Offer
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl duration-300"
          >
            <div className="relative h-52">
              <img
                src={
                  offer.image
                    ? `${STORAGE_URL}/${offer.image}`
                    : "/src/assets/images/no-image.png"
                }
                className="w-full h-full object-cover"
              />

              <div className="absolute top-4 left-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    offer.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {offer.status}
                </span>
              </div>

              {offer.is_first_order === 1 && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                    First Order
                  </span>
                </div>
              )}
            </div>

            <div className="p-5 space-y-5">
              <h2 className="text-lg font-bold line-clamp-2">{offer.title}</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-xs">Minimum Order</p>

                  <h3 className="font-bold text-red-600">
                    ₹{offer.min_amount}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500 text-xs">Reward</p>

                  <h3 className="font-semibold capitalize">
                    {offer.reward_type}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500 text-xs">Quantity</p>

                  <h3 className="font-semibold">
                    {offer.reward_qty} {offer.units}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500 text-xs">Created</p>

                  <h3 className="font-semibold">
                    {new Date(offer.created_at).toLocaleDateString()}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() =>
                    navigate(`/admin/update-offer/${offer.id}`, {
                      state: { offer },
                    })
                  }
                  className="flex-1 bg-red-600 hover:bg-red-700 font-semibold text-white rounded-xl py-2 cursor-pointer"
                >
                  Edit
                </button>

                <div className="flex justify-end items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusToggle(offer);
                    }}
                    className={`relative inline-flex h-7 w-14 items-center rounded-full cursor-pointer transition ${
                      offer.status === "active" ? "bg-yellow-500" : "bg-red-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 rounded-full bg-white transition ${
                        offer.status === "active"
                          ? "translate-x-8"
                          : "translate-x-1"
                      }`}
                    />
                  </button>

                  <span
                    className={`font-semibold ${
                      offer.status === "active"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {offer.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
