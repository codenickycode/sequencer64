import React, { useEffect, useRef } from 'react';
import { TransportPanel } from './TransportPanel';
import { UndoRedo } from './UndoRedo';
import { Erase } from './Erase';
import { LoadSaveButton } from './LoadSaveButton';
import { ChangeKit } from './ChangeKit';
import { ScrollLeft, ScrollRight } from '../../../../components/Button';

export const Menu = () => {
  const menuRef = useRef(null);
  const scrollbarRef = useRef(null);

  useEffect(() => {
    if (menuRef.current) {
      const width = scrollbarRef.current.clientWidth;
      menuRef.current.scrollTo({
        left: width * 2,
        behavior: 'smooth',
      });
    }
  });

  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const scrollEnd = useRef(null);

  const scroll = (dir) => {
    enableScroll();
    clearTimeout(scrollEnd.current);
    const offset =
      dir === 'right'
        ? scrollbarRef.current.clientWidth
        : scrollbarRef.current.clientWidth * -1;
    const start = menuRef.current.scrollLeft;
    menuRef.current.scrollTo({ left: start + offset, behavior: 'smooth' });
    scrollEnd.current = setTimeout(() => disableScroll(), 500);
  };

  const enableScroll = () => {
    rightRef.current.disabled = false;
    leftRef.current.disabled = false;
  };

  const disableScroll = () => {
    if (menuRef.current.scrollLeft <= 0) {
      leftRef.current.disabled = true;
    }
    if (
      menuRef.current.scrollLeft + scrollbarRef.current.clientWidth >=
      5 * scrollbarRef.current.clientWidth
    ) {
      rightRef.current.disabled = true;
    }
  };

  const handleScroll = () => {
    enableScroll();
    clearTimeout(scrollEnd.current);
    scrollEnd.current = setTimeout(() => disableScroll(), 100);
  };

  // console.log('rendering: Menu');
  return (
    <div ref={menuRef} id='menu' onScroll={handleScroll}>
      <ChangeKit />
      <LoadSaveButton />
      <TransportPanel />
      <UndoRedo />
      <Erase />
      <div ref={scrollbarRef} className='scrollbar'>
        <ScrollLeft fwdRef={leftRef} onClick={() => scroll('left')} />
        <ScrollRight fwdRef={rightRef} onClick={() => scroll('right')} />
      </div>
    </div>
  );
};
