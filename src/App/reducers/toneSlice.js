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
  buffersLoaded: false,
  loadingSamples: false,
  transportState: Tone.Transport.state,
  restarting: false,
  step: 0,
  audioContextReady: false,
  loadingError: { error: false, count: 0 },
  countIn: '',
};

export const toneSlice = createSlice({
  name: 'tone',
  initialState: INITIAL_STATE,
  reducers: {
    setAudioContextReady: (state, { payload }) => {
      state.audioContextReady = payload;
    },
    setLoadingSamples: (state, { payload }) => {
      state.loadingSamples = payload;
    },
    loadSamplesFinally: (state, { payload }) => {
      state.loadingSamples = payload.loadingSamples;
      state.buffersLoaded = payload.buffersLoaded;
      state.bufferedKit = payload.bufferedKit;
      state.loadingError.error = payload.loadingError;
      if (payload.loadingError) {
        state.loadingError.count++;
      } else {
        state.loadingError.count = 0;
      }
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
      state.countingIn = false;
    },
    stopSequenceFinally: (state) => {
      state.step = 0;
      state.transportState = 'stopped';
    },
    setCountIn: (state, { payload }) => {
      state.countIn = payload;
    },
  },
});

export const {
  setAudioContextReady,
  setLoadingSamples,
  loadSamplesFinally,
  setStep,
  pauseSequence,
  setTransportState,
  setRestarting,
  startSequenceFinally,
  stopSequenceFinally,
  setCountIn,
} = toneSlice.actions;

export const {
  startTone,
  loadSamples,
  schedulePattern,
  startSequence,
  stopSequence,
} = toneThunks;

export default toneSlice.reducer;
