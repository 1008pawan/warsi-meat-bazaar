import { useQuery } from "@tanstack/react-query";
import { getDeliveryAgent } from "../api/registerDekiveryAgent";

export const useRegisterAgent = () => {
    return useQuery({
        queryKey: ["RegisterDeliveryAgent"],
        queryFn: getRegisterAgent,
    });
};
