import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'App/shared/Button';
import { KitIcon, MixerIcon } from 'assets/icons';
import { MODES, setMode } from 'App/reducers/editorSlice';
import { useGoTo, useCurrentPath } from 'hooks/useGoTo';
import { useStopPropEventListener } from 'hooks/useStopPropEventListener';

const OpenPathBtn = ({ active, path, label, Icon }) => {
  const dispatch = useDispatch();
  const goTo = useGoTo();
  const { eventListener, removeElRef } = useStopPropEventListener();

  const memo = useMemo(() => {
    const handleGoToBase = () => {
      goTo.base(() => dispatch(setMode(MODES.INIT)));
      removeElRef.current();
    };

    const openPath = () => {
      if (active) {
        handleGoToBase();
      } else {
        goTo[path](() => dispatch(setMode(MODES.TAP)));
        eventListener('menuBar', 'scroll', handleGoToBase);
      }
    };

    const classes = active ? 'menuBtn active openPath' : 'menuBtn openPath';
    const id = `${label}Btn`;
    return (
      <Button id={id} classes={classes} onClick={openPath}>
        <Icon />
        <label htmlFor={id}>{label}</label>
      </Button>
    );
  }, [active, dispatch, eventListener, goTo, label, path, removeElRef]);
  return memo;
};

export const KitBtn = () => {
  const { selectingKit } = useCurrentPath();
  return <OpenPathBtn active={selectingKit} path='changeKit' label='kit' Icon={KitIcon} />;
};

export const FXBtn = () => {
  const { fx } = useCurrentPath();
  return <OpenPathBtn active={fx} path='fx' label='fx' Icon={MixerIcon} />;
};
