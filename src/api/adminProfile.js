import api from "../components/config/privetApi";

export const getAdminProfile = async () => {
  const { data } = await api.get("/admin/me");
  return data.data;
};
