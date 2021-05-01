import {
  flagDeleted,
  addCloudUserToPayload,
  addIDBUserToPayload,
  idbDelSeq,
  idbSaveSeqs,
  mergeSequences,
} from 'App/reducers/functions/user';
import { apiDeleteSequence, apiSaveSequence } from 'api';
import { getUserFinally, setFetching, setStatus, updateSequencesFinally } from '../appSlice';
import { setUserSequences } from '../assetsSlice';

export const saveSequence = (sequence) => async (dispatch, getState) => {
  dispatch(setFetching(true));
  const payload = {
    message: '',
    confirmation: '',
    error: '',
    newSequences: [...getState().assets.userSequences],
  };
  try {
    await idbSaveSeqs(sequence, payload.newSequences);
    payload.message = 'success!';
    payload.confirmation = `succesfully saved ${sequence.name} to device`;
    await apiSaveSequence(sequence);
    payload.confirmation += ' and cloud';
    sequence.synched = true;
  } catch (e) {
    if (!payload.message) {
      payload.message = 'unsuccessful :(';
      payload.error = 'Error: Please try again later';
    } else {
      payload.message = 'updated local database';
    }
  } finally {
    dispatch(setUserSequences(payload.newSequences));
    dispatch(updateSequencesFinally(payload));
  }
};

export const deleteSequence = (_id) => async (dispatch, getState) => {
  dispatch(setFetching(true));
  const payload = {
    message: '',
    error: '',
    newSequences: [...getState().assets.userSequences],
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
    dispatch(setUserSequences(payload.newSequences));
    dispatch(updateSequencesFinally(payload));
  }
};

export const getUser = () => async (dispatch, getState) => {
  dispatch(setFetching(true));
  let payload = {
    loggedIn: false,
    _id: '',
    username: '',
    message: '',
    userSequences: [],
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
    dispatch(setUserSequences(payload.userSequences));
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
