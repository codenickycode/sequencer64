import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'App/shared/Button';
import { KitIcon, TapIcon } from 'assets/icons';
import { MODES, setMode } from 'App/reducers/editorSlice';
import { useLocation } from 'react-router';
import { PATHS, useGoTo } from 'utils/useGoTo';

export const KitAndTapModeBtn = () => {
  const goTo = useGoTo();
  const pathname = useLocation().pathname;
  const showingKits = pathname === PATHS.CHANGE_KIT;
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
        goTo(PATHS.BASE, () => dispatch(setMode(null)));
      } else {
        goTo(PATHS.CHANGE_KIT, () => dispatch(setMode(MODES.TAP)));
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
  }, [dispatch, goTo, showingKits, tapping]);
  return memo;
};
