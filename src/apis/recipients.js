import { apiClient } from './axiosInstance';

export async function getRecipients(params) {
  const res = await apiClient.get('/recipients/', {
    params,
  });
  return res.data;
}
