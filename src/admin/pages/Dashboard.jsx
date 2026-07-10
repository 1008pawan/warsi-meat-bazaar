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
} from "lucide-react";
import { useDashboard } from "../../hooks/useAdminDashboard";

export default function Dashboard() {
  const { data: dashboard, isLoading, error } = useDashboard();

  const stats = [
    {
      title: "Total Users",
      value: dashboard?.stats?.total_users ?? 0,
      icon: Users,
      color: "bg-blue-600",
    },
    {
      title: "Vendors",
      value: dashboard?.stats?.total_vendors ?? 0,
      icon: UserCheck,
      color: "bg-purple-600",
    },
    {
      title: "Customers",
      value: dashboard?.stats?.total_customers ?? 0,
      icon: Users,
      color: "bg-black",
    },
    {
      title: "Delivery Agents",
      value: dashboard?.stats?.total_delivery_agents ?? 0,
      icon: Truck,
      color: "bg-orange-500",
    },
    {
      title: "Stores",
      value: dashboard?.stats?.total_stores ?? 0,
      icon: Store,
      color: "bg-green-600",
    },
    {
      title: "Products",
      value: dashboard?.stats?.total_products ?? 0,
      icon: Package,
      color: "bg-yellow-500",
    },
    {
      title: "Orders",
      value: dashboard?.stats?.total_orders ?? 0,
      icon: ShoppingCart,
      color: "bg-red-600",
    },
    {
      title: "Pending Orders",
      value: dashboard?.stats?.pending_orders ?? 0,
      icon: ShoppingCart,
      color: "bg-amber-500",
    },
    {
      title: "Online Revenue",
      value: `₹${dashboard?.stats?.online_revenue ?? 0}`,
      icon: IndianRupee,
      color: "bg-emerald-600",
    },
    {
      title: "Offline Revenue",
      value: `₹${dashboard?.stats?.offline_revenue ?? 0}`,
      icon: Wallet,
      color: "bg-indigo-600",
    },
    {
      title: "Total Revenue",
      value: `₹${dashboard?.stats?.total_revenue ?? 0}`,
      icon: IndianRupee,
      color: "bg-teal-600",
    },
    {
      title: "Commission",
      value: `₹${dashboard?.stats?.total_commission ?? 0}`,
      icon: Wallet,
      color: "bg-pink-600",
    },
  ];

  const orders = dashboard?.recent_orders ?? [];

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        Loading Dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">Failed to load dashboard.</div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    {item.value}
                  </h2>
                </div>

                <div className={`${item.color} rounded-xl p-4 text-white`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="rounded-2xl bg-white shadow-sm">
        <div className="px-6 py-4">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
        </div>

        <div className="grid gap-3 p-3 bg-zinc-100">
          {orders.map((order) => (
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

              <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mt-5">
                <div>
                  <p className="text-xs text-gray-500">Customer</p>
                  <p className="font-semibold">
                    {order.customer?.name || order.shipping_address?.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {order.customer?.phone}
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
              </div>

              {/* Products */}

              <div className="mt-5">
                <p className="font-semibold mb-3">Products</p>

                <div className="flex flex-wrap gap-2">
                  {order.items?.map((item) => (
                    <div
                      key={item.id}
                      className="bg-gray-100 rounded-xl px-3 py-2"
                    >
                      <p className="text-sm font-medium">{item.product_name}</p>

                      <p className="text-xs text-gray-500">
                        Qty : {item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h2 className="text-xl font-bold mb-5">Monthly Revenue</h2>

        <div className="space-y-4">
          {dashboard?.monthly_revenue?.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border rounded-xl p-4"
            >
              <div>
                <p className="font-semibold">
                  {new Date(item.year, item.month - 1).toLocaleString(
                    "default",
                    {
                      month: "long",
                    },
                  )}{" "}
                  {item.year}
                </p>

                <p className="text-sm text-gray-500">{item.orders} Orders</p>
              </div>

              <h2 className="text-xl font-bold text-green-600">
                ₹{Number(item.revenue).toLocaleString()}
              </h2>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-6 mt-8">
        <h2 className="text-xl font-bold mb-5">Top Stores</h2>

        <div className="space-y-4">
          {dashboard?.top_stores?.map((store) => (
            <div
              key={store.id}
              className="flex justify-between items-center border rounded-xl p-4 hover:bg-gray-50"
            >
              <div>
                <h3 className="font-semibold">{store.name}</h3>

                <p className="text-sm text-gray-500">
                  {store.city}, {store.state}
                </p>

                <p className="text-xs text-gray-400">
                  {store.orders_count} Orders
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-green-600">
                  ₹{Number(store.total_revenue).toLocaleString()}
                </p>

                <p className="text-xs text-gray-500">
                  Online ₹{store.online_revenue}
                </p>

                <p className="text-xs text-gray-500">
                  Offline ₹{store.offline_revenue}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-6 mt-8">
        <h2 className="text-xl font-bold mb-5">Top Selling Products</h2>

        <div className="space-y-4">
          {dashboard?.top_products?.map((item) => (
            <div key={item.product_id} className="border rounded-xl p-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">{item.product?.name}</h3>

                  <p className="text-sm text-gray-500">
                    Stock : {item.product?.stock}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold">
                    ₹{Number(item.total_revenue).toLocaleString()}
                  </p>

                  <p className="text-sm text-gray-500">
                    Sold : {item.units_sold}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-6 mt-8">
        <h2 className="text-xl font-bold mb-5">Top Categories</h2>

        <div className="space-y-4">
          {dashboard?.top_categories?.map((cat) => (
            <div
              key={cat.category_id}
              className="flex justify-between border rounded-xl p-4"
            >
              <div>
                <h3 className="font-semibold">{cat.category_name}</h3>

                <p className="text-sm text-gray-500">
                  {cat.units_sold} Units Sold
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-green-600">
                  ₹{Number(cat.total_revenue).toLocaleString()}
                </p>

                <p className="text-xs text-gray-500">
                  Online ₹{cat.online_revenue}
                </p>

                <p className="text-xs text-gray-500">
                  Offline ₹{cat.offline_revenue}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
