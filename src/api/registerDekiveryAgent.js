import api from "../components/config/privetApi";

export const registerAgent = async (payload) => {
  const { data } = await api.post("/admin/delivery/register", payload);
  return data;
};