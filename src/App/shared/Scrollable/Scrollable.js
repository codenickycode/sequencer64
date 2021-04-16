import React, { useMemo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'assets/icons';
import { Button } from 'App/shared/Button';
import { useScrollable } from './useScrollable';

export const Scrollable = ({ id, style, children }) => {
  const { containerRef, onScroll, tapToScroll, disabled } = useScrollable();

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
        <ScrollBar style={style} tapToScroll={tapToScroll} disabled={disabled} />
      </div>
    );
  }, [containerRef, id, style, onScroll, children, tapToScroll, disabled]);
  return memo;
};

const ScrollBar = ({ style, tapToScroll, disabled }) => {
  const memo = useMemo(() => {
    return (
      <div className='scrollbar' style={style}>
        <ScrollLeft disabled={disabled.left} onClick={() => tapToScroll('left')} />
        <ScrollRight disabled={disabled.right} onClick={() => tapToScroll('right')} />
      </div>
    );
  }, [disabled.left, disabled.right, tapToScroll, style]);
  return memo;
};

const ScrollLeft = ({ onClick, disabled }) => {
  return (
    <Button classes='scrollLeft' disabled={disabled} onClick={onClick}>
      <div className=''>
        <ChevronLeftIcon />
      </div>
    </Button>
  );
};

const ScrollRight = ({ onClick, disabled }) => {
  return (
    <Button classes='scrollRight' disabled={disabled} onClick={onClick}>
      <div className=''>
        <ChevronRightIcon />
      </div>
    </Button>
  );
};
