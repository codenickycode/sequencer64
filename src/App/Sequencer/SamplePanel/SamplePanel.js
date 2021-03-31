import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { close, edit, setMode, MODES } from 'App/reducers/editorSlice';
import {
  CloseIcon,
  CopyIcon,
  LengthIcon,
  EraserIcon,
  PitchIcon,
  SawIcon,
  VelocityIcon,
} from 'assets/icons';
import * as icons from 'assets/icons/kit';
import * as defaultKits from 'utils/defaultKits';
import { Button } from 'App/shared/Button';
import { Erase, Slice, Copy } from 'App/Sequencer/SamplePanel/EraseSliceCopy';
import { PitchVelocityLength } from 'App/Sequencer/SamplePanel/PitchVelocityLength';
import { showEditable, hideEditable } from 'utils/toggleClasses';

export const SamplePanel = () => {
  const dispatch = useDispatch();

  const mode = useSelector((state) => state.editor.mode);

  const spMemo = useMemo(() => {
    // console.log('rendering: SamplePanel');
    const onReturn = () => {
      if (mode !== MODES.COPYING) {
        hideEditable();
      }
      dispatch(setMode(MODES.PAINTING));
    };

    const onClose = () => dispatch(close());

    const selectMode = (mode) => {
      if (mode === MODES.ERASING || mode === MODES.SLICING) showEditable();
      dispatch(setMode(mode));
    };

    return (
      <div className={'sample-edit'}>
        {mode === MODES.ERASING ? (
          <Erase onReturn={onReturn} />
        ) : mode === MODES.SLICING ? (
          <Slice onReturn={onReturn} />
        ) : mode === MODES.COPYING ? (
          <Copy onReturn={onReturn} />
        ) : mode && mode !== MODES.PAINTING ? (
          <PitchVelocityLength onReturn={onReturn} mode={mode} />
        ) : mode ? (
          <SampleEditMenu selectMode={selectMode} onClose={onClose} />
        ) : (
          <SampleBtns />
        )}
      </div>
    );
  }, [dispatch, mode]);

  return spMemo;
};

const SampleEditMenu = ({ selectMode, onClose }) => {
  const selectedSample = useSelector((state) => state.editor.selectedSample);
  const disabled = useSelector(
    (state) => state.sequence.present.noteTally[selectedSample].empty
  );

  const sampleEditMenuMemo = useMemo(() => {
    // console.log('rendering: SampleEditMenu');

    return (
      <div className='sample-edit-menu'>
        <Button classes='sample-edit-close' onClick={onClose}>
          <CloseIcon />
        </Button>
        <div className='sample-edit-dummy' />
        <Button
          classes={'sample-edit-btn'}
          disabled={disabled}
          onClick={() => selectMode(MODES.ERASING)}
        >
          <div className='sample-edit-icon-div'>
            <EraserIcon />
            <p>Erase</p>
          </div>
        </Button>
        <Button
          classes='sample-edit-btn'
          disabled={disabled}
          onClick={() => selectMode(MODES.SLICING)}
        >
          <div className='sample-edit-icon-div'>
            <SawIcon />
            <p>Slice</p>
          </div>
        </Button>
        <Button
          classes='sample-edit-btn'
          onClick={() => selectMode(MODES.COPYING)}
        >
          <div className='sample-edit-icon-div'>
            <CopyIcon />
            <p>Copy</p>
          </div>
        </Button>
        <Button
          classes='sample-edit-btn'
          disabled={disabled}
          onClick={() => selectMode(MODES.MOD_VELOCITY)}
        >
          <div className='sample-edit-icon-div'>
            <VelocityIcon />
            <p>Velocity</p>
          </div>
        </Button>
        <Button
          classes='sample-edit-btn'
          disabled={disabled}
          onClick={() => selectMode(MODES.MOD_LENGTH)}
        >
          <div className='sample-edit-icon-div'>
            <LengthIcon />
            <p>Length</p>
          </div>
        </Button>
        <Button
          classes='sample-edit-btn'
          disabled={disabled}
          onClick={() => selectMode(MODES.MOD_PITCH)}
        >
          <div className='sample-edit-icon-div'>
            <PitchIcon />
            <p>Pitch</p>
          </div>
        </Button>
      </div>
    );
  }, [disabled, onClose, selectMode]);
  return sampleEditMenuMemo;
};

const SampleBtns = () => {
  const dispatch = useDispatch();
  const kit = useSelector((state) => state.sequence.present.kit);

  const sampleBtnsMemo = useMemo(() => {
    // console.log('rendering: SampleBtns');

    const selectSample = (i) => {
      dispatch(edit({ sample: i }));
    };

    return (
      <div className='sample-menu'>
        {defaultKits[kit] &&
          defaultKits[kit].samples.map((sample, i) => (
            <SampleBtn
              key={`sample-menu-${sample.name}`}
              i={i}
              sample={sample}
              selectSample={selectSample}
            />
          ))}
      </div>
    );
  }, [dispatch, kit]);
  return sampleBtnsMemo;
};

const SampleBtn = ({ i, sample, selectSample }) => {
  return (
    <Button
      classes={`sample sample-btn color${i}`}
      onClick={() => selectSample(i)}
    >
      {icons[sample.icon](sample.color)}
      <label className='sample-name'>{sample.name}</label>
      <div className='border' />
      <div className={`border-pulse border${i}`} />
    </Button>
  );
};
