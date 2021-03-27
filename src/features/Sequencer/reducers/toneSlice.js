import { createSlice } from '@reduxjs/toolkit';
import * as Tone from 'tone';
import * as defaultKits from '../defaults/defaultKits';
import {
  addCursor,
  animateCell,
  animateSound,
  pauseFlashing,
  removeCursor,
  startFlashing,
} from './functions/animations';
import {
  buildSamplers,
  disposeSamplers,
  triggerStep,
} from './functions/sampler';

const INITIAL_STATE = {
  bufferedKit: null,
  loadingbuffers: false,
  buffersLoaded: false,
  bufferError: false,
  transportState: Tone.Transport.state,
  restarting: false,
  kit: { name: 'init', sounds: [{}] },
  step: 0,
};

export const toneSlice = createSlice({
  name: 'tone',
  initialState: INITIAL_STATE,
  reducers: {
    setLoadingBuffers: (state, { payload }) => {
      state.loadingBuffers = payload;
    },
    loadSamplesFinally: (state, { payload }) => {
      state.loadingBuffers = payload.loadingBuffers;
      state.buffersLoaded = payload.buffersLoaded;
      state.bufferedKit = payload.bufferedKit;
      if (payload.bufferedKit === payload.kit.name) state.kit = payload.kit;
    },
    setStep: (state, { payload }) => {
      state.step = payload;
    },
    pauseSequence: (state) => {
      Tone.Transport.pause();
      pauseFlashing();
      addCursor(state.step);
      startFlashing();
    },
  },
});

export const loadSamples = () => async (dispatch, getState) => {
  let restart = Tone.Transport.state === 'started';
  dispatch(stopSequence());
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
    await buildSamplers(payload.kit);
    payload.bufferedKit = sequenceKitName;
    payload.buffersLoaded = true;
  } catch (e) {
    console.log('loadSamples ->\n', e);
    payload.buffersLoaded = false;
  } finally {
    payload.loadingBuffers = false;
    dispatch(toneSlice.actions.loadSamplesFinally(payload));
    if (restart && payload.buffersLoaded) dispatch(startSequence());
  }
};

export const startSequence = () => (dispatch, getState) => {
  const length = getState().sequence.present.length;
  const step = getState().tone.step;
  removeCursor(length, step);
  if (Tone.Transport.state === 'stopped') schedulePattern(dispatch, getState);
  Tone.Transport.start();
};

export const stopSequence = () => (dispatch, getState) => {
  Tone.Transport.stop();
  Tone.Transport.position = 0;
  Tone.Transport.cancel(0);
  const scheduledEvents = Tone.Transport._scheduledEvents;
  Object.keys(scheduledEvents).forEach((id) => Tone.Transport.clear(id));
  const length = getState().sequence.present.length;
  const step = getState().tone.step;
  removeCursor(length, step);
  startFlashing();
  dispatch(toneSlice.actions.setStep(0));
};

export const schedulePattern = (dispatch, getState) => {
  Tone.Transport.scheduleRepeat((time) => {
    const step = getState().tone.step;
    const patternStep = getState().sequence.present.pattern[step];
    const sounds = getState().tone.kit.sounds;
    try {
      triggerStep(time, patternStep, sounds);
      animateCell(time, document.getElementById(`cell-${step}`));
      animateSound(time, patternStep);
    } catch (e) {
      console.log('scheduleRepeat passed buffer interupt');
    }
    const length = getState().sequence.present.length;
    dispatch(toneSlice.actions.setStep((step + 1) % length));
  }, '16n');
};

export const { pauseSequence } = toneSlice.actions;

export default toneSlice.reducer;
