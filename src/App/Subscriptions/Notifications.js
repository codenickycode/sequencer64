import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert, setConfirmation, setError } from 'App/reducers/appSlice';
import { MODES } from 'App/reducers/editorSlice';

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
  const tapRecording = mode === MODES.TAP_RECORD;
  useEffect(() => {
    if (tapping) dispatch(setAlert('Tap sample buttons to play'));
    if (tapRecording) dispatch(setAlert('Tap sample buttons to record'));
  }, [dispatch, tapRecording, tapping]);

  return null;
};
