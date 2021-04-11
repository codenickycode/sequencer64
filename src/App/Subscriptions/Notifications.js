import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setConfirmation, setError } from 'App/reducers/appSlice';

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

  return null;
};
