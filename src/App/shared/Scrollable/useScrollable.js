import { useRef, useState } from 'react';
import { getFullyScrolled, getScrollToLeft, useInitialScroll } from './scrollHelpers';
import { useCallWhenDone } from 'utils/hooks/useCallWhenDone';

export const useScrollable = () => {
  const containerRef = useRef(null);
  useInitialScroll(containerRef, 1);

  const [disabled, setDisabled] = useState({ left: false, right: false });

  const enableScroll = () => {
    setDisabled({ left: false, right: false });
  };

  const disableScroll = () => {
    const fullyScrolled = getFullyScrolled(containerRef.current);
    if (fullyScrolled.left) setDisabled({ ...disabled, left: true });
    if (fullyScrolled.right) setDisabled({ ...disabled, right: true });
  };

  const callWhenDone = useCallWhenDone();
  const onScroll = (disableDelay = 100) => {
    enableScroll();
    callWhenDone(disableScroll, disableDelay);
  };

  const tapToScroll = (dir) => {
    onScroll(500);
    const left = getScrollToLeft(containerRef.current, dir);
    containerRef.current.scrollTo({ left, behavior: 'smooth' });
  };

  return { containerRef, onScroll, tapToScroll, disabled };
};
