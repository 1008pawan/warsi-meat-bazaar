import api from "../components/config/privetApi";

export const getOffers = async () => {
  const { data } = await api.get("/admin/offers");
  return data;
};

export const createOffer = async (formData) => {
  const { data } = await api.post("/admin/offers/store", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const updateOffer = async (formData) => {
  const { data } = await api.post("/admin/offers/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const updateOfferStatus = async ({ offer_id, status }) => {
  const { data } = await api.post("/admin/offers/change_status", {
    offer_id,
    status,
  });

  return data;
};
