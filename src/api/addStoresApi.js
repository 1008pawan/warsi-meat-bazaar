import api from "../components/config/privetApi";

export const createStore = async (formData) => {
  const { data } = await api.post(
    "/admin/stores/register",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};