import { EditorModeIcons } from 'assets/icons';
import { close, setMode } from 'App/reducers/editorSlice';
import { useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useSampleEditMenu = () => {
  const dispatch = useDispatch();
  const splitSamplePanel = useSelector((state) => state.screen.splitSamplePanel);

  const ref = useRef();
  useLayoutEffect(() => {
    if (!ref.current) return;
    const isOverflown = ref.current.scrollWidth > ref.current.clientWidth;
    if (!isOverflown) ref.current.classList.add('flex');
    else ref.current.classList.remove('flex');
  });

  const onClose = () => dispatch(close());

  const container = { ref };
  container.class = !splitSamplePanel ? 'editMenu dark' : 'editMenu';

  return { container, onClose };
};

export const useModeBtn = (mode) => {
  const dispatch = useDispatch();
  const selectedSample = useSelector((state) => state.editor.selectedSample);

  const modeName = mode.toLowerCase();
  const Icon = EditorModeIcons[mode];
  const disabled = useSelector(
    (state) => state.sequence.present.noteTally[selectedSample].empty
  );
  const selectMode = () => dispatch(setMode(mode));

  return { modeName, Icon, disabled, selectMode };
};
