import React, { useEffect, useState,useCallback } from 'react';

const useIntersect = (onIntersect, option) => {
  const [ref, setRef] = useState(null);
  const checkIntersect = useCallback(([entry], observer) => {
    if (entry.isIntersecting) {
      onIntersect(entry, observer);
    }
  }, []);
  useEffect(() => {
    let observer;
    if (ref) {
      observer = new IntersectionObserver(checkIntersect, {
        root:null,
        threshold: 0,
        rootMargin: '200px',
      });
      observer.observe(ref);
    }
    return () => observer && observer.disconnect();
  }, [ref, checkIntersect]);
  return [ref, setRef];
};
export default useIntersect