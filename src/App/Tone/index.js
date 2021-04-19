import { startTone } from 'App/reducers/thunks/toneThunks';
import store from 'App/store';
import * as Tone from 'tone';
import clickHi from 'assets/audio/clickHi.mp3';
import clickLow from 'assets/audio/clickLow.mp3';

const initialClick = async () => {
  store.dispatch(startTone());
  document.removeEventListener('touchstart', initialClick);
  document.removeEventListener('mousedown', initialClick);
};
document.addEventListener('touchstart', initialClick);
document.addEventListener('mousedown', initialClick);

const mainBus = new Tone.Channel({ volume: -12, pan: 0, channelCount: 2 }).toDestination();

export const fft = new Tone.FFT({
  size: 32,
  normalRange: true,
});

export const filter = new Tone.Filter(20000, 'lowpass', -24);
export const pitchShift = new Tone.PitchShift();
export const envelope = new Tone.AmplitudeEnvelope();

// export const limiter = new Tone.Limiter(-18);

export const FX = {
  'delay 1\u204416': new Tone.FeedbackDelay({
    delayTime: '16n',
    feedback: 0.25,
    wet: 1,
  }).connect(mainBus),
  'delay 1\u20448': new Tone.FeedbackDelay({
    delayTime: '8n',
    feedback: 0.2,
    wet: 1,
  }).connect(mainBus),
  'delay .1\u20448': new Tone.FeedbackDelay({
    delayTime: '.8n',
    feedback: 0.2,
    wet: 1,
  }).connect(mainBus),
  'delay 1\u20444': new Tone.FeedbackDelay({
    delayTime: '.8n',
    feedback: 0.2,
    wet: 1,
  }).connect(mainBus),
  reverb: new Tone.Reverb({ decay: 2, wet: 1 }).connect(mainBus),
  'bit crusher': new Tone.BitCrusher({ bits: 4, wet: 1 }).connect(mainBus),
  waveshaper: new Tone.Chebyshev({ order: 100, wet: 1 }).connect(mainBus),
  distortion: new Tone.Distortion({ distortion: 1, wet: 1 }).connect(mainBus),
};

export const kitBus = new Tone.Channel({ volume: 0, pan: 0, channelCount: 2 });
kitBus.chain(fft, mainBus);

export const Kit = { name: 'init', samples: [{}] };

export const metronome = new Tone.Sampler({
  urls: {
    C1: clickLow,
    C2: clickHi,
  },
  onload: () => {
    console.log('metronome ready');
  },
}).toDestination();
