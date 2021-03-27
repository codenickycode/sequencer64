export const loadSamples = () => async (dispatch, getState) => {
  let restart = Tone.Transport.state === 'started';
  stopSequence();
  const sequenceKitName = getState().sequence.present.kit;
  const oldKit = getState().tone.kit;
  let payload = { bufferedKit: oldKit.name };
  dispatch(toneSlice.actions.setLoadingBuffers(true));
  try {
    if (oldKit.sounds[0].sampler) disposeSamplers(oldKit);
    payload.kit = {
      name: sequenceKitName,
      sounds: defaultKits[sequenceKitName].sounds.map((sound) => ({
        ...sound,
      })),
    };
    await buildSamplers(payload.kit);
    payload.bufferedKit = sequenceKitName;
    payload.buffersLoaded = true;
  } catch (e) {
    console.log('loadSamples ->\n', e);
    payload.buffersLoaded = false;
  } finally {
    payload.loadingBuffers = false;
    dispatch(toneSlice.actions.loadSamplesFinally(payload));
    if (restart && payload.buffersLoaded) startSequence();
  }
};

export const disposeSamplers = (kit) => {
  for (let sound of kit.sounds) {
    sound.sampler?.dispose();
    sound.channel?.dispose();
  }
};
