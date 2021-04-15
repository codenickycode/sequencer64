import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'assets/icons';
import {
  getFullyScrolled,
  getScrollToLeft,
  useInitialScroll,
} from './scrollHelpers';
import { Button } from 'App/shared/Button';
import { useCallWhenDone } from 'utils/hooks/useCallWhenDone';

export const Scrollable = ({ id, style, children }) => {
  const containerRef = useRef(null);
  useInitialScroll(containerRef, 1);

  const [disabled, setDisabled] = useState({ left: false, right: false });

  const enableScroll = () => {
    setDisabled({ left: false, right: false });
  };

  const disableScroll = useCallback(() => {
    const fullyScrolled = getFullyScrolled(containerRef.current);
    if (fullyScrolled.left) setDisabled({ ...disabled, left: true });
    if (fullyScrolled.right) setDisabled({ ...disabled, right: true });
  }, [disabled]);

  const callWhenDone = useCallWhenDone();
  const onScroll = useCallback(
    (disableDelay = 100) => {
      enableScroll();
      callWhenDone(disableScroll, disableDelay);
    },
    [callWhenDone, disableScroll]
  );

  const tapToScroll = useCallback(
    (dir) => {
      onScroll(500);
      const left = getScrollToLeft(containerRef.current, dir);
      containerRef.current.scrollTo({ left, behavior: 'smooth' });
    },
    [onScroll]
  );

  const memo = useMemo(() => {
    return (
      <div
        ref={containerRef}
        id={id}
        className='scrollable'
        style={style}
        onScroll={onScroll}
      >
        {children}
        <ScrollBar
          style={style}
          tapToScroll={tapToScroll}
          disabled={disabled}
        />
      </div>
    );
  }, [children, disabled, onScroll, id, tapToScroll, style]);
  return memo;
};

const ScrollBar = ({ style, tapToScroll, disabled }) => {
  const memo = useMemo(() => {
    return (
      <div className='scrollbar' style={style}>
        <ScrollLeft
          disabled={disabled.left}
          onClick={() => tapToScroll('left')}
        />
        <ScrollRight
          disabled={disabled.right}
          onClick={() => tapToScroll('right')}
        />
      </div>
    );
  }, [disabled.left, disabled.right, tapToScroll, style]);
  return memo;
};

const ScrollLeft = ({ fwdRef, onClick, disabled }) => {
  return (
    <Button
      fwdRef={fwdRef}
      classes='scrollLeft'
      disabled={disabled}
      onClick={onClick}
    >
      <div className=''>
        <ChevronLeftIcon />
      </div>
    </Button>
  );
};

const ScrollRight = ({ fwdRef, onClick, disabled }) => {
  return (
    <Button
      fwdRef={fwdRef}
      classes='scrollRight'
      disabled={disabled}
      onClick={onClick}
    >
      <div className=''>
        <ChevronRightIcon />
      </div>
    </Button>
  );
};
