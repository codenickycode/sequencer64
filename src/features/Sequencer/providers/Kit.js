import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Tone from 'tone';
import { setLS } from '../../../utils/storage';
import * as defaultKits from '../defaults/defaultKits';
import {
  setBuffersLoaded,
  prepRestart,
  setRestarting,
  unload,
} from '../reducers/toneSlice';

const getInitialKit = (kit) => {
  const sounds = defaultKits[kit].sounds.map((sound) => ({
    ...sound,
  }));
  return {
    name: defaultKits[kit].name,
    sounds: sounds,
  };
};

export const Kit = React.createContext();
export const KitProvider = ({ children }) => {
  const dispatch = useDispatch();

  const kit = useSelector((state) => state.sequence.present.kit);
  const kitRef = useRef(getInitialKit(kit));

  const disposeSamples = useCallback(() => {
    for (let i = 0; i < 9; i++) {
      kitRef.current.sounds[i].sampler?.dispose();
      delete kitRef.current.sounds[i].sampler;
      kitRef.current.sounds[i].channel?.dispose();
      delete kitRef.current.sounds[i].channel;
    }
  }, []);

  const loadSamples = useCallback(
    (kit) => {
      if (kitRef.current.sounds[0].sampler) disposeSamples();
      async function loadBuffers() {
        for (let i = 0; i < 9; i++) {
          const samplePath = kitRef.current.sounds[i].sample;
          const sampleUrl = 'http://localhost:4000/kits/' + samplePath;
          kitRef.current.sounds[i].sampler = new Tone.Sampler({
            urls: {
              C2: sampleUrl,
            },
            onload: () => {
              if (i === 8) {
                console.log('buffers loaded!');
                dispatch(setBuffersLoaded(true));
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
    [dispatch, disposeSamples]
  );

  useEffect(() => {
    loadSamples(kitRef.current.name);
  }, [loadSamples]);

  useEffect(() => {
    if (Tone.Transport.state === 'started') {
      console.log('prepping restart');
      dispatch(setRestarting(true));
    }
    dispatch(unload());
    kitRef.current.name = defaultKits[kit].name;
    kitRef.current.sounds = defaultKits[kit].sounds.map((sound) => ({
      ...sound,
    }));
    if (kitRef.current.sounds.length > 0) {
      loadSamples(kitRef.current.name);
    }
  }, [dispatch, disposeSamples, kit, loadSamples]);

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

// const cacheSample = async (url) => {
//   let cachedRes;
//   const cache = await caches.open('kits');
//   cachedRes = await cache.match(url);
//   if (!cachedRes) {
//     try {
//       const res = await fetch(url);
//       cachedRes = res;
//       console.log(cachedRes);
//       await cache.put(url, res.clone());
//     } catch (e) {
//       console.log(e);
//     }
//   }
//   return cachedRes;
// };
