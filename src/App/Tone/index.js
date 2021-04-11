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
mainBus.volume.value = -12;

export const fft = new Tone.FFT({ size: 64, normalRange: true, smoothing: 1 });
export const meter = new Tone.Meter({ normalRange: true });
mainBus.chain(fft, meter);

export const Kit = { name: 'init', samples: [{}] };
