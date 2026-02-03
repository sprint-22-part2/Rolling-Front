import { teamClient } from '@/apis/axiosInstance';

// 롤링페이퍼 대상 정보 가져오기
export const getRecipient = async (id) => {
  const response = await teamClient.get(`/recipients/${id}/`);
  return response.data;
};

// 메시지 목록 가져오기
export const getMessages = async (recipientId, limit = 8, offset = 0) => {
  const response = await teamClient.get(
    `/recipients/${recipientId}/messages/`,
    {
      params: {
        limit,
        offset,
      },
    }
  );
  return response.data;
};

// 롤링페이퍼 삭제하기
export const deleteRecipient = async (id) => {
  const response = await teamClient.delete(`/recipients/${id}/`);
  return response.data;
};

// 메시지 삭제하기
export const deleteMessage = async (messageId) => {
  const response = await teamClient.delete(`/messages/${messageId}/`);
  return response.data;
};
