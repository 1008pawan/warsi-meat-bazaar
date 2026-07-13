import api from "../components/config/privetApi";

export const changePassword = async (payload) => {
  const { data } = await api.post("/admin/change-password", payload);
  return data;
};