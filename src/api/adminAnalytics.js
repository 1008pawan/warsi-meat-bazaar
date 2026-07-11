import api from "../components/config/privetApi";

export const getAnalytics = async () => {
  const { data } = await api.get(`/admin/store_summary`);

  return data;
};
