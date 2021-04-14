import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TransportPanel } from 'App/Sequencer/MenuBar/TransportPanel';
import { UndoRedoBtn } from 'App/Sequencer/MenuBar/UndoRedoBtn';
import { EraseBtn } from 'App/Sequencer/MenuBar/EraseBtn';
import { LoadSaveBtn } from 'App/Sequencer/MenuBar/LoadSaveBtn';
import { KitBtn } from 'App/Sequencer/MenuBar/KitBtn';
import { TapMenu } from 'App/Sequencer/MenuBar/TapMenu';
import { ScrollLeft, ScrollRight } from 'App/shared/Button';
import { DisplayMenu } from './DisplayMenu';
import { setShowDisplayMenu } from 'App/reducers/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { PATHS, useGoTo } from 'utils/useGoTo';

export const Menu = () => {
  const goTo = useGoTo();
  const pathname = useLocation().pathname;
  const dispatch = useDispatch();
  const showDisplayMenu = useSelector((state) => state.app.showDisplayMenu);

  const mainContainerHeight = useSelector(
    (state) => state.screen.dimensions.mainContainerHeight
  );

  const vh = useSelector((state) => state.screen.dimensions.vh);
  const menuBarHeight = vh * 0.1;
  let menuBarStyle = { height: menuBarHeight };
  if (menuBarStyle.height > 100) menuBarStyle.height = 100;

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

  const resetView = useCallback(() => {
    if (showDisplayMenu) dispatch(setShowDisplayMenu(false));
    if (pathname === PATHS.CHANGE_KIT) goTo(PATHS.BASE);
  }, [dispatch, goTo, pathname, showDisplayMenu]);

  const onScrollStart = useCallback(() => {
    resetView();
    enableScroll();
  }, [resetView]);

  const scroll = useCallback(
    (dir) => {
      onScrollStart();
      clearTimeout(scrollEnd.current);
      const offset =
        dir === 'right'
          ? scrollbarRef.current.clientWidth
          : scrollbarRef.current.clientWidth * -1;
      const start = menuRef.current.scrollLeft;
      menuRef.current.scrollTo({ left: start + offset, behavior: 'smooth' });
      scrollEnd.current = setTimeout(() => disableScroll(), 500);
    },
    [onScrollStart]
  );

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

  const handleScroll = useCallback(() => {
    onScrollStart();
    clearTimeout(scrollEnd.current);
    scrollEnd.current = setTimeout(() => disableScroll(), 100);
  }, [onScrollStart]);

  const memo = useMemo(() => {
    console.log('rendering: Menu');

    const popupMenuPortalStyle = { maxHeight: mainContainerHeight };

    return (
      <>
        <div id='popupMenuPortal' style={popupMenuPortalStyle} />
        <div
          ref={menuRef}
          id='menuBar'
          style={menuBarStyle}
          onScroll={handleScroll}
        >
          <div className='menuItems'>
            <LoadSaveBtn />
            <KitBtn />
            <TapMenu />
          </div>
          <TransportPanel />
          <div className='menuItems'>
            <UndoRedoBtn />
            <EraseBtn />
            <div className='dummy'>|</div>
            <DisplayMenu />
          </div>
          <div ref={scrollbarRef} className='scrollbar' style={menuBarStyle}>
            <ScrollLeft fwdRef={leftRef} onClick={() => scroll('left')} />
            <ScrollRight fwdRef={rightRef} onClick={() => scroll('right')} />
          </div>
        </div>
      </>
    );
  }, [handleScroll, mainContainerHeight, menuBarStyle, scroll]);
  return memo;
};
