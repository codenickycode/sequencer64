import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'App/reducers/appSlice';
import { Button } from 'App/shared/Button';
import { PATHS, useGoTo } from 'utils/hooks/useGoTo';

export const LoginSection = () => {
  const loggedIn = useSelector((state) => state.app.user.loggedIn);
  const state = useLoginSectionState();
  return loggedIn ? <LoggedIn {...state} /> : <NotLoggedIn {...state} />;
};

const LoggedIn = ({ fetching, classes, values }) => {
  const dispatch = useDispatch();
  const onLogout = () => dispatch(logout());
  return (
    <div className='loggedIn'>
      {fetching ? (
        <p>please wait...</p>
      ) : (
        <>
          <p className='user'>{values.user}</p>
          <p className={classes.online}>{values.online}</p>
        </>
      )}
      <Button disabled={fetching} onClick={onLogout}>
        logout
      </Button>
    </div>
  );
};

const NotLoggedIn = ({ values, fetching }) => {
  const goTo = useGoTo();
  return (
    <div className='notLoggedIn'>
      <p className='sub'>{values.sub}</p>
      <Button classes='loginBtn' onClick={goTo.login} disabled={fetching}>
        {values.loginBtn}
      </Button>
    </div>
  );
};

const useLoginSectionState = () => {
  const username = useSelector((state) => state.app.user.username);
  const online = useSelector((state) => state.app.online);
  const fetching = useSelector((state) => state.app.fetching);

  const classes = {};
  classes.online = online ? 'online' : 'online error';

  const values = {};
  values.user = `Logged in as: ${username}`;
  values.online = online ? 'online sync' : 'offline';
  values.sub = fetching
    ? 'Logging in...'
    : 'Login to sync your sequences with your account and share to social media';
  values.loginBtn = fetching ? 'x' : 'Login';

  return { fetching, values, classes };
};
