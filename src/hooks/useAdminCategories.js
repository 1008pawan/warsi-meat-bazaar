import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createSubCategory,
  getCategories,
  updateCategory,
} from "../api/adminCategories";
import { createCategory, deleteCategory } from "../api/adminCategories";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCategories = () => {
  return useQuery({
    queryKey: ["adminCategories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateCategory = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,

    onSuccess: (res) => {
      toast.success(res.message || "Category Created Successfuly");

      queryClient.invalidateQueries({
        queryKey: ["adminCategories"],
      });

      navigate("/admin/category");
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || "Something went wrong");
    },
  });
};

export const useSubCreateCategory = (id) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSubCategory,

    onSuccess: (res) => {
      toast.success(res.message || "Sub Category Created Successfuly");

      queryClient.invalidateQueries({
        queryKey: ["adminCategories"],
      });

      navigate(`/admin/category`);
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || "Something went wrong");
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,

    onSuccess: (res) => {
      toast.success("Category deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["adminCategories"],
      });
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || "Something went wrong");
    },
  });
};

export const useUpdateCategory = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,

    onSuccess: (res) => {
      toast.success(res.message || "Category updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["adminCategories"],
      });

      navigate("/admin/category");
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || "Something went wrong");
    },
  });
};
