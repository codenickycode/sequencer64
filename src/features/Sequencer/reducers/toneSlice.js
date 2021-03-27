import { createSlice } from '@reduxjs/toolkit';
import * as Tone from 'tone';
import {
  addCursor,
  animateCell,
  animateSample,
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
    },
    setStep: (state, { payload }) => {
      state.step = payload;
    },
    pauseSequence: (state) => {
      Tone.Transport.pause();
      pauseFlashing();
      addCursor(state.step);
      startFlashing();
      state.transportState = 'paused';
    },
    setTransportState: (state, { payload }) => {
      state.transportState = payload;
    },
  },
});

export const loadSamples = (kit) => async (dispatch, getState) => {
  let restart = Tone.Transport.state === 'started';
  dispatch(stopSequence());
  const sequenceKitName = getState().sequence.present.kit;
  let payload = { bufferedKit: kit.name };
  dispatch(toneSlice.actions.setLoadingBuffers(true));
  try {
    if (kit.samples[0].sampler) disposeSamplers(kit);
    await buildSamplers(kit, sequenceKitName);
    payload.bufferedKit = kit.name;
    payload.buffersLoaded = true;
  } catch (e) {
    console.log('loadSamples ->\n', e);
    payload.buffersLoaded = false;
  } finally {
    payload.loadingBuffers = false;
    dispatch(toneSlice.actions.loadSamplesFinally(payload));
    if (restart && payload.buffersLoaded) dispatch(startSequence(kit));
  }
};

export const schedulePattern = (dispatch, getState, kit) => {
  Tone.Transport.scheduleRepeat((time) => {
    const step = getState().tone.step;
    const patternStep = getState().sequence.present.pattern[step];
    const samples = kit.samples;
    try {
      triggerStep(time, patternStep, samples);
      animateCell(time, document.getElementById(`cell-${step}`));
      animateSample(time, patternStep);
    } catch (e) {
      console.log('scheduleRepeat passed buffer interupt');
    }
    const length = getState().sequence.present.length;
    dispatch(toneSlice.actions.setStep((step + 1) % length));
  }, '16n');
};

export const startSequence = (kit) => (dispatch, getState) => {
  const length = getState().sequence.present.length;
  const step = getState().tone.step;
  removeCursor(length, step);
  if (Tone.Transport.state === 'stopped')
    schedulePattern(dispatch, getState, kit);
  Tone.Transport.start();
  dispatch(toneSlice.actions.setTransportState('started'));
};

export const stopSequence = () => (dispatch, getState) => {
  Tone.Transport.stop();
  dispatch(toneSlice.actions.setTransportState('stopped'));
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

export const { pauseSequence } = toneSlice.actions;

export default toneSlice.reducer;
