import axiosInstance from '@/apis/axiosInstance';

export const getBackgroundImages = async (signal) => {
  const response = await axiosInstance.get('/background-images/', { signal });
  return response?.data?.imageUrls ?? [];
};
