import { useEffect, useRef } from 'react';

export default function useInfiniteScroll(callback, hasNext, isLoading) {
  const targetRef = useRef(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (isLoading || !hasNext) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          savedCallback.current();
        }
      },
      { threshold: 1 }
    );

    const target = targetRef.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [hasNext, isLoading]);

  return targetRef;
}
