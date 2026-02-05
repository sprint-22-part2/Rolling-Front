import { useEffect, useState } from 'react';
import { getBackgroundImages } from '@/apis/post';
import isRetryableError from '@/utils/isRetryableError';

const useBackgroundImages = () => {
  const [imageOptions, setImageOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
        console.error('Failed to fetch background images:', error);
        if (isRetryableError(error)) {
          setError(error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  if (error) {
    throw error;
  }

  return { imageOptions, isLoading };
};

export default useBackgroundImages;
