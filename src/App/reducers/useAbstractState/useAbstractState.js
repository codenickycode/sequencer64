import { useSelector } from 'react-redux';
import { useEditorState } from './useEditorState';

export const useAbstractState = () => {
  const editorState = useEditorState();
  const transportState = useSelector((state) => state.tone.transportState);

  const state = { ...editorState, show: {} };
  state.started = transportState === 'started';
  state.show.recordBtn = state.tapRecordMode && !state.started;
  state.show.restartBtn = state.tapRecordMode && state.started;
  state.show.startBtn = !state.tapRecordMode && !state.started;
  state.show.pauseBtn = !state.tapRecordMode && state.started;

  return state;
};
