import { useEffect, useState } from 'react';
import { getProfileImages } from '@/apis/profileImage';

const useProfileImages = () => {
  const [imageOptions, setImageOptions] = useState([]);

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
      });

    return () => {
      controller.abort();
    };
  }, []);

  return { imageOptions };
};

export default useProfileImages;
