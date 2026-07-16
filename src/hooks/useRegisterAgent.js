import { useMutation } from "@tanstack/react-query";
import { registerAgent } from "../api/registerDekiveryAgent";

export const useRegisterAgent = () => {
    return useMutation({
       // 'registerAgent' ki jagah 'getDeliveryAgent' likhein
       mutationFn: registerAgent,
    });
};