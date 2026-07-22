import api from "../components/config/privetApi";

export const getActivityLogs = async (page = 1, per = 10) => {
  const { data } = await api.get(
    `/admin/activity-logs/?per=${per}&page=${page}`
  );

  return data;
};