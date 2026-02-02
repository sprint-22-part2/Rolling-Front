import { apiClient } from './axiosInstance';

export const getProfileImages = async (signal) => {
  const response = await apiClient.get('/profile-images/', { signal });
  return response?.data?.imageUrls ?? [];
};
