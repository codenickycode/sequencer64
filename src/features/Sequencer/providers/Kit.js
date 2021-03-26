import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Tone from 'tone';
import { host } from '../../../host';
import { setLS } from '../../../utils/storage';
import * as defaultKits from '../defaults/defaultKits';
import { setBuffersLoaded, prepRestart } from '../reducers/toneSlice';

export const Kit = React.createContext();
export const KitProvider = ({ children }) => {
  const dispatch = useDispatch();

  const kit = useSelector((state) => state.sequence.present.kit);
  const kitRef = useRef(getInitialKit());
  const onLoadCountRef = useRef(0);

  const reloadSamples = useSelector((state) => state.tone.reloadSamples);
  const loadSamples = useCallback(
    (kit) => {
      if (kitRef.current.sounds[0].sampler) disposeSamples(kitRef);
      kitRef.current.sounds = defaultKits[kit].sounds.map((sound) => ({
        ...sound,
      }));
      function loadBuffers() {
        for (let i = 0, len = kitRef.current.sounds.length; i < len; i++) {
          const samplePath = kitRef.current.sounds[i].sample;
          const sampleUrl = host + '/kits/' + samplePath;
          kitRef.current.sounds[i].sampler = new Tone.Sampler({
            urls: {
              C2: sampleUrl,
            },
            onload: () => {
              onLoadCountRef.current++;
              if (onLoadCountRef.current === len) {
                console.log('buffers loaded!');
                kitRef.current.name = defaultKits[kit].name;
                dispatch(setBuffersLoaded(true));
                onLoadCountRef.current = 0;
              }
            },
          });
          kitRef.current.sounds[i].channel = new Tone.Channel({
            volume: 0,
            pan: 0,
            channelCount: 2,
          }).toDestination();
          kitRef.current.sounds[i].sampler.connect(
            kitRef.current.sounds[i].channel
          );
        }
      }

      loadBuffers();
    },
    [dispatch]
  );

  useEffect(() => {
    if (reloadSamples) {
      loadSamples(kit);
    }
  }, [reloadSamples, loadSamples, kit]);

  useEffect(() => {
    if (kitRef.current.name !== kit) {
      if (Tone.Transport.state === 'started') {
        dispatch(prepRestart());
      }
      loadSamples(kit);
    }
  }, [dispatch, kit, loadSamples]);

  // console.log('returning: KitProvider');
  return (
    <Kit.Provider
      value={{
        kitRef,
        loadSamples,
      }}
    >
      {children}
    </Kit.Provider>
  );
};

const getInitialKit = () => {
  // const sounds = defaultKits[kit].sounds.map((sound) => ({
  //   ...sound,
  // }));
  return {
    name: 'init',
    sounds: [{}],
  };
};

const disposeSamples = (kitRef) => {
  for (let i = 0; i < 9; i++) {
    kitRef.current.sounds[i].sampler?.dispose();
    delete kitRef.current.sounds[i].sampler;
    kitRef.current.sounds[i].channel?.dispose();
    delete kitRef.current.sounds[i].channel;
  }
};
