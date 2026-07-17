import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStore } from "../api/adminStoreDelete";
import { toast } from "react-hot-toast";

export const useDeleteStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStore,

    onSuccess: (data) => {
      toast.success(data.message || "Store deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};
