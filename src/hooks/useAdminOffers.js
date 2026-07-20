import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getOffers,
  createOffer,
  updateOffer,
  updateOfferStatus,
} from "../api/adminOffers";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useOffers = () => {
  return useQuery({
    queryKey: ["adminoffers"],
    queryFn: getOffers,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateOffer = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOffer,

    onSuccess: (res) => {
      toast.success(res.message || "Offer Created Successfully");

      queryClient.invalidateQueries({
        queryKey: ["adminoffers"],
      });

      navigate("/admin/offers");
    },

    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  });
};

export const useUpdateOffer = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOffer,

    onSuccess: (res) => {
      toast.success(res.message || "Offer Updated Successfully");

      queryClient.invalidateQueries({
        queryKey: ["adminoffers"],
      });

      navigate("/admin/offers");
    },

    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  });
};

export const useUpdateOfferStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOfferStatus,

    onSuccess: (res) => {
      toast.success(res.message || "Status Updated Successully");

      queryClient.invalidateQueries({
        queryKey: ["adminoffers"],
      });
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to update status");
    },
  });
};
