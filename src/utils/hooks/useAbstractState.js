import { MODES } from 'App/reducers/editorSlice';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { PATHS } from './useGoTo';

export const useAbstractState = () => {
  const state = {};

  const transportState = useSelector((state) => state.tone.transportState);
  state.started = transportState === 'started';

  const editorMode = useSelector((state) => state.editor.mode);
  state.tapRecordMode = editorMode === MODES.TAP_RECORD;
  state.tapPlayMode = editorMode === MODES.TAP;
  state.tapMode = state.tapRecordMode || state.tapPlayMode;
  state.editing =
    editorMode !== MODES.INIT && editorMode !== MODES.PAINT && !state.tapMode;

  // Paths
  const pathname = useLocation().pathname;
  state.selectingKit = pathname === PATHS.CHANGE_KIT;

  return state;
};
