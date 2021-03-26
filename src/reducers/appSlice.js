import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getSS, setSS } from '../utils/storage';

export const INITIAL_USER = {
  googleId: '',
  twitterId: '',
  facebookId: '',
  githubId: '',
  username: '',
  sequences: [],
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  status: { count: 0, message: 'loading' },
  show: getSS('show') || '',
  fetching: false,
  networkError: false,
  serviceWorkerActive: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    setShow: (state, { payload }) => {
      state.show = payload;
      setSS('show', payload);
    },
    setUser: (state, { payload: { user, status } }) => {
      state.user = { username: user.username, sequences: user.sequences };
      state.status.count++;
      state.status.message = status;
    },
    setStatus: (state, { payload }) => {
      state.status.count++;
      state.status.message = `${state.status.count}#${payload}`;
    },
    setFetching: (state, { payload }) => {
      state.fetching = payload;
    },
    setNetworkError: (state, { payload: { val, timeout } }) => {
      state.networkError = val;
      if (val) {
        state.networkTimeout = timeout;
      } else {
        console.log('clearing networkTimeout');
        clearTimeout(state.networkTimeout);
      }
    },
    setServiceWorkerActive: (state, { payload }) => {
      state.serviceWorkerActive = payload;
      if (payload) {
        console.log('service worker is active');
      } else {
        console.log('service worker is not active');
      }
    },
  },
});

export const changeNetworkError = (val) => (dispatch) => {
  let timer;
  dispatch(appSlice.actions.setNetworkError(val, timer));
  if (val)
    timer = setTimeout(() =>
      dispatch(appSlice.actions.setNetworkError(false), 1000 * 60)
    );
};

export const getUser = () => async (dispatch) => {
  try {
    dispatch(appSlice.actions.setFetching(true));
    const res = await axios.get(
      //   // 'https://drumnickydrum-sequencer.herokuapp.com/user',
      'http://localhost:4000/user',
      {
        withCredentials: true,
      }
    );
    if (res.data) {
      dispatch(setUser({ user: res.data, status: 'User logged in' }));
    }
  } catch (e) {
    console.log('Get User ERROR ->\n', e);
    dispatch(appSlice.actions.setStatus('User not logged in'));
  } finally {
    dispatch(appSlice.actions.setFetching(false));
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(appSlice.actions.setFetching(true));
    await axios({
      url: 'http://localhost:4000/user/logout',
      method: 'GET',
      withCredentials: true,
    });
    dispatch(setUser(INITIAL_USER));
  } catch (e) {
    console.log('Logout ERROR ->\n', e);
    dispatch(appSlice.actions.setStatus('Error logging out'));
  } finally {
    dispatch(appSlice.actions.setFetching(false));
  }
};

export const {
  setShow,
  setUser,
  setStatus,
  setFetching,
  setServiceWorkerActive,
} = appSlice.actions;

export default appSlice.reducer;
