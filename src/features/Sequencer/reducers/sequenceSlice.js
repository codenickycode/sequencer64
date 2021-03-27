import { createSlice } from '@reduxjs/toolkit';
import undoable, { groupByActionTypes } from 'redux-undo';
import { analog } from '../defaults/defaultSequences';
import { getLS } from '../../../utils/storage';
import { getNoteTally, inc, dec, initSampleStep } from './functions/sequence';
import { INITIAL_MODS, MODES, setSpAlert } from './editorSlice';

// const INITIAL_PATTERN = getLS('pattern') || analog.pattern;
const INITIAL_PATTERN = getLS('sequencePattern') || analog.pattern;

const INITIAL_STATE = {
  _id: getLS('sequenceId') || analog._id,
  name: getLS('sequenceName') || analog.name,
  kit: getLS('sequenceKitName') || analog.kit,
  bpm: getLS('sequenceBpm') || analog.bpm,
  length: getLS('sequenceLength') || analog.length,
  pattern: INITIAL_PATTERN,
  noteTally: getNoteTally(INITIAL_PATTERN),
  undoStatus: '',
};

export const sequenceSlice = createSlice({
  name: 'sequence',
  initialState: INITIAL_STATE,
  reducers: {
    paintCell: (state, { payload: { step, selectedSample, noteOn } }) => {
      state.pattern[step][selectedSample].noteOn = noteOn;
      if (noteOn) inc(state.noteTally, selectedSample);
      else dec(state.noteTally, selectedSample);
      state.undoStatus = `toggle cells | sample: ${selectedSample}`;
    },
    sliceCell: (state, { payload: { step, selectedSample } }) => {
      let notes = state.pattern[step][selectedSample].notes;
      const len = notes.length;
      const note = notes[0];
      if (len === 3) notes.length = 0;
      notes.push(note);
      state.undoStatus = `slice cells | sample: ${selectedSample}`;
    },
    resetSlice: (state, { payload }) => {
      state.pattern.forEach((step) => {
        const note = step[payload].notes[0];
        step[payload].notes = [];
        step[payload].notes.push(note);
      });
    },
    paste: (state, { payload: { sample, selectedSample } }) => {
      state.pattern.forEach((step) => {
        step[sample].noteOn = step[selectedSample].noteOn;
        step[sample].notes = step[selectedSample].notes.map((note) => ({
          ...note,
        }));
      });
      state.noteTally.total.count +=
        state.noteTally[selectedSample].count - state.noteTally[sample].count;
      state.noteTally[sample] = { ...state.noteTally[selectedSample] };
      state.undoStatus = `copy cells from: ${selectedSample} to: ${sample}`;
    },
    eraseCell: (state, { payload: { step, selectedSample } }) => {
      initSampleStep(state.pattern[step][selectedSample]);
      dec(state.noteTally, selectedSample);
      state.undoStatus = `erase cells | sample: ${selectedSample}`;
    },
    eraseSample: (state, { payload: { selectedSample } }) => {
      state.pattern.forEach((step) => {
        initSampleStep(step[selectedSample]);
      });
      state.noteTally.total.count -= state.noteTally[selectedSample].count;
      state.noteTally[selectedSample].count = 0;
      state.noteTally[selectedSample].empty = true;
      state.undoStatus = `erase all cells | sample: ${selectedSample}`;
    },
    eraseAll: (state) => {
      state.pattern.forEach((step) => {
        step.forEach((sample) => {
          initSampleStep(sample);
        });
      });
      Object.keys(state.noteTally).forEach((tally) => {
        state.noteTally[tally].count = 0;
      });
      state.noteTally.total.count = 0;
      state.noteTally.total.empty = true;
      state.undoStatus = `erase sequence`;
    },
    modCell: (state, { payload: { selectedSample, type, value, step } }) => {
      if (type === MODES.MOD_LENGTH && value < 1) value *= 0.25;
      state.pattern[step][selectedSample].notes.forEach((note) => {
        note[type] = value;
      });
      state.undoStatus = `modify cells | sample: ${selectedSample}`;
    },
    modAll: (state, { payload: { selectedSample, type, value } }) => {
      if (type === MODES.MOD_LENGTH && value < 1) value *= 0.25;
      state.pattern.forEach((step) => {
        if (step[selectedSample].noteOn) {
          step[selectedSample].notes.forEach((note) => {
            note[type] = value;
          });
        }
      });
      state.undoStatus = `modify all cells | sample: ${selectedSample}`;
    },
    resetMods: (state, { payload: { selectedSample, type } }) => {
      state.pattern.forEach((step) => {
        step[selectedSample].notes.forEach((note) => {
          note[type] = INITIAL_MODS[type];
        });
      });
      state.undoStatus = `reset cell mods | sample: ${selectedSample}`;
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
  const selectedSample = getState().editor.selectedSample;
  if (selectedSample === -1) {
    dispatch(setSpAlert('select a sample to edit'));
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
            selectedSample,
            noteOn: toggleOn,
          })
        );
      break;
    case MODES.ERASING:
      if (noteOn)
        dispatch(sequenceSlice.actions.eraseCell({ step, selectedSample }));
      break;
    case MODES.SLICING:
      if (noteOn)
        dispatch(sequenceSlice.actions.sliceCell({ step, selectedSample }));
      break;
    case MODES.MOD_LENGTH:
    case MODES.MOD_PITCH:
    case MODES.MOD_VELOCITY:
      if (noteOn) {
        const value = getState().editor.mods[mode];
        dispatch(
          sequenceSlice.actions.modCell({
            step,
            selectedSample,
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
  eraseSample,
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
