import { createSlice } from '@reduxjs/toolkit';
import * as Tone from 'tone';
import { HOST, NETWORK_TIMEOUT } from '../../../network';
import * as defaultKits from '../defaults/defaultKits';

const INITIAL_STATE = {
  bufferedKit: null,
  loadingbuffers: false,
  buffersLoaded: false,
  bufferError: false,
  transportState: Tone.Transport.state,
  restarting: false,
  kit: { name: 'init', sounds: [{}] },
};

export const toneSlice = createSlice({
  name: 'tone',
  initialState: INITIAL_STATE,
  reducers: {
    setBuffersLoaded: (state, { payload }) => {
      state.buffersLoaded = payload;
      if (payload) state.reloadSamples = false;
    },
    setTransportState: (state, { payload }) => {
      if (payload === 'stopped') Tone.Transport.stop();
      if (payload === 'started') Tone.Transport.start();
      if (payload === 'paused') Tone.Transport.pause();
      state.transportState = payload;
    },
    setRestarting: (state, { payload }) => {
      state.restarting = payload;
    },
    restart: (state) => {
      state.restarting = false;
      state.transportState = 'started';
    },
    prepRestart: (state) => {
      stopAndCancelEvents();
      state.transportState = 'stopped';
      state.buffersLoaded = false;
      state.restarting = true;
    },
    setBufferError: (state, { payload }) => {
      state.bufferError = payload;
      if (payload) {
        console.log('catastrophic buffer error');
        stopAndCancelEvents();
        state.transportState = 'stopped';
        state.buffersLoaded = false;
        state.restarting = false;
      }
    },
    setLoadingBuffers: (state, { payload }) => {
      state.loadingBuffers = payload;
    },
    loadSamplesFinally: (state, { payload }) => {
      state.loadingBuffers = payload.loadingBuffers;
      state.buffersLoaded = payload.buffersLoaded;
      state.bufferedKit = payload.bufferedKit;
      if (payload.bufferedKit === payload.kit.name) state.kit = payload.kit;
    },
  },
});

export const loadSamples = () => async (dispatch, getState) => {
  let restart = Tone.Transport.state === 'started';
  stopAndCancelEvents();
  const sequenceKitName = getState().sequence.present.kit;
  const oldKit = getState().tone.kit;
  let payload = { bufferedKit: oldKit.name };
  dispatch(toneSlice.actions.setLoadingBuffers(true));
  try {
    if (oldKit.sounds[0].sampler) disposeSamplers(oldKit);
    payload.kit = {
      name: sequenceKitName,
      sounds: defaultKits[sequenceKitName].sounds.map((sound) => ({
        ...sound,
      })),
    };
    console.log('building Samplers');
    await buildSamplers(payload.kit);
    console.log('resolved');
    payload.bufferedKit = sequenceKitName;
    payload.buffersLoaded = true;
  } catch (e) {
    console.log('loadSamples ->\n', e);
    payload.buffersLoaded = false;
  } finally {
    payload.loadingBuffers = false;
    dispatch(toneSlice.actions.loadSamplesFinally(payload));
    if (restart && payload.buffersLoaded)
      dispatch(toneSlice.actions.startSequence());
  }
};

export const {
  setBuffersLoaded,
  setTransportState,
  setRestarting,
  prepRestart,
  restart,
  setBufferError,
} = toneSlice.actions;

export default toneSlice.reducer;

const stopAndCancelEvents = () => {
  Tone.Transport.stop();
  Tone.Transport.position = 0;
  Tone.Transport.cancel(0);
  const scheduledEvents = Tone.Transport._scheduledEvents;
  Object.keys(scheduledEvents).forEach((id) => Tone.Transport.clear(id));
};

const disposeSamplers = (kit) => {
  for (let i = 0; i < 9; i++) {
    kit.sounds[i].sampler?.dispose();
    delete kit.sounds[i].sampler;
    kit.sounds[i].channel?.dispose();
    delete kit.sounds[i].channel;
  }
};

const buildSamplers = (kit) =>
  new Promise(async (resolve, reject) => {
    const promises = [];
    for (let sound of kit.sounds) {
      const samplePath = sound.sample;
      const sampleUrl = HOST + '/kits/' + samplePath;
      promises.push(
        new Promise((resolveSample) => {
          sound.sampler = new Tone.Sampler({
            urls: {
              C2: sampleUrl,
            },
            onload: () => {
              sound.channel = new Tone.Channel({
                volume: 0,
                pan: 0,
                channelCount: 2,
              }).toDestination();
              sound.sampler.connect(sound.channel);
              console.log(`${sound.name} loaded`);
              resolveSample();
            },
          });
        })
      );
    }
    try {
      let rejectTimer = setTimeout(
        () => reject('error loading samples'),
        NETWORK_TIMEOUT
      );
      await Promise.all(promises);
      console.log('promsied all resolved');
      clearTimeout(rejectTimer);
      console.log(`${kit.name} buffers loaded!`);
      resolve();
    } catch (e) {
      reject('error loading samples');
    }
  });
