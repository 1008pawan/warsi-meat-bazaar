import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export function OrdersChart({ data = [] }) {
  const chartData = data.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    }),
    orders: Number(item.orders_count),
  }));

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg font-bold mb-5">Orders</h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="orders" fill="#dc2626" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
