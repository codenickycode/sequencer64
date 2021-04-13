import React, { useEffect, useRef, useState } from 'react';
import { TransportPanel } from 'App/Sequencer/MenuBar/TransportPanel';
import { UndoRedoBtn } from 'App/Sequencer/MenuBar/UndoRedoBtn';
import { EraseBtn } from 'App/Sequencer/MenuBar/EraseBtn';
import { LoadSaveBtn } from 'App/Sequencer/MenuBar/LoadSaveBtn';
import { KitBtn } from 'App/Sequencer/MenuBar/KitBtn';
import { TapBtn } from 'App/Sequencer/MenuBar/TapBtn';
import { ScrollLeft, ScrollRight } from 'App/shared/Button';
import { Display } from './Display';
import { setShowDisplayMenu } from 'App/reducers/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { PATHS, useGoTo } from 'utils/useGoTo';

export const Menu = () => {
  const goTo = useGoTo();
  const pathname = useLocation().pathname;
  const dispatch = useDispatch();
  const showDisplayMenu = useSelector((state) => state.app.showDisplayMenu);

  const menuRef = useRef(null);
  const scrollbarRef = useRef(null);

  const [initialState, setInitialState] = useState(true);
  useEffect(() => {
    if (initialState) {
      if (menuRef.current) {
        const width = scrollbarRef.current.clientWidth;
        menuRef.current.scrollTo({
          left: width,
          behavior: 'smooth',
        });
        setInitialState(false);
      }
    }
  }, [initialState]);

  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const scrollEnd = useRef(null);

  const scroll = (dir) => {
    onScrollStart();
    clearTimeout(scrollEnd.current);
    const offset =
      dir === 'right'
        ? scrollbarRef.current.clientWidth
        : scrollbarRef.current.clientWidth * -1;
    const start = menuRef.current.scrollLeft;
    menuRef.current.scrollTo({ left: start + offset, behavior: 'smooth' });
    scrollEnd.current = setTimeout(() => disableScroll(), 500);
  };

  const onScrollStart = () => {
    resetView();
    enableScroll();
  };

  const resetView = () => {
    if (showDisplayMenu) dispatch(setShowDisplayMenu(false));
    if (pathname === PATHS.CHANGE_KIT) goTo(PATHS.BASE);
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
    onScrollStart();
    clearTimeout(scrollEnd.current);
    scrollEnd.current = setTimeout(() => disableScroll(), 100);
  };

  // console.log('rendering: Menu');
  return (
    <>
      <div id='menuPortal' />
      <div ref={menuRef} id='menuBar' onScroll={handleScroll}>
        <div className='menuItems'>
          <LoadSaveBtn />
          <KitBtn />
          <TapBtn />
        </div>
        <TransportPanel />
        <div className='menuItems'>
          <UndoRedoBtn />
          <EraseBtn />
          <div className='dummy'>|</div>
          <Display />
        </div>
        <div ref={scrollbarRef} className='scrollbar'>
          <ScrollLeft fwdRef={leftRef} onClick={() => scroll('left')} />
          <ScrollRight fwdRef={rightRef} onClick={() => scroll('right')} />
        </div>
      </div>
    </>
  );
};
