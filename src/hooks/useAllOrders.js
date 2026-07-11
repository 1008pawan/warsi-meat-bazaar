import { useQuery } from "@tanstack/react-query";
import { fetchAllOrders } from "../api/allOrders";

export const useAllOrders = ({ page = 1, status = "", perPage }) => {
  return useQuery({
    queryKey: ["allorders", page, status, perPage],
    queryFn: () => fetchAllOrders({ page, status, perPage }),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};
