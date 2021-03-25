import { ReactComponent as Stop } from './stop.svg';
import { ReactComponent as Start } from './start.svg';
import { ReactComponent as Pause } from './pause.svg';
import { ReactComponent as Undo } from './undo.svg';
import { ReactComponent as Redo } from './redo.svg';
import { ReactComponent as EraseOne } from './erase-one.svg';
import { ReactComponent as EraseAll } from './erase-all.svg';
import { ReactComponent as Swipe } from './swipe.svg';
import { ReactComponent as Saw } from './saw.svg';
import { ReactComponent as Copy } from './copy.svg';
import { ReactComponent as Solo } from './solo.svg';
import { ReactComponent as Mute } from './mute.svg';
import { ReactComponent as Pitch } from './pitch.svg';
import { ReactComponent as Velocity } from './velocity.svg';
import { ReactComponent as Length } from './length.svg';
import { ReactComponent as Square } from './square.svg';
import { ReactComponent as PointRight } from './point-right.svg';
import { ReactComponent as PointUp } from './point-up.svg';
import { ReactComponent as PointDown } from './point-down.svg';
import { ReactComponent as Paint } from './paint.svg';
import { ReactComponent as Close } from './close.svg';
import { ReactComponent as ChevronDown } from './chevron-down.svg';
import { ReactComponent as ChevronRight } from './chevron-right.svg';
import { ReactComponent as ChevronLeft } from './chevron-left.svg';
import { ReactComponent as ChevronDoubleLeft } from './chevron-double-left.svg';
import { ReactComponent as ChevronDoubleRight } from './chevron-double-right.svg';
import { ReactComponent as ChevronTripleLeft } from './chevron-triple-left.svg';
import { ReactComponent as ChevronTripleRight } from './chevron-triple-right.svg';
import { ReactComponent as Open } from './open.svg';
import { ReactComponent as Save } from './save.svg';
import { ReactComponent as Delete } from './delete.svg';
import { ReactComponent as Kit } from './kit.svg';
import { ReactComponent as Eraser } from './eraser.svg';

export const ChevronDownIcon = ({ addClass = '' }) => (
  <ChevronDown className={addClass + ' chevron-down'} />
);

export const ChevronLeftIcon = ({ addClass = '' }) => (
  <ChevronLeft className={addClass + ' chevron-left'} />
);
export const ChevronRightIcon = ({ addClass = '' }) => (
  <ChevronRight className={addClass + ' chevron-right'} />
);

export const ChevronDoubleLeftIcon = ({ addClass = '' }) => (
  <ChevronDoubleLeft className={addClass + ' icon'} />
);
export const ChevronDoubleRightIcon = ({ addClass = '' }) => (
  <ChevronDoubleRight className={addClass + ' icon'} />
);

export const ChevronTripleLeftIcon = ({ addClass = '' }) => (
  <ChevronTripleLeft className={addClass + ' icon'} />
);
export const ChevronTripleRightIcon = (addClass = '') => (
  <ChevronTripleRight className={addClass + ' icon'} />
);

export const StopIcon = ({ addClass = '' }) => (
  <Stop className={addClass + ' icon'} />
);
export const StartIcon = ({ addClass = '' }) => (
  <Start className={addClass + ' icon'} />
);
export const PauseIcon = ({ addClass = '' }) => (
  <Pause className={addClass + ' icon'} />
);

export const UndoIcon = ({ addClass = '' }) => (
  <Undo className={addClass + ' icon'} />
);
export const RedoIcon = ({ addClass = '' }) => (
  <Redo className={addClass + ' icon'} />
);
export const EraseOneIcon = ({ addClass = '' }) => (
  <EraseOne className={addClass + ' icon'} />
);
export const EraseAllIcon = ({ addClass = '' }) => (
  <EraseAll className={addClass + ' icon'} />
);

export const SwipeHorizontalIcon = () => <Swipe />;
export const SwipeVerticalIcon = () => <Swipe className='deg90' />;

export const SawIcon = ({ addClass = '' }) => (
  <Saw className={addClass + ' icon'} />
);
export const CopyIcon = ({ addClass = '' }) => (
  <Copy className={addClass + ' icon'} />
);

export const SoloIcon = ({ addClass = '' }) => (
  <Solo className={addClass + ' icon'} />
);
export const MuteIcon = ({ addClass = '' }) => (
  <Mute className={addClass + ' icon'} />
);

export const PitchIcon = ({ addClass = '' }) => (
  <Pitch className={addClass + ' icon'} />
);
export const VelocityIcon = ({ addClass = '' }) => (
  <Velocity className={addClass + ' icon'} />
);
export const LengthIcon = ({ addClass = '' }) => (
  <Length className={addClass + ' icon'} />
);

export const PaintIcon = ({ addClass = '' }) => (
  <Paint className={addClass + ' icon'} />
);
export const CloseIcon = ({ addClass = '' }) => (
  <Close className={addClass + ' icon'} />
);

export const OpenIcon = ({ addClass = '' }) => (
  <Open className={addClass + ' icon'} />
);
export const SaveIcon = ({ addClass = '' }) => (
  <Save className={addClass + ' icon'} />
);

export const DeleteIcon = ({ addClass = '' }) => (
  <Delete className={addClass + ' icon'} />
);

export const EraserIcon = ({ addClass = '' }) => (
  <Eraser className={addClass + ' icon'} />
);

export const KitIcon = ({ addClass = '' }) => (
  <Kit className={addClass + ' icon'} />
);

export const PointDownIcon = ({ addClass = '' }) => (
  <PointDown className={addClass + ' icon'} />
);

export const PitchSwipe = () => {
  return (
    <div className='swipe-icon'>
      <PointUp className='pvl-swipe' />
      <Square className='square icon' />
      <p className='swipe-pitch-up'>+12</p>
      <p className='swipe-pitch-down'>-5</p>
    </div>
  );
};

export const VelocitySwipe = () => {
  return (
    <div className='swipe-icon'>
      <PointUp className='pvl-swipe' />
      <Square className='square icon velocity-swipe' />
    </div>
  );
};

export const LengthSwipe = () => {
  return (
    <div className='swipe-icon'>
      <PointUp className='pvl-swipe-h' />
      <Square className='square icon length-swipe' />
    </div>
  );
};
