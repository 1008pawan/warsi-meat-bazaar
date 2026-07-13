import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../api/changePassawordModal";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};