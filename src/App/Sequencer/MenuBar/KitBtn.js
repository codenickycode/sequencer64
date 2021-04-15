import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'App/shared/Button';
import { KitIcon } from 'assets/icons';
import { MODES, setMode } from 'App/reducers/editorSlice';
import { useGoTo, useCurrentPath } from 'utils/hooks/useGoTo';
import { useStopPropEventListener } from 'utils/hooks/useStopPropEventListener';

export const KitBtn = () => {
  const dispatch = useDispatch();
  const goTo = useGoTo();
  const { eventListener, removeElRef } = useStopPropEventListener();
  const { selectingKit } = useCurrentPath();

  const memo = useMemo(() => {
    const handleGoToBase = () => {
      goTo.base(() => dispatch(setMode(MODES.INIT)));
      removeElRef.current();
    };

    const changeKit = () => {
      if (selectingKit) {
        handleGoToBase();
      } else {
        goTo.changeKit(() => dispatch(setMode(MODES.TAP)));
        eventListener('menuBar', 'scroll', handleGoToBase);
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
