import RevenueChart from "../../ui/analytics/RevenueChart";
import { OrdersChart } from "../../ui/analytics/OrdersChart";
import { useAnalytics } from "../../../hooks/useAnalytics";
import { OnlineNOfflineChart } from "../../ui/analytics/OnlineNOfflineChart";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Analytics = () => {
  const navigate = useNavigate();
  const { data: analytics, isLoading, error } = useAnalytics();

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
      <div className="text-red-500 text-center">Something went wrong.</div>
    );
  }

  const chartData = analytics?.data || [];

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span
          onClick={() => navigate(-1)}
          className="hover:text-red-500 cursor-pointer"
        >
          <ArrowLeft />
        </span>

        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <RevenueChart data={chartData} />
        <OrdersChart data={chartData} />
      </div>

      <div className="mt-6">
        <OnlineNOfflineChart data={chartData} />
      </div>
    </div>
  );
};

export default Analytics;
