import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Store,
  Wallet,
  Smartphone,
  Building2,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { useRevenue } from "../../../hooks/useAdminRevenue";
import { STORAGE_URL } from "../../../components/config/publicApi";

const Revenue = () => {
  const { data: revenue, isLoading, error } = useRevenue();

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 rounded-2xl bg-gray-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!revenue.length) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border p-20 text-center">
        <Store className="mx-auto h-14 w-14 text-gray-300" />
        <h2 className="mt-4 text-xl font-bold">No Revenue Found</h2>
        <p className="text-gray-500 mt-2">
          Revenue information is not available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-gray-900">Revenue Dashboard</h1>

        <p className="text-gray-500 mt-1">Store Revenue Overview</p>
      </div>

      {revenue.map((store) => {
        const online = Number(store.online_revenue);
        const offline = Number(store.offline_revenue);
        const total = online + offline;

        const onlinePercent = total > 0 ? (online / total) * 100 : 0;
        const offlinePercent = total > 0 ? (offline / total) * 100 : 0;

        return (
          <div
            key={store.id}
            className="bg-white rounded-3xl shadow-sm border border-zinc-200 overflow-hidden"
          >
            <div className="relative h-[300px] overflow-hidden">
              <img
                src={`${STORAGE_URL}banners/Ip8XRI1HYuwg73sClwcw4tQYMeKyg4m03nazcE7Q.png`}
                alt="Store Banner"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/50" />

              <div className="absolute bottom-8 left-8 text-white">
                <h1 className="text-4xl md:text-5xl font-bold">{store.name}</h1>

                <p className="text-sm opacity-90">
                  {store.city}, {store.state}
                </p>
              </div>
            </div>

            <div className="p-8 space-y-8">
              {/* Revenue Cards */}

              <div className="grid md:grid-cols-3 gap-6">
                <div className="rounded-2xl border border-zinc-200 hover:shadow-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <Wallet className="text-green-600" />

                    <span className="text-xs text-gray-500">Total Revenue</span>
                  </div>

                  <h2 className="text-3xl font-bold mt-4">
                    ₹{total.toFixed(2)}
                  </h2>
                </div>

                <div className="rounded-2xl border border-zinc-200 hover:shadow-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <Smartphone className="text-blue-600" />

                    <span className="text-xs text-gray-500">
                      Online Revenue
                    </span>
                  </div>

                  <h2 className="text-3xl font-bold mt-4 text-blue-600">
                    ₹{online.toFixed(2)}
                  </h2>
                </div>

                <div className="rounded-2xl border border-zinc-200 hover:shadow-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <Building2 className="text-orange-600" />

                    <span className="text-xs text-gray-500">
                      Offline Revenue
                    </span>
                  </div>

                  <h2 className="text-3xl font-bold mt-4 text-orange-600">
                    ₹{offline.toFixed(2)}
                  </h2>
                </div>
              </div>

              {/* Breakdown */}

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="border border-zinc-200 hover:shadow-lg shadow-md rounded-2xl p-6">
                  <h3 className="font-bold text-lg mb-6">Revenue Breakdown</h3>

                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Online</span>

                        <span>{onlinePercent.toFixed(1)}%</span>
                      </div>

                      <div className="h-3 rounded-full bg-gray-200">
                        <div
                          className="h-3 rounded-full bg-blue-500"
                          style={{
                            width: `${onlinePercent}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Offline</span>

                        <span>{offlinePercent.toFixed(1)}%</span>
                      </div>

                      <div className="h-3 rounded-full bg-gray-200">
                        <div
                          className="h-3 rounded-full bg-orange-500"
                          style={{
                            width: `${offlinePercent}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Store Details */}

                <div className="border border-zinc-200 hover:shadow-lg shadow-md rounded-2xl p-6">
                  <h3 className="font-bold text-lg mb-6">Store Details</h3>

                  <div className="space-y-5">
                    <div className="flex gap-3">
                      <MapPin className="text-red-500 mt-1" />

                      <div>
                        <p className="text-sm text-gray-500">Address</p>

                        <p className="font-medium">{store.address}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Phone className="text-green-600 mt-1" />

                      <div>
                        <p className="text-sm text-gray-500">Phone</p>

                        <p>{store.phone}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Mail className="text-blue-600 mt-1" />

                      <div>
                        <p className="text-sm text-gray-500">Email</p>

                        <p>{store.email}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Store className="text-purple-600 mt-1" />

                      <div>
                        <p className="text-sm text-gray-500">Store Status</p>

                        <span className="inline-flex px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold text-sm">
                          {store.store_status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Revenue;
