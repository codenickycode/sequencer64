import {
  flagDeleted,
  addCloudUserToPayload,
  addIDBUserToPayload,
  idbDelSeq,
  idbSaveSeqs,
  mergeSequences,
} from 'App/reducers/functions/user';
import { apiDeleteSequence, apiLogout, apiSaveSequence } from 'api';
import {
  getUserFinally,
  INITIAL_USER,
  setFetching,
  setStatus,
  setUser,
  updateSequencesFinally,
} from '../appSlice';

export const saveSequence = (sequence) => async (dispatch, getState) => {
  dispatch(setFetching(true));
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
    dispatch(updateSequencesFinally(payload));
  }
};

export const deleteSequence = (_id) => async (dispatch, getState) => {
  dispatch(setFetching(true));
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
    dispatch(updateSequencesFinally(payload));
  }
};

export const getUser = () => async (dispatch, getState) => {
  dispatch(setFetching(true));
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
    payload.message = 'No user data';
  } finally {
    dispatch(getUserFinally(payload));
    const online = getState().app.online;
    if (online && payload.loggedIn && payload.promises.length > 0) {
      try {
        Promise.all(payload.promises);
        dispatch(setStatus('user data refreshed'));
      } catch (e) {
        console.error('getUser | promises ->:\n', e);
      }
    }
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(setFetching(true));
    await apiLogout();
    dispatch(
      setUser({ user: { ...INITIAL_USER }, message: 'Successfully logged out' })
    );
  } catch (e) {
    console.error('logout ->\n', e);
    dispatch(setStatus('error logging out'));
  } finally {
    dispatch(setFetching(false));
  }
};