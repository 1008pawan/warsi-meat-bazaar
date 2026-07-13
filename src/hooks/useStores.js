import { useQuery } from "@tanstack/react-query";
import { fetchStores } from "../api/stores";

export const useStores = ({
  page = 1,
  status = "",
  storeStatus = "",
  search = "",
  perPage = 15,
}) => {
  return useQuery({
    queryKey: ["stores", page, status, storeStatus, search, perPage],
    queryFn: () =>
      fetchStores({
        page,
        status,
        storeStatus,
        search,
        perPage,
      }),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};
