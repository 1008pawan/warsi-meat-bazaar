import { useQuery } from "@tanstack/react-query";
import { getAllCustomer } from "../api/allCustomer";

export const useAllCustomer = () => {
  return useQuery({
    queryKey: ["AllCustomer"],
    queryFn: getAllCustomer,
  });
};
