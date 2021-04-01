import { createSlice } from '@reduxjs/toolkit';
import { getSS } from 'utils/storage';
import { defaultSequences } from 'utils/defaultSequences';
import {
  flagDeleted,
  addCloudUserToPayload,
  addIDBUserToPayload,
  idbDelSeq,
  idbSaveSeqs,
  mergeSequences,
} from 'App/reducers/functions/user';
import { apiDeleteSequence, apiLogout, apiSaveSequence } from 'api';

export const VIEWS = {
  SAVE: 'save',
  LOAD: 'load',
  LOAD_KIT: 'LOAD_KIT',
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

export const saveSequence = (sequence) => async (dispatch, getState) => {
  dispatch(appSlice.actions.setFetching(true));
  const payload = {
    message: '',
    confirmation: '',
    error: '',
    newSequences: [...getState().app.userSequences],
  };
  try {
    await idbSaveSeqs(sequence, payload.newSequences);
    payload.message = 'success!';
    payload.confirmation = `succesfully saved ${sequence.name} to device`;
    await apiSaveSequence(sequence);
    payload.confirmation += ' and cloud';
  } catch (e) {
    if (!payload.message) {
      payload.message = 'unsuccessful :(';
      payload.error = 'Error: Please try again later';
    } else {
      payload.message = 'updated local database';
    }
  } finally {
    dispatch(appSlice.actions.updateSequencesFinally(payload));
  }
};

export const deleteSequence = (_id) => async (dispatch, getState) => {
  dispatch(appSlice.actions.setFetching(true));
  const payload = {
    message: '',
    error: '',
    newSequences: [...getState().app.userSequences],
  };
  try {
    await idbDelSeq(_id, payload.newSequences);
    payload.message = 'success!';
    await apiDeleteSequence(_id);
  } catch (e) {
    if (!payload.message) {
      payload.message = 'unsuccessful :(';
      payload.error = 'Error: Please try again later';
    } else {
      payload.message = 'updated local database';
      flagDeleted(_id);
    }
  } finally {
    dispatch(appSlice.actions.updateSequencesFinally(payload));
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(appSlice.actions.setFetching(true));
  let payload = {
    loggedIn: false,
    _id: '',
    username: '',
    userSequences: [],
    message: '',
    promises: [],
  };
  try {
    await addCloudUserToPayload(payload);
    await addIDBUserToPayload(payload);
    await mergeSequences(payload);
  } catch (e) {
    console.error('getUser ->\n', e);
    payload.message = 'no user data';
  } finally {
    dispatch(appSlice.actions.getUserFinally(payload));
    if (payload.loggedIn && payload.promises.length > 0) {
      try {
        Promise.all(payload.promises);
        dispatch(appSlice.actions.setStatus('user data refreshed'));
      } catch (e) {
        console.error('getUser | promises ->:\n', e);
      }
    }
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(appSlice.actions.setFetching(true));
    await apiLogout();
    dispatch(
      setUser({ user: { ...INITIAL_USER }, message: 'Successfully logged out' })
    );
  } catch (e) {
    console.error('logout ->\n', e);
    dispatch(appSlice.actions.setStatus('error logging out'));
  } finally {
    dispatch(appSlice.actions.setFetching(false));
  }
};

export const {
  setShow,
  setUser,
  setStatus,
  setFetching,
  setConfirmation,
  setError,
  setServiceWorkerActive,
  saveSuccess,
  saveFail,
  setOnline,
} = appSlice.actions;

export default appSlice.reducer;
