import { createSlice } from '@reduxjs/toolkit';
import undoable, { groupByActionTypes } from 'redux-undo';
import { analog } from '../defaults/defaultSequences';
import { getLS } from '../../../utils/storage';
import { getNoteTally, inc, dec, initSoundStep } from '../utils';
import { INITIAL_MODS, MODES, setSpAlert } from './editorSlice';

// const INITIAL_PATTERN = getLS('pattern') || analog.pattern;
const INITIAL_PATTERN = analog.pattern;

const INITIAL_STATE = {
  ...analog,
  kit: getLS('kit') || analog.kit,
  bpm: getLS('bpm') || analog.bpm,
  length: getLS('length') || analog.length,
  pattern: getLS('pattern') || INITIAL_PATTERN,
  noteTally: getNoteTally(analog.pattern),
  undoStatus: '',
};

export const sequenceSlice = createSlice({
  name: 'sequence',
  initialState: INITIAL_STATE,
  reducers: {
    paintCell: (state, { payload: { step, selectedSound, noteOn } }) => {
      state.pattern[step][selectedSound].noteOn = noteOn;
      if (noteOn) inc(state.noteTally, selectedSound);
      else dec(state.noteTally, selectedSound);
      state.undoStatus = `toggle cells | sound: ${selectedSound}`;
    },
    sliceCell: (state, { payload: { step, selectedSound } }) => {
      let notes = state.pattern[step][selectedSound].notes;
      const len = notes.length;
      const note = notes[0];
      if (len === 3) notes.length = 0;
      notes.push(note);
      state.undoStatus = `slice cells | sound: ${selectedSound}`;
    },
    resetSlice: (state, { payload }) => {
      state.pattern.forEach((step) => {
        const note = step[payload].notes[0];
        step[payload].notes = [];
        step[payload].notes.push(note);
      });
    },
    paste: (state, { payload: { sound, selectedSound } }) => {
      state.pattern.forEach((step) => {
        step[sound].noteOn = step[selectedSound].noteOn;
        step[sound].notes = step[selectedSound].notes.map((note) => ({
          ...note,
        }));
      });
      state.noteTally.total.count +=
        state.noteTally[selectedSound].count - state.noteTally[sound].count;
      state.noteTally[sound] = { ...state.noteTally[selectedSound] };
      state.undoStatus = `copy cells from: ${selectedSound} to: ${sound}`;
    },
    eraseCell: (state, { payload: { step, selectedSound } }) => {
      initSoundStep(state.pattern[step][selectedSound]);
      dec(state.noteTally, selectedSound);
      state.undoStatus = `erase cells | sound: ${selectedSound}`;
    },
    eraseSound: (state, { payload: { selectedSound } }) => {
      state.pattern.forEach((step) => {
        initSoundStep(step[selectedSound]);
      });
      state.noteTally.total.count -= state.noteTally[selectedSound].count;
      state.noteTally[selectedSound].count = 0;
      state.noteTally[selectedSound].empty = true;
      state.undoStatus = `erase all cells | sound: ${selectedSound}`;
    },
    eraseAll: (state) => {
      state.pattern.forEach((step) => {
        step.forEach((sound) => {
          initSoundStep(sound);
        });
      });
      Object.keys(state.noteTally).forEach((tally) => {
        state.noteTally[tally].count = 0;
      });
      state.noteTally.total.count = 0;
      state.noteTally.total.empty = true;
      state.undoStatus = `erase sequence`;
    },
    modCell: (state, { payload: { selectedSound, type, value, step } }) => {
      if (type === MODES.MOD_LENGTH && value < 1) value *= 0.25;
      state.pattern[step][selectedSound].notes.forEach((note) => {
        note[type] = value;
      });
      state.undoStatus = `modify cells | sound: ${selectedSound}`;
    },
    modAll: (state, { payload: { selectedSound, type, value } }) => {
      if (type === MODES.MOD_LENGTH && value < 1) value *= 0.25;
      state.pattern.forEach((step) => {
        if (step[selectedSound].noteOn) {
          step[selectedSound].notes.forEach((note) => {
            note[type] = value;
          });
        }
      });
      state.undoStatus = `modify all cells | sound: ${selectedSound}`;
    },
    resetMods: (state, { payload: { selectedSound, type } }) => {
      state.pattern.forEach((step) => {
        step[selectedSound].notes.forEach((note) => {
          note[type] = INITIAL_MODS[type];
        });
      });
      state.undoStatus = `reset cell mods | sound: ${selectedSound}`;
    },
    loadSequence: (state, { payload: { sequence } }) => {
      state._id = sequence._id;
      state.name = sequence.name;
      state.kit = sequence.kit;
      state.bpm = sequence.bpm;
      state.length = sequence.length;
      state.pattern = sequence.pattern;
      state.noteTally = getNoteTally(state.pattern);
      state.undoStatus = `load sequence: ${sequence.name}`;
    },
    changeKit: (state, { payload }) => {
      state.undoStatus = `load kit: ${state.kit}`;
      state.kit = payload;
    },
    changeBpm: (state, { payload }) => {
      state.undoStatus = `change bpm: ${state.bpm}`;
      state.bpm = payload;
    },
  },
});

export const modCell = (step, noteOn) => (dispatch, getState) => {
  const selectedSound = getState().editor.selectedSound;
  if (selectedSound === -1) {
    dispatch(setSpAlert('select a sound to edit'));
    return;
  }
  const mode = getState().editor.mode;
  switch (mode) {
    case MODES.PAINTING:
      const toggleOn = getState().editor.toggleOn;
      if ((toggleOn && !noteOn) || (!toggleOn && noteOn))
        dispatch(
          sequenceSlice.actions.paintCell({
            step,
            selectedSound,
            noteOn: toggleOn,
          })
        );
      break;
    case MODES.ERASING:
      if (noteOn)
        dispatch(sequenceSlice.actions.eraseCell({ step, selectedSound }));
      break;
    case MODES.SLICING:
      if (noteOn)
        dispatch(sequenceSlice.actions.sliceCell({ step, selectedSound }));
      break;
    case MODES.MOD_LENGTH:
    case MODES.MOD_PITCH:
    case MODES.MOD_VELOCITY:
      if (noteOn) {
        const value = getState().editor.mods[mode];
        dispatch(
          sequenceSlice.actions.modCell({
            step,
            selectedSound,
            type: mode,
            value,
          })
        );
      }
      break;
    default:
      return null;
  }
};

export const {
  paintCell,
  sliceCell,
  resetSlice,
  paste,
  eraseCell,
  eraseSound,
  eraseAll,
  modAll,
  resetMods,
  loadSequence,
  loadSequenceFinally,
  changeKit,
  changeBpm,
} = sequenceSlice.actions;

const reducer = undoable(sequenceSlice.reducer, {
  groupBy: groupByActionTypes([
    'sequence/paintCell',
    'sequence/eraseCell',
    'sequence/sliceCell',
    'sequence/modCell',
  ]),
  limit: 100,
});

export default reducer;
