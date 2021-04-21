import * as Tone from 'tone';
import { NETWORK_TIMEOUT } from 'utils/network';
import { Kit, kitBus, metronome } from 'App/Tone';

export const disposeSamplers = () => {
  for (let sample of Kit.samples) {
    sample.sampler?.dispose();
    delete sample.sampler;
    sample.channel?.dispose();
    delete sample.channel;
  }
  Kit.samples.length = 0;
};

export const buildSamplers = (kitAssets) =>
  new Promise(async (resolve, reject) => {
    const addSamplersPromises = addSamplersToKit(kitAssets);
    try {
      let rejectTimer = setTimeout(() => reject('error loading samples'), NETWORK_TIMEOUT);
      await Promise.all(addSamplersPromises);
      clearTimeout(rejectTimer);
      console.log(`${Kit.name} buffers loaded!`);
      resolve();
    } catch (e) {
      console.log('buildSamplers: ', e);
      reject('error loading samples');
    }
  });

const addSamplersToKit = (kitAssets) => {
  const promises = [];
  for (let [i, sample] of kitAssets.samples.entries()) {
    Kit.samples[i] = { ...sample };
    promises.push(connectSample(Kit.samples[i], sample.path));
  }
  return promises;
};

const connectSample = (sample, url) => {
  return new Promise((resolve) => {
    sample.sampler = new Tone.Sampler({
      urls: {
        C2: url,
      },
      onload: () => {
        sample.channel = new Tone.Channel({
          volume: 0,
          pan: 0,
          channelCount: 2,
        }).connect(kitBus);
        sample.vol = scaledGetAndSetVol(sample);
        sample.pan = scaledGetAndSetPan(sample);
        sample.sampler.connect(sample.channel);
        resolve();
      },
    });
  });
};

const scaledGetAndSetVol = (sample) => ({
  getRotaryVal: () => {
    let value = sample.channel.volume.value * 4 + 100;
    if (value > 100) value = 100;
    return value;
  },
  setValFromRotary: (val) => {
    sample.channel.set({ volume: (val - 100) * 0.25 });
  },
});

const scaledGetAndSetPan = (sample) => ({
  getRotaryVal: () => {
    const val = sample.channel.pan.value * 50 + 50;
    return val;
  },
  setValFromRotary: (val) => {
    sample.channel.set({ pan: (val - 50) / 50 });
  },
});

export const applySampleMixer = (sampleMixer) => {
  sampleMixer.forEach(({ vol, pan }, i) => {
    Kit.samples[i].vol.setValFromRotary(vol);
    Kit.samples[i].pan.setValFromRotary(pan);
  });
};

export const triggerMetronome = (time, step) => {
  if (step % 16 === 0) metronome.triggerAttack('C2', time);
  else if (step % 4 === 0) metronome.triggerAttack('C1', time);
};

export const triggerStep = (time, step) => {
  for (const [sample, { noteOn, notes }] of Object.entries(step)) {
    if (noteOn) {
      let slice = notes.length;
      Kit.samples[sample].sampler.triggerAttackRelease(
        notes[0].pitch,
        notes[0].length,
        time,
        notes[0].velocity
      );
      if (slice === 2) {
        Kit.samples[sample].sampler.triggerAttackRelease(
          notes[1].pitch,
          notes[1].length,
          time + Tone.Time('32n'),
          notes[1].velocity
        );
      } else if (slice === 3) {
        Kit.samples[sample].sampler.triggerAttackRelease(
          notes[1].pitch,
          notes[1].length,
          time + Tone.Time('32t'),
          notes[1].velocity
        );
        Kit.samples[sample].sampler.triggerAttackRelease(
          notes[2].pitch,
          notes[2].length,
          time + Tone.Time('32t') + Tone.Time('32t'),
          notes[2].velocity
        );
      }
    }
  }
};
