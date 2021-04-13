import { useEffect, useRef, useState } from 'react';

const MENU_TRANSITION = 1000;

export const useMenu = (substrToKeepOpen) => {
  const [menuClasses, setMenuClasses] = useState('menuItem');

  const [showMenu, setShowMenu] = useState(false);

  const [renderMenu, setRenderMenu] = useState(false);
  useEffect(() => {
    if (renderMenu) setMenuClasses('menuItem show');
  }, [renderMenu]);

  useEffect(() => {
    if (!renderMenu) return;
    if (!showMenu) setMenuClasses('menuItem');
    if (showMenu && renderMenu) setMenuClasses('menuItem show');
  }, [renderMenu, showMenu]);

  const closeMenu = (e) => {
    document.removeEventListener('click', closeMenu);
    setShowMenu(false);
  };

  useEffect(() => {
    let timer;
    if (showMenu) return setRenderMenu(true);
    timer = setTimeout(() => {
      setRenderMenu(false);
    }, MENU_TRANSITION);
    return () => clearTimeout(timer);
  }, [showMenu]);

  const onClick = (e) => {
    console.log('click');
    e.stopPropagation();
    if (!showMenu) document.addEventListener('click', closeMenu);
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    console.log('showMenu: ', showMenu);
    console.log('renderMenu: ', renderMenu);
    console.log('menuClasses: ', menuClasses);
  });

  const btnRef = useRef();
  const menuStyle = getMenuStyle(btnRef.current);
  return { btnRef, onClick, menuStyle, menuClasses, renderMenu };
};

const getMenuPosition = (btnNode) => {
  if (!btnNode) return;
  const {
    top: btnTop,
    left: btnLeft,
    width: btnWidth,
  } = btnNode.getBoundingClientRect();
  const vh = document.documentElement.clientHeight;
  const btnCenter = btnLeft + btnWidth / 2;
  const menuLeft = btnCenter - 125;
  const menuBottom = vh - btnTop;
  return { menuLeft, menuBottom };
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
