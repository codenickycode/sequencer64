import { useEffect, useState } from 'react';

export const useFadeIn = (show) => {
  const [fadeIn, setFadeIn] = useState(true);
  useEffect(() => {
    if (show) {
      setFadeIn(false);
    } else {
      setFadeIn(true);
    }
  }, [show]);

  const fadeInClass = fadeIn ? ' fade-in ' : '';
  return { fadeInClass };
};
