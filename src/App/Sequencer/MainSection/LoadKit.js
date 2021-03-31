import cuid from 'cuid';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as defaultKits from 'utils/defaultKits';
import { MODES, setMode } from 'App/reducers/editorSlice';
import { Button } from 'App/shared/Button';
import { useFadeIn } from 'utils/useFadeIn';
import { CloudDownloadIcon } from 'assets/icons';
import { useKitBtnStateAndFunctions } from './useKitBtnStateAndFunctions';

const kits = Object.values(defaultKits);

export const LoadKit = () => {
  const mode = useSelector((state) => state.editor.mode);
  const showLoadKit = mode === MODES.LOAD_KIT;
  const { fadeInClass } = useFadeIn(showLoadKit);

  const loadKitMemo = useMemo(() => {
    // console.log('rendering: LoadKit');
    let grid = [];
    for (let i = 0, len = kits.length; i < len; i++) {
      grid.push(i);
    }
    return (
      <div id='load-kit' className={'load-kit' + fadeInClass}>
        <div id='load-kit-kits'>
          {grid.map((i) => {
            const available = kits[i].available;
            const kitName = kits[i].name;
            return (
              <KitBtn key={cuid()} kitName={kitName} available={available} />
            );
          })}
        </div>
      </div>
    );
  }, [fadeInClass]);
  return showLoadKit ? loadKitMemo : null;
};

const KitBtn = ({ kitName, available }) => {
  const { state, functions } = useKitBtnStateAndFunctions(kitName, available);
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
        <p className='kit-btn-p small'>{'(selected)'}</p>
      ) : (
        <div className='kit-btn-dummy' />
      )}
    </Button>
  );
};

export const LoadKitInfo = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.editor.mode);
  const showLoadInfo = mode === MODES.LOAD_KIT;
  const { fadeInClass } = useFadeIn(showLoadInfo);

  const loadKitInfoMemo = useMemo(() => {
    const onClick = () => {
      dispatch(setMode(null));
    };
    return (
      <div className={'kit-info' + fadeInClass}>
        <Button classes='kit-info-close' onClick={onClick}>
          close
        </Button>
      </div>
    );
  }, [dispatch, fadeInClass]);
  return loadKitInfoMemo;
};
