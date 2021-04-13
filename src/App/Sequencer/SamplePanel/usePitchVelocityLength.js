import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { INITIAL_MODS, MODES, setModVal } from 'App/reducers/editorSlice';
import { modAll, resetMods } from 'App/reducers/sequenceSlice';
import { showEditable, hideEditable } from 'utils/toggleClasses';
import { MIDI_NOTES } from 'utils/MIDI_NOTES';

export const usePitchVelocityLength = (mode) => {
  const dispatch = useDispatch();
  const selectedSample = useSelector((state) => state.editor.selectedSample);
  const [value, setValue] = useState(
    mode === MODES.MOD_PITCH ? MIDI_NOTES[24] : 0.5
  );
  const splitSamplePanel = useSelector(
    (state) => state.screen.splitSamplePanel
  );
  const detailClass = splitSamplePanel ? 'detail col' : 'detail col dark';

  const dispatchModAll = useCallback(() => {
    dispatch(
      modAll({
        selectedSample,
        type: mode,
        value,
      })
    );
  }, [dispatch, mode, selectedSample, value]);

  const [editAll, setEditAll] = useState(false);

  useEffect(() => {
    if (mode === MODES.MOD_PITCH) {
      dispatch(setModVal(value));
      if (editAll) dispatchModAll();
    } else {
      dispatch(setModVal(Math.round(value * 100) / 100));
    }
  }, [dispatch, dispatchModAll, editAll, mode, value]);

  const onChange = ({ target: { value } }) => {
    if (mode === MODES.MOD_PITCH) {
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
    dispatch(setModVal(INITIAL_MODS[mode]));
    dispatch(resetMods({ selectedSample, type: mode }));
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
