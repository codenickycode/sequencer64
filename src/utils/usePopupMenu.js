import { useEffect, useRef, useState } from 'react';

const MENU_TRANSITION = 150;

export const usePopupMenu = (substrToKeepOpen) => {
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
    document.removeEventListener('click', closeMenu);
    setShowMenu(false);
  };

  const onClick = (e) => {
    e.stopPropagation();
    if (!showMenu) document.addEventListener('click', closeMenu);
    setShowMenu(!showMenu);
  };

  const btnRef = useRef();
  const menuStyle = getMenuStyle(btnRef.current);
  return { btnRef, onClick, btnClasses, menuStyle, menuClasses, renderMenu };
};

const getMenuStyle = (btnNode) => {
  return {
    left: `${getMenuLeft(btnNode)}px`,
    bottom: 0,
  };
};

const getMenuLeft = (btnNode) => {
  if (!btnNode) return 0;
  const { left: btnLeft, width: btnWidth } = btnNode.getBoundingClientRect();
  const vw = document.documentElement.clientWidth;
  const btnCenter = btnLeft + btnWidth / 2;
  let menuLeft = btnCenter - 125;
  if (vw < 450) menuLeft = vw / 2 - 125;
  else if (menuLeft < 0) menuLeft = 0;
  else if (menuLeft + 250 > vw) menuLeft = vw - 250;
  return menuLeft;
};

// if (substrToKeepOpen) {
//   e.target.classList.forEach((className) => {
//     if (className.match(substrToKeepOpen)) keepOpen = true;
//   });
// }
