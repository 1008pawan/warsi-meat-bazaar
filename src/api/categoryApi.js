import api from "../components/config/publicApi";

export const getCategories = async () => {
  const { data } = await api.get("/get_category");
  return data.data;
};

