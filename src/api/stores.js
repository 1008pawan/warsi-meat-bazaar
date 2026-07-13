import api from "../components/config/privetApi";

export const fetchStores = async ({
  page = 1,
  status = "",
  storeStatus = "",
  search = "",
  perPage = 15,
}) => {
  const { data } = await api.get("/admin/stores", {
    params: {
      page,
      per_page: perPage,
      ...(status && { status }),
      ...(storeStatus && { store_status: storeStatus }),
      ...(search && { search }),
    },
  });

  return data;
};
