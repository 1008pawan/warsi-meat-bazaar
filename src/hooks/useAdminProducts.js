import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteVariantProduct,
} from "../api/adminProducts";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useProducts = (page) => {
  return useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts(page),
    keepPreviousData: true,
  });
};

export const useProductDetails = (id) => {
  return useQuery({
    queryKey: ["product-details", id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
};

export const useCreateProduct = (setErrors) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,

    onSuccess: (res) => {
      toast.success(res.message);

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      navigate("/admin/product");
    },

    onError: (err) => {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        toast.error(err.response?.data?.message || "Something went wrong");
      }
    },
  });
};

export const useUpdateProduct = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,

    onSuccess: (res) => {
      toast.success(res.message);

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      navigate("/admin/product");
    },

    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  });
};

export const useDeleteProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,

    onSuccess: (res) => {
      toast.success(res.message || "Products deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || "Something went wrong");
    },
  });
};

export const useDeleteVariantProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVariantProduct,

    onSuccess: (res) => {
      toast.success(res.message || "Products Variant deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      queryClient.invalidateQueries(["product-details"]);
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || "Something went wrong");
    },
  });
};
