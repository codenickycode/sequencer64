import * as Tone from 'tone';
import { HOST, NETWORK_TIMEOUT } from '../../../../network';

export const disposeSamplers = (kit) => {
  for (let sound of kit.sounds) {
    sound.sampler?.dispose();
    sound.channel?.dispose();
  }
};

export const buildSamplers = (kit) =>
  new Promise(async (resolve, reject) => {
    const promises = [];
    for (let sound of kit.sounds) {
      const samplePath = sound.sample;
      const sampleUrl = HOST + '/kits/' + samplePath;
      promises.push(
        new Promise((resolveSample) => {
          sound.sampler = new Tone.Sampler({
            urls: {
              C2: sampleUrl,
            },
            onload: () => {
              sound.channel = new Tone.Channel({
                volume: 0,
                pan: 0,
                channelCount: 2,
              }).toDestination();
              sound.sampler.connect(sound.channel);
              resolveSample();
            },
          });
        })
      );
    }
    try {
      let rejectTimer = setTimeout(
        () => reject('error loading samples'),
        NETWORK_TIMEOUT
      );
      await Promise.all(promises);
      clearTimeout(rejectTimer);
      console.log(`${kit.name} buffers loaded!`);
      resolve();
    } catch (e) {
      reject('error loading samples');
    }
  });

export const triggerStep = (time, step, sounds) => {
  for (const [sound, { noteOn, notes }] of Object.entries(step)) {
    if (noteOn) {
      let slice = notes.length;
      sounds[sound].sampler.triggerAttackRelease(
        notes[0].pitch,
        notes[0].length,
        time,
        notes[0].velocity
      );
      if (slice === 2) {
        sounds[sound].sampler.triggerAttackRelease(
          notes[1].pitch,
          notes[1].length,
          time + Tone.Time('32n'),
          notes[1].velocity
        );
      } else if (slice === 3) {
        sounds[sound].sampler.triggerAttackRelease(
          notes[1].pitch,
          notes[1].length,
          time + Tone.Time('32t'),
          notes[1].velocity
        );
        sounds[sound].sampler.triggerAttackRelease(
          notes[2].pitch,
          notes[2].length,
          time + Tone.Time('32t') + Tone.Time('32t'),
          notes[2].velocity
        );
      }
    }
  }
};
