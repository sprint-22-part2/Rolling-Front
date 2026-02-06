import { useEffect, useRef } from 'react';

export default function useInfiniteScroll(callback, hasNext, isLoading) {
  const targetRef = useRef(null);

  useEffect(() => {
    if (isLoading || !hasNext) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
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
  }, [callback, hasNext, isLoading]);

  return targetRef;
}
