import cuid from 'cuid';
import ReactDOM from 'react-dom';
import React, { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'App/shared/Button';
import { CloudDownloadIcon } from 'assets/icons';
import { useKitBtnState } from './useKitBtnState';

export const ChangeKit = () => {
  const numKits = useSelector((state) => state.assets.numKits);

  // track which kit to load after multiple presses
  const counterRef = useRef(0);

  const changeKitMemo = useMemo(() => {
    // console.log('rendering: ChangeKit');
    let grid = [];
    for (let i = 0; i < numKits; i++) {
      grid.push(i);
    }
    const portal = document.getElementById('changeKitPortal');
    return portal
      ? ReactDOM.createPortal(
          <div id='changeKit' className='changeKit'>
            <div className='kits'>
              {grid.map((i) => {
                return (
                  <KitBtn key={cuid.slug()} i={i} counterRef={counterRef} />
                );
              })}
            </div>
          </div>,
          portal
        )
      : null;
  }, [numKits]);

  return changeKitMemo;
};

const KitBtn = ({ i, counterRef }) => {
  const { state, functions } = useKitBtnState(i, counterRef);
  const { classes } = state;
  // console.log(kitName, ': ', state.ready);

  return (
    <Button
      classes={classes.btn}
      disabled={state.btnDisabled}
      onClick={functions.onClick}
    >
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
