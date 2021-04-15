import { useEffect, useState } from 'react';

const NUM_SCROLLS = 3;

export const useInitialScroll = (containerRef, scrollPosition) => {
  const [initialState, setInitialState] = useState(true);
  useEffect(() => {
    if (initialState) {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        containerRef.current.scrollTo({
          left: width * scrollPosition,
          behavior: 'smooth',
        });
        setInitialState(false);
      }
    }
  }, [initialState, containerRef, scrollPosition]);
};

export const getFullyScrolled = (container) => {
  const leftFullyScrolled = container.scrollLeft <= 0;
  const scrollRight = container.scrollLeft + container.clientWidth;
  const fullWidth = NUM_SCROLLS * container.clientWidth;
  const rightFullyScrolled = scrollRight >= fullWidth;
  return { left: leftFullyScrolled, right: rightFullyScrolled };
};

export const getScrollToLeft = (container, dir) => {
  let offset = container.clientWidth;
  if (dir === 'left') offset *= -1;
  const start = container.scrollLeft;
  const left = start + offset;
  return left;
};
