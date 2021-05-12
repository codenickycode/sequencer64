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
      code: 'Numpad7',
      altCode: 'KeyQ',
      color: 0,
      icon: 'kick',
    },
    {
      name: 'snare',
      path: snr,
      code: 'Numpad8',
      altCode: 'KeyW',
      color: 1,
      icon: 'snr',
    },
    {
      name: 'clap',
      path: clp,
      code: 'Numpad9',
      altCode: 'KeyE',
      color: 2,
      icon: 'clp',
    },
    {
      name: 'closed hat',
      path: ch,
      code: 'Numpad4',
      altCode: 'KeyA',
      color: 3,
      icon: 'ch',
    },
    {
      name: 'open hat',
      path: oh,
      code: 'Numpad5',
      altCode: 'KeyS',
      color: 4,
      icon: 'oh',
    },
    {
      name: 'cymbal',
      path: cym,
      code: 'Numpad6',
      altCode: 'KeyD',
      color: 5,
      icon: 'cym',
    },
    {
      name: 'high tom',
      path: ht,
      code: 'Numpad1',
      altCode: 'KeyZ',
      color: 6,
      icon: 'tom',
    },
    {
      name: 'mid tom',
      path: mt,
      code: 'Numpad2',
      altCode: 'KeyX',
      color: 7,
      icon: 'tom',
    },
    {
      name: 'low tom',
      path: lt,
      code: 'Numpad3',
      altCode: 'KeyC',
      color: 8,
      icon: 'tom',
    },
  ],
};
