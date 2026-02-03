import { apiClient } from './axiosInstance';

export async function getRecipients(params) {
  const res = await apiClient.get('/recipients/', {
    params,
  });
  return res.data;
}

export async function getPopularRecipients(params) {
  return getRecipients({
    ...params,
    sort: 'like',
  });
}
