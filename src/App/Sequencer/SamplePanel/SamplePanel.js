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
      if (mode && mode !== MODES.PAINTING && mode !== MODES.COPYING)
        showEditable();
      dispatch(setMode(mode));
    };

    return (
      <>
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
      </>
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
      <div className='edit-menu'>
        <Button classes='close' onClick={onClose}>
          <CloseIcon />
        </Button>
        <div className='dummy' />
        <Button
          classes='menu-btn'
          disabled={disabled}
          onClick={() => selectMode(MODES.ERASING)}
        >
          <EraserIcon />
          <p>Erase</p>
        </Button>
        <Button
          classes='menu-btn'
          disabled={disabled}
          onClick={() => selectMode(MODES.SLICING)}
        >
          <SawIcon />
          <p>Slice</p>
        </Button>
        <Button classes='menu-btn' onClick={() => selectMode(MODES.COPYING)}>
          <CopyIcon />
          <p>Copy</p>
        </Button>
        <Button
          classes='menu-btn'
          disabled={disabled}
          onClick={() => selectMode(MODES.MOD_VELOCITY)}
        >
          <VelocityIcon />
          <p>Velocity</p>
        </Button>
        <Button
          classes='menu-btn'
          disabled={disabled}
          onClick={() => selectMode(MODES.MOD_LENGTH)}
        >
          <LengthIcon />
          <p>Length</p>
        </Button>
        <Button
          classes='menu-btn'
          disabled={disabled}
          onClick={() => selectMode(MODES.MOD_PITCH)}
        >
          <PitchIcon />
          <p>Pitch</p>
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
      <div className='menu'>
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
      classes='sample-btn'
      onClick={() => selectSample(i)}
      ariaLabel={sample.name}
    >
      {icons[sample.icon](sample.color)}
      <div className={`border border${i}`} />
    </Button>
  );
};
