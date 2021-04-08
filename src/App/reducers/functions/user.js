import { apiSaveSequence, apiDeleteSequence, apiGetUser } from 'api';
import { get, set } from 'idb-keyval';

export const addCloudUserToPayload = async (payload) => {
  let cloudSeqs = [];
  try {
    const cloudUser = await apiGetUser();
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
    payload.cloudSeqs = cloudSeqs;
  }
};

export const addIDBUserToPayload = async (payload) => {
  let seqs = [];
  try {
    const idbUsername = await get('username');
    if (!payload.username) payload.username = idbUsername || '';
    const idbSeqs = await get('sequences');
    if (idbSeqs) seqs = idbSeqs;
    if (!payload.message) payload.message = 'user data loaded from device';
  } catch (e) {
    console.log('getUserFromIDB ->\n', e);
  } finally {
    payload.idbSeqs = seqs;
  }
};

export const mergeSequences = async (payload) => {
  payload.mergedSeqs = {};
  await syncCloudSeqs(payload);
  await syncIDBSeqs(payload);
  payload.userSequences = Object.values(payload.mergedSeqs);
  if (payload.idbUpdate)
    payload.promises.push(set('sequences', payload.userSequences));
};

const syncCloudSeqs = async (payload) => {
  const { cloudSeqs, idbSeqs, mergedSeqs, promises } = payload;
  payload.idbUpdate = false;
  const deletedIds = await get('deleted');
  for (let cloudSeq of cloudSeqs) {
    const _id = cloudSeq._id.toString();
    if (deletedIds && deletedIds.find((deletedId) => deletedId === _id)) {
      promises.push(deleteSeqFromCloud(_id));
    } else {
      mergedSeqs[_id] = cloudSeq;
      if (!(_id in idbSeqs)) {
        payload.idbUpdate = true;
      }
    }
  }
};

const syncIDBSeqs = async (payload) => {
  const { idbSeqs, mergedSeqs, promises, loggedIn } = payload;
  for (let idbSeq of idbSeqs) {
    const _id = idbSeq._id.toString();
    if (!(_id in mergedSeqs)) {
      mergedSeqs[_id] = idbSeq;
      if (loggedIn) {
        promises.push(apiSaveSequence(idbSeq));
      }
    }
  }
};

const deleteSeqFromCloud = (_id) => {
  return new Promise(async (resolve, reject) => {
    const res = await apiDeleteSequence(_id);
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
  });
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
