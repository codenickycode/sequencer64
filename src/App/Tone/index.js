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

const mainBus = Tone.getDestination();
mainBus.volume.value = -12;

export const fft = new Tone.FFT({
  size: 32,
  normalRange: true,
});

export const filter = new Tone.Filter(20000, 'lowpass', -24);
export const pitchShift = new Tone.PitchShift();
export const envelope = new Tone.AmplitudeEnvelope();

// export const limiter = new Tone.Limiter(-18);

export const CHANNEL_PROPERTIES = {
  delay16n: 'delay 1\u204416',
  delay8n: 'delay 1\u20448',
  delay8d: 'delay .1\u20448',
  delay4n: 'delay 1\u20444',
  reverb: 'reverb',
};

export const delay16n = new Tone.PingPongDelay({
  delayTime: '16n',
  feedback: 0.25,
  wet: 1,
}).connect(mainBus);
export const delay8n = new Tone.PingPongDelay({
  delayTime: '8n',
  feedback: 0.2,
  wet: 1,
}).connect(mainBus);
export const delay8d = new Tone.PingPongDelay({
  delayTime: '.8n',
  feedback: 0.2,
  wet: 1,
}).connect(mainBus);
export const delay4n = new Tone.PingPongDelay({
  delayTime: '.8n',
  feedback: 0.2,
  wet: 1,
}).connect(mainBus);
export const reverb = new Tone.Reverb({ decay: 2, wet: 1 }).connect(mainBus);

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
