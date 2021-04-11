import { createSlice } from '@reduxjs/toolkit';

export const MODES = {
  TAP: 'TAP',
  PAINT: 'PAINT',
  ERASE: 'ERASE',
  SLICE: 'SLICE',
  COPY: 'COPY',
  MOD_VELOCITY: 'velocity',
  MOD_LENGTH: 'length',
  MOD_PITCH: 'pitch',
};

export const INITIAL_MODS = {
  [MODES.MOD_VELOCITY]: 1,
  [MODES.MOD_LENGTH]: 1,
  [MODES.MOD_PITCH]: 'C2',
};

const INITIAL_STATE = {
  selectedSample: -1,
  mode: null,
  mods: { ...INITIAL_MODS },
  tapCellById: {},
  toggleOn: true,
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState: INITIAL_STATE,
  reducers: {
    close: (state) => {
      state.selectedSample = INITIAL_STATE.selectedSample;
      state.mode = INITIAL_STATE.mode;
    },
    edit: (state, { payload: { sample } }) => {
      state.selectedSample = sample;
      state.mode = MODES.PAINT;
    },
    setMode: (state, { payload }) => {
      state.mode = payload;
    },
    setModVal: (state, { payload }) => {
      state.mods[state.mode] = payload;
    },
    setTapCellById: (state, { payload: { id, val } }) => {
      state.tapCellById[id] = val;
    },
    setToggleOn: (state, { payload }) => {
      state.toggleOn = payload;
    },
  },
});

export const {
  close,
  edit,
  setMode,
  setModVal,
  setTapCellById,
  setToggleOn,
} = editorSlice.actions;

export default editorSlice.reducer;
