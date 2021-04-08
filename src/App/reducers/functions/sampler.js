import * as Tone from 'tone';
import { HOST, NETWORK_TIMEOUT } from 'utils/network';
import * as defaultKits from 'utils/defaultKits';
import ch from 'assets/audio/analog/ch.mp3';
import clp from 'assets/audio/analog/clp.mp3';
import cym from 'assets/audio/analog/cym.mp3';
import ht from 'assets/audio/analog/ht.mp3';
import kick from 'assets/audio/analog/kick.mp3';
import lt from 'assets/audio/analog/lt.mp3';
import mt from 'assets/audio/analog/mt.mp3';
import oh from 'assets/audio/analog/oh.mp3';
import snr from 'assets/audio/analog/snr.mp3';

const defaultUrls = { ch, clp, cym, ht, kick, lt, mt, oh, snr };

export const disposeSamplers = (kit) => {
  for (let sample of kit.samples) {
    sample.sampler?.dispose();
    delete sample.sampler;
    sample.channel?.dispose();
    delete sample.channel;
  }
  kit.samples.length = 0;
};

export const buildSamplers = (kit, sequenceKitName) =>
  new Promise(async (resolve, reject) => {
    const addSamplersPromises = addSamplersToKit(kit, sequenceKitName);
    try {
      let rejectTimer = setTimeout(
        () => reject('error loading samples'),
        NETWORK_TIMEOUT
      );
      await Promise.all(addSamplersPromises);
      clearTimeout(rejectTimer);
      console.log(`${kit.name} buffers loaded!`);
      resolve();
    } catch (e) {
      console.log('buildSamplers: ', e);
      reject('error loading samples');
    }
  });

const addSamplersToKit = (kit, sequenceKitName) => {
  console.log('kit: ', kit);
  const promises = [];
  const defaultKit = defaultKits[sequenceKitName];
  for (let [i, sample] of defaultKit.samples.entries()) {
    kit.samples[i] = {
      ...defaultKit.samples,
      samples: defaultKit.samples.map((sample) => ({ ...sample })),
    };
    const sampleUrl =
      sequenceKitName === 'defaultKit'
        ? defaultUrls[sample.name]
        : HOST + sample.path;
    console.log(sampleUrl);
    promises.push(connectSample(kit.samples[i], sampleUrl));
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
        }).toDestination();
        sample.sampler.connect(sample.channel);
        console.log('resolved');
        resolve();
      },
    });
  });
};

export const triggerStep = (time, step, samples) => {
  for (const [sample, { noteOn, notes }] of Object.entries(step)) {
    if (noteOn) {
      let slice = notes.length;
      samples[sample].sampler.triggerAttackRelease(
        notes[0].pitch,
        notes[0].length,
        time,
        notes[0].velocity
      );
      if (slice === 2) {
        samples[sample].sampler.triggerAttackRelease(
          notes[1].pitch,
          notes[1].length,
          time + Tone.Time('32n'),
          notes[1].velocity
        );
      } else if (slice === 3) {
        samples[sample].sampler.triggerAttackRelease(
          notes[1].pitch,
          notes[1].length,
          time + Tone.Time('32t'),
          notes[1].velocity
        );
        samples[sample].sampler.triggerAttackRelease(
          notes[2].pitch,
          notes[2].length,
          time + Tone.Time('32t') + Tone.Time('32t'),
          notes[2].velocity
        );
      }
    }
  }
};
