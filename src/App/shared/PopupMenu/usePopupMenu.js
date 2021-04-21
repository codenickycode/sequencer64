import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const MENU_TRANSITION = 150;

export const usePopupMenu = (keepOpenOnSelect, active, activeCB) => {
  const [btnClasses, setBtnClasses] = useState('menuBtn'); // active border when menu open
  const [menuClasses, setMenuClasses] = useState('popupMenu'); // initial class is hidden
  const [renderMenu, setRenderMenu] = useState(false); // react: render the component
  const [showMenu, setShowMenu] = useState(false); // css: show the menu when rendered

  useEffect(() => {
    if (renderMenu) setMenuClasses('popupMenu show');
  }, [renderMenu]);

  useEffect(() => {
    if (showMenu) setBtnClasses('menuBtn menuOpen');
    if (!showMenu) setBtnClasses('menuBtn');
  }, [showMenu]);

  useEffect(() => {
    if (!renderMenu) return;
    if (!showMenu) setMenuClasses('popupMenu'); // animate out
    if (showMenu && renderMenu) setMenuClasses('popupMenu show'); // caught during animate out
  }, [renderMenu, showMenu]);

  // render or unload after animate out
  useEffect(() => {
    let timer;
    if (showMenu) return setRenderMenu(true); // initial render call
    timer = setTimeout(() => {
      setRenderMenu(false);
    }, MENU_TRANSITION);
    return () => clearTimeout(timer);
  }, [showMenu]);

  const closeMenu = (e) => {
    if (keepOpenOnSelect) {
      if (e.target.classList) {
        for (let className of e.target.classList) {
          if (className.match(/popup/)) return;
        }
      }
    }
    document.removeEventListener('click', closeMenu);
    document.removeEventListener('anotherMenuOpened', closeMenu);
    document.getElementById('menuBar')?.removeEventListener('scroll', closeMenu);
    setShowMenu(false);
  };

  const onClick = (e) => {
    e.stopPropagation();
    document.dispatchEvent(new Event('anotherMenuOpened'));
    if (active && activeCB) {
      activeCB();
    } else {
      if (!showMenu) {
        document.addEventListener('click', closeMenu);
        document.addEventListener('anotherMenuOpened', closeMenu);
        document.getElementById('menuBar')?.addEventListener('scroll', closeMenu);
      }
      setShowMenu(!showMenu);
    }
  };

  const btnRef = useRef();
  const dimensions = useSelector((state) => state.screen.dimensions);
  const menuStyle = getMenuStyle(btnRef.current, dimensions);
  return { btnClasses, btnRef, onClick, renderMenu, menuStyle, menuClasses };
};

const getMenuStyle = (btnNode, { vw, appRight }) => {
  const menuX = getMenuX(btnNode, appRight, vw);
  return { ...menuX, bottom: 0 };
};

const getMenuX = (btnNode, appRight, vw) => {
  if (!btnNode) return { left: 0 };
  const { left: btnLeft, width: btnWidth } = btnNode.getBoundingClientRect();
  const btnCenter = btnLeft + btnWidth / 2;
  let menuLeft = btnCenter - 125;
  if (appRight < 450) menuLeft = appRight / 2 - 125;
  else if (menuLeft < 0) menuLeft = 0;
  else if (appRight < vw) menuLeft -= (vw - appRight) / 2;
  const menuRight = menuLeft + 250 > appRight ? 0 : null;
  return menuRight === 0 ? { right: menuRight } : { left: menuLeft };
};
