import { startTone } from 'App/reducers/thunks/toneThunks';
import store from 'App/store';
import * as Tone from 'tone';

const initialClick = async () => {
  store.dispatch(startTone());
  document.removeEventListener('touchstart', initialClick);
  document.removeEventListener('mousedown', initialClick);
};
document.addEventListener('touchstart', initialClick);
document.addEventListener('mousedown', initialClick);

const mainBus = Tone.getDestination();
mainBus.volume.value = -6;

export const fft = new Tone.FFT({
  size: 32,
  normalRange: true,
});
export const limiter = new Tone.Limiter(-20);
mainBus.chain(limiter, fft);

export const Kit = { name: 'init', samples: [{}] };
