import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getSS, setSS } from '../utils/storage';
import { host } from '../host';

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
  confirmation: '',
  error: '',
  networkError: false,
  serviceWorkerActive: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    setShow: (state, { payload }) => {
      state.show = payload;
      state.confirmation = '';
      state.error = '';
      setSS('show', payload);
    },
    setUser: (state, { payload: { user, message } }) => {
      state.user = {
        username: user.username,
        sequences: user.sequences,
        __v: user.__v,
      };
      state.status.count++;
      state.status.message = message;
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
    updateSequencesFinally: (
      state,
      { payload: { user, message, error, confirmation } }
    ) => {
      state.user.sequences = user.sequences;
      state.user.__v = user.__v;
      state.status.count++;
      state.status.message = message;
      if (confirmation) state.confirmation = confirmation;
      if (error) state.error = error;
      state.fetching = false;
    },
  },
});

export const updateSequences = (type, data) => async (dispatch, getState) => {
  dispatch(appSlice.actions.setFetching(true));
  let user = getState().app.user;
  let message = '',
    confirmation = '',
    error = '';
  try {
    const res = await axios({
      url: `${host}/user/sequence/${type}`,
      method: 'POST',
      data,
      withCredentials: true,
    });
    user = res.data;
    message = 'success!';
    confirmation = `succesfully ${
      type === 'add' ? 'saved' : 'deleted'
    } sequence: ${data.name}`;
  } catch (e) {
    console.log(e);
    message = 'unsuccessful :(';
    error = 'network error: Please try again later';
  } finally {
    dispatch(
      appSlice.actions.updateSequencesFinally({
        user,
        message,
        error,
        confirmation,
      })
    );
  }
};

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
    const res = await axios.get(`${host}/user`, {
      withCredentials: true,
    });
    if (res.data) {
      dispatch(setUser({ user: res.data, message: 'User logged in' }));
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
      url: `${host}/user/logout`,
      method: 'GET',
      withCredentials: true,
    });
    dispatch(
      setUser({ user: INITIAL_USER, message: 'Successfully logged out' })
    );
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
  saveSuccess,
  saveFail,
} = appSlice.actions;

export default appSlice.reducer;
