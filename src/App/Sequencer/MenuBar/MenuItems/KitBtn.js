import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'App/shared/Button';
import { KitIcon } from 'assets/icons';
import { MODES, setMode } from 'App/reducers/editorSlice';
import { useGoTo, useCurrentPath } from 'hooks/useGoTo';
import { useStopPropEventListener } from 'hooks/useStopPropEventListener';

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

    const classes = selectingKit ? 'menuBtn active kit' : 'menuBtn kit';
    return (
      <Button id='changeKitBtn' classes={classes} onClick={changeKit}>
        <KitIcon />
        <label htmlFor='changeKitBtn'>kit</label>
      </Button>
    );
  }, [dispatch, eventListener, goTo, removeElRef, selectingKit]);
  return memo;
};
