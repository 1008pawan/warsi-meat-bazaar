import { useQuery } from "@tanstack/react-query";
import { getActivityLogs } from "../api/adminActivity";

export const useActivityLogs = () => {
  return useQuery({
    queryKey: ["activityLogs"],
    queryFn: getActivityLogs,
    staleTime: 1000 * 60 * 5,
  });
};