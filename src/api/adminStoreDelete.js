import api from "../components/config/privetApi";

export const deleteStore = async (store_id) => {
  const { data } = await api.delete(`/admin/stores/${store_id}`);

  return data;
};
