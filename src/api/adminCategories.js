import api from "../components/config/privetApi";

export const getCategories = async () => {
  const { data } = await api.get("/admin/categories");
  return data;
};

export const createCategory = async (formData) => {
  const { data } = await api.post("/admin/categories/store", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const createSubCategory = async (formData) => {
  const { data } = await api.post("/admin/categories/sub/store", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const deleteCategory = async (id) => {
  const { data } = await api.post("/admin/categories/delete", {
    category_id: id,
  });

  return data;
};

export const updateCategory = async ({ id, formData }) => {
  const { data } = await api.post(`/admin/categories/update`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    category_id: id,
  });

  return data;
};
