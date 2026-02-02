import { useEffect, useState } from 'react';
import { getBackgroundImages } from '@/apis/post';

const useBackgroundImages = () => {
  const [imageOptions, setImageOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    getBackgroundImages(controller.signal)
      .then((list) => {
        const normalized = list.map((url, index) => ({
          id: url,
          label: `배경 이미지 ${index + 1}`,
          url,
        }));
        setImageOptions(normalized);
      })
      .catch((error) => {
        if (error?.code === 'ERR_CANCELED') {
          return;
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return { imageOptions, isLoading };
};

export default useBackgroundImages;
