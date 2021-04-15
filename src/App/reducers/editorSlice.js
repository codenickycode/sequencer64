import { createSlice } from '@reduxjs/toolkit';

export const MODES = {
  INIT: 'INIT',
  TAP: 'Play',
  TAP_RECORD: 'Record',
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

export const MOD_INFO = 'Change value then tap cells to apply';
export const EDITOR_MODE_INFO = {
  [MODES.TAP]: 'Tap to play samples',
  [MODES.TAP_RECORD]: 'Tap to record samples',
  [MODES.INIT]: 'Select a sample to edit',
  [MODES.MOD_VELOCITY]: MOD_INFO,
  [MODES.MOD_LENGTH]: MOD_INFO,
  [MODES.MOD_PITCH]: MOD_INFO,
};

const INITIAL_STATE = {
  selectedSample: -1,
  mode: MODES.INIT,
  info: EDITOR_MODE_INFO[MODES.INIT],
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
      const tapModes = state.mode === MODES.TAP || state.mode === MODES.TAP_RECORD;
      if (tapModes || state.mode === MODES.INIT) {
        state.selectedSample = -1;
      }
    },
    setInfo: (state, { payload }) => {
      state.info = payload;
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
  setInfo,
  setModVal,
  setTapCellById,
  setToggleOn,
} = editorSlice.actions;

export default editorSlice.reducer;
