import { useMutation } from "@tanstack/react-query";
import { adminLogin } from "../api/auth";

export const useAdminLogin = () => {
  return useMutation({
    mutationFn: adminLogin,
  });
};