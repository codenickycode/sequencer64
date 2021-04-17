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

export const areCellsEditable = (editorMode) => {
  return editorMode === MODES.ERASE || editorMode === MODES.SLICE;
};

export const getSampleEditModes = (editorMode) => {
  const sampleEditModes = {};
  sampleEditModes.painting = editorMode === MODES.PAINT;
  sampleEditModes.erasing = editorMode === MODES.ERASE;
  sampleEditModes.slicing = editorMode === MODES.SLICE;
  sampleEditModes.copying = editorMode === MODES.COPY;
  sampleEditModes.moddingPitch = editorMode === MODES.MOD_PITCH;
  sampleEditModes.moddingVelocity = editorMode === MODES.MOD_VELOCITY;
  sampleEditModes.moddingLength = editorMode === MODES.MOD_LENGTH;

  return sampleEditModes;
};
