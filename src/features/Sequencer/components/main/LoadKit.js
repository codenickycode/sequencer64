import cuid from 'cuid';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloudDownloadIcon } from '../../../../icons';
import { setFetching, setStatus } from '../../../../reducers/appSlice';
import * as defaultKits from '../../defaults/defaultKits';
import { MODES } from '../../reducers/editorSlice';
import { changeKit } from '../../reducers/sequenceSlice';
import { host } from '../../../../host';

const kits = Object.values(defaultKits);

export const LoadKit = () => {
  const mode = useSelector((state) => state.editor.mode);
  //   const showLoadKit = mode === MODES.LOAD_KIT;
  const showLoadKit = true;

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
                <KitBtn key={cuid()} kitName={kitName} available={available} />
              );
            })}
          </div>
        )}
      </div>
    );
  }, [showLoadKit]);
  return loadKitMemo;
};

export const KitBtn = ({ kitName, available }) => {
  const dispatch = useDispatch();
  const kit = useSelector((state) => state.sequence.present.kit);
  const buffersLoaded = useSelector((state) => state.tone.buffersLoaded);
  const networkError = useSelector((state) => state.app.networkError);
  const selected = kitName === kit;

  const [ready, setReady] = useState(available);
  const [fetching, setFetching] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onClick = async () => {
    setDisabled(true);
    try {
      if (!ready) {
        setFetching(true);
        const received = await fetchSamples(kitName);
        if (received) setReady(true);
      } else {
        dispatch(changeKit(kitName));
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
      <div className='kit-btn-dummy' />
      <p className={!ready ? 'kit-btn-p dim' : 'kit-btn-p'}>{kitName}</p>
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
  return <div className='kit-info'>Some instructions about loading kit</div>;
};

const fetchSamples = async (kitName) => {
  const sounds = defaultKits[kitName].sounds;
  const promises = [];
  sounds.forEach((sound) => {
    const url = host + '/kits/' + sound.sample;
    promises.push(fetch(url));
  });
  return await Promise.all(promises);
};
