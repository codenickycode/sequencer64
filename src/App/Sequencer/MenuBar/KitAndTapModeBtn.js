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
  const show = useSelector((state) => state.app.show);
  const showChangeKit = show === VIEWS.CHANGE_KIT;
  const memo = useMemo(() => {
    // console.log('rendering: ChangeKitBtn');

    const changeKit = () => {
      dispatch(setShow(showChangeKit ? '' : VIEWS.CHANGE_KIT));
    };

    const tapMode = () => {
      dispatch(setMode(tapping ? null : MODES.TAP));
    };

    return (
      <>
        <Button id='changeKitBtn' classes='menuBtn' onClick={changeKit}>
          <KitIcon addClass={showChangeKit ? 'active' : ''} />
          <label
            className={showChangeKit ? 'active' : ''}
            htmlFor='changeKitBtn'
          >
            kit
          </label>
        </Button>
        <Button id='tapModeBtn' classes='menuBtn' onClick={tapMode}>
          <TapIcon addClass={tapping ? 'active' : ''} />
          <label className={tapping ? 'active' : ''} htmlFor='tapModeBtn'>
            tap
          </label>
        </Button>
      </>
    );
  }, [dispatch, showChangeKit, tapping]);
  return memo;
};
