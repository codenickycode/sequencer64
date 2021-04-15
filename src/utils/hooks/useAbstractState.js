import { MODES } from 'App/reducers/editorSlice';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { PATHS } from './useGoTo';

export const useAbstractState = () => {
  const state = { show: {} };

  const transportState = useSelector((state) => state.tone.transportState);
  state.started = transportState === 'started';

  const editorMode = useSelector((state) => state.editor.mode);
  state.modPitchMode = editorMode === MODES.MOD_PITCH;
  state.tapRecordMode = editorMode === MODES.TAP_RECORD;
  state.tapPlayMode = editorMode === MODES.TAP;
  state.tapMode = state.tapRecordMode || state.tapPlayMode;
  state.editing = editorMode !== MODES.INIT && !state.tapMode;
  state.deepEditing = state.editing && editorMode !== MODES.PAINT;
  state.show.recordBtn = state.tapRecordMode && !state.started;
  state.show.restartBtn = state.tapRecordMode && state.started;
  state.show.startBtn = !state.tapRecordMode && !state.started;
  state.show.pauseBtn = !state.tapRecordMode && state.started;

  const countIn = useSelector((state) => state.tone.countIn);
  state.countingIn = countIn !== '';
  const loadingSamples = useSelector((state) => state.tone.loadingSamples);
  state.transportDisabled = loadingSamples || state.countingIn;

  // Paths
  const pathname = useLocation().pathname;
  state.selectingKit = pathname === PATHS.CHANGE_KIT;

  return state;
};
