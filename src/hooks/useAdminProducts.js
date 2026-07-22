import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts, getProduct, createProduct } from "../api/adminProducts";

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
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,

    onSuccess: (res) => {
      toast.success(res.message);

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      navigate("/admin/products");
    },

    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  });
};

// export const useUpdateProduct = () => {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: updateProduct,

//     onSuccess: (res) => {
//       toast.success(res.message);

//       queryClient.invalidateQueries({
//         queryKey: ["products"],
//       });

//       navigate("/admin/products");
//     },

//     onError: (err) => {
//       toast.error(err.response?.data?.message || "Something went wrong");
//     },
//   });
// };

// export const useDeleteProduct = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: deleteProduct,

//     onSuccess: (res) => {
//       toast.success(res.message);

//       queryClient.invalidateQueries({
//         queryKey: ["products"],
//       });
//     },

//     onError: (err) => {
//       toast.error(err.response?.data?.message || "Delete failed");
//     },
//   });
// };
