import { useQuery } from "@tanstack/react-query";
import {
  ShoppingCart,
  Package,
  Users,
  Store,
  UserCheck,
  Truck,
  IndianRupee,
  Wallet,
  Eye,
} from "lucide-react";
import { useState } from "react";
import { useAllOrders } from "../../hooks/useAllOrders";
import DashboardListDetails from "../ui/DashboardListDetails";
import Pagination from "../ui/Pagination";

export default function AllOrders() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");

  const [listModal, setListModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const {
    data: allorders,
    isLoading,
    error,
  } = useAllOrders({
    page,
    status,
    perPage: 15,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 rounded-2xl bg-gray-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">Failed to load dashboard.</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Orders</h2>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="border rounded-xl px-4 py-2 bg-white text-zinc-500 cursor-pointer outline-none"
          >
            <option value="">All Orders</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="out_for_delivery">Out For Delivery</option>
            <option value="delivered">Delivered</option>
            {/* <option value="cancelled">Cancelled</option>
            <option value="rejected">Rejected</option> */}
          </select>
        </div>

        <div className="grid gap-3">
          {allorders?.data?.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {order.order_number}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(order.created_at).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div className="text-right">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>

                  <h2 className="text-xl font-bold mt-2">
                    ₹{Number(order.total).toFixed(2)}
                  </h2>
                </div>
              </div>

              <div className="grid md:grid-cols-5 grid-cols-2 gap-4 mt-5">
                <div>
                  <p className="text-xs text-gray-500">Customer</p>
                  <p className="font-semibold">
                    {order.customer?.name || order.shipping_address?.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Store</p>
                  <p className="font-semibold">{order.store?.name}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Payment</p>

                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                      order.payment_status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.payment_status}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Order Type</p>

                  <span className="inline-flex px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                    {order.type}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Action</p>

                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setListModal(true);
                    }}
                    className="flex items-center justify-center gap-2 cursor-pointer text-blue-500 hover:text-blue-600 p-1 px-2 bg-blue-200 rounded-lg"
                  >
                    <Eye size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Pagination
          currentPage={allorders?.meta?.current_page}
          totalPages={allorders?.meta?.last_page}
          totalItems={allorders?.meta?.total}
          perPage={allorders?.meta?.per_page}
          onPageChange={setPage}
        />
      </div>

      {listModal && (
        <DashboardListDetails
          order={selectedOrder}
          onClose={() => {
            setListModal(false);
            setSelectedOrder(null);
          }}
        />
      )}
    </div>
  );
}
