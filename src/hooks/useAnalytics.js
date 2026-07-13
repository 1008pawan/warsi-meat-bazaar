import { useQuery } from "@tanstack/react-query";
import { getAnalytics } from "../api/adminAnalytics";

export const useAnalytics = () => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: () => getAnalytics(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
