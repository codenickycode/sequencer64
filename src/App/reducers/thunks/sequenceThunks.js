import { ActionCreators } from 'redux-undo';
import { apiGetSequence } from 'api';
import { setFetching } from '../appSlice';
import { getPatternFromStr } from '../functions/sequence';
import {
  loadSequence,
  paintCell,
  eraseCell,
  sliceCell,
  modCellFinally,
  INITIAL_SEQUENCE,
} from '../sequenceSlice';
import { MODES, setSpAlert } from '../editorSlice';

export const loadInitialSequence = (_id, clearUrl) => async (dispatch) => {
  dispatch(setFetching(true));
  if (_id === 'session') {
    dispatch(loadSequence(INITIAL_SEQUENCE));
  } else {
    try {
      const res = await apiGetSequence(_id);
      const sequence = res.data;
      sequence.pattern = getPatternFromStr(sequence.patternStr);
      dispatch(loadSequence(sequence));
    } catch (e) {
      console.log(
        'Failed to load sequence from url path.  Loading default session.'
      );
      dispatch(loadSequence(INITIAL_SEQUENCE));
    }
  }
  dispatch(setFetching(false));
  dispatch(ActionCreators.clearHistory());
  clearUrl();
};

export const modCell = (step, noteOn) => (dispatch, getState) => {
  const selectedSample = getState().editor.selectedSample;
  if (selectedSample === -1) {
    dispatch(setSpAlert('Select a sample to edit'));
    return;
  }
  const mode = getState().editor.mode;
  switch (mode) {
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
