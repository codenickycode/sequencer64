import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'App/shared/Button';
import { KitIcon } from 'assets/icons';
import { MODES, setMode } from 'App/reducers/editorSlice';
import { PATHS, useGoTo } from 'utils/hooks/useGoTo';
import { useAbstractState } from 'utils/hooks/useAbstractState';
import { useStopPropEventListener } from 'utils/hooks/useStopPropEventListener';

export const KitBtn = () => {
  const dispatch = useDispatch();
  const goTo = useGoTo();
  const { eventListener, removeElRef } = useStopPropEventListener();
  const { selectingKit } = useAbstractState();

  const memo = useMemo(() => {
    // console.log('rendering: ChangeKitBtn');

    const goToBase = () => {
      goTo(PATHS.BASE, () => dispatch(setMode(MODES.INIT)));
      removeElRef.current();
    };

    const changeKit = () => {
      if (selectingKit) {
        goToBase();
      } else {
        goTo(PATHS.CHANGE_KIT, () => dispatch(setMode(MODES.TAP)));
        eventListener('menuBar', 'scroll', goToBase);
      }
    };

    return (
      <Button
        id='changeKitBtn'
        classes={selectingKit ? 'menuBtn active kit' : 'menuBtn kit'}
        onClick={changeKit}
      >
        <KitIcon />
        <label htmlFor='changeKitBtn'>kit</label>
      </Button>
    );
  }, [dispatch, eventListener, goTo, removeElRef, selectingKit]);
  return memo;
};
