import { useState } from "react";
import { Eye } from "lucide-react";
import { useAllOrders } from "../../hooks/useAllOrders";
import DashboardListDetails from "../ui/DashboardListDetails";
import Pagination from "../ui/Pagination";

export default function AllOrders() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [listModal, setListModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { data: allorders, isLoading, error } = useAllOrders({
    page, status, perPage: 15, });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-32 w-full rounded-2xl bg-gray-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-600 font-medium">Failed to load orders.</div>;
  }

  return (
    <div className="space-y-6">
     

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">All Orders</h2>
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="border border-gray-200 rounded-xl px-4 py-2.5 bg-white text-gray-600 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
        >
          <option value="">All Orders</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipped">Shipped</option>
          <option value="out_for_delivery">Out For Delivery</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

     
      <div className="grid gap-4">
        {allorders?.data?.length > 0 ? (
          allorders.data.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{order.order_number}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(order.created_at).toLocaleString("en-IN", {
                      day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${order.status === "delivered" ? "bg-green-100 text-green-700" :
                      order.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                    }`}>
                    {order.status?.replace('_', ' ')}
                  </span>
                  <h2 className="text-lg font-bold mt-2 text-gray-900">₹{Number(order.total || 0).toFixed(2)}</h2>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 border-t border-gray-50 pt-4">
                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Customer</p>
                  <p className="font-medium text-sm text-gray-700 truncate">{order.customer?.name || order.shipping_address?.name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Store</p>
                  <p className="font-medium text-sm text-gray-700">{order.store?.name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Payment</p>
                  <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${order.payment_status === "paid" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                    }`}>
                    {order.payment_status?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Type</p>
                  <p className="font-medium text-sm text-blue-600">{order.type || "N/A"}</p>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => { setSelectedOrder(order); setListModal(true); }}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors border border-blue-100"
                  >
                    <Eye size={16} /> Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-gray-500">No orders found.</div>
        )}
      </div>

      
      <Pagination
        currentPage={allorders?.meta?.current_page}
        totalPages={allorders?.meta?.last_page}
        totalItems={allorders?.meta?.total}
        perPage={allorders?.meta?.per_page}
        onPageChange={setPage}
      />

     
      {listModal && (
        <DashboardListDetails
          order={selectedOrder}
          onClose={() => { setListModal(false); setSelectedOrder(null); }}
        />
      )}
    </div>
  );
}