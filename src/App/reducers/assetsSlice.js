import { createSlice } from '@reduxjs/toolkit';
import * as remoteKits from 'assets/kits/remote/remoteKits';
import * as localKits from 'assets/kits/local';
import { defaultSequences } from 'assets/sequences';

const INITIAL_KITS = { ...remoteKits, ...localKits };

const INITIAL_STATE = {
  kits: INITIAL_KITS,
  numKits: Object.values(INITIAL_KITS).length,
  defaultSequences,
  userSequences: [],
};

export const assetsSlice = createSlice({
  name: 'assets',
  initialState: INITIAL_STATE,
  reducers: {
    setAvailable: (state, { payload: { kit, available } }) => {
      state.kits[kit].available = available;
    },
    setFetchingSamples: (state, { payload: { kit, fetching, available } }) => {
      state.kits[kit].fetching = fetching;
      if (available !== undefined) state.kits[kit].available = available;
    },
    setUserSequences: (state, { payload }) => {
      state.userSequences = payload;
    },
  },
});

export const {
  setAvailable,
  setFetchingSamples,
  setUserSequences,
} = assetsSlice.actions;

export default assetsSlice.reducer;
