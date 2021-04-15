import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EDITOR_MODE_INFO, INITIAL_MODS, setInfo, setModVal } from 'App/reducers/editorSlice';
import { modAll, resetMods } from 'App/reducers/sequenceSlice';
import { showEditable, hideEditable } from 'utils/toggleClasses';
import { showAndHideClass, showAndHideInfo } from 'utils/showAndHide';

export const usePitchVelocityLength = (editorMode, modPitchMode) => {
  const dispatch = useDispatch();
  const selectedSample = useSelector((state) => state.editor.selectedSample);
  const [value, setValue] = useState(INITIAL_MODS[editorMode]);

  const dispatchModAll = useCallback(() => {
    dispatch(
      modAll({
        selectedSample,
        type: editorMode,
        value,
      })
    );
  }, [dispatch, editorMode, selectedSample, value]);

  const [editAll, setEditAll] = useState(true);

  useEffect(() => {
    if (modPitchMode) {
      dispatch(setModVal(value));
      if (editAll) dispatchModAll();
    } else {
      dispatch(setModVal(Math.round(value * 100) / 100));
    }
  }, [dispatch, dispatchModAll, editAll, editorMode, modPitchMode, value]);

  const onChange = ({ target: { value } }) => {
    if (modPitchMode) {
      setValue(value);
    } else {
      setValue(Math.round(value * 100) / 100);
    }
  };

  // velocity & length
  const onTouchEnd = () => {
    if (editAll) {
      dispatchModAll();
    }
  };

  const [applyInfoValue, setApplyInfoValue] = useState('');
  const [applyInfoClasses, setApplyInfoClasses] = useState('applyInfo');
  useEffect(() => {
    if (!applyInfoValue) return;
    showAndHideClass(setApplyInfoClasses, 'applyInfo', 2000);
  }, [applyInfoValue]);

  const toggleAll = () => {
    if (editAll) {
      setEditAll(false);
      showEditable();
      showAndHideInfo(setApplyInfoValue, EDITOR_MODE_INFO[editorMode], 4000);
    } else {
      dispatchModAll();
      setEditAll(true);
      hideEditable();
    }
  };

  const onReset = () => {
    setValue(INITIAL_MODS[editorMode]);
    dispatch(setModVal(INITIAL_MODS[editorMode]));
    dispatch(resetMods({ selectedSample, type: editorMode }));
  };

  const splitSamplePanel = useSelector((state) => state.screen.splitSamplePanel);
  const containerClasses = splitSamplePanel ? 'detail col' : 'detail col dark';

  return {
    applyInfo: { value: applyInfoValue, classes: applyInfoClasses },
    containerClasses,
    value,
    onChange,
    onTouchEnd,
    onReset,
    toggleAll,
    editAll,
  };
};
