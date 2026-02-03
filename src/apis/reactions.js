import { apiClient } from './axiosInstance';

export async function getReactions(recipientId, params) {
  const res = await apiClient.get(`/recipients/${recipientId}/reactions/`, {
    params,
  });
  return res.data;
}
