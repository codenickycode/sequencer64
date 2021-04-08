import { createSlice } from '@reduxjs/toolkit';
import * as remoteKits from 'assets/kits/remote/remoteKits';
import * as localKits from 'assets/kits/local';

const INITIAL_KITS = { ...remoteKits, ...localKits };

const INITIAL_STATE = {
  kits: INITIAL_KITS,
  numKits: Object.values(INITIAL_KITS).length,
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
      state.kits[kit].available = available;
    },
  },
});

export const { setAvailable, setFetchingSamples } = assetsSlice.actions;

export default assetsSlice.reducer;
