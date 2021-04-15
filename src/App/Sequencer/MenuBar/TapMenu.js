import React from 'react';
import { useDispatch } from 'react-redux';
import { TapIcon } from 'assets/icons';
import { MODES, setMode } from 'App/reducers/editorSlice';
import { MenuItem, PopupMenu } from 'App/shared/PopupMenu/PopupMenu';
import { startRecord } from 'App/reducers/thunks/toneThunks';
import { useStopPropEventListener } from 'utils/hooks/useStopPropEventListener';
import { useAbstractState } from 'utils/hooks/useAbstractState';

export const TapMenu = () => {
  const { tapPlayMode, tapRecordMode, selectingKit } = useAbstractState();

  let addBtnClasses = ' tap';
  if (tapPlayMode) addBtnClasses += ' active';
  if (tapRecordMode) addBtnClasses += ' active record';
  return (
    <PopupMenu
      name='tap'
      Icon={TapIcon}
      disabled={selectingKit}
      addBtnClasses={addBtnClasses}
    >
      <TapMenuItems />
    </PopupMenu>
  );
};

const modes = [MODES.TAP, MODES.TAP_RECORD];
const TapMenuItems = () => {
  const dispatch = useDispatch();
  const { eventListener } = useStopPropEventListener();
  const { started, editorMode } = useAbstractState();

  const initEditor = () => dispatch(setMode(MODES.INIT));

  const changeMode = (newMode) => {
    dispatch(setMode(newMode));
    if (newMode === MODES.TAP_RECORD && !started) dispatch(startRecord());
    eventListener('tapBtn', 'click', initEditor);
  };

  return (
    <>
      <div className='popupMenuSub'>Tap Modes</div>
      {modes.map((mode) => {
        const selected = mode === editorMode;
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
