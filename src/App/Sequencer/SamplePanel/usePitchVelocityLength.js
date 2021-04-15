import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EDITOR_MODE_INFO, INITIAL_MODS, MODES, setModVal } from 'App/reducers/editorSlice';
import { modAll, resetMods } from 'App/reducers/sequenceSlice';
import { showEditable, hideEditable } from 'utils/toggleClasses';
import { showAndHideClass, showAndHideInfo } from 'utils/showAndHide';

export const usePitchVelocityLength = () => {
  const editorMode = useSelector((state) => state.editor.mode);
  const modPitchMode = editorMode === MODES.MOD_PITCH;
  const dispatch = useDispatch();
  const selectedSample = useSelector((state) => state.editor.selectedSample);
  const [value, setValue] = useState(INITIAL_MODS[editorMode]);
  useEffect(() => {
    console.log(value);
  }, [value]);

  const dispatchModAll = useCallback(() => {
    console.log(value);
    dispatch(
      modAll({
        selectedSample,
        type: editorMode,
        value,
      })
    );
  }, [dispatch, editorMode, selectedSample, value]);

  const [mouseDispatchModAll, setMouseDispatchModAll] = useState(false);
  useEffect(() => {
    if (!mouseDispatchModAll) return;
    dispatchModAll();
    setMouseDispatchModAll(false);
  }, [dispatchModAll, mouseDispatchModAll]);

  const [editAll, setEditAll] = useState(true);

  useEffect(() => {
    if (modPitchMode) {
      dispatch(setModVal(value));
      if (editAll) dispatchModAll();
    } else {
      dispatch(setModVal(value));
    }
  }, [dispatch, dispatchModAll, editAll, editorMode, modPitchMode, value]);

  const onChange = useCallback(
    ({ target: { value } }) => {
      if (modPitchMode) {
        setValue(value);
      }
    },
    [modPitchMode]
  );

  // velocity & length

  const sliderRef = useRef(null);
  const setSliderValue = useCallback((e) => {
    if (!sliderRef.current) return;
    const newVal = getSliderValue(e, sliderRef.current);
    setValue(newVal);
  }, []);

  const endFunc = (e) => {
    if (!editAll) return;
    if (e.type === 'mouseup') setMouseDispatchModAll(true);
    else dispatchModAll();
  };

  const [applyInfoValue, setApplyInfoValue] = useState('');
  const [applyInfoClasses, setApplyInfoClasses] = useState('applyInfo');
  useEffect(() => {
    if (!applyInfoValue) return;
    showAndHideClass(setApplyInfoClasses, 'applyInfo', 2000);
  }, [applyInfoValue]);

  const toggleAll = useCallback(() => {
    if (editAll) {
      setEditAll(false);
      showEditable();
      showAndHideInfo(setApplyInfoValue, EDITOR_MODE_INFO[editorMode], 4000);
    } else {
      dispatchModAll();
      setEditAll(true);
      hideEditable();
    }
  }, [dispatchModAll, editAll, editorMode]);

  const onReset = useCallback(() => {
    setValue(INITIAL_MODS[editorMode]);
    dispatch(setModVal(INITIAL_MODS[editorMode]));
    dispatch(resetMods({ selectedSample, type: editorMode }));
  }, [dispatch, editorMode, selectedSample]);

  const splitSamplePanel = useSelector((state) => state.screen.splitSamplePanel);
  const containerClasses = splitSamplePanel ? 'detail col' : 'detail col dark';
  return {
    applyInfo: { value: applyInfoValue, classes: applyInfoClasses },
    containerClasses,
    value,
    onChange,
    sliderRef,
    setSliderValue,
    endFunc,
    onReset,
    toggleAll,
    editAll,
  };
};

const getSliderValue = (e, slider) => {
  let newX;
  if (e.touches) newX = e.touches[0].clientX;
  else newX = e.clientX;
  const { left, width } = slider.getBoundingClientRect();
  let newVal = (newX - left) / width;
  if (newVal < 0.05) newVal = 0.05;
  if (newVal > 1) newVal = 1;
  newVal = Math.round(newVal * 100) / 100;
  return newVal;
};
