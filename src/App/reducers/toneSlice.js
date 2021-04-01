import { createSlice } from '@reduxjs/toolkit';
import * as Tone from 'tone';
import {
  addCursor,
  pauseFlashing,
  startFlashing,
} from 'App/reducers/functions/animations';
import * as toneThunks from './thunks/toneThunks';

const INITIAL_STATE = {
  bufferedKit: null,
  loadingbuffers: false,
  buffersLoaded: false,
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
    setRestarting: (state, { payload }) => {
      state.restarting = payload;
    },
    startSequenceFinally: (state) => {
      state.restarting = false;
      state.transportState = 'started';
      Tone.Transport.start();
    },
    stopSequenceFinally: (state) => {
      state.step = 0;
      state.transportState = 'stopped';
    },
  },
});

export const {
  setLoadingBuffers,
  loadSamplesFinally,
  setStep,
  pauseSequence,
  setTransportState,
  setRestarting,
  startSequenceFinally,
  stopSequenceFinally,
} = toneSlice.actions;

export const {
  loadSamples,
  schedulePattern,
  startSequence,
  stopSequence,
} = toneThunks;

export default toneSlice.reducer;
