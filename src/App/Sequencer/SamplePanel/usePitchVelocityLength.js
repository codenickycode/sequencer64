import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { INITIAL_MODS, MODES, setModVal } from 'App/reducers/editorSlice';
import { modAll, resetMods } from 'App/reducers/sequenceSlice';
import { showEditable, hideEditable } from 'utils/toggleClasses';
import { MIDI_NOTES } from 'utils/MIDI_NOTES';

export const usePitchVelocityLength = (mode) => {
  const dispatch = useDispatch();
  const selectedSample = useSelector((state) => state.editor.selectedSample);
  // const value = useSelector((state) => state.editor.mods[mode]);
  const [value, setValue] = useState(
    mode === MODES.MOD_PITCH ? MIDI_NOTES[24] : 0.5
  );
  useEffect(() => {
    if (mode === MODES.MOD_PITCH) {
      dispatch(setModVal(value));
    } else {
      dispatch(setModVal(Math.round(value * 100) / 100));
    }
  }, [dispatch, mode, value]);

  const [editAll, setEditAll] = useState(false);

  const onChange = ({ target: { value } }) => {
    if (mode === MODES.MOD_PITCH) {
      setValue(value);
    } else {
      setValue(Math.round(value * 100) / 100);
    }
  };

  const dispatchModAll = () => {
    dispatch(
      modAll({
        selectedSample,
        type: mode,
        value,
      })
    );
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

  // velocity & length
  const onTouchEnd = () => {
    if (editAll) dispatchModAll();
  };

  useEffect(() => {
    if (mode === MODES.MOD_PITCH && editAll)
      dispatch(
        modAll({
          selectedSample,
          type: MODES.MOD_PITCH,
          value,
        })
      );
  }, [dispatch, editAll, mode, selectedSample, value]);

  const onReset = () => {
    dispatch(setModVal(INITIAL_MODS[mode]));
    dispatch(resetMods({ selectedSample, type: mode }));
  };

  return { value, onChange, onTouchEnd, onReset, toggleAll, editAll };
};
