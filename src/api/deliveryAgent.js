import api from "../components/config/privetApi";

export const getDeliveryAgent = async () => {
  const { data } = await api.get("/admin/delivery/list");

  return data;
};
