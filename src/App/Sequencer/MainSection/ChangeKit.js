import cuid from 'cuid';
import React, { useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as defaultKits from 'utils/defaultKits';
import { Button } from 'App/shared/Button';
import { useFadeIn } from 'utils/useFadeIn';
import { CloudDownloadIcon } from 'assets/icons';
import { useKitBtnState } from './useKitBtnState';
import { setShow, VIEWS } from '../../reducers/appSlice';

const kits = Object.values(defaultKits);

export const ChangeKit = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.app.show);
  const showChangeKit = show === VIEWS.CHANGE_KIT;
  const { fadeInClass, fadeOutThen } = useFadeIn(showChangeKit);

  const onClick = useCallback(
    () =>
      fadeOutThen(() => {
        dispatch(setShow(''));
      }),
    [dispatch, fadeOutThen]
  );

  const changeKitMemo = useMemo(() => {
    // console.log('rendering: ChangeKit');
    let grid = [];
    for (let i = 0, len = kits.length; i < len; i++) {
      grid.push(i);
    }
    return (
      <div id='load-kit' className={'load-kit' + fadeInClass}>
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
        <ChangeKitInfo fadeInClass={fadeInClass} onClick={onClick} />
      </div>
    );
  }, [fadeInClass, onClick]);

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

export const ChangeKitInfo = ({ fadeInClass, onClick }) => {
  const portal = document.getElementById('kit-info-portal');
  return portal
    ? ReactDOM.createPortal(
        <div className={'kit-info' + fadeInClass}>
          <Button classes='close' onClick={onClick}>
            close
          </Button>
        </div>,
        portal
      )
    : null;
};
