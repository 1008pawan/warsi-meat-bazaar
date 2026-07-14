import { useQuery } from "@tanstack/react-query";
import { getDeliveryAgent } from "../api/deliveryAgent";

export const useDeliveryAgent = () => {
    return useQuery({
        queryKey: ["Delivery"],
        queryFn: getDeliveryAgent,
    });
};
