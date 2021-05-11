import { createSlice } from '@reduxjs/toolkit';
import * as Tone from 'tone';
import { addCursor, pauseFlashing, startFlashing } from 'App/reducers/functions/animations';
import * as toneThunks from './thunks/toneThunks';
import store from 'App/store';

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
  cycle: 1,
  stopAfterCycle: null,
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
    startSequenceFinally: (state, { payload }) => {
      if (payload) state.stopAfterCycle = payload;
      state.restarting = false;
      state.transportState = 'started';
      Tone.Transport.start();
      state.countingIn = false;
    },
    stopSequenceFinally: (state) => {
      state.step = 0;
      state.cycle = 1;
      state.stopAfterCycle = null;
      state.transportState = 'stopped';
    },
    setCountIn: (state, { payload }) => {
      state.countIn = payload;
    },
    setCycle: (state, { payload }) => {
      state.cycle = payload;
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
  setCycle,
} = toneSlice.actions;

export const { startTone, loadSamples, schedulePattern, startSequence, stopSequence } =
  toneThunks;

export default toneSlice.reducer;

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    if (Tone.Transport.state === 'started') store.dispatch(pauseSequence());
    else store.dispatch(startSequence());
  }
});
