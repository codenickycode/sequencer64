import { useEffect, useState } from 'react';

export const useFadeIn = (show) => {
  const [fadeIn, setFadeIn] = useState(true);
  useEffect(() => {
    if (show) {
      setFadeIn(true);
    }
  }, [show]);

  const fadeOutThen = (cb) => {
    setFadeIn(false);
    setTimeout(cb, FADE_TIMEOUT);
  };

  const fadeInClass = fadeIn ? ' fade-in ' : ' fade-out';
  return { fadeInClass, fadeOutThen };
};

export const FADE_TIMEOUT = 250;
