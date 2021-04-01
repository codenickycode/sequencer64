import { useEffect, useState } from 'react';

export const useFadeIn = (show) => {
  const [fadeIn, setFadeIn] = useState(false);
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

// export const useCrossfade = () => {
//   const [fadeIn, setFadeIn] = useState(false);

//   const fadeInThen = (cb) => {
//     setFadeIn(true);
//     setTimeout(cb, FADE_TIMEOUT);
//   };

//   const fadeOutThen = (cb) => {
//     setFadeIn(false);
//     setTimeout(cb, FADE_TIMEOUT);
//   };

//   const fadeInClass = fadeIn ? ' fade-in ' : ' fade-out ';
//   const fadeOutClass = fadeIn ? ' fade-out ' : ' fade-in ';
//   return { fadeInClass, fadeOutClass, fadeInThen, fadeOutThen };
// };

export const FADE_TIMEOUT = 150;
