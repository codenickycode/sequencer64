import axios from 'axios';
import { get, set } from 'idb-keyval';
import { HOST } from 'utils/network';

export const getUserFromCloud = async (payload) => {
  let cloudSeqs = [];
  try {
    const cloudUser = await axios.get(`${HOST}/user`, {
      withCredentials: true,
    });
    if (cloudUser?.data) {
      payload.loggedIn = true;
      payload._id = cloudUser.data._id;
      payload.username = cloudUser.data.username;
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
    if (!payload.username) payload.username = idbUsername || '';
    const idbSeqs = await get('sequences');
    if (idbSeqs) seqs = idbSeqs;
    if (!payload.message) payload.message = 'user data loaded from local';
  } catch (e) {
    console.log('getUserFromIDB ->\n', e);
  } finally {
    return seqs;
  }
};

export const mergeSequences = async (payload, cloudSeqs, idbSeqs) => {
  let newSeqs = {};
  let promises = [];

  let idbUpdate = false;
  const deletedIds = await get('deleted');
  for (let cloudSeq of cloudSeqs) {
    const _id = cloudSeq._id.toString();
    if (deletedIds && deletedIds.find((deletedId) => deletedId === _id)) {
      promises.push(
        new Promise(async (resolve, reject) => {
          const res = await axios({
            url: `${HOST}/user/sequence/delete`,
            method: 'POST',
            data: { _id },
            withCredentials: true,
          });
          if (res.status < 400) {
            const deletedIds = await get('deleted');
            if (deletedIds) {
              const index = deletedIds.indexOf(_id);
              if (index !== -1) deletedIds.splice(index, 1);
              await set('deleted', deletedIds);
            }
            resolve();
          } else {
            reject('failed to update cloud');
          }
        })
      );
    } else {
      newSeqs[_id] = cloudSeq;
      if (!(_id in idbSeqs)) {
        idbUpdate = true;
      }
    }
  }

  for (let idbSeq of idbSeqs) {
    const _id = idbSeq._id.toString();
    if (!(_id in newSeqs)) {
      newSeqs[_id] = idbSeq;
      if (payload.loggedIn) {
        promises.push(
          axios({
            url: `${HOST}/user/sequence/save`,
            method: 'POST',
            data: idbSeq,
            withCredentials: true,
          })
        );
      }
    }
  }

  const newSequences = Object.values(newSeqs);
  if (idbUpdate) promises.push(set('sequences', newSequences));
  payload.sequences = newSequences;
  return promises;
};

export const idbSaveSeqs = async (seq, sequences) => {
  sequences.push(seq);
  await set('sequences', sequences);
};

export const idbDelSeq = async (_id, sequences) => {
  let deleted = false;
  sequences.forEach((sequence, index) => {
    if (sequence._id.toString() === _id.toString()) {
      sequences.splice(index, 1);
      deleted = true;
    }
  });
  if (deleted) await set('sequences', sequences);
};

export const flagDeleted = async (_id) => {
  const deletedIds = await get('deleted');
  if (!deletedIds) {
    await set('deleted', [_id]);
  } else {
    deletedIds.push(_id);
    await set('deleted', deletedIds);
  }
};
