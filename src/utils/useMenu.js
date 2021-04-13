import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const MENU_TRANSITION = 150;

export const useMenu = (substrToKeepOpen) => {
  const [btnClasses, setBtnClasses] = useState('menuBtn');
  const [menuClasses, setMenuClasses] = useState('menuItem'); // initial class is hidden
  const [renderMenu, setRenderMenu] = useState(false); // react: render the component
  const [showMenu, setShowMenu] = useState(false); // css: show the menu when rendered

  useEffect(() => {
    if (renderMenu) setMenuClasses('menuItem show'); // once rendered, then animate in
  }, [renderMenu]);

  useEffect(() => {
    if (showMenu) setBtnClasses('menuBtn menuOpen');
    if (!showMenu) setBtnClasses('menuBtn');
  }, [showMenu]);

  useEffect(() => {
    if (!renderMenu) return;
    if (!showMenu) setMenuClasses('menuItem'); // animate out
    if (showMenu && renderMenu) setMenuClasses('menuItem show'); // caught during animate out
  }, [renderMenu, showMenu]);

  useEffect(() => {
    let timer;
    if (showMenu) return setRenderMenu(true); // initial render call
    timer = setTimeout(() => {
      // animate out then unload component
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

  const mainContainerHeight = useSelector(
    (state) => state.app.mainContainerHeight
  );
  const btnRef = useRef();
  const menuStyle = getMenuStyle(btnRef.current);
  if (menuStyle) menuStyle.menuBottom = mainContainerHeight;
  return { btnRef, onClick, btnClasses, menuStyle, menuClasses, renderMenu };
};

const getMenuPosition = (btnNode) => {
  if (!btnNode) return;
  const { left: btnLeft, width: btnWidth } = btnNode.getBoundingClientRect();
  const vw = document.documentElement.clientWidth;
  const btnCenter = btnLeft + btnWidth / 2;
  let menuLeft = btnCenter - 125;
  if (vw < 450) menuLeft = vw / 2 - 125;
  else if (menuLeft < 0) menuLeft = 0;
  else if (menuLeft + 250 > vw) menuLeft = vw - 250;
  return { menuLeft };
};

const getMenuStyle = (btnNode) => {
  const menuPosition = getMenuPosition(btnNode);
  let menuStyle;
  if (menuPosition) {
    menuStyle = {
      bottom: `${menuPosition.menuBottom}px`,
      left: `${menuPosition.menuLeft}px`,
    };
  }
  return menuStyle;
};

// on close menu:     // if fadeOut, closeMenu in progress;
// if (fadeOutRef.current) return;

// if (substrToKeepOpen) {
//   e.target.classList.forEach((className) => {
//     if (className.match(substrToKeepOpen)) keepOpen = true;
//   });
// }
