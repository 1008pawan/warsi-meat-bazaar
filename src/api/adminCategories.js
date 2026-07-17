import api from "../components/config/privetApi";

export const getCategories = async () => {
  const { data } = await api.get("/admin/categories");
  return data;
};
