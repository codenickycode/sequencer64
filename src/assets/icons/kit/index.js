import { ReactComponent as Cowbell } from 'assets/icons/kit/cb.svg';
import { ReactComponent as ClosedHat } from 'assets/icons/kit/ch.svg';
import { ReactComponent as Clap } from 'assets/icons/kit/clp.svg';
import { ReactComponent as Cymbal } from 'assets/icons/kit/cym.svg';
import { ReactComponent as FX } from 'assets/icons/kit/fx.svg';
import { ReactComponent as Kick } from 'assets/icons/kit/kick.svg';
import { ReactComponent as Kick2 } from 'assets/icons/kit/kick2.svg';
import { ReactComponent as OpenHat } from 'assets/icons/kit/oh.svg';
import { ReactComponent as Shaker } from 'assets/icons/kit/shk.svg';
import { ReactComponent as Shaker2 } from 'assets/icons/kit/shk2.svg';
import { ReactComponent as Snare } from 'assets/icons/kit/snr.svg';
import { ReactComponent as Snare2 } from 'assets/icons/kit/snr2.svg';
import { ReactComponent as Sticks } from 'assets/icons/kit/sticks.svg';
import { ReactComponent as Sticks2 } from 'assets/icons/kit/sticks2.svg';
import { ReactComponent as Tom } from 'assets/icons/kit/tom.svg';
import { ReactComponent as Vocal } from 'assets/icons/kit/voc.svg';
import { ReactComponent as Woodblock } from 'assets/icons/kit/wb.svg';
import { ReactComponent as Tambourine } from 'assets/icons/kit/tamb.svg';

export const cb = (color) => {
  const classes = color || color === 0 ? `icon fill${color}` : 'icon fillWhite';
  return <Cowbell className={classes} />;
};

export const ch = (color) => {
  const classes = color || color === 0 ? `icon fill${color}` : 'icon white';
  return <ClosedHat className={classes} />;
};

export const clp = (color) => {
  const classes = color || color === 0 ? `icon fill${color}` : 'icon white';
  return <Clap className={classes} />;
};

export const cym = (color) => {
  const classes = color || color === 0 ? `icon fill${color}` : 'icon white';
  return <Cymbal className={classes} />;
};

export const fx = (color) => {
  const classes = color || color === 0 ? `icon fill${color}` : 'icon white';
  return <FX className={classes} />;
};

export const kick = (color) => {
  const classes = color || color === 0 ? `icon fill${color}` : 'icon white';
  return <Kick className={classes} />;
};

export const kick2 = (color) => {
  const classes = color || color === 0 ? `icon fill${color}` : 'icon white';
  return <Kick2 className={classes} />;
};

export const oh = (color) => {
  const classes = color || color === 0 ? `icon fill${color}` : 'icon white';
  return <OpenHat className={classes} />;
};

export const shk = (color) => {
  const classes = color || color === 0 ? `icon fill${color}` : 'icon white';
  return <Shaker className={classes} />;
};

export const shk2 = (color) => {
  const classes = color || color === 0 ? `icon fill${color}` : 'icon white';
  return <Shaker2 className={classes} />;
};

export const snr = (color) => {
  const classes = color || color === 0 ? `icon fill${color}` : 'icon white';
  return <Snare className={classes} />;
};

export const snr2 = (color) => {
  const classes = color || color === 0 ? `icon fill${color}` : 'icon white';
  return <Snare2 className={classes} />;
};

export const sticks = (color) => {
  const classes = color || color === 0 ? `icon fill${color}` : 'icon white';
  return <Sticks className={classes} />;
};

export const sticks2 = (color) => {
  const classes = color || color === 0 ? `icon fill${color}` : 'icon white';
  return <Sticks2 className={classes} />;
};

export const tom = (color) => {
  const classes = color || color === 0 ? `icon fill${color}` : 'icon white';
  return <Tom className={classes} />;
};

export const voc = (color) => {
  const classes = color || color === 0 ? `icon fill${color}` : 'icon white';
  return <Vocal className={classes} />;
};

export const wb = (color) => {
  const classes = color || color === 0 ? `icon fill${color}` : 'icon white';
  return <Woodblock className={classes} />;
};

export const tamb = (color) => {
  const classes = color || color === 0 ? `icon fill${color}` : 'icon white';
  return <Tambourine className={classes} />;
};
