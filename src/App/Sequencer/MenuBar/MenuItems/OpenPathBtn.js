import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'App/shared/Button';
import { InfoIcon, KitIcon } from 'assets/icons';
import { MODES, setMode } from 'App/reducers/editorSlice';
import { useGoTo, useCurrentPath } from 'hooks/useGoTo';
import { useStopPropEventListener } from 'hooks/useStopPropEventListener';

export const OpenPathBtn = ({ addClass = '', active, path, label, Icon }) => {
  const dispatch = useDispatch();
  const goTo = useGoTo();
  const { eventListener, removeElRef } = useStopPropEventListener();

  const memo = useMemo(() => {
    const handleGoToBase = () => {
      goTo.base(() => dispatch(setMode(MODES.INIT)));
      if (removeElRef.current) removeElRef.current();
    };

    const openPath = () => {
      if (active) {
        handleGoToBase();
      } else {
        if (path === 'changeKit') goTo[path](() => dispatch(setMode(MODES.TAP)));
        else goTo[path]();
        eventListener('menuBar', 'scroll', handleGoToBase);
      }
    };

    const classes = active ? 'menuBtn active openPath' : 'menuBtn openPath';
    const id = `${label}Btn`;
    return (
      <div className={'menuBtnWrapper ' + addClass}>
        <Button id={id} classes={classes} onClick={openPath}>
          <Icon />
          <label htmlFor={id}>{label}</label>
        </Button>
      </div>
    );
  }, [active, addClass, dispatch, eventListener, goTo, label, path, removeElRef]);
  return memo;
};

export const KitBtn = () => {
  const { selectingKit } = useCurrentPath();
  return <OpenPathBtn active={selectingKit} path='changeKit' label='kit' Icon={KitIcon} />;
};

export const InfoBtn = () => {
  const { showingInfo } = useCurrentPath();
  return <OpenPathBtn active={showingInfo} path='info' label='info' Icon={InfoIcon} />;
};
