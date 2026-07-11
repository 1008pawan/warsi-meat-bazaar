import api from "../components/config/privetApi";

export const fetchAllOrders = async ({
  page = 1,
  status = "",
  perPage = 15,
}) => {
  const { data } = await api.get("/admin/orders", {
    params: {
      page,
      per_page: perPage,
      ...(status && { status }),
    },
  });

  return data;
};
