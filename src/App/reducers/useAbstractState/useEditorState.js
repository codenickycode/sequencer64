import { MODES } from 'App/reducers/editorSlice';
import { useSelector } from 'react-redux';

export const useEditorState = () => {
  const editorMode = useSelector((state) => state.editor.mode);

  const state = { editorMode };
  state.modPitchMode = editorMode === MODES.MOD_PITCH;
  state.paintMode = editorMode === MODES.PAINT;
  state.eraseMode = editorMode === MODES.ERASE;
  state.sliceMode = editorMode === MODES.SLICE;
  state.copyMode = editorMode === MODES.COPY;
  state.tapRecordMode = editorMode === MODES.TAP_RECORD;
  state.tapPlayMode = editorMode === MODES.TAP;
  state.tapMode = state.tapRecordMode || state.tapPlayMode;
  state.editing = editorMode !== MODES.INIT && !state.tapMode;
  state.deepEditing = state.editing && !state.paintMode;
  state.cellsEditable = state.eraseMode || state.sliceMode;

  return state;
};
