import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStore } from "../api/addStoresApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCreateStore = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createStore,

    onSuccess: (res) => {
      toast.success(res.message || "Store Created");
      queryClient.invalidateQueries({
        queryKey: ["stores"],
      });
      navigate("/admin/stores");
    },

    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  });
};
