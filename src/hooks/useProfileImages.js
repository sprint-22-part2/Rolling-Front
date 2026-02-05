import { useEffect, useState } from 'react';
import { getProfileImages } from '@/apis/profileImage';
import isRetryableError from '@/utils/isRetryableError';

const useProfileImages = () => {
  const [imageOptions, setImageOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    getProfileImages(controller.signal)
      .then((list) => {
        const normalized = list.map((url) => ({
          id: url,
          url,
        }));
        setImageOptions(normalized);
      })
      .catch((error) => {
        if (error?.code === 'ERR_CANCELED') {
          return;
        }
        console.error('Failed to fetch profile images:', error);
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

export default useProfileImages;
