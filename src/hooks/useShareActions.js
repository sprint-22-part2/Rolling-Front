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

  const copyUrl = async (url) => {
    if (!url) {
      return;
    }
    await navigator.clipboard.writeText(url);
  };

  return { shareKakaoLink, copyUrl };
};

export default useShareActions;
