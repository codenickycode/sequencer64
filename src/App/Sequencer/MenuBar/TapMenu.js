import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TapIcon } from 'assets/icons';
import { MODES, setMode } from 'App/reducers/editorSlice';
import { useLocation } from 'react-router';
import { PATHS } from 'utils/useGoTo';
import { MenuItem, PopupMenu } from './PopupMenu/PopupMenu';

export const TapMenu = () => {
  const pathname = useLocation().pathname;
  const disabled = pathname === PATHS.CHANGE_KIT;
  const mode = useSelector((state) => state.editor.mode);
  const tapping = mode === MODES.TAP;
  const tapRecording = mode === MODES.TAP_RECORD;

  let addBtnClasses = ' tap';
  if (tapping) addBtnClasses += ' active';
  if (tapRecording) addBtnClasses += ' active record';
  return (
    <PopupMenu
      name='tap'
      Icon={TapIcon}
      disabled={disabled}
      addBtnClasses={addBtnClasses}
    >
      <TapMenuItems />
    </PopupMenu>
  );
};

const modes = [MODES.TAP, MODES.TAP_RECORD, MODES.INIT];
const TapMenuItems = ({ menuStyle, menuClasses }) => {
  const dispatch = useDispatch();
  const currentMode = useSelector((state) => state.editor.mode);
  const changeMode = (newMode) => dispatch(setMode(newMode));

  return (
    <div style={menuStyle} className={menuClasses}>
      <div className='popupMenuSub'>Tap Modes</div>
      {modes.map((mode) => {
        const selected = mode === currentMode;
        return (
          <MenuItem
            key={`selectTapMode${mode}`}
            item={mode}
            selected={selected}
            onClick={changeMode}
          />
        );
      })}
    </div>
  );
};
