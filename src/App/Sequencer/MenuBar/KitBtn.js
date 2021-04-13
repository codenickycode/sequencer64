import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'App/shared/Button';
import { KitIcon } from 'assets/icons';
import { MODES, setMode } from 'App/reducers/editorSlice';
import { useLocation } from 'react-router';
import { PATHS, useGoTo } from 'utils/useGoTo';

export const KitBtn = () => {
  const goTo = useGoTo();
  const pathname = useLocation().pathname;
  const showingKits = pathname === PATHS.CHANGE_KIT;
  const dispatch = useDispatch();

  const memo = useMemo(() => {
    // console.log('rendering: ChangeKitBtn');

    const changeKit = () => {
      if (showingKits) {
        goTo(PATHS.BASE, () => dispatch(setMode(MODES.INIT)));
      } else {
        goTo(PATHS.CHANGE_KIT, () => dispatch(setMode(MODES.TAP)));
      }
    };

    return (
      <Button
        id='changeKitBtn'
        classes={showingKits ? 'menuBtn active kit' : 'menuBtn kit'}
        onClick={changeKit}
      >
        <KitIcon />
        <label htmlFor='changeKitBtn'>kit</label>
      </Button>
    );
  }, [dispatch, goTo, showingKits]);
  return memo;
};
