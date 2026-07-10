import { useQuery } from "@tanstack/react-query";
import { getAdminDashboard } from "../api/adminDashboard";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getAdminDashboard,
  });
};
