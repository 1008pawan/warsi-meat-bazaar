import { X } from "lucide-react";
import { STORAGE_URL } from "../../components/config/publicApi";
import Info from "./Info";

const StoreDetailsModal = ({ store, onClose }) => {
  if (!store) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto scrollbar-thin">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Store Details</h2>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl cursor-pointer"
          >
            <X />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <img
            src={`${STORAGE_URL}/${store.banner}`}
            className="w-full h-64 object-cover rounded-2xl"
          />

          <div className="flex items-center gap-6">
            <img
              src={`${STORAGE_URL}/${store.logo}`}
              className="h-28 w-28 rounded-xl object-cover border border-zinc-200"
            />

            <div>
              <h2 className="text-3xl font-bold">{store.name}</h2>

              <p className="text-gray-500">{store.slug}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <Info title="Owner" value={store.owner?.name} />
            <Info title="Owner Email" value={store.owner?.email} />
            <Info title="Store Phone" value={store.phone} />
            <Info title="Store Email" value={store.email} />
            <Info title="Status" value={store.status} />
            <Info title="Store Status" value={store.store_status} />
            <Info title="Rating" value={store.rating} />
            <Info title="Reviews" value={store.total_reviews} />
            <Info title="Commission" value={`${store.commission_rate}%`} />
            <Info title="Featured" value={store.is_featured ? "Yes" : "No"} />
            <Info title="Latitude" value={store.latitude} />
            <Info title="Longitude" value={store.longitude} />
            <Info title="City" value={store.city} />
            <Info title="State" value={store.state} />
            <Info title="Country" value={store.country} />
            <Info title="Pincode" value={store.pincode} />
            <Info
              title="Created"
              value={new Date(store.created_at).toLocaleString()}
            />
            <Info
              title="Updated"
              value={new Date(store.updated_at).toLocaleString()}
            />
          </div>

          <div className="bg-gray-100 rounded-2xl p-5">
            <h3 className="font-semibold mb-2">Address</h3>

            <p className="break-words">{store.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetailsModal;
