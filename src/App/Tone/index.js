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
//
export const delay = new Tone.PingPongDelay({
  delayTime: '8d',
  feedback: 0.2,
  wet: 0,
}).connect(mainBus);
export const reverb = new Tone.Reverb({ decay: 1.5, wet: 0.2 }).connect(mainBus);

export const kitBus = new Tone.Channel({ volume: 0, pan: 0, channelCount: 2 });
kitBus.fan(delay, reverb);
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
