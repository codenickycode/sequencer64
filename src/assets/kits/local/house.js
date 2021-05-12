import kick_verb from 'assets/audio/house/kick_verb.mp3';
import kick from 'assets/audio/house/kick.mp3';
import snr from 'assets/audio/house/snr.mp3';
import shk from 'assets/audio/house/shk.mp3';
import oh from 'assets/audio/house/oh.mp3';
import clp from 'assets/audio/house/clp.mp3';
import voc from 'assets/audio/house/voc.mp3';
import tom from 'assets/audio/house/tom.mp3';
import low_tom from 'assets/audio/house/low_tom.mp3';

export const house = {
  name: 'house',
  location: 'local',
  available: true,
  samples: [
    {
      name: 'verb kick',
      path: kick_verb,
      code: 'Numpad7',
      altCode: 'KeyQ',
      color: 0,
      icon: 'kick',
    },
    {
      name: 'kick',
      path: kick,
      code: 'Numpad8',
      altCode: 'KeyW',
      color: 1,
      icon: 'kick',
    },
    {
      name: 'snare',
      path: snr,
      code: 'Numpad9',
      altCode: 'KeyE',
      color: 2,
      icon: 'snr',
    },
    {
      name: 'shaker',
      path: shk,
      code: 'Numpad4',
      altCode: 'KeyA',
      color: 3,
      icon: 'shk',
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
      name: 'clap',
      path: clp,
      code: 'Numpad6',
      altCode: 'KeyD',
      color: 5,
      icon: 'clp',
    },
    {
      name: 'vocal',
      path: voc,
      code: 'Numpad1',
      altCode: 'KeyZ',
      color: 6,
      icon: 'voc',
    },
    {
      name: 'tom',
      path: tom,
      code: 'Numpad2',
      altCode: 'KeyX',
      color: 7,
      icon: 'tom',
    },
    {
      name: 'low tom',
      path: low_tom,
      code: 'Numpad3',
      altCode: 'KeyC',
      color: 8,
      icon: 'tom',
    },
  ],
};
