import { teamClient } from './axiosInstance';

export async function getRecipients(params) {
  const res = await teamClient.get('/recipients/', {
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
