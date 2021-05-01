import { createSlice } from '@reduxjs/toolkit';
import store from 'App/store';
import { getLS } from 'utils/storage';
import * as appThunks from './thunks/appThunks';

export const THEMES = {
  MARIO: 'Mario',
  JOKER: 'Joker',
  TMNT: 'TMNT',
  LIGHT: 'Light',
};

export const INITIAL_USER = {
  _id: '',
  username: '',
  loggedIn: false,
};

const INITIAL_STATE = {
  authToken: getLS('authToken') || null,
  user: { ...INITIAL_USER },
  fetching: false,
  status: { count: 0, message: 'loading' },
  flashInfo: false,
  confirmation: '',
  error: '',
  online: window.navigator.onLine,
  serviceWorkerActive: false,
  theme: getLS('theme') || THEMES.MARIO,
  log: { count: 0, message: '' },
  preparingDownload: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    setAuthToken: (state, { payload }) => {
      state.authToken = payload;
    },
    logout: (state) => {
      state.authToken = null;
      state.user = { ...INITIAL_USER };
      state.status.count++;
      state.status.message = 'Successfully logged out';
    },
    setUser: (state, { payload: { user, message } }) => {
      state.user = user;
      state.status.count++;
      state.status.message = message;
    },
    setStatus: (state, { payload }) => {
      state.status.count++;
      state.status.message = `${state.status.count}#${payload}`;
    },
    setFlashInfo: (state, { payload }) => {
      state.flashInfo = payload;
    },
    setFetching: (state, { payload }) => {
      state.fetching = payload;
    },
    setConfirmation: (state, { payload }) => {
      state.confirmation = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setOnline: (state, { payload }) => {
      state.online = payload;
    },
    setServiceWorkerActive: (state, { payload }) => {
      state.serviceWorkerActive = payload;
    },
    setTheme: (state, { payload }) => {
      state.theme = payload;
    },
    setLog: (state, { payload }) => {
      state.log.count++;
      state.log.message = payload;
    },
    updateSequencesFinally: (state, { payload: { message, error, confirmation } }) => {
      state.status.count++;
      state.status.message = message;
      if (confirmation) state.confirmation = confirmation;
      if (error) state.error = error;
      state.fetching = false;
    },
    getUserFinally: (state, { payload: { loggedIn, _id, username, message } }) => {
      state.user.loggedIn = loggedIn;
      state.user._id = _id;
      state.user.username = username;
      state.status.count++;
      state.status.message = message;
      state.fetching = false;
    },
    setPreparingDownload: (state, { payload }) => {
      state.preparingDownload = payload;
      const portal = document.getElementById('preparingPortalTop');
      if (payload && portal) portal.style.display = 'initial';
      if (!payload && portal) portal.style.display = 'none';
    },
  },
});

export const {
  setAuthToken,
  logout,
  setUser,
  setStatus,
  setFlashInfo,
  setFetching,
  setConfirmation,
  setError,
  setOnline,
  setServiceWorkerActive,
  setTheme,
  setLog,
  updateSequencesFinally,
  getUserFinally,
  setPreparingDownload,
} = appSlice.actions;

export const { saveSequence, deleteSequence, getUser } = appThunks;

export default appSlice.reducer;

window.addEventListener('online', () => store.dispatch(setOnline(true)));
window.addEventListener('offline', () => store.dispatch(setOnline(false)));
