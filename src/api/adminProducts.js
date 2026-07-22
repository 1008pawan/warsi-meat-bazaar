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

// export const updateProduct = async (formData) => {
//   const { data } = await api.post("/admin/products/update", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return data;
// };

// export const deleteProduct = async (product_id) => {
//   const { data } = await api.post("/admin/products/delete", {
//     product_id,
//   });

//   return data;
// };

// export const changeProductStatus = async ({ product_id, status }) => {
//   const { data } = await api.post("/admin/products/status", {
//     product_id,
//     status,
//   });

//   return data;
// };
