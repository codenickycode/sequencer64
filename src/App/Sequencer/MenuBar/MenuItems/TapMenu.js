import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TapIcon } from 'assets/icons';
import { MODES, setMode } from 'App/reducers/editorSlice';
import { MenuItem, PopupMenu } from 'App/shared/PopupMenu/PopupMenu';
import { startRecord } from 'App/reducers/thunks/toneThunks';
import { useStopPropEventListener } from 'hooks/useStopPropEventListener';
import { useCurrentPath } from 'hooks/useGoTo';
import {
  areWeTapPlaying,
  areWeTapRecording,
} from 'App/reducers/abstractState/abstractEditorState';

export const TapMenu = () => {
  const editorMode = useSelector((state) => state.editor.mode);
  const tapPlaying = areWeTapPlaying(editorMode);
  const tapRecording = areWeTapRecording(editorMode);
  const { selectingKit } = useCurrentPath();

  let addBtnClasses = ' tap';
  if (tapPlaying) addBtnClasses += ' active';
  if (tapRecording) addBtnClasses += ' active record';
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
  const editorMode = useSelector((state) => state.editor.mode);
  const started = useSelector((state) => state.tone.transportState === 'started');
  const { eventListener } = useStopPropEventListener();

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
