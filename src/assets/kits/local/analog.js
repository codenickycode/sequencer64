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
      urls: { C2: kick },
      key: 'num1',
      color: 0,
      icon: 'kick',
    },
    {
      name: 'snare',
      urls: { C2: snr },
      key: 'num2',
      color: 1,
      icon: 'snr',
    },
    {
      name: 'clap',
      urls: { C2: clp },
      key: 'num3',
      color: 2,
      icon: 'clp',
    },
    {
      name: 'closed hat',
      urls: { C2: ch },
      key: 'num4',
      color: 3,
      icon: 'ch',
    },
    {
      name: 'open hat',
      urls: { C2: oh },
      key: 'num5',
      color: 4,
      icon: 'oh',
    },
    {
      name: 'cymbal',
      urls: { C2: cym },
      key: 'num6',
      color: 5,
      icon: 'cym',
    },
    {
      name: 'high tom',
      urls: { C2: ht },
      key: 'num7',
      color: 6,
      icon: 'tom',
    },
    {
      name: 'mid tom',
      urls: { C2: mt },
      key: 'num8',
      color: 7,
      icon: 'tom',
    },
    {
      name: 'low tom',
      urls: { C2: lt },
      key: 'num9',
      color: 8,
      icon: 'tom',
    },
  ],
};
