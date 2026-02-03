import { shareKakao } from '@/utils/kakaoShare';

const useShareActions = () => {
  const shareKakaoLink = ({ title, description, imageUrl, webUrl }) => {
    shareKakao({
      title,
      description,
      imageUrl,
      webUrl,
    });
  };

  const copyUrl = (url) => {
    if (!url) {
      return;
    }
    navigator.clipboard.writeText(url);
  };

  return { shareKakaoLink, copyUrl };
};

export default useShareActions;
