import { useQuery } from "@tanstack/react-query";
import { fetchRevenue } from "../api/adminRevenue";

export const useRevenue = () => {
  return useQuery({
    queryKey: ["revenue"],
    queryFn: fetchRevenue,
  });
};
