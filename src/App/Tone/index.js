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

const limiter = new Tone.Limiter(-18);
const output = new Tone.Channel({ volume: -6, pan: 0, channelCount: 2 }).chain(
  limiter,
  Tone.Destination
);

export const mainBus = new Tone.Channel({ volume: -6, pan: 0, channelCount: 2 });
mainBus.mixer = {
  volume: {
    getRotaryVal: () => {
      let value = mainBus.volume.value * 4 + 100;
      if (value > 100) value = 100;
      return value;
    },
    setValFromRotary: (val) => {
      mainBus.volume.value = (val - 100) * 0.25;
    },
    initialVal: 76,
  },
};

mainBus.mixer.reverb = new Tone.Reverb({ decay: 2, wet: 0 });
mainBus.mixer.reverb.getRotaryVal = () => mainBus.mixer.reverb.get().wet * 100;
mainBus.mixer.reverb.setValFromRotary = (val) => mainBus.mixer.reverb.set({ wet: val / 100 });

mainBus.mixer.filter = new Tone.Filter(20000, 'lowpass', -48);
mainBus.mixer.filter.getRotaryVal = () => mainBus.mixer.filter.get().frequency / 200;
mainBus.mixer.filter.setValFromRotary = (val) => {
  let newFreq = val === 100 ? 20000 : val * 100;
  mainBus.mixer.filter.set({ frequency: newFreq });
};

mainBus.mixer.warp = new Tone.PitchShift({ pitch: 0, wet: 0 });
mainBus.mixer.warp.getRotaryVal = () => (mainBus.mixer.warp.get().pitch + 25) * 2;
mainBus.mixer.warp.setValFromRotary = (val) => {
  const newPitch = (val - 50) / 2;
  const newWet = newPitch === 0 ? 0 : 1;
  mainBus.mixer.warp.set({ pitch: newPitch, wet: newWet });
};

mainBus.mixer.crush = new Tone.BitCrusher({ bits: 3, wet: 0 });
mainBus.mixer.crush.getRotaryVal = () => mainBus.mixer.crush.get().wet * 100;
mainBus.mixer.crush.setValFromRotary = (val) => mainBus.mixer.crush.set({ wet: val / 100 });

mainBus.mixer.distort = new Tone.Distortion({ distortion: 0.5, wet: 0 });
mainBus.mixer.distort.getRotaryVal = () => mainBus.mixer.distort.get().wet * 100;
mainBus.mixer.distort.setValFromRotary = (val) =>
  mainBus.mixer.distort.set({ wet: val / 100 });

mainBus.chain(
  mainBus.mixer.crush,
  mainBus.mixer.distort,
  mainBus.mixer.warp,
  mainBus.mixer.filter,
  mainBus.mixer.reverb,
  output
);

export const kitBus = new Tone.Channel({ volume: 0, pan: 0, channelCount: 2 });
kitBus.chain(fft, mainBus);

export const Kit = { name: 'init', samples: [{}] };

export const metronome = new Tone.Sampler({
  urls: {
    C1: clickLow,
    C2: clickHi,
  },
}).toDestination();

export const FX = {};
// export const FX = {
//   'delay 1\u204416': new Tone.FeedbackDelay({
//     delayTime: '16n',
//     feedback: 0.25,
//     wet: 1,
//   }),
//   'delay 1\u20448': new Tone.FeedbackDelay({
//     delayTime: '8n',
//     feedback: 0.2,
//     wet: 1,
//   }),
//   'delay .1\u20448': new Tone.FeedbackDelay({
//     delayTime: '.8n',
//     feedback: 0.2,
//     wet: 1,
//   }),
//   'delay 1\u20444': new Tone.FeedbackDelay({
//     delayTime: '4n',
//     feedback: 0.2,
//     wet: 1,
//   }),
//   reverb: new Tone.Reverb({ decay: 2, wet: 1 }),
//   'bit crusher': new Tone.BitCrusher({ bits: 4, wet: 1 }),
//   distortion: new Tone.Distortion({ distortion: 0.5, wet: 1 }),
// };
// Tone.Transport.syncSignal(FX['delay 1\u204416'].delayTime);
// Tone.Transport.syncSignal(FX['delay 1\u20448'].delayTime);
// Tone.Transport.syncSignal(FX['delay .1\u20448'].delayTime);
// Tone.Transport.syncSignal(FX['delay 1\u20444'].delayTime);
