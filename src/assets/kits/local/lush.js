import kick_long from 'assets/audio/lush/kick_long.mp3';
import kick_mid from 'assets/audio/lush/kick_mid.mp3';
import kick_short from 'assets/audio/lush/kick_short.mp3';
import ch from 'assets/audio/lush/ch.mp3';
import oh from 'assets/audio/lush/oh.mp3';
import snr from 'assets/audio/lush/snr.mp3';
import tamb from 'assets/audio/lush/tamb.mp3';
import plop from 'assets/audio/lush/plop.mp3';
import clp from 'assets/audio/lush/clp.mp3';

export const lush = {
  name: 'lush',
  location: 'local',
  available: true,
  samples: [
    {
      name: 'long kick',
      urls: { C2: kick_long },
      key: 'num1',
      color: 0,
      icon: 'kick',
    },
    {
      name: 'med kick',
      urls: { C2: kick_mid },
      key: 'num2',
      color: 1,
      icon: 'kick',
    },
    {
      name: 'short kick',
      urls: { C2: kick_short },
      key: 'num3',
      color: 2,
      icon: 'kick',
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
      name: 'snare',
      urls: { C2: snr },
      key: 'num6',
      color: 5,
      icon: 'snr',
    },
    {
      name: 'tambourine',
      urls: { C2: tamb },
      key: 'num7',
      color: 6,
      icon: 'tamb',
    },
    {
      name: 'plop',
      urls: { C2: plop },
      key: 'num8',
      color: 7,
      icon: 'wb',
    },
    {
      name: 'clap',
      urls: { C2: clp },
      key: 'num9',
      color: 8,
      icon: 'clp',
    },
  ],
};
