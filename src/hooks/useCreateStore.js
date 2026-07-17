import { useMutation } from "@tanstack/react-query";
import { createStore } from "../api/addStoresApi";

export const useCreateStore = () => {

  return useMutation({
    mutationFn: createStore,
  });
};
