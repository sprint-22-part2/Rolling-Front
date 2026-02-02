import { apiClient } from './axiosInstance';

export async function getReactions(recipientId, params) {
  const res = await apiClient.get(`/recipients/${recipientId}/reactions/`, {
    params: {
      ...params,
      limit: 2,
      offset: 3,
    },
  });
  return res.data;
}
