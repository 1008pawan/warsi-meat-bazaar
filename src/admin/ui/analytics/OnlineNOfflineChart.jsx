import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
} from "recharts";

export function OnlineNOfflineChart ({ data = [] }) {
  const online = data.reduce(
    (sum, item) => sum + Number(item.online_earning),
    0,
  );

  const offline = data.reduce(
    (sum, item) => sum + Number(item.offline_earning),
    0,
  );

  const chartData = [
    { name: "Online", value: online },
    { name: "Offline", value: offline },
  ];

  const COLORS = ["#e7000b", "#ffdf20"];

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg font-bold mb-5">Online vs Offline Revenue</h2>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie data={chartData} dataKey="value" outerRadius={110} label>
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
