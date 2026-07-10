import api from "../components/config/privetApi";

export const getAdminDashboard = async () => {
  const { data } = await api.get("/admin/dashboard");
  return data.data;
};
