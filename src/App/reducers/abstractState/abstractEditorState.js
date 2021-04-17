import { MODES } from 'App/reducers/editorSlice';

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

export const areWeDeepEditing = (editorMode) => {
  return editorMode !== MODES.PAINT && areWeEditing(editorMode);
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
