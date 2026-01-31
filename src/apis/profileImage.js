import axiosInstance from './axiosInstance';

export const getProfileImages = async (signal) => {
  const response = await axiosInstance.get('/profile-images/', { signal });
  return response?.data?.imageUrls ?? [];
};
