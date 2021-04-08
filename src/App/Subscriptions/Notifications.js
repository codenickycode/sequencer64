import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setConfirmation, setError } from 'App/reducers/appSlice';
import { MODES, setSpAlert } from 'App/reducers/editorSlice';

export const Notifications = () => {
  const dispatch = useDispatch();
  const confirmation = useSelector((state) => state.app.confirmation);
  const error = useSelector((state) => state.app.error);

  useEffect(() => {
    let timer;
    if (confirmation)
      timer = setTimeout(() => dispatch(setConfirmation('')), 5000);
    return () => clearTimeout(timer);
  }, [confirmation, dispatch]);

  useEffect(() => {
    let timer;
    if (error) timer = setTimeout(() => dispatch(setError('')), 5000);
    return () => clearTimeout(timer);
  }, [dispatch, error]);

  const mode = useSelector((state) => state.editor.mode);
  const tapping = mode === MODES.TAP;
  useEffect(() => {
    if (tapping) dispatch(setSpAlert('Tap to play samples'));
  }, [dispatch, tapping]);

  return null;
};
