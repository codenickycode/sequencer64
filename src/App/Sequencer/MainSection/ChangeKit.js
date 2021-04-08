import cuid from 'cuid';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'App/shared/Button';
import { useFadeIn } from 'utils/useFadeIn';
import { CloudDownloadIcon } from 'assets/icons';
import { useKitBtnState } from './useKitBtnState';
import { VIEWS } from '../../reducers/appSlice';

export const ChangeKit = () => {
  const show = useSelector((state) => state.app.show);
  const showChangeKit = show === VIEWS.CHANGE_KIT;
  const { fadeInClass } = useFadeIn(showChangeKit);
  const numKits = useSelector((state) => state.assets.numKits);

  const changeKitMemo = useMemo(() => {
    // console.log('rendering: ChangeKit');
    let grid = [];
    for (let i = 0; i < numKits; i++) {
      grid.push(i);
    }
    return (
      <div id='changeKit' className={'changeKit' + fadeInClass}>
        <div className='kits'>
          {grid.map((i) => {
            return <KitBtn key={cuid.slug()} i={i} />;
          })}
        </div>
      </div>
    );
  }, [fadeInClass, numKits]);

  return showChangeKit ? changeKitMemo : null;
};

const KitBtn = ({ i }) => {
  const { state, functions } = useKitBtnState(i);
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
