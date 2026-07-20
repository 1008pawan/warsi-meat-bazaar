import api from "../components/config/privetApi";

export const getActivityLogs = async () => {
  const { data } = await api.get("/admin/activity-logs");
  return data;
};