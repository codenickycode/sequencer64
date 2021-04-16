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
  state.tapModes = state.tapRecordMode || state.tapPlayMode;
  state.editing = editorMode !== MODES.INIT && !state.tapModes;
  state.deepEditing = state.editing && !state.paintMode;
  state.cellsEditable = state.eraseMode || state.sliceMode;

  return state;
};

export const areWeTapPlaying = (editorMode) => {
  return editorMode === MODES.TAP;
};

export const areWeTapRecording = (editorMode) => {
  return editorMode === MODES.TAP_RECORD;
};

export const areWeTapping = (editorMode) => {
  return areWeTapPlaying(editorMode) || areWeTapRecording(editorMode);
};

export const areWeEditing = (editorMode) => {
  return editorMode !== MODES.INIT && !areWeTapping(editorMode);
};

export const areCellsEditable = (editorMode) => {
  return editorMode === MODES.ERASE || editorMode === MODES.SLICE;
};

export const getAbstractEditorMode = (editorMode) => {
  const abstractEditorMode = {};
  abstractEditorMode.painting = editorMode === MODES.PAINT;
  abstractEditorMode.erasing = editorMode === MODES.ERASE;
  abstractEditorMode.slicing = editorMode === MODES.SLICE;
  abstractEditorMode.copying = editorMode === MODES.COPY;
  abstractEditorMode.moddingPitch = editorMode === MODES.MOD_PITCH;
  abstractEditorMode.moddingVelocity = editorMode === MODES.MOD_VELOCITY;
  abstractEditorMode.moddingLength = editorMode === MODES.MOD_LENGTH;

  return abstractEditorMode;
};
