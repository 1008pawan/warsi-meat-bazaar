import { useQuery } from "@tanstack/react-query";
import { getActivityLogs } from "../api/adminActivity";

export const useActivityLogs = (page, per) => {
  return useQuery({
    queryKey: ["activity-logs", page, per],
    queryFn: () => getActivityLogs(page, per),
    placeholderData: (previous) => previous,
  });
};