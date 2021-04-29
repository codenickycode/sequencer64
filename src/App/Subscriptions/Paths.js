import { MODES, setMode } from 'App/reducers/editorSlice';
import { useCurrentPath } from 'hooks/useGoTo';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

export const Paths = () => {
  const dispatch = useDispatch();
  const { selectingKit, mixing } = useCurrentPath();
  const pathname = useLocation().pathname;

  useEffect(() => {
    if (selectingKit || mixing) dispatch(setMode(MODES.TAP));
    else dispatch(setMode(MODES.INIT));
  }, [dispatch, mixing, pathname, selectingKit]);

  return null;
};
