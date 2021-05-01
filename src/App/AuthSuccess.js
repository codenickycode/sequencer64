import { PATHS } from 'hooks/useGoTo';
import { useDispatch } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import { setAuthToken } from './reducers/appSlice';
import { getUser } from './reducers/thunks/appThunks';

export const AuthSuccess = () => {
  const dispatch = useDispatch();
  const { authToken } = useParams();
  dispatch(setAuthToken(authToken));
  dispatch(getUser());
  return <Redirect to={PATHS.BASE} />;
};
