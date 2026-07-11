import { useQuery } from "@tanstack/react-query";
import { getAdminProfile } from "../api/adminProfile";

export const useProfile = () => {
  return useQuery({
    queryKey: ["Profile"],
    queryFn: getAdminProfile,
  });
};
