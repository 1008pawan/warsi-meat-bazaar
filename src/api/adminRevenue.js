import api from "../components/config/privetApi";

export const fetchRevenue = async () => {
  const { data } = await api.get("/admin/store_revenue");
  return data.data;
};
