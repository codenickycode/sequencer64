import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MODES } from 'App/reducers/editorSlice';
import {
  highlightSamplePanel,
  unhighlightSamplePanel,
} from 'utils/toggleClasses';

export const Info = () => {
  const mode = useSelector((state) => state.editor.mode);
  const tapping = mode === MODES.TAP;
  useEffect(() => {
    if (tapping) {
      highlightSamplePanel();
    } else {
      unhighlightSamplePanel();
    }
  }, [tapping]);

  return null;
};
