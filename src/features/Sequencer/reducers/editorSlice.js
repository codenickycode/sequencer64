import { createSlice } from '@reduxjs/toolkit';

export const MODES = {
  PAINTING: 'PAINTING',
  ERASING: 'ERASING',
  SLICING: 'SLICING',
  COPYING: 'COPYING',
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
  selectedSound: -1,
  mode: null,
  spAlert: { count: 0, message: '' },
  mods: { ...INITIAL_MODS },
  tapCellById: {},
  toggleOn: true,
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState: INITIAL_STATE,
  reducers: {
    close: (state) => {
      state.selectedSound = INITIAL_STATE.selectedSound;
      state.mode = INITIAL_STATE.mode;
    },
    edit: (state, { payload: { sound } }) => {
      state.selectedSound = sound;
      state.mode = MODES.PAINTING;
      state.spAlert = { ...INITIAL_STATE.spAlert };
    },
    setMode: (state, { payload: { mode } }) => {
      state.mode = mode;
    },
    setSpAlert: (state, { payload }) => {
      state.spAlert.count++;
      state.spAlert.message = `${state.spAlert.count}#${payload}`;
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
  setSpAlert,
  setModVal,
  setTapCellById,
  setToggleOn,
} = editorSlice.actions;

export default editorSlice.reducer;
