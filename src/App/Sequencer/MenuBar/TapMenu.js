import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TapIcon } from 'assets/icons';
import { MODES, setMode } from 'App/reducers/editorSlice';
import { useLocation } from 'react-router';
import { PATHS } from 'utils/useGoTo';
import { MenuItem, PopupMenu } from './PopupMenu/PopupMenu';
import { useStopPropEventListener } from 'utils/useStopPropEventListener';
import { startRecord } from 'App/reducers/thunks/toneThunks';

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

const modes = [MODES.TAP, MODES.TAP_RECORD];
const TapMenuItems = () => {
  const dispatch = useDispatch();
  const eventListener = useStopPropEventListener();
  const currentMode = useSelector((state) => state.editor.mode);
  const transportState = useSelector((state) => state.tone.transportState);

  const deactivate = () => dispatch(setMode(MODES.INIT));

  const changeMode = (newMode) => {
    dispatch(setMode(newMode));
    if (newMode === MODES.TAP_RECORD && transportState !== 'started')
      dispatch(startRecord());
    eventListener('tapBtn', 'click', deactivate);
  };

  return (
    <>
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
    </>
  );
};
