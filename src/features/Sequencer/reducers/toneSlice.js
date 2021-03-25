import { createSlice } from '@reduxjs/toolkit';
import * as Tone from 'tone';
import { stopAndCancelEvents } from '../components/Transport';

const INITIAL_STATE = {
  buffersLoaded: false,
  transportState: Tone.Transport.state,
  restarting: false,
};

export const toneSlice = createSlice({
  name: 'tone',
  initialState: INITIAL_STATE,
  reducers: {
    setBuffersLoaded: (state, { payload }) => {
      state.buffersLoaded = payload;
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
    prepRestart: (state) => {
      stopAndCancelEvents();
      state.transportState = 'stopped';
      state.buffersLoaded = false;
      state.restarting = true;
    },
    restart: (state) => {
      state.restarting = false;
      state.transportState = 'started';
    },
  },
});

export const {
  setBuffersLoaded,
  setTransportState,
  setRestarting,
  prepRestart,
  restart,
} = toneSlice.actions;

export default toneSlice.reducer;
