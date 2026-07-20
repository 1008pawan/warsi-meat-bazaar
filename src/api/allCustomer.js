import api from "../components/config/privetApi";

export const getAllCustomer = async () => {
  const { data } = await api.get("/admin/users/users");
  return data.data;
};
