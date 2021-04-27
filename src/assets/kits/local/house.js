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
      urls: { C2: kick_verb },
      key: 'num1',
      color: 0,
      icon: 'kick',
    },
    {
      name: 'kick',
      urls: { C2: kick },
      key: 'num2',
      color: 1,
      icon: 'kick',
    },
    {
      name: 'snare',
      urls: { C2: snr },
      key: 'num3',
      color: 2,
      icon: 'snr',
    },
    {
      name: 'shaker',
      urls: { C2: shk },
      key: 'num4',
      color: 3,
      icon: 'shk',
    },
    {
      name: 'open hat',
      urls: { C2: oh },
      key: 'num5',
      color: 4,
      icon: 'oh',
    },
    {
      name: 'clap',
      urls: { C2: clp },
      key: 'num6',
      color: 5,
      icon: 'clp',
    },
    {
      name: 'vocal',
      urls: { C2: voc },
      key: 'num7',
      color: 6,
      icon: 'voc',
    },
    {
      name: 'tom',
      urls: { C2: tom },
      key: 'num8',
      color: 7,
      icon: 'tom',
    },
    {
      name: 'low tom',
      urls: {
        C2: low_tom,
      },
      key: 'num9',
      color: 8,
      icon: 'tom',
    },
  ],
};
