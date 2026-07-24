import api from "../components/config/privetApi";

export const getProducts = async (page = 1) => {
  const { data } = await api.get(`/admin/variants/list/products?page=${page}`);
  return data;
};

export const getProduct = async (id) => {
  const { data } = await api.get(`/admin/variants/products/${id}`);
  return data;
};

export const createProduct = async (formData) => {
  const { data } = await api.post("/admin/variants/product/store", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const updateProduct = async (formData) => {
  const { data } = await api.post("/admin/variants/products/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const deleteProduct = async (groupId) => {
  const { data } = await api.post("/admin/variants/products/delete", {
    group_id: groupId,
  });

  return data;
};

export const deleteVariantProduct = async (VariantId) => {
  const { data } = await api.post("/admin/variants/products/variant/delete", {
    variant_id: VariantId,
  });

  return data;
};
