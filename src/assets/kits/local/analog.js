import ch from 'assets/audio/analog/ch.mp3';
import clp from 'assets/audio/analog/clp.mp3';
import cym from 'assets/audio/analog/cym.mp3';
import ht from 'assets/audio/analog/ht.mp3';
import kick from 'assets/audio/analog/kick.mp3';
import lt from 'assets/audio/analog/lt.mp3';
import mt from 'assets/audio/analog/mt.mp3';
import oh from 'assets/audio/analog/oh.mp3';
import snr from 'assets/audio/analog/snr.mp3';

export const analog = {
  name: 'analog',
  location: 'local',
  available: true,
  samples: [
    {
      name: 'kick',
      path: kick,
      key: 'num1',
      color: 0,
      icon: 'kick',
    },
    {
      name: 'snr',
      path: snr,
      key: 'num2',
      color: 1,
      icon: 'snr',
    },
    {
      name: 'clp',
      path: clp,
      key: 'num3',
      color: 2,
      icon: 'clp',
    },
    {
      name: 'ch',
      path: ch,
      key: 'num4',
      color: 3,
      icon: 'ch',
    },
    {
      name: 'oh',
      path: oh,
      key: 'num5',
      color: 4,
      icon: 'oh',
    },
    {
      name: 'cym',
      path: cym,
      key: 'num6',
      color: 5,
      icon: 'cym',
    },
    {
      name: 'ht',
      path: ht,
      key: 'num7',
      color: 6,
      icon: 'tom',
    },
    {
      name: 'mt',
      path: mt,
      key: 'num8',
      color: 7,
      icon: 'tom',
    },
    {
      name: 'lt',
      path: lt,
      key: 'num9',
      color: 8,
      icon: 'tom',
    },
  ],
};
