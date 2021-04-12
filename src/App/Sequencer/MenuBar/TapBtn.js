import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'App/shared/Button';
import { TapIcon } from 'assets/icons';
import { MODES, setMode } from 'App/reducers/editorSlice';
import { useLocation } from 'react-router';
import { PATHS } from 'utils/useGoTo';
import { setShowTapMenu } from 'App/reducers/appSlice';

export const TapBtn = () => {
  const pathname = useLocation().pathname;
  const showingKits = pathname === PATHS.CHANGE_KIT;
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.editor.mode);
  const showTapMenu = useSelector((state) => state.app.showTapMenu);
  const tapping = mode === MODES.TAP;
  const tapRecording = mode === MODES.TAP_RECORD;

  const memo = useMemo(() => {
    // console.log('rendering: ChangeKitBtn');

    const onClick = () => dispatch(setShowTapMenu(!showTapMenu));

    return (
      <div className='menuBtnWrapper'>
        <Button
          id='tapModeBtn'
          classes={
            tapping
              ? 'menuBtn tap active'
              : tapRecording
              ? 'menuBtn tap active record'
              : 'menuBtn tap'
          }
          disabled={showingKits}
          onClick={onClick}
        >
          <TapIcon />
          <label htmlFor='tapModeBtn'>tap</label>
        </Button>
        <TapModes />
      </div>
    );
  }, [dispatch, showTapMenu, showingKits, tapRecording, tapping]);
  return memo;
};

const TapModes = () => {
  const dispatch = useDispatch();
  const showTapMenu = useSelector((state) => state.app.showTapMenu);
  return (
    <div className={showTapMenu ? 'menuItem show' : 'menuItem'}>
      <div className='menuItemSub'>Tap Modes</div>
      <Button
        id='tapMode'
        classes='menuItemBtn'
        onClick={() => dispatch(setMode(MODES.TAP))}
      >
        <label htmlFor='tapMode'>Play</label>
      </Button>
      <Button
        id='tapRecordMode'
        classes='menuItemBtn'
        onClick={() => dispatch(setMode(MODES.TAP_RECORD))}
      >
        <label htmlFor='tapRecordMode'>Record</label>
      </Button>
      <Button
        id='tapModeOff'
        classes='menuItemBtn'
        onClick={() => dispatch(setMode(null))}
      >
        <label htmlFor='tapModeOff'>Off</label>
      </Button>
    </div>
  );
};
