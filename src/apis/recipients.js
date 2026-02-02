import { apiClient } from './axiosInstance';

export async function getRecipients(params) {
  const res = await apiClient.get('/recipients/', {
    params,
  });
  return res.data;
}

export async function getPopularRecipients(params) {
  const res = await apiClient.get('/recipients/', {
    params: {
      ...params,
      sort: 'like',
    },
  });
  return res.data;
}
