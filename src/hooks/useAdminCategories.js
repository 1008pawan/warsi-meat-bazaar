import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/adminCategories";

export const useCategories = () => {
  return useQuery({
    queryKey: ["adminCategories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5,
  });
};
