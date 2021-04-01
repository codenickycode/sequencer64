import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from 'App/reducers/appSlice';

export const GetUser = () => {
  const dispatch = useDispatch();
  const online = useSelector((state) => state.app.online);

  useEffect(() => {
    dispatch(getUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onlineRef = useRef(online);
  useEffect(() => {
    if (online) {
      if (!onlineRef.current) {
        console.log('back online');
        dispatch(getUser());
      }
      onlineRef.current = true;
    } else {
      console.log('offline');
      onlineRef.current = false;
    }
  }, [dispatch, online]);

  return null;
};
