import { apiClient, teamClient } from '@/apis/axiosInstance';

export const getBackgroundImages = async (signal) => {
  const response = await apiClient.get('/background-images/', { signal });
  return response?.data?.imageUrls ?? [];
};

export const createRecipient = async (data) => {
  const response = await teamClient.post('/recipients/', data);
  return response?.data;
};
