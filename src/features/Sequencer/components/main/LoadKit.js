import cuid from 'cuid';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloudDownloadIcon } from '../../../../icons';
import { setStatus } from '../../../../reducers/appSlice';
import * as defaultKits from '../../defaults/defaultKits';
import { MODES, setMode } from '../../reducers/editorSlice';
import { changeKit } from '../../reducers/sequenceSlice';
import { host } from '../../../../host';
import { Button } from '../../../../components/Button';

const kits = Object.values(defaultKits);

export const LoadKit = () => {
  const mode = useSelector((state) => state.editor.mode);
  const showLoadKit = mode === MODES.LOAD_KIT;
  const counterRef = useRef(0);

  const loadKitMemo = useMemo(() => {
    // console.log('rendering: LoadKit');
    let grid = [];
    for (let i = 0, len = kits.length; i < len; i++) {
      grid.push(i);
    }

    return (
      <div id='load-kit' className={showLoadKit ? 'show' : ''}>
        {showLoadKit && (
          <div id='load-kit-kits'>
            {grid.map((i) => {
              const available = kits[i].available;
              const kitName = kits[i].name;
              return (
                <KitBtn
                  key={cuid()}
                  counterRef={counterRef}
                  kitName={kitName}
                  available={available}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }, [showLoadKit]);
  return loadKitMemo;
};

export const KitBtn = ({ counterRef, kitName, available }) => {
  const dispatch = useDispatch();
  const serviceWorkerActive = useSelector(
    (state) => state.app.serviceWorkerActive
  );
  const kit = useSelector((state) => state.sequence.present.kit);
  const buffersLoaded = useSelector((state) => state.tone.buffersLoaded);
  const networkError = useSelector((state) => state.app.networkError);
  const selected = kitName === kit;

  const [ready, setReady] = useState(available);
  const [showReady, setShowReady] = useState(false);
  const prevReadyRef = useRef(ready);
  useEffect(() => {
    let timer;
    if (ready) {
      if (!showReady && !prevReadyRef.current) {
        setShowReady(true);
        prevReadyRef.current = true;
      }
      timer = setTimeout(() => setShowReady(false), 1500);
    }
    return () => clearTimeout(timer);
  }, [ready, showReady]);

  const [fetching, setFetching] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onClick = async () => {
    setDisabled(true);
    counterRef.current++;
    const thisClick = counterRef.current;
    try {
      if (!ready && serviceWorkerActive) {
        setFetching(true);
        const received = await fetchSamples(kitName);
        if (received) {
          if (thisClick === counterRef.current) {
            dispatch(changeKit(kitName));
          }
        }
      } else {
        dispatch(changeKit(kitName));
        setReady(true);
      }
    } catch (e) {
      if (!ready) {
        dispatch(setStatus('Error downloading kit: ', kitName));
      } else {
        dispatch(setStatus('Error loading kit: ', kitName));
      }
    } finally {
      setDisabled(false);
      setFetching(false);
    }
  };

  return (
    <button
      className={
        selected
          ? 'kit-btn selected'
          : !ready
          ? 'kit-btn dim-border'
          : 'kit-btn'
      }
      disabled={
        disabled || !buffersLoaded || (!ready && networkError) || fetching
      }
      onClick={onClick}
    >
      <p className={showReady ? 'kit-btn-ready show' : 'kit-btn-ready'}>
        ready!
      </p>
      <p
        className={
          fetching
            ? 'kit-btn-p flashing'
            : !ready
            ? 'kit-btn-p dim'
            : 'kit-btn-p'
        }
      >
        {kitName}
      </p>
      {!ready ? (
        <CloudDownloadIcon addClass={fetching ? 'flashing' : ''} />
      ) : selected ? (
        <p className='kit-btn-p small'>{'(selected)'}</p>
      ) : (
        <div className='kit-btn-dummy' />
      )}
    </button>
  );
};

export const LoadKitInfo = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.editor.mode);
  const showLoadInfo = mode === MODES.LOAD_KIT;
  const loadKitInfoMemo = useMemo(() => {
    const onClick = () => {
      dispatch(setMode(null));
    };
    return (
      <div className={showLoadInfo ? 'kit-info show' : 'kit-info'}>
        <Button classes='kit-info-close' onClick={onClick}>
          close
        </Button>
      </div>
    );
  }, [dispatch, showLoadInfo]);
  return loadKitInfoMemo;
};

const fetchSamples = async (kitName) => {
  const sounds = defaultKits[kitName].sounds;
  const promises = [];
  sounds.forEach((sound) => {
    const url = host + '/kits/' + sound.sample;
    promises.push(fetch(url));
  });
  //   //   mock serve wait
  //   await new Promise((resolve) => {
  //     setTimeout(resolve, 3000);
  //   });
  return await Promise.all(promises);
};
