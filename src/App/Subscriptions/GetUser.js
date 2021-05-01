import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from 'App/reducers/appSlice';
import { checkCachedKits } from 'App/reducers/assetsSlice';

export const GetUser = () => {
  const dispatch = useDispatch();
  const online = useSelector((state) => state.app.online);
  const authToken = useSelector((state) => state.app.authToken);

  useEffect(() => {
    if (authToken) dispatch(getUser());
    dispatch(checkCachedKits()); // this is too unrelated
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
