import cuid from 'cuid';
import React, { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'App/shared/Button';
import { CloudDownloadIcon } from 'assets/icons';
import { useKitSelection } from './useKitSelection';
import { Portal } from 'App/shared/Portal';
import { getGrid } from 'utils/getGrid';

export const ChangeKit = () => {
  const numKits = useSelector((state) => Object.values(state.assets.kits).length);

  // track which kit to load after multiple presses
  const counterRef = useRef(0);

  const changeKitMemo = useMemo(() => {
    const grid = getGrid(numKits);
    return (
      <Portal targetId='overGridPortal'>
        <div id='changeKit' className='changeKit'>
          <div className='kits'>
            {grid.map((i) => {
              return <KitSelection key={cuid.slug()} i={i} counterRef={counterRef} />;
            })}
          </div>
        </div>
      </Portal>
    );
  }, [numKits]);

  return changeKitMemo;
};

const KitSelection = ({ i, counterRef }) => {
  const { state, functions } = useKitSelection(i, counterRef);
  const { classes } = state;

  return (
    <Button classes={classes.btn} disabled={state.btnDisabled} onClick={functions.onClick}>
      <p className={classes.ready}>ready!</p>
      <p className={classes.name}>{state.name}</p>
      {!state.available ? (
        <CloudDownloadIcon addClass={classes.icon} />
      ) : state.selected ? (
        <p className='selected'>{'(selected)'}</p>
      ) : (
        <div className='dummy' />
      )}
    </Button>
  );
};
