import api from "../components/config/privetApi";

export const adminLogin = async (payload) => {
  const { data } = await api.post("/admin/login", payload);
  return data;
};