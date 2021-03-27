import { createSlice } from '@reduxjs/toolkit';
import * as Tone from 'tone';
import { stopAndCancelEvents } from '../components/Transport';

const INITIAL_STATE = {
  buffersLoaded: false,
  transportState: Tone.Transport.state,
  restarting: false,
  reloadSamples: false,
  bufferError: false,
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
    setReloadSamples: (state, { payload }) => {
      state.reloadSamples = payload;
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
  },
});

export const {
  setBuffersLoaded,
  setTransportState,
  setRestarting,
  prepRestart,
  restart,
  setReloadSamples,
  setBufferError,
} = toneSlice.actions;

export default toneSlice.reducer;
