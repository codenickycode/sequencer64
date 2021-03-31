import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'App/reducers/appSlice';
import { stopSequence } from 'App/reducers/toneSlice';
import { Button } from 'App/shared/Button';

export const LoginSection = () => {
  const loggedIn = useSelector((state) => state.app.user.loggedIn);
  const state = useLoginSectionState();
  return loggedIn ? <LoggedIn {...state} /> : <NotLoggedIn {...state} />;
};

const LoggedIn = ({ fetching, classes, values }) => {
  const dispatch = useDispatch();
  const onLogout = () => dispatch(logout());
  return (
    <div className='login-status'>
      {fetching ? (
        <p>please wait...</p>
      ) : (
        <div className='login-status-text'>
          <p className='login-status-title'>{values.title}</p>
          <p className={classes.online}>{values.online}</p>
        </div>
      )}
      <Button disabled={fetching} onClick={onLogout}>
        logout
      </Button>
    </div>
  );
};

const NotLoggedIn = ({ values, fetching }) => {
  const dispatch = useDispatch();
  const handleStopSequence = () => {
    dispatch(stopSequence());
  };
  return (
    <div className='login-div'>
      <p className='sequence-select-sub'>{values.sub}</p>
      <Link
        className='login-btn'
        onTouchStart={handleStopSequence}
        to='/login'
        disabled={fetching}
      >
        {values.loginBtn}
      </Link>
    </div>
  );
};

const useLoginSectionState = () => {
  const username = useSelector((state) => state.app.user.username);
  const online = useSelector((state) => state.app.online);
  const fetching = useSelector((state) => state.app.fetching);

  const classes = {};
  classes.online = online ? 'login-status-sub' : 'login-status-sub error';

  const values = {};
  values.title = `Logged in as: ${username}`;
  values.online = online ? 'online sync' : 'offline';
  values.sub = fetching
    ? 'Logging in...'
    : 'Login to sync your sequences with your account and share to social media';
  values.loginBtn = fetching ? 'x' : 'Login';

  return { fetching, values, classes };
};
