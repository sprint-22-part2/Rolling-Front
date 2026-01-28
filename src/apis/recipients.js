import axiosInstance from './axiosInstance';

export async function getRecipients(params) {
  const res = await axiosInstance.get('/recipients/', {
    params,
  });
  return res.data;
}
