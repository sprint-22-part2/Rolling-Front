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
  await teamClient.delete(`/recipients/${id}/`);
};

// 메시지 삭제하기
export const deleteMessage = async (messageId) => {
  await teamClient.delete(`/messages/${messageId}/`);
};

// 이모지 목록 가져오기
export const getReactions = async (recipientId) => {
  const response = await teamClient.get(
    `/recipients/${recipientId}/reactions/`
  );
  return response.data;
};

// 이모지 추가하기
export const postReaction = async (recipientId, emoji) => {
  const response = await teamClient.post(
    `/recipients/${recipientId}/reactions/`,
    {
      emoji: emoji,
      type: 'increase',
    }
  );
  return response.data;
};
