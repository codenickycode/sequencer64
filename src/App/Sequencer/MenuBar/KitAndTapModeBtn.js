import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'App/shared/Button';
import { KitIcon, TapIcon } from 'assets/icons';
import { setShow, VIEWS } from '../../reducers/appSlice';
import { MODES, setMode } from 'App/reducers/editorSlice';

export const KitAndTapModeBtn = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.editor.mode);
  const tapping = mode === MODES.TAP;
  const memo = useMemo(() => {
    // console.log('rendering: ChangeKitBtn');

    const changeKit = () => {
      dispatch(setShow(VIEWS.CHANGE_KIT));
    };

    const tapMode = () => {
      dispatch(setMode(tapping ? null : MODES.TAP));
    };

    return (
      <>
        <Button id='changeKitBtn' classes='menuBtn' onClick={changeKit}>
          <KitIcon />
          <label htmlFor='changeKitBtn'>kit</label>
        </Button>
        <Button id='tapModeBtn' classes='menuBtn' onClick={tapMode}>
          <TapIcon addClass={tapping ? 'active' : ''} />
          <label className={tapping ? 'active' : ''} htmlFor='tapModeBtn'>
            tap
          </label>
        </Button>
      </>
    );
  }, [dispatch, tapping]);
  return memo;
};
