import { createSlice } from '@reduxjs/toolkit';
import undoable, { excludeAction, groupByActionTypes } from 'redux-undo';
import { analog } from 'assets/sequences';
import { getSS } from 'utils/storage';
import {
  getNoteTally,
  inc,
  dec,
  initSampleStep,
  getPatternFromStr,
  getMainMixerFromStr,
  getSampleMixerFromStr,
} from 'App/reducers/functions/sequence';
import { INITIAL_MODS, MODES } from 'App/reducers/editorSlice';
import * as sequenceThunks from './thunks/sequenceThunks';

const INITIAL_PATTERN = getSS('sequencePattern') || getPatternFromStr(analog.patternStr);
const INITIAL_MAIN_MIXER = getSS('mainMixer') || getMainMixerFromStr(analog.mainMixerStr);
const INITIAL_SAMPLE_MIXER =
  getSS('sampleMixer') || getSampleMixerFromStr(analog.sampleMixerStr);

export const MAIN_MIXER_PROPERTIES = {
  volume: { min: 0, max: 100, initialValue: 76, snapback: false },
  reverb: { min: 0, max: 100, initialValue: 0, snapback: false },
  filter: { min: 1, max: 100, initialValue: 100, snapback: false },
  warp: { min: 0, max: 100, initialValue: 50, snapback: true },
  crush: { min: 0, max: 100, initialValue: 0, snapback: false },
  distort: { min: 0, max: 100, initialValue: 0, snapback: false },
};

export const SAMPLE_MIXER_PROPERTIES = {
  vol: { min: 0, max: 100, initialValue: 100 },
  pan: { min: 0, max: 100, initialValue: 50 },
};

export const INITIAL_SEQUENCE = {
  _id: getSS('sequenceId') || analog._id,
  name: getSS('sequenceName') || analog.name,
  kit: getSS('sequenceKitName') || analog.kit,
  bpm: getSS('sequenceBpm') || analog.bpm,
  length: getSS('sequenceLength') || analog.length,
  pattern: INITIAL_PATTERN,
  mainMixer: INITIAL_MAIN_MIXER,
  sampleMixer: INITIAL_SAMPLE_MIXER,
};

export const INITIAL_STATE = {
  ...INITIAL_SEQUENCE,
  noteTally: getNoteTally(INITIAL_PATTERN),
  undoStatus: '',
  initialLoad: true,
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
        step[payload].notes.length = 0;
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
        state.noteTally[tally].empty = true;
      });
      state.noteTally.total.count = 0;
      state.noteTally.total.empty = true;
      state.undoStatus = `erase sequence`;
    },
    recordSampleFinally: (state, { payload: { sample, step } }) => {
      state.pattern[step][sample].noteOn = true;
      inc(state.noteTally, sample);
      state.undoStatus = `record`;
    },
    modCellFinally: (state, { payload: { selectedSample, type, value, step } }) => {
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
    loadSequence: (state, { payload }) => {
      state._id = payload._id;
      state.name = payload.name;
      state.kit = payload.kit;
      state.bpm = payload.bpm;
      state.length = payload.length;
      state.mainMixer = payload.mainMixer;
      state.sampleMixer = payload.sampleMixer;
      state.pattern = payload.pattern;
      state.noteTally = getNoteTally(state.pattern);
      state.undoStatus = `load sequence: `;
      state.initialLoad = false;
    },
    changeKit: (state, { payload }) => {
      state.kit = payload;
      state.undoStatus = `load kit: `;
    },
    changeBpm: (state, { payload }) => {
      state.bpm = payload;
      state.undoStatus = `change bpm: `;
    },
    adjustMainMixer: (state, { payload: { property, amount } }) => {
      const { min, max } = MAIN_MIXER_PROPERTIES[property];
      let newVal = state.mainMixer[property] + amount;
      if (newVal < min) newVal = min;
      if (newVal > max) newVal = max;
      state.mainMixer[property] = newVal;
      state.undoStatus = `main mixer | adjust ${property}`;
    },
    adjustMainMixerWarp: (state, { payload }) => {
      const { min, max } = MAIN_MIXER_PROPERTIES.warp;
      let newVal = state.mainMixer.warp + payload;
      if (newVal < min) newVal = min;
      if (newVal > max) newVal = max;
      state.mainMixer.warp = newVal;
    },
    resetMainMixerProperty: (state, { payload }) => {
      state.mainMixer[payload] = MAIN_MIXER_PROPERTIES[payload].initialValue;
      state.undoStatus = `main mixer | reset ${payload}`;
    },
    resetMainMixerWarp: (state) => {
      state.mainMixer.warp = MAIN_MIXER_PROPERTIES.warp.initialValue;
    },
    adjustSampleMixer: (state, { payload: { sample, property, amount } }) => {
      const { min, max } = SAMPLE_MIXER_PROPERTIES[property];
      let newVal = state.sampleMixer[sample][property] + amount;
      if (newVal < min) newVal = min;
      if (newVal > max) newVal = max;
      state.sampleMixer[sample][property] = newVal;
      state.undoStatus = `sample mixer | sample: ${sample} ${property}`;
    },
    resetSampleMixerProperty: (state, { payload: { sample, property } }) => {
      state.sampleMixer[sample][property] = SAMPLE_MIXER_PROPERTIES[property].initialValue;
      state.undoStatus = `sample mixer | reset ${property}`;
    },
  },
});

export const {
  paintCell,
  sliceCell,
  resetSlice,
  paste,
  eraseCell,
  eraseSample,
  eraseAll,
  recordSampleFinally,
  modCellFinally,
  modAll,
  resetMods,
  loadSequence,
  loadSequenceFinally,
  changeKit,
  changeBpm,
  setInitialLoad,
  adjustMainMixer,
  adjustMainMixerWarp,
  resetMainMixerProperty,
  resetMainMixerWarp,
  adjustSampleMixer,
  resetSampleMixerProperty,
} = sequenceSlice.actions;

export const { loadInitialSequence, modCell, recordSample } = sequenceThunks;

const reducer = undoable(sequenceSlice.reducer, {
  groupBy: groupByActionTypes([
    'sequence/paintCell',
    'sequence/eraseCell',
    'sequence/sliceCell',
    'sequence/modCell',
    'sequence/recordSampleFinally',
    'sequence/adjustMainMixer',
    'sequence/adjustSampleMixer',
  ]),
  filter: excludeAction(['sequence/adjustMainMixerWarp', 'sequence/resetMainMixerWarp']),
  limit: 100,
});

export default reducer;
