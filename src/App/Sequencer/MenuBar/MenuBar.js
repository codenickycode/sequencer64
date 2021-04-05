import React, { useEffect, useRef } from 'react';
import { TransportPanel } from 'App/Sequencer/MenuBar/TransportPanel';
import { UndoRedoBtn } from 'App/Sequencer/MenuBar/UndoRedoBtn';
import { EraseBtn } from 'App/Sequencer/MenuBar/EraseBtn';
import { LoadSaveBtn } from 'App/Sequencer/MenuBar/LoadSaveBtn';
import { LoadKitBtn } from 'App/Sequencer/MenuBar/LoadKitBtn';
import { ScrollLeft, ScrollRight } from 'App/shared/Button';

export const Menu = () => {
  const menuRef = useRef(null);
  const scrollbarRef = useRef(null);

  useEffect(() => {
    if (menuRef.current) {
      const width = scrollbarRef.current.clientWidth;
      menuRef.current.scrollTo({
        left: width,
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
      3 * scrollbarRef.current.clientWidth
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
      <div className='menuItems'>
        <LoadSaveBtn />
        <LoadKitBtn />
      </div>
      <TransportPanel />
      <div className='menuItems'>
        <UndoRedoBtn />
        <EraseBtn />
      </div>
      <div ref={scrollbarRef} className='scrollbar'>
        <ScrollLeft fwdRef={leftRef} onClick={() => scroll('left')} />
        <ScrollRight fwdRef={rightRef} onClick={() => scroll('right')} />
      </div>
    </div>
  );
};
