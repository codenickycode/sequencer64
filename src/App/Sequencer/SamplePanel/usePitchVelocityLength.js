import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { INITIAL_MODS, setModVal } from 'App/reducers/editorSlice';
import { modAll, resetMods } from 'App/reducers/sequenceSlice';
import { showEditable, hideEditable } from 'utils/toggleClasses';

export const usePitchVelocityLength = (editorMode, modPitchMode) => {
  const dispatch = useDispatch();
  const selectedSample = useSelector((state) => state.editor.selectedSample);
  const [value, setValue] = useState(INITIAL_MODS[editorMode]);
  const splitSamplePanel = useSelector((state) => state.screen.splitSamplePanel);
  const detailClass = splitSamplePanel ? 'detail col' : 'detail col dark';

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

  const toggleAll = () => {
    if (editAll) {
      setEditAll(false);
      showEditable();
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

  return {
    detailClass,
    value,
    onChange,
    onTouchEnd,
    onReset,
    toggleAll,
    editAll,
  };
};
