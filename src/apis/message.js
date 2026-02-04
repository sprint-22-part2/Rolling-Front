import { teamClient } from '@/apis/axiosInstance';

export const createMessage = async (recipientId, data) => {
  const response = await teamClient.post(
    `/recipients/${recipientId}/messages/`,
    data
  );
  return response?.data;
};
