import axios from 'axios';
import { HOST } from 'utils/network';

export const apiSaveSequence = async (sequence) =>
  await axios({
    url: `${HOST}/user/sequence/save`,
    method: 'POST',
    data: sequence,
    withCredentials: true,
  });

export const apiDeleteSequence = async (_id) =>
  await axios({
    url: `${HOST}/user/sequence/delete`,
    method: 'POST',
    data: { _id },
    withCredentials: true,
  });
