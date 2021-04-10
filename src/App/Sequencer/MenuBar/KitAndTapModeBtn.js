import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'App/shared/Button';
import { KitIcon, TapIcon } from 'assets/icons';
import { MODES, setMode } from 'App/reducers/editorSlice';
import { useHistory, useLocation } from 'react-router';
import { BASE_PATH } from 'App/App';

export const KitAndTapModeBtn = () => {
  const history = useHistory();
  const pathname = useLocation().pathname;
  const showingKits = pathname.match(/kits/);
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.editor.mode);
  const tapping = mode === MODES.TAP;

  useEffect(() => {
    const spBorder = document.getElementById('samplePanelBorder');
    if (spBorder) {
      if (tapping) spBorder.classList.add('highlight');
      if (!tapping) spBorder.classList.remove('highlight');
    }
  }, [tapping]);

  const memo = useMemo(() => {
    // console.log('rendering: ChangeKitBtn');

    const changeKit = () => {
      if (showingKits) {
        dispatch(setMode(null));
        history.push(BASE_PATH);
      } else {
        dispatch(setMode(MODES.TAP));
        history.push(pathname + '/kits');
      }
    };

    const tapMode = () => {
      dispatch(setMode(tapping ? null : MODES.TAP));
    };

    return (
      <>
        <Button
          id='changeKitBtn'
          classes={showingKits ? 'menuBtn active kit' : 'menuBtn kit'}
          onClick={changeKit}
        >
          <KitIcon />
          <label htmlFor='changeKitBtn'>kit</label>
        </Button>
        <Button
          id='tapModeBtn'
          classes={tapping ? 'menuBtn active tap' : 'menuBtn tap'}
          disabled={showingKits}
          onClick={tapMode}
        >
          <TapIcon />
          <label htmlFor='tapModeBtn'>tap</label>
        </Button>
      </>
    );
  }, [dispatch, history, pathname, showingKits, tapping]);
  return memo;
};
