import * as Tone from 'tone';
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
import { Kit } from 'App/shared/KitProvider';
import { useTouchAndMouse } from 'utils/useTouchAndMouse';

export const SamplePanel = () => {
  const dispatch = useDispatch();

  const mode = useSelector((state) => state.editor.mode);
  const landscape = useSelector((state) => state.app.landscape);

  const spMemo = useMemo(() => {
    // console.log('rendering: SamplePanel');
    const onReturn = () => {
      if (mode !== MODES.COPY) {
        hideEditable();
      }
      dispatch(setMode(MODES.PAINT));
    };

    const onClose = () => dispatch(close());

    const selectMode = (mode) => {
      if (mode && mode !== MODES.PAINT && mode !== MODES.COPY) showEditable();
      dispatch(setMode(mode));
    };

    return (
      <>
        {mode === MODES.PAINT ? (
          <SampleEditMenu selectMode={selectMode} onClose={onClose} />
        ) : mode === MODES.ERASE ? (
          <Erase onReturn={onReturn} landscape={landscape} />
        ) : mode === MODES.SLICE ? (
          <Slice onReturn={onReturn} landscape={landscape} />
        ) : mode === MODES.COPY ? (
          <Copy onReturn={onReturn} landscape={landscape} />
        ) : mode === MODES.TAP || !mode ? (
          <SampleBtns />
        ) : (
          <PitchVelocityLength onReturn={onReturn} mode={mode} />
        )}
      </>
    );
  }, [dispatch, landscape, mode]);

  return spMemo;
};

const SampleEditMenu = ({ selectMode, onClose }) => {
  const selectedSample = useSelector((state) => state.editor.selectedSample);
  const disabled = useSelector(
    (state) => state.sequence.present.noteTally[selectedSample].empty
  );

  const landscape = useSelector((state) => state.app.landscape);
  const ref = useRef();
  useLayoutEffect(() => {
    if (!ref.current) return;
    let isOverflown;
    if (landscape) {
      isOverflown = ref.current.scrollHeight > ref.current.clientHeight;
    } else {
      isOverflown = ref.current.scrollWidth > ref.current.clientWidth;
    }
    if (!isOverflown) {
      ref.current.classList.add('flex');
    } else {
      ref.current.classList.remove('flex');
    }
  });

  const memo = useMemo(() => {
    // console.log('rendering: SampleEditMenu');
    return (
      <div ref={ref} id='editMenu' className={'editMenu'}>
        <Button classes='close' onClick={onClose}>
          <CloseIcon />
        </Button>
        <div className='dummy' />
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
  }, [disabled, onClose, selectMode]);
  return memo;
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
        <div id='samplePanelBorder' />
      </div>
    );
  }, [dispatch, kit]);
  return sampleBtnsMemo;
};

const SampleBtn = ({ i, sample, selectSample }) => {
  const { kitRef } = useContext(Kit);
  const mode = useSelector((state) => state.editor.mode);
  const tapping = mode === MODES.TAP;

  const [flash, setFlash] = useState(false);
  useEffect(() => {
    if (flash) setTimeout(() => setFlash(false), 100);
  }, [flash]);

  const startFunc = useCallback(
    (e) => {
      window.log('tapping');
      if (tapping) {
        kitRef.current.samples[i].sampler.triggerAttack(
          'C2',
          Tone.immediate(),
          1
        );
        setFlash(true);
      }
    },
    [i, kitRef, tapping]
  );

  const onClick = () => {
    if (!tapping) selectSample(i);
  };

  const { touchStart, mouseDown } = useTouchAndMouse(startFunc);
  return (
    <div
      className={flash ? 'sampleBtn flash' : 'sampleBtn'}
      onTouchStart={touchStart}
      onMouseDown={mouseDown}
      onClick={onClick}
      aria-label={sample.name}
    >
      {icons[sample.icon](sample.color)}
      <div className={`border border${i}`} />
      <div className='bgFlash' />
    </div>
  );
};
