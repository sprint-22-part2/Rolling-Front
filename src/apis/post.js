import axiosInstance from '@/apis/axiosInstance';

export const getBackgroundImages = async (signal) => {
  const response = await axiosInstance.get('/background-images/', { signal });
  return response?.data?.imageUrls ?? [];
};

export const createRecipient = async (team, data, signal) => {
  const response = await axiosInstance.post(`/${team}/recipients/`, data, {
    signal,
  });
  return response?.data;
};
