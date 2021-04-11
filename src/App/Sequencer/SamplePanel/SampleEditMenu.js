import { MODES } from 'App/reducers/editorSlice';
import { Button } from 'App/shared/Button';
import {
  CloseIcon,
  CopyIcon,
  EraserIcon,
  LengthIcon,
  PitchIcon,
  SawIcon,
  VelocityIcon,
} from 'assets/icons';
import { useLayoutEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';

export const SampleEditMenu = ({ selectMode, onClose }) => {
  const selectedSample = useSelector((state) => state.editor.selectedSample);
  const disabled = useSelector(
    (state) => state.sequence.present.noteTally[selectedSample].empty
  );
  const splitSamplePanel = useSelector((state) => state.app.splitSamplePanel);

  const ref = useRef();
  useLayoutEffect(() => {
    if (!ref.current) return;
    const isOverflown = ref.current.scrollWidth > ref.current.clientWidth;
    if (!isOverflown) {
      ref.current.classList.add('flex');
    } else {
      ref.current.classList.remove('flex');
    }
  });

  const memo = useMemo(() => {
    // console.log('rendering: SampleEditMenu');
    return (
      <div
        ref={ref}
        id='editMenu'
        className={!splitSamplePanel ? 'editMenu dark' : 'editMenu'}
      >
        <Button classes='close' onClick={onClose}>
          <CloseIcon />
        </Button>
        <div className='sampleMenuBtn dummy' />
        <Button
          classes='sampleMenuBtn'
          disabled={disabled}
          onClick={() => selectMode(MODES.ERASE)}
        >
          <EraserIcon />
          <p>Erase</p>
        </Button>
        <Button
          classes='sampleMenuBtn'
          disabled={disabled}
          onClick={() => selectMode(MODES.SLICE)}
        >
          <SawIcon />
          <p>Slice</p>
        </Button>
        <Button classes='sampleMenuBtn' onClick={() => selectMode(MODES.COPY)}>
          <CopyIcon />
          <p>Copy</p>
        </Button>
        <Button
          classes='sampleMenuBtn'
          disabled={disabled}
          onClick={() => selectMode(MODES.MOD_VELOCITY)}
        >
          <VelocityIcon />
          <p>Velocity</p>
        </Button>
        <Button
          classes='sampleMenuBtn'
          disabled={disabled}
          onClick={() => selectMode(MODES.MOD_LENGTH)}
        >
          <LengthIcon />
          <p>Length</p>
        </Button>
        <Button
          classes='sampleMenuBtn'
          disabled={disabled}
          onClick={() => selectMode(MODES.MOD_PITCH)}
        >
          <PitchIcon />
          <p>Pitch</p>
        </Button>
      </div>
    );
  }, [disabled, onClose, selectMode, splitSamplePanel]);
  return memo;
};
