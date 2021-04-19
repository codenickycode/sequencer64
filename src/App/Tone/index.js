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

export const fft = new Tone.FFT({
  size: 32,
  normalRange: true,
});

const limiter = new Tone.Limiter(-20);
const output = new Tone.Channel({ volume: -6, pan: 0, channelCount: 2 }).chain(
  limiter,
  Tone.Destination
);

const fxFilter = new Tone.Filter(240, 'highpass', -12);
const fxBus = new Tone.Channel({ volume: 0, pan: 0, channelCount: 2 }).chain(
  fxFilter,
  output
);

export const mainBus = new Tone.Channel({ volume: -6, pan: 0, channelCount: 2 }).connect(
  output
);
mainBus.mixer = { volume: mainBus.volume };
mainBus.mixer.delay = new Tone.Gain(0).chain(
  new Tone.PingPongDelay({
    delayTime: '.8n',
    feedback: 0.2,
    wet: 1,
  }),
  fxBus
);
mainBus.mixer.reverb = new Tone.Gain(0).chain(new Tone.Reverb({ decay: 2, wet: 1 }), fxBus);
mainBus.mixer.filter = new Tone.Filter(20000, 'lowpass', -24).connect(fxBus);
mainBus.mixer['pitch shift'] = new Tone.PitchShift().connect(fxBus);
mainBus.mixer['envelope'] = new Tone.AmplitudeEnvelope().connect(fxBus);

export const FX = {
  'delay 1\u204416': new Tone.PingPongDelay({
    delayTime: '16n',
    feedback: 0.25,
    wet: 1,
  }).connect(fxBus),
  'delay 1\u20448': new Tone.PingPongDelay({
    delayTime: '8n',
    feedback: 0.2,
    wet: 1,
  }).connect(fxBus),
  'delay .1\u20448': new Tone.PingPongDelay({
    delayTime: '.8n',
    feedback: 0.2,
    wet: 1,
  }).connect(fxBus),
  'delay 1\u20444': new Tone.PingPongDelay({
    delayTime: '4n',
    feedback: 0.2,
    wet: 1,
  }).connect(fxBus),
  reverb: new Tone.Reverb({ decay: 2, wet: 1 }).connect(fxBus),
  'bit crusher': new Tone.BitCrusher({ bits: 4, wet: 1 }).connect(fxBus),
  distortion: new Tone.Distortion({ distortion: 0.5, wet: 1 }).connect(fxBus),
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
