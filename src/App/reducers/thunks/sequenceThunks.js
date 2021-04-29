import { ActionCreators } from 'redux-undo';
import { apiGetSequence } from 'api';
import { setFetching, setFlashInfo } from '../appSlice';
import {
  getMainMixerFromStr,
  getPatternFromStr,
  getSampleMixerFromStr,
} from '../functions/sequence';
import {
  loadSequence,
  eraseCell,
  sliceCell,
  modCellFinally,
  INITIAL_SEQUENCE,
  recordSampleFinally,
  paintCell,
} from '../sequenceSlice';
import { MODES } from '../editorSlice';
import { wait } from 'utils/wait';

export const loadInitialSequence = (_id, clearUrl) => async (dispatch) => {
  dispatch(setFetching(true));
  if (_id === 'session') {
    dispatch(loadSequence(INITIAL_SEQUENCE));
  } else {
    try {
      const res = await apiGetSequence(_id);
      const sequence = res.data;
      sequence.mainMixer = getMainMixerFromStr(sequence.mainMixerStr);
      sequence.sampleMixer = getSampleMixerFromStr(sequence.sampleMixerStr);
      sequence.pattern = getPatternFromStr(sequence.patternStr);
      dispatch(loadSequence(sequence));
    } catch (e) {
      console.log('Failed to load sequence from url path.  Loading default session.');
      dispatch(loadSequence(INITIAL_SEQUENCE));
    }
  }
  dispatch(setFetching(false));
  dispatch(ActionCreators.clearHistory());
  clearUrl();
};

export const recordSample = (sample) => (dispatch, getState) => {
  if (getState().tone.transportState !== 'started') return;
  const sequence = getState().sequence.present;
  let step = getState().tone.step - 1;
  if (step === -1) step = getState().sequence.present.length - 1;
  const cell = sequence.pattern[step][sample];
  const prevNoteOn = cell.noteOn;
  if (!prevNoteOn) wait(150, () => dispatch(recordSampleFinally({ sample, step })));
};

export const modCell = (step, noteOn) => (dispatch, getState) => {
  const selectedSample = getState().editor.selectedSample;
  const mode = getState().editor.mode;
  switch (mode) {
    case MODES.INIT:
    case MODES.TAP:
    case MODES.TAP_RECORD:
      dispatch(setFlashInfo(true));
      setTimeout(() => dispatch(setFlashInfo(false)), 0);
      break;
    case MODES.PAINT:
      const toggleOn = getState().editor.toggleOn;
      if ((toggleOn && !noteOn) || (!toggleOn && noteOn))
        dispatch(
          paintCell({
            step,
            selectedSample,
            noteOn: toggleOn,
          })
        );
      break;
    case MODES.ERASE:
      if (noteOn) dispatch(eraseCell({ step, selectedSample }));
      break;
    case MODES.SLICE:
      if (noteOn) dispatch(sliceCell({ step, selectedSample }));
      break;
    case MODES.MOD_LENGTH:
    case MODES.MOD_PITCH:
    case MODES.MOD_VELOCITY:
      if (noteOn) {
        const value = getState().editor.mods[mode];
        dispatch(
          modCellFinally({
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
