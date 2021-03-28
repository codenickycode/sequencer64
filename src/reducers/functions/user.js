import axios from 'axios';
import { HOST } from '../../network';
import { get, set } from 'idb-keyval';

export const getUserFromCloud = async (payload) => {
  let cloudSeqs = [];
  try {
    const cloudUser = await axios.get(`${HOST}/user`, {
      withCredentials: true,
    });
    if (cloudUser) {
      payload.user.username = cloudUser.data.username;
      payload.message = 'user data loaded';
      cloudSeqs = cloudUser.data.sequences;
    }
  } catch (e) {
    console.log('getUserFromCloud ->\n', e);
  } finally {
    return cloudSeqs;
  }
};

export const getUserFromIDB = async (payload) => {
  let seqs = [];
  try {
    const idbUsername = await get('username');
    if (!payload.user.username) payload.user.username = idbUsername;
    const idbSeqs = await get('sequences');
    if (idbSeqs) seqs = idbSeqs;
    if (!payload.message) payload.message = 'user data loaded from local';
  } catch (e) {
    console.log('getUserFromIDB ->\n', e);
  } finally {
    return seqs;
  }
};

export const mergeSequences = (payload, cloudSeqs, idbSeqs) => {
  let newSeqs = {};
  let promises = [];

  let idbUpdate = [];
  for (let cloudSeq of cloudSeqs) {
    const id = cloudSeq._id.toString();
    newSeqs[id] = cloudSeq;
    if (!(id in idbSeqs)) {
      idbUpdate.push(cloudSeq);
    }
  }

  for (let idbSeq of idbSeqs) {
    const id = idbSeq._id.toString();
    if (!(id in newSeqs)) {
      newSeqs[id] = idbSeq;
      promises.push(
        axios({
          url: `${HOST}/user/sequence/save`,
          method: 'POST',
          idbSeq,
          withCredentials: true,
        })
      );
    }
  }

  const newSequences = Object.values(newSeqs);
  if (idbUpdate.length > 0) promises.push(set('sequences', newSequences));
  payload.user.sequences = newSequences;
  return promises;
};

export const idbSaveSeqs = async (seq, sequences) => {
  sequences.push(seq);
  await set('sequences', sequences);
};

export const idbDelSeq = async (id, sequences) => {
  let deleted = false;
  sequences.forEach((sequence, index) => {
    if (sequence._id.toString() === id.toString()) {
      sequences.splice(index, 1);
      deleted = true;
    }
  });
  if (deleted) await set('sequences', sequences);
};
