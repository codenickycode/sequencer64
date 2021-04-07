import cuid from 'cuid';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import * as defaultKits from 'utils/defaultKits';
import { Button } from 'App/shared/Button';
import { useFadeIn } from 'utils/useFadeIn';
import { CloudDownloadIcon } from 'assets/icons';
import { useKitBtnState } from './useKitBtnState';
import { VIEWS } from '../../reducers/appSlice';

const kits = Object.values(defaultKits);

export const ChangeKit = () => {
  const show = useSelector((state) => state.app.show);
  const showChangeKit = show === VIEWS.CHANGE_KIT;
  const { fadeInClass } = useFadeIn(showChangeKit);

  const changeKitMemo = useMemo(() => {
    // console.log('rendering: ChangeKit');
    let grid = [];
    for (let i = 0, len = kits.length; i < len; i++) {
      grid.push(i);
    }
    return (
      <div id='changeKit' className={'changeKit' + fadeInClass}>
        <div className='kits'>
          {grid.map((i) => {
            const available = kits[i].available;
            const kitName = kits[i].name;
            return (
              <KitBtn
                key={cuid.slug()}
                kitName={kitName}
                available={available}
              />
            );
          })}
        </div>
      </div>
    );
  }, [fadeInClass]);

  return showChangeKit ? changeKitMemo : null;
};

const KitBtn = ({ kitName, available }) => {
  const { state, functions } = useKitBtnState(kitName, available);
  const { classes } = state;
  return (
    <Button
      classes={classes.btn}
      disabled={state.btnDisabled}
      onClick={functions.onClick}
    >
      <p className={classes.ready}>ready!</p>
      <p className={classes.name}>{kitName}</p>
      {!state.ready ? (
        <CloudDownloadIcon addClass={classes.icon} />
      ) : state.selected ? (
        <p className='selected'>{'(selected)'}</p>
      ) : (
        <div className='dummy' />
      )}
    </Button>
  );
};
