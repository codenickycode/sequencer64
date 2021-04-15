import { MODES } from 'App/reducers/editorSlice';
import { useSelector } from 'react-redux';

export const useEditingState = () => {
  const editorMode = useSelector((state) => state.editor.mode);
  const tapRecordMode = editorMode === MODES.TAP_RECORD;
  const tapPlayMode = editorMode === MODES.TAP;
  const tapModes = tapRecordMode || tapPlayMode;
  const editing = editorMode !== MODES.INIT && !tapModes;

  return editing;
};
