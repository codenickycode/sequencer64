import { Button } from 'App/shared/Button';
import { CloseIcon, EditorModeIcons } from 'assets/icons';
import { close, setMode, MODES } from 'App/reducers/editorSlice';
import { useLayoutEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const SampleEditMenu = () => {
  const dispatch = useDispatch();
  const splitSamplePanel = useSelector((state) => state.screen.splitSamplePanel);

  const ref = useRef();
  useLayoutEffect(() => {
    if (!ref.current) return;
    const isOverflown = ref.current.scrollWidth > ref.current.clientWidth;
    if (!isOverflown) ref.current.classList.add('flex');
    else ref.current.classList.remove('flex');
  });

  const memo = useMemo(() => {
    const onClose = () => dispatch(close());
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
        <ModeBtn mode={MODES.ERASE} />
        <ModeBtn mode={MODES.SLICE} />
        <ModeBtn mode={MODES.COPY} />
        <ModeBtn mode={MODES.MOD_VELOCITY} />
        <ModeBtn mode={MODES.MOD_LENGTH} />
        <ModeBtn mode={MODES.MOD_PITCH} />
      </div>
    );
  }, [dispatch, splitSamplePanel]);
  return memo;
};

const ModeBtn = ({ mode }) => {
  const dispatch = useDispatch();
  const selectedSample = useSelector((state) => state.editor.selectedSample);
  const disabled = useSelector(
    (state) => state.sequence.present.noteTally[selectedSample].empty
  );
  const memo = useMemo(() => {
    const selectMode = (newEditorMode) => dispatch(setMode(newEditorMode));
    const Icon = EditorModeIcons[mode];
    return (
      <Button classes='sampleMenuBtn' disabled={disabled} onClick={() => selectMode(mode)}>
        <Icon />
        <p>{mode.toLowerCase()}</p>
      </Button>
    );
  }, [disabled, dispatch, mode]);
  return memo;
};
