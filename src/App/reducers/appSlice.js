import { createSlice } from '@reduxjs/toolkit';
import { getLS, getSS } from 'utils/storage';
import { defaultSequences } from 'utils/defaultSequences';
import * as appThunks from './thunks/appThunks';

export const VIEWS = {
  SAVE: 'save',
  LOAD: 'load',
  CHANGE_KIT: 'CHANGE_KIT',
  THEMES: 'THEMES',
};

export const INITIAL_USER = {
  _id: '',
  username: '',
  loggedIn: false,
};

const INITIAL_STATE = {
  user: { ...INITIAL_USER },
  userSequences: [],
  defaultSequences,
  status: { count: 0, message: 'loading' },
  show: getSS('show') || '',
  fetching: false,
  confirmation: '',
  error: '',
  online: window.navigator.onLine,
  serviceWorkerActive: false,
  theme: getLS('theme') || 'Joker',
  landscape: window.innerWidth > window.innerHeight,
};

export const appSlice = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    setShow: (state, { payload }) => {
      state.show = payload;
      state.confirmation = '';
      state.error = '';
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
    setLandscape: (state, { payload }) => {
      state.landscape = payload;
    },
    updateSequencesFinally: (
      state,
      { payload: { newSequences, message, error, confirmation } }
    ) => {
      state.userSequences = newSequences;
      state.status.count++;
      state.status.message = message;
      if (confirmation) state.confirmation = confirmation;
      if (error) state.error = error;
      state.fetching = false;
    },
    getUserFinally: (
      state,
      { payload: { loggedIn, _id, username, userSequences, message } }
    ) => {
      state.user.loggedIn = loggedIn;
      state.user._id = _id;
      state.user.username = username;
      state.userSequences = userSequences;
      state.status.count++;
      state.status.message = message;
      state.fetching = false;
    },
  },
});

export const {
  setShow,
  setUser,
  setStatus,
  setFetching,
  setConfirmation,
  setError,
  setOnline,
  setServiceWorkerActive,
  setTheme,
  setLandscape,
  updateSequencesFinally,
  getUserFinally,
} = appSlice.actions;

export const { saveSequence, deleteSequence, getUser, logout } = appThunks;

export default appSlice.reducer;
