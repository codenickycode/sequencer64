import { Button } from 'App/shared/Button';
import { usePopupMenu } from './usePopupMenu';
import { Portal } from 'App/shared/Portal';

export const PopupMenu = ({
  name,
  Icon,
  addBtnClasses = '',
  keepOpenOnSelect,
  children,
}) => {
  const {
    btnRef,
    btnClasses,
    onClick,
    renderMenu,
    menuStyle,
    menuClasses,
  } = usePopupMenu(keepOpenOnSelect);
  const btnId = `${name}Btn`;
  return (
    <div ref={btnRef} className='menuBtnWrapper'>
      <Button
        id={btnId}
        classes={btnClasses + ' ' + addBtnClasses}
        onClick={onClick}
      >
        <Icon />
        <label htmlFor={btnId}>{name}</label>
      </Button>
      <PopupMenuItems
        renderMenu={renderMenu}
        menuStyle={menuStyle}
        menuClasses={menuClasses}
      >
        {children}
      </PopupMenuItems>
    </div>
  );
};

const PopupMenuItems = ({ renderMenu, menuStyle, menuClasses, children }) => {
  if (!renderMenu) return null;
  return (
    <Portal targetId='popupMenuPortal'>
      <div style={menuStyle} className={menuClasses}>
        {children}
      </div>
    </Portal>
  );
};

export const MenuItem = ({ item, selected, onClick, label }) => {
  const btnId = `item${item}`;
  return (
    <Button
      id={btnId}
      classes={selected ? 'popupMenuBtn active' : 'popupMenuBtn'}
      disabled={selected}
      onClick={() => onClick(item)}
    >
      <label htmlFor={btnId}>{label ? label : item}</label>
    </Button>
  );
};

export const MenuItemToggle = ({ item, on, onClick, label }) => {
  const btnId = `itemToggle${item}`;
  return (
    <Button
      id={btnId}
      classes={on ? 'popupMenuBtn active' : 'popupMenuBtn'}
      onClick={onClick}
    >
      <label htmlFor={btnId}>{label ? label : item}</label>
    </Button>
  );
};
