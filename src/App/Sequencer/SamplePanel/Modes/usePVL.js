import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EDITOR_MODE_INFO, INITIAL_MODS, setModVal } from 'App/reducers/editorSlice';
import { modAll, resetMods } from 'App/reducers/sequenceSlice';
import { showEditable, hideEditable } from 'utils/toggleClasses';
import { useShowAndHideClass, useShowAndHideText } from 'utils/hooks/useShowAndHide';

export const usePVL = () => {
  const dispatch = useDispatch();
  const editorMode = useSelector((state) => state.editor.mode);
  const selectedSample = useSelector((state) => state.editor.selectedSample);

  const [value, setValue] = useState(INITIAL_MODS[editorMode]);
  useEffect(() => dispatch(setModVal(value)), [dispatch, value]);

  const [editAll, setEditAll] = useState(true);

  const dispatchModAll = useCallback(() => {
    dispatch(
      modAll({
        selectedSample,
        type: editorMode,
        value,
      })
    );
  }, [dispatch, editorMode, selectedSample, value]);

  const { text, showAndHideText } = useShowAndHideText();
  const applyInfoValue = text;
  const applyInfoClasses = useShowAndHideClass('applyInfo', 2000, applyInfoValue);

  const toggleAll = useCallback(() => {
    if (editAll) {
      setEditAll(false);
      showEditable();
      showAndHideText(EDITOR_MODE_INFO[editorMode], 4000);
    } else {
      dispatchModAll();
      setEditAll(true);
      hideEditable();
    }
  }, [dispatchModAll, editAll, editorMode, showAndHideText]);

  const onReset = useCallback(() => {
    setValue(INITIAL_MODS[editorMode]);
    dispatch(setModVal(INITIAL_MODS[editorMode]));
    dispatch(resetMods({ selectedSample, type: editorMode }));
  }, [dispatch, editorMode, selectedSample, setValue]);

  return {
    applyInfo: { value: applyInfoValue, classes: applyInfoClasses },
    value,
    setValue,
    editAll,
    setEditAll,
    dispatchModAll,
    onReset,
    toggleAll,
  };
};
